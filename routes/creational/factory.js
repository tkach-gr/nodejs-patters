import express from "express";
import {BaseRoute} from "../base-route.js";
import {FactoryService} from "../../services/creational/factory/index.js";

export class FactoryRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new FactoryService()
    }

    router() {
        const router = express.Router()

        router.get('/estimate/car', this.getEstimateForCar.bind(this))
        router.get('/estimate/bicycle', this.getEstimateForBicycle.bind(this))

        return router
    }

    /**
     * @swagger
     * /creational/factory/estimate/car:
     *   get:
     *     summary: Estimate for car
     *     tags: [Creational]
     *     parameters:
     *       - name: distance
     *         in: query
     *         description: Distance in kilometers
     *         required: true
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Calculates estimate for car in hours
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
     *                   default: 1h
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    getEstimateForCar(req, res) {
        try {
            const distance = this.parseDistance(req.query.distance)
            const time = this.service.getEstimateForCar(distance)
            this.sendOk(res, time)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    /**
     * @swagger
     * /creational/factory/estimate/bicycle:
     *   get:
     *     summary: Estimate for bicycle
     *     tags: [Creational]
     *     parameters:
     *       - name: distance
     *         in: query
     *         description: Distance in kilometers
     *         required: true
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Calculates estimate for bicycle in hours
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
     *                   default: 1h
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    getEstimateForBicycle(req, res) {
        try {
            const distance = this.parseDistance(req.query.distance)
            const time = this.service.getEstimateForBicycle(distance)
            this.sendOk(res, time)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    parseDistance(value) {
        const distance = Number(value)
        if (isNaN(distance)) {
            throw new Error('distance must be a valid number')
        }

        if (distance <= 0) {
            throw new Error('distance must be bigger than 0')
        }

        return distance
    }
}