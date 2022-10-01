import express from "express";

/**
 * @swagger
 * components:
 *   responses:
 *     404NotFound:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: error
 *               data:
 *                 type: object
 *                 nullable: true
 *                 default: null
 *               error:
 *                 type: string
 *                 default: 'Error: Not found'
 *     422ValidationError:
 *       description: Validation error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: error
 *               data:
 *                 type: object
 *                 nullable: true
 *                 default: null
 *               error:
 *                 type: string
 *                 default: 'Error: Validation error'
 */

export class BaseRoute {
    router() {
        return express.Router()
    }

    sendOk(res, data, status = 200) {
        const responseData = {
            status: 'ok',
            data,
            error: null,
        }

        res.status(status).send(responseData)
    }

    sendError(res, err, status = 400) {
        const responseData = {
            status: 'error',
            data: null,
            error: err.toString(),
        }

        res.status(status).send(responseData)
    }
}