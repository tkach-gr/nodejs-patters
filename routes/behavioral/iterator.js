import express from "express";
import {BaseRoute} from "../base-route.js";
import {IteratorService} from "../../services/behavioral/iterator/index.js";

export class IteratorRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new IteratorService()
    }

    router() {
        const router = express.Router()

        router.get('/list', this.getList.bind(this))
        router.get('/reversed-list', this.getReversedList.bind(this))
        router.post('/add', this.add.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/iterator/list:
     *   get:
     *     summary: Retrieve list
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: List
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
    getList(req, res) {
        const list = this.service.getList()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /behavioral/iterator/reversed-list:
     *   get:
     *     summary: Retrieve list
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Reversed list
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
    getReversedList(req, res) {
        const list = this.service.getReversedList()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /behavioral/iterator/add:
     *   post:
     *     summary: Add new value to list
     *     tags: [Behavioral]
     *     requestBody:
     *       description: Value's info
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               value:
     *                 description: Value
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
    add(req, res) {
        const value = req.body.value?.toString()

        if (!value) {
            const error = new Error('invalid value')
            this.sendError(res, error, 422)
            return
        }

        this.service.add(value)
        
        this.sendOk(res, true)
    }
}