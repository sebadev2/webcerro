# Descarga y recorta las imagenes del carrusel (hero) desde el sitio de Cerro Navia.
#
# Por que hay que recortar: la mayor parte del material del sitio son flyers
# y infografias con texto ya incrustado, que choca con el texto del hero. De cada
# pieza se usa solo la zona fotografica sin texto.
#
# Uso:  powershell -ExecutionPolicy Bypass -File scripts/generar-imagenes-hero.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$base = 'https://www.cerronavia.cl/wp-content/uploads'
$dest = Join-Path (Join-Path $PSScriptRoot '..') 'public'
$imgDir = Join-Path $dest 'img'
New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

# Origen: URL | archivo | recorte x,y,w,h (en fracciones del ancho/alto original) | destino
#
# Nota: del material del sitio solo una pieza resulto apta para el hero. Las demas
# son flyers con texto incrustado, y las unicas fotografias reales restantes
# corresponden a un operativo de Fiscalizacion (desalojo) que no corresponde usar
# como imagen de cabecera. Si la municipalidad entrega nuevas fotografias, se
# anaden aqui como una pieza mas.
$piezas = @(
  @{ url = "$base/2026/08/SISTEMA-DE-LLUVIAS_ID-1536x1024.jpg"
     out = 'hero-obras.jpg'
     fx = 0.0;  fy = 0.03; fw = 1.0;  fh = 0.52
     nota = 'Obras: sistema de evacuacion y drenaje en Av. Las Torres' }
)

function Descargar($url, $destino, $intentos = 4) {
  for ($i = 1; $i -le $intentos; $i++) {
    try {
      Invoke-WebRequest $url -OutFile $destino -TimeoutSec 60 -UserAgent 'Mozilla/5.0'
      return
    } catch {
      if ($i -eq $intentos) { throw }
      Start-Sleep -Seconds (2 * $i)
    }
  }
}

foreach ($p in $piezas) {
  $tmpFile = Join-Path $env:TEMP ("cn-" + $p.out)
  Write-Host "Descargando $($p.url)"
  Descargar $p.url $tmpFile

  $src = [System.Drawing.Image]::FromFile($tmpFile)
  $x = [int][math]::Round($src.Width  * $p.fx)
  $y = [int][math]::Round($src.Height * $p.fy)
  $w = [int][math]::Round($src.Width  * $p.fw)
  $h = [int][math]::Round($src.Height * $p.fh)

  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h),
                     (New-Object System.Drawing.Rectangle $x, $y, $w, $h),
                     [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  # JPEG de calidad 82 para no penalizar el peso de la portada
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
  $bmp.Save((Join-Path $imgDir $p.out), $codec, $ep)

  $bmp.Dispose(); $src.Dispose(); Remove-Item $tmpFile -Force
  Write-Host "  -> $($p.out)  ${w}x${h}  ($($p.nota))"
}

Write-Host ''
Write-Host 'Imagenes generadas en public/img/'
