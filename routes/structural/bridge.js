import express from "express";
import {BaseRoute} from "../base-route.js";
import {BridgeService} from "../../services/structural/bridge/index.js";

export class BridgeRoute extends BaseRoute {
    constructor() {
        super();
        
        this.service = new BridgeService()
    }
    
    router() {
        const router = express.Router()
        
        router.get('/:transport', this.getState.bind(this))
        router.post('/:transport/increase-speed', this.increaseSpeed.bind(this))
        router.post('/:transport/decrease-speed', this.decreaseSpeed.bind(this))
        router.post('/:transport/turn-on-lights', this.turnOnLights.bind(this))
        router.post('/:transport/turn-off-lights', this.turnOffLights.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/bridge/{transport}:
     *   get:
     *     summary: Returns transport's state
     *     tags: [Structural]
     *     parameters:
     *       - name: transport
     *         in: path
     *         description: Transport's name
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Transport's state
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: object
     *                   properties:
     *                     speed:
     *                       type: number
     *                       description: Transport's speed in kilometers
     *                     isLightsTurnedOn:
     *                       type: boolean
     *                       description: Lights' state
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     */
    getState(req, res) {
        const { transport } = req.params
        
        try {
            const result = this.service.getState(transport)
            this.sendOk(res, result)
        } catch (err) {
            this.sendError(res, err, 404)
        }
    }

    /**
     * @swagger
     * /structural/bridge/{transport}/increase-speed:
     *   post:
     *     summary: Increase transport's speed
     *     tags: [Structural]
     *     parameters:
     *       - name: transport
     *         in: path
     *         description: Transport's name
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
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     */
    increaseSpeed(req, res) {
        const { transport } = req.params

        try {
            const result = this.service.increaseSpeed(transport)
            this.sendOk(res, result)
        } catch (err) {
            this.sendError(res, err, 404)
        }
    }

    /**
     * @swagger
     * /structural/bridge/{transport}/decrease-speed:
     *   post:
     *     summary: Decrease transport's speed
     *     tags: [Structural]
     *     parameters:
     *       - name: transport
     *         in: path
     *         description: Transport's name
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
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     */
    decreaseSpeed(req, res) {
        const { transport } = req.params

        try {
            const result = this.service.decreaseSpeed(transport)
            this.sendOk(res, result)
        } catch (err) {
            this.sendError(res, err, 404)
        }
    }

    /**
     * @swagger
     * /structural/bridge/{transport}/turn-on-lights:
     *   post:
     *     summary: Turn transport's lights on
     *     tags: [Structural]
     *     parameters:
     *       - name: transport
     *         in: path
     *         description: Transport's name
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
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     */
    turnOnLights(req, res) {
        const { transport } = req.params

        try {
            const result = this.service.turnOnLights(transport)
            this.sendOk(res, result)
        } catch (err) {
            this.sendError(res, err, 404)
        }
    }

    /**
     * @swagger
     * /structural/bridge/{transport}/turn-off-lights:
     *   post:
     *     summary: Turn transport's lights off
     *     tags: [Structural]
     *     parameters:
     *       - name: transport
     *         in: path
     *         description: Transport's name
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
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     */
    turnOffLights(req, res) {
        const { transport } = req.params

        try {
            const result = this.service.turnOffLights(transport)
            this.sendOk(res, result)
        } catch (err) {
            this.sendError(res, err, 404)
        }
    }
}