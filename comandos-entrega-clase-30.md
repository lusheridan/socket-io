Ejecutar el servidor en modo FORK
`npm run start:dev -- --modo=FORK`
`npm run start:dev`

Ejecutar el servidor en modo CLUSTER
`npm run start:dev -- --modo=CLUSTER`

Ejecutar el servidor con forever
`forever start .\index.js`

Listar procesos de forever por consola
`forever list`

Ejecutar el servidor en modo fork con pm2
`pm2 start .\index.js --name="modo-fork" --watch -- port=8081`

Ejecutar el servidor en modo cluster con pm2
`pm2 start .\index.js --name="modo-cluster" --watch -i max -- port=8082`

Para listar los procesos con pm2
`pm2 list`
