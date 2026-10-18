---
title: "Administração de Windows Server com PowerShell: Automação de Rotinas e Diagnóstico de Serviços"
date: "2026-10-18"
excerpt: "Scripts e rotinas práticas em PowerShell para monitorar integridade de serviços críticos, auditar espaço em disco, rotação de logs do IIS e resposta rápida a incidentes no Windows Server."
category: "Windows Server & Cloud"
tags: ["Windows Server", "PowerShell", "Active Directory", "Automação", "Sysadmin"]
author: "Rafael Soje"
readTime: "7 min de leitura"
---

A administração moderna de ambientes Windows Server corporativos exige produtividade e padronização. Realizar tarefas manuais via interface gráfica (GUI) em múltiplos servidores é lento, suscetível a falhas humanas e inviabiliza diagnósticos rápidos.

Neste artigo, apresento rotinas essenciais em PowerShell que utilizo para automatizar a sustentação de servidores Windows em produção.

---

## 1. Monitoramento e Auto-Recuperação de Serviços Críticos

Serviços essenciais como SQL Server, IIS (`W3SVC`) ou spoolers de impressão podem travar silenciosamente. O script abaixo verifica o status dos serviços e realiza o reinício automático com registro em log de eventos:

```powershell
# Script de monitoramento de serviços essenciais
$CriticalServices = @("W3SVC", "MSSQLSERVER", "LanmanServer", "Dhcp")
$LogPath = "C:\Ops\Logs\ServiceHealth.log"

if (-not (Test-Path "C:\Ops\Logs")) {
    New-Item -ItemType Directory -Path "C:\Ops\Logs" -Force | Out-Null
}

foreach ($ServiceName in $CriticalServices) {
    $svc = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
    
    if ($null -eq $svc) {
        Add-Content -Path $LogPath -Value "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [ALERTA] Servidor não possui o serviço '$ServiceName' instalado."
        continue
    }

    if ($svc.Status -ne 'Running') {
        Add-Content -Path $LogPath -Value "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [FALHA] Serviço '$ServiceName' está $($svc.Status). Tentando reiniciar..."
        try {
            Restart-Service -Name $ServiceName -Force -ErrorAction Stop
            Start-Sleep -Seconds 3
            Add-Content -Path $LogPath -Value "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [RECUPERADO] Serviço '$ServiceName' reiniciado com sucesso."
        }
        catch {
            Add-Content -Path $LogPath -Value "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [ERRO CRÍTICO] Falha ao reiniciar '$ServiceName': $_"
        }
    }
}
```

---

## 2. Alerta de Espaço em Disco com Cálculo Percentual

Ficar sem espaço em unidades de sistema (`C:`) ou de banco de dados (`D:`) é uma das principais causas de indisponibilidade severa. O cmdlet abaixo calcula o espaço livre e dispara alerta para volumes com menos de 15% de margem:

```powershell
Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" | ForEach-Object {
    $TotalGB = [math]::Round($_.Size / 1GB, 2)
    $FreeGB  = [math]::Round($_.FreeSpace / 1GB, 2)
    $FreePct = [math]::Round(($_.FreeSpace / $_.Size) * 100, 1)

    $Status = if ($FreePct -lt 15) { "CRÍTICO" } else { "NORMAL" }

    [PSCustomObject]@{
        Drive      = $_.DeviceID
        Total_GB   = $TotalGB
        Livre_GB   = $FreeGB
        Livre_Pct  = "$FreePct%"
        Status     = $Status
    }
} | Format-Table -AutoSize
```

---

## 3. Rotação e Limpeza Segura de Logs do IIS

Servidores web Windows acumulam gigabytes de logs em `C:\inetpub\logs\LogFiles\` com facilidade. Para evitar o esgotamento do disco, agendamos uma rotina de expurgo para arquivos com mais de 30 dias:

```powershell
# Expurgo de logs do IIS antigos (> 30 dias)
$IisLogFolder = "C:\inetpub\logs\LogFiles"
$ThresholdDays = 30
$TargetDate = (Get-Date).AddDays(-$ThresholdDays)

if (Test-Path $IisLogFolder) {
    Get-ChildItem -Path $IisLogFolder -Recurse -Filter "*.log" | Where-Object {
        $_.LastWriteTime -lt $TargetDate -and -not $_.PSIsContainer
    } | ForEach-Object {
        Write-Output "Removendo log antigo: $($_.FullName) ($([math]::Round($_.Length/1MB, 2)) MB)"
        Remove-Item $_.FullName -Force
    }
}
```

---

## 4. Auditoria de Contas Inativas no Active Directory

Em auditorias de conformidade (LGPD, ISO 27001), contas de usuários inativas há mais de 90 dias representam uma brecha de segurança perigosa. Com o módulo `ActiveDirectory`, o inventário é gerado em poucos segundos:

```powershell
Import-Module ActiveDirectory

$LimitDate = (Get-Date).AddDays(-90)

Get-ADUser -Filter {Enabled -eq $true -and LastLogonDate -lt $LimitDate} -Properties LastLogonDate, Department, Title | 
    Select-Object Name, SamAccountName, LastLogonDate, Department, Title |
    Export-Csv -Path "C:\Ops\Relatorios\Contas_Inativas_90Dias.csv" -NoTypeInformation -Encoding UTF8
```

---

## Conclusão

A automação com PowerShell transforma o suporte reativo em uma operação previsível, segura e orientada a dados, permitindo que a equipe de TI atue estrategicamente antes que os usuários finais percebam lentidão ou falhas.

