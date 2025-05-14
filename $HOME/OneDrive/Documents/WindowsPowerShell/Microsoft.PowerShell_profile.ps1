# NVM Configuration
$env:NVM_HOME = "$HOME\.nvm"
$env:NVM_SYMLINK = "$HOME\AppData\Roaming\npm"

# Add NVM to PATH
$env:Path = "$env:NVM_HOME;$env:NVM_SYMLINK;$env:Path"

# NVM function
function nvm {
    param(
        [string]$Command,
        [string]$Version
    )
    
    $nvmPath = "$env:NVM_HOME\nvm.exe"
    
    if (Test-Path $nvmPath) {
        & $nvmPath $Command $Version
    } else {
        Write-Host "NVM is not installed. Please install NVM first."
    }
} 