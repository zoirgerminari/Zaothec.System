param(
    [Parameter(Mandatory = $true)]
    [string]$ExePath,

    [Parameter(Mandatory = $false)]
    [string]$Version
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ExePath)) {
    throw "Exe nao encontrado: $ExePath"
}

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$publicZip = Join-Path $baseDir "Aplicativo-Delphi7.zip"
$releasesDir = Join-Path $baseDir "releases"

if (-not (Test-Path $releasesDir)) {
    New-Item -ItemType Directory -Path $releasesDir | Out-Null
}

if (Test-Path $publicZip) {
    Remove-Item $publicZip -Force
}

Compress-Archive -Path $ExePath -DestinationPath $publicZip -CompressionLevel Optimal

$stamp = Get-Date -Format "yyyyMMdd-HHmm"
if ([string]::IsNullOrWhiteSpace($Version)) {
    $releaseName = "Aplicativo-Delphi7-$stamp.zip"
} else {
    $safeVersion = $Version -replace "[^a-zA-Z0-9._-]", "_"
    $releaseName = "Aplicativo-Delphi7-$safeVersion-$stamp.zip"
}

$releaseZip = Join-Path $releasesDir $releaseName
Copy-Item $publicZip $releaseZip -Force

Write-Host "OK: Pacote publico atualizado -> $publicZip"
Write-Host "OK: Copia versionada criada -> $releaseZip"
