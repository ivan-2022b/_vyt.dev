# _oacac.demo – Single-Page Application w/ React.js
### Generation Line:
`dotnet new webapi --output "_oacac.demo"`

`cd _oacac.demo`

`npm create vite@latest` ... w/ "theclient" name & typescript variant

`cd .\theclient\`

`npm install`

### To Run (development):
.demo> `dotnet run`

.demo\theclient> `npm run dev` / `npm start`

### Production:
.demo\theclient> `npm run build`

_.. this will create necessary build files, then running the top-level Program.cs w/ `dotnet run` will include the React.js client app_

### Git Stuff (standard, removed dist from .gitignore)
.demo> `git init`
.demo> `git add .`
.demo> `git commit -m "first commit"`
.demo> `git branch -m main`
.demo> `git remote add origin https://github.com/ivan-2022b/oacacdemo.git`
(if it's a new, empty repository) .demo> `git pull origin main`
.demo> `git push -u origin main`
