DELPHI7 APP - UPDATE GUIDE

Objetivo:
Manter sempre um link fixo no site para download do app.

Arquivo publico (nao mudar o nome):
Aplicativo-Delphi7.zip

Caminho publico (nao mudar):
apps/delphi7/Aplicativo-Delphi7.zip

Como atualizar:
1) Gere o novo Project1.exe no Delphi.
2) Rode o script update-package.ps1 e informe o caminho do exe.
3) O script atualiza o zip publico e guarda uma copia versionada em releases/.
4) Faça git add/commit/push.

Comando exemplo (PowerShell):
pwsh .\apps\delphi7\update-package.ps1 -ExePath "C:\caminho\Project1.exe" -Version "v1.0.0"

Sem versao:
pwsh .\apps\delphi7\update-package.ps1 -ExePath "C:\caminho\Project1.exe"

Observacao:
Se o app precisar de DLL, banco, ou pasta de dados, compacte tudo junto no zip.
