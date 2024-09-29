@echo Off
setlocal
git add .
eslint \"src/**/*.ts\" --fix
echo blablablabla
@REM npm test
git commit -m "%~1"
endlocal

