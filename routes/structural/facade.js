import express from "express";
import {BaseRoute} from "../base-route.js";
import {FacadeService} from "../../services/structural/facade/index.js";

export class FacadeRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new FacadeService()
    }

    router() {
        const router = express.Router()

        router.get('/get', this.getAll.bind(this))
        router.get('/get/:id', this.getById.bind(this))
        router.post('/save/:item', this.save.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/facade/get:
     *   get:
     *     summary: Returns all items
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: List of all items
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
    getAll(req, res) {
        const list = this.service.getAll()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /structural/facade/get/{id}:
     *   get:
     *     summary: Returns item by id
     *     tags: [Structural]
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Item's id
     *         required: true
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Item
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
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     *
     */
    getById(req, res) {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            const err = new Error('invalid id')
            this.sendError(res, err, 422)
        }

        try {
            const item = this.service.getById(id)
            this.sendOk(res, item)
        } catch (e) {
            this.sendError(res, e, 404)
        }
    }

    /**
     * @swagger
     * /structural/facade/save/{item}:
     *   post:
     *     summary: Saves item and returns id
     *     tags: [Structural]
     *     parameters:
     *       - name: item
     *         in: path
     *         description: Item
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Item's id
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: number
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     *
     */
    save(req, res) {
        const item = req.params.item

        try {
            const id = this.service.save(item)
            this.sendOk(res, id)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }
}