@echo Off
setlocal
npm run lint
@REM npm test
git commit -m "%~1"
endlocal

