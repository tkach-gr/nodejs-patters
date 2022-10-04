import express from "express";
import {BaseRoute} from "../base-route.js";
import {ProxyService} from "../../services/structural/proxy/index.js";

export class ProxyRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new ProxyService()
    }

    router() {
        const router = express.Router()

        router.get('/items', this.getAll.bind(this))
        router.get('/items/:id', this.get.bind(this))
        router.post('/items/:item', this.add.bind(this))
        router.delete('/items/:id', this.delete.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/proxy/items:
     *   get:
     *     summary: Returns all items
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: All items
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
     *                       id:
     *                         type: number
     *                       value:
     *                         type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getAll(req, res) {
        const items = this.service.getAll()
        this.sendOk(res, items)
    }

    /**
     * @swagger
     * /structural/proxy/items/{id}:
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
     *         description: Item by id
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
     */
    get(req, res) {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            const error = new Error('invalid id')
            this.sendError(res, error, 422)
            return
        }

        try {
            const item = this.service.get(id)
            this.sendOk(res, item)
        } catch (e) {
            this.sendError(res, e, 404)
        }
    }

    /**
     * @swagger
     * /structural/proxy/items/{item}:
     *   post:
     *     summary: Creates item
     *     tags: [Structural]
     *     parameters:
     *       - name: item
     *         in: path
     *         description: Item
     *         required: true
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Created item's id
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    add(req, res) {
        const item = req.params.item
        if (!item) {
            const error = new Error('invalid item')
            this.sendError(res, error, 422)
            return
        }

        const id = this.service.add(item)
        this.sendOk(res, id)
    }

    /**
     * @swagger
     * /structural/proxy/items/{id}:
     *   delete:
     *     summary: Deletes item by id
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    delete(req, res) {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            const error = new Error('invalid id')
            this.sendError(res, error, 422)
            return
        }

        try {
            this.service.delete(id)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 404)
        }
    }
}