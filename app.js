import express from 'express'
import multer from 'multer'
import { useRoutes } from "./routes/index.js";
import { useSwagger } from "./utils/swagger.js";

export function useApp() {
    const upload = multer()

    const app = express()
    const host = 'http://localhost'
    const port = process.env.PORT || 4000

    app.get('/', (req, res) => {
        res.send('hello world :)')
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(upload.any())
    app.use('/', useRoutes())

    useSwagger(app, host, port)

    const listen = () => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }

    return {
        app,
        listen,
    }
}