import express from "express";
import {BaseRoute} from "../base-route.js";
import {StateService} from "../../services/behavioral/state/index.js";

export class StateRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new StateService()
    }

    router() {
        const router = express.Router()

        router.get('/traffic-light/state', this.getStateInfo.bind(this))
        router.post('/traffic-light/action', this.makeAction.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/state/traffic-light/state:
     *   get:
     *     summary: Retrieve current state
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Current state
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
     *                   default: current state
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getStateInfo(req, res) {
        const data = this.service.getStateInfo()
        this.sendOk(res, data)
    }

    /**
     * @swagger
     * /behavioral/state/traffic-light/action:
     *   post:
     *     summary: Make action
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
    makeAction(req, res) {
        this.service.makeAction()
        this.sendOk(res, true)
    }
}