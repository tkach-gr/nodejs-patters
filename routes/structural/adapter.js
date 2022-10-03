import {BaseRoute} from "../base-route.js";
import {AdapterService} from "../../services/structural/adapter/index.js";
import express from "express";

export class AdapterRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new AdapterService()
    }

    router() {
        const router = express.Router()

        router.get('/charge-by-usb', this.chargeByUsb.bind(this))
        router.get('/charge-by-lightning', this.chargeByLightning.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/adapter/charge-by-usb:
     *   get:
     *     summary: Returns usb charging
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: Usb charging
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
    chargeByUsb(req, res) {
        const data = this.service.chargeByUsb()
        this.sendOk(res, data)
    }

    /**
     * @swagger
     * /structural/adapter/charge-by-lightning:
     *   get:
     *     summary: Returns lightning charging
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: Lightning charging
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
    chargeByLightning(req, res) {
        const data = this.service.chargeByLightning()
        this.sendOk(res, data)
    }
}