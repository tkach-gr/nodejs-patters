import express from "express";
import {BaseRoute} from "../base-route.js";
import {CommandService} from "../../services/behavioral/command/index.js";

export class CommandRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new CommandService()
    }

    router() {
        const router = express.Router()

        router.get('/queue', this.getQueue.bind(this))
        router.post('/scale', this.addScale.bind(this))
        router.post('/move', this.addMove.bind(this))
        router.get('/executed', this.getExecuted.bind(this))
        router.post('/execute-all', this.executeAll.bind(this))
        router.post('/revoke-last', this.revokeLast.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/command/queue:
     *   get:
     *     summary: Retrieve commands' queue
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Commands' queue
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
    getQueue(req, res) {
        const queue = this.service.getQueue()
        this.sendOk(res, queue)
    }

    /**
     * @swagger
     * /behavioral/command/scale:
     *   post:
     *     summary: Add scale to commands' queue
     *     tags: [Behavioral]
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
     */
    addScale(req, res) {
        this.service.addScaleCommand()
        this.sendOk(res, true)
    }

    /**
     * @swagger
     * /behavioral/command/move:
     *   post:
     *     summary: Add move to commands' queue
     *     tags: [Behavioral]
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
     */
    addMove(req, res) {
        this.service.addMoveCommand()
        this.sendOk(res, true)
    }

    /**
     * @swagger
     * /behavioral/command/executed:
     *   get:
     *     summary: Retrieve executed commands
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Executed commands
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
    getExecuted(req, res) {
        const list = this.service.getExecuted()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /behavioral/command/execute-all:
     *   post:
     *     summary: Execute all commands in queue
     *     tags: [Behavioral]
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
     */
    executeAll(req, res) {
        this.service.executeAll()
        this.sendOk(res, true)
    }

    /**
     * @swagger
     * /behavioral/command/revoke-last:
     *   post:
     *     summary: Revoke last executed command
     *     tags: [Behavioral]
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
    revokeLast(req, res) {
        try {
            this.service.revokeLast()
            this.sendOk(res, true)
        } catch (err) {
            this.sendError(res, err, 422)
        }
    }
}