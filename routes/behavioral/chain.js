import {BaseRoute} from "../base-route.js";
import {ChainService} from "../../services/behavioral/chain/index.js";
import express from "express";

export class ChainRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new ChainService()
    }

    router() {
        const router = express.Router()

        router.post('/login', this.login.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/chain/login:
     *   post:
     *     summary: Login user
     *     tags: [Behavioral]
     *     parameters:
     *       - in: formData
     *         name: login
     *         description: User's login
     *         required: true
     *         schema:
     *           type: string
     *       - in: formData
     *         name: pass
     *         description: User's pass
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
    login(req, res) {
        const credentials = {
            login: req.body.login,
            pass: req.body.pass,
        }

        try {
            const data = this.service.login(credentials)
            this.sendOk(res, data)
        } catch (err) {
            this.sendError(res, err, 422)
        }
    }
}