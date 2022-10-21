import express from "express";
import {BaseRoute} from "../base-route.js";
import {StrategyService} from "../../services/behavioral/strategy/index.js";

export class StrategyRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new StrategyService()
    }

    router() {
        const router = express.Router()

        router.get('/bot/strategies', this.getStrategies.bind(this))
        router.post('/bot/set-strategy/:name', this.setStrategy.bind(this))
        router.post('/bot/send/:message', this.send.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/strategy/bot/strategies:
     *   get:
     *     summary: Retrieve available strategies
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Available strategies
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: array
     *                   items:
     *                     type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getStrategies(req, res) {
        const data = this.service.getStrategies()
        this.sendOk(res, data)
    }

    /**
     * @swagger
     * /behavioral/strategy/bot/set-strategy/{name}:
     *   post:
     *     summary: Set strategy
     *     tags: [Behavioral]
     *     parameters:
     *       - name: name
     *         in: path
     *         description: Strategy's name
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    setStrategy(req, res) {
        const name = req.params.name

        try {
            this.service.setStrategy(name)
            this.sendOk(res, true)
        } catch (err) {
            this.sendError(res, err, 422)
        }
    }

    /**
     * @swagger
     * /behavioral/strategy/bot/send/{message}:
     *   post:
     *     summary: Send message
     *     tags: [Behavioral]
     *     parameters:
     *       - name: message
     *         in: path
     *         description: Message to be sent
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       400:
     *         $ref: '#/components/responses/400BadRequestError'
     */
    send(req, res) {
        const message = req.params.message

        try {
            const data = this.service.send(message)
            this.sendOk(res, data)
        } catch (err) {
            this.sendError(res, err, 400)
        }
    }
}