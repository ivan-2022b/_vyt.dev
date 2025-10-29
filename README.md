# _vyt.dev – Single-Page Application w/ React.js
### Generation Line:
`dotnet new webapi --output "_vyt.dev"`

`cd _vyt.dev`

`npm create vite@latest` ... w/ "theclient" name & typescript variant

`cd .\theclient\`

`npm install`

### To Run (development):
.dev> `dotnet run`

.dev\theclient> `npm run dev` / `npm start`

### Production:
.dev\theclient> `npm run build`

_.. this will create necessary build files, then running the top-level Program.cs w/ `dotnet run` will include the React.js client app_

### Git Stuff (standard, removed dist from .gitignore)
.dev> `git init`
.dev> `git add .`
.dev> `git commit -m "first commit"`
.dev> `git branch -M main`
.dev> `git remote add origin https://github.com/ivan-2022b/_vyt.dev.git`
.dev> `git push -u origin main`
