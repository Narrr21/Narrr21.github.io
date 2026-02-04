# Script otomasi deployment ke GitHub Pages
Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Step 1: Build the project
Write-Host "`n📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Step 2: Copy files to parent directory
Write-Host "`n📁 Copying files to repository root..." -ForegroundColor Yellow
Set-Location ..
Copy-Item -Path "portfolio\out\*" -Destination "." -Recurse -Force
Write-Host "✅ Files copied!" -ForegroundColor Green

# Step 3: Git operations
Write-Host "`n📝 Committing changes..." -ForegroundColor Yellow
git add .

$commitMessage = Read-Host "Enter commit message (default: 'Update portfolio')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update portfolio"
}

git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ No changes to commit or commit failed" -ForegroundColor Yellow
    Set-Location portfolio
    exit 0
}

# Step 4: Push to GitHub
Write-Host "`n🌐 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ Deployment successful! Your site will be live at https://narrr21.github.io in a few minutes." -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed!" -ForegroundColor Red
    Set-Location portfolio
    exit 1
}

# Return to portfolio directory
Set-Location portfolio
Write-Host "`n🎉 Done!" -ForegroundColor Cyan
