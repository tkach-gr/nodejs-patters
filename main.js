import express from 'express'
import { useRoutes } from "./routes/index.js";
import { useSwagger } from "./utils/swagger.js";

const app = express()
const host = 'http://localhost'
const port = 4000

app.get('/', (req, res) => {
    res.send('hello world :)')
})

app.use('/', useRoutes())

useSwagger(app, host, port)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})