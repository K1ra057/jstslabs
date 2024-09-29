@echo Off
setlocal
eslint \"src/**/*.ts\" --fix
echo blablablabla
@REM npm test
git add .
git commit -m "%~1"
endlocal

