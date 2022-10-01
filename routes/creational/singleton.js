import express from "express";
import { BaseRoute } from "../base-route.js";
import { SingletonService } from "../../services/creational/singleton/index.js";

export class SingletonRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new SingletonService()
    }

    router() {
        const router = express.Router()

        router.get('/', this.getInstance.bind(this))
        router.post('/increment', this.increment.bind(this))

        return router
    }

    /**
     * @swagger
     * /creational/singleton:
     *   get:
     *     summary: Returns count from singleton counter
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Current counter value
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: number
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getInstance(req, res) {
        const count = this.service.count
        this.sendOk(res, count)
    }

    /**
     * @swagger
     * /creational/singleton/increment:
     *   post:
     *     summary: Increments count from singleton counter
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Increments count
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: boolean
     *                   default: true
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    increment(req, res) {
        this.service.increment()
        this.sendOk(res, true)
    }
}