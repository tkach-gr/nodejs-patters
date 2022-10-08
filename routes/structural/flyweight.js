import {BaseRoute} from "../base-route.js";
import {FlyweightService} from "../../services/structural/flyweight/index.js";
import express from "express";

export class FlyweightRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new FlyweightService()
    }

    router() {
        const router = express.Router()

        router.get('/accounts', this.getAccounts.bind(this))
        router.post('/create', this.create.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/flyweight/accounts:
     *   get:
     *     summary: Returns serialized accounts
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: Serialized accounts
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
     *                     type: object
     *                     properties:
     *                       nickname:
     *                         type: string
     *                       avatar:
     *                         type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getAccounts(req, res) {
        const accounts = this.service.getSerializedAccounts()
        this.sendOk(res, accounts)
    }

    /**
     * @swagger
     * /structural/flyweight/create:
     *   post:
     *     summary: Creates account
     *     tags: [Structural]
     *     requestBody:
     *       description: Account's info
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nickname:
     *                 description: Account's nickname
     *                 type: string
     *                 required: true
     *               avatarName:
     *                 description: Name for account's avatar
     *                 type: string
     *                 required: true
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
    create(req, res) {
        const nickname = req.body.nickname
        if (!nickname) {
            const error = new Error('invalid nickname')
            this.sendError(res, error, 422)
            return
        }

        const avatarName = req.body.avatarName
        if (!avatarName) {
            const error = new Error('invalid avatarName')
            this.sendError(res, error, 422)
            return
        }

        this.service.create(nickname, avatarName)
        this.sendOk(res, true, 200)
    }
}