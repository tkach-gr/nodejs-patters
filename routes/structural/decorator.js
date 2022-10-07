import express from "express";
import {DecoratorService} from "../../services/structural/decorator/index.js";
import {BaseRoute} from "../base-route.js";

export class DecoratorRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new DecoratorService()
    }

    router() {
        const router = express.Router()

        router.get('/info/first', this.getFirstInfoBlock.bind(this))
        router.get('/info/second', this.getSecondInfoBlock.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/decorator/info/first:
     *   get:
     *     summary: Returns first info block
     *     tags: [Structural]
     *     parameters:
     *       - name: format
     *         in: query
     *         description: Add formatter
     *         required: false
     *         schema:
     *           type: boolean
     *       - name: log
     *         in: query
     *         description: Add logger
     *         required: false
     *         schema:
     *           type: boolean
     *     responses:
     *       200:
     *         description: First info block
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
     */
    getFirstInfoBlock(req, res) {
        const format = req.query.format?.toLowerCase() === 'true'
        const log = req.query.log?.toLowerCase() === 'true'

        const info = this.service.getFirstInfoBlock(format, log)
        this.sendOk(res, info)
    }

    /**
     * @swagger
     * /structural/decorator/info/second:
     *   get:
     *     summary: Returns second info block
     *     tags: [Structural]
     *     parameters:
     *       - name: format
     *         in: query
     *         description: Add formatter
     *         required: false
     *         schema:
     *           type: boolean
     *       - name: log
     *         in: query
     *         description: Add logger
     *         required: false
     *         schema:
     *           type: boolean
     *     responses:
     *       200:
     *         description: Second info block
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
     */
    getSecondInfoBlock(req, res) {
        const format = req.query.format?.toLowerCase() === 'true'
        const log = req.query.log?.toLowerCase() === 'true'

        const info = this.service.getSecondInfoBlock(format, log)
        this.sendOk(res, info)
    }
}