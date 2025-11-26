@echo off
echo Building GoGhana Budget Estimator...
echo.
call npm run build
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo.
    echo Next steps:
    echo 1. Go to https://app.netlify.com/drop
    echo 2. Drag the 'dist' folder to deploy
    echo 3. Get your shareable link!
) else (
    echo ❌ Build failed!
    echo Please check the errors above.
)
pause
