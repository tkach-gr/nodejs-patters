import {BaseRoute} from "../base-route.js";
import {BuilderService} from "../../services/creational/builder/index.js";
import express from "express";

export class BuilderRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new BuilderService()
    }

    router() {
        const router = express.Router()

        router.get('/get-models', this.getModels.bind(this))
        router.get('/build/:model', this.build.bind(this))

        return router
    }

    /**
     * @swagger
     * /creational/builder/get-models:
     *   get:
     *     summary: Returns models
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Returns all computers' models
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
    getModels(req, res) {
        const models = this.service.getModels()
        this.sendOk(res, models)
    }

    /**
     * @swagger
     * /creational/builder/build/{model}:
     *   get:
     *     summary: Builds computer
     *     tags: [Creational]
     *     parameters:
     *       - name: model
     *         in: path
     *         description: Available computer's model
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Builds computer via available model
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
     *                     processor:
     *                       type: string
     *                     ram:
     *                       type: string
     *                     dvdDrive:
     *                       type: string
     *                     bluetooth:
     *                       type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    build(req, res) {
        const model = req.params.model

        try {
            const result = this.service.build(model)
            this.sendOk(res, result)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }
}