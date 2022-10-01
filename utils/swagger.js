import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

export function useSwagger(app, host, port) {
    const options = {
        definition: {
            openapi: '3.0.3',
            info: {
                title: 'Nodejs Patterns',
                version: '1.0.0',
                description: 'Nodejs api for patterns testing'
            },
            servers: [
                {
                    url: `${host}:${port}`
                }
            ],
        },
        apis: ['./routes/**/*.js']
    }

    const specs = swaggerJsDoc(options)

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
}


