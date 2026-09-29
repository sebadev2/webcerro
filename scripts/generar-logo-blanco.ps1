# Genera la version en blanco del logotipo oficial, preservando el canal alfa.
# Necesario porque el PNG original es azul marino sobre fondo transparente:
# se ve perfecto sobre blanco, pero desaparece sobre el footer azul marino.
# Uso:  powershell -ExecutionPolicy Bypass -File scripts/generar-logo-blanco.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$pub = Join-Path (Join-Path $PSScriptRoot '..') 'public'
$origen = Join-Path $pub 'logo-cerro-navia.png'
$destino = Join-Path $pub 'logo-cerro-navia-blanco.png'

$src = [System.Drawing.Bitmap]::FromFile($origen)
$bmp = New-Object System.Drawing.Bitmap $src.Width, $src.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $src.Height; $y++) {
  for ($x = 0; $x -lt $src.Width; $x++) {
    $p = $src.GetPixel($x, $y)
    if ($p.A -eq 0) {
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    } else {
      # Blanco solido conservando la opacidad original (bordes suavizados)
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($p.A, 255, 255, 255))
    }
  }
}

$bmp.Save($destino, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$src.Dispose()

Write-Host "Generado: $destino ($($src.Width)x$($src.Height)px)"
