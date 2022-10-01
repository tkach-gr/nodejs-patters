import express from "express";
import { BaseRoute } from "../base-route.js";
import {PrototypeService} from "../../services/creational/prototype/index.js";

export class PrototypeRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new PrototypeService()
    }

    router() {
        const router = express.Router()

        router.get('/get-all-names', this.getAllNames.bind(this))
        router.get('/clone/:originName', this.getClone.bind(this))

        return router
    }

    /**
     * @swagger
     * /creational/prototype/get-all-names:
     *   get:
     *     summary: Returns names
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Returns all robots' names
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
    getAllNames(req, res) {
        const names = this.service.getRobotsNames()
        this.sendOk(res, names)
    }

    /**
     * @swagger
     * /creational/prototype/clone/{originName}:
     *   get:
     *     summary: Clones robot
     *     tags: [Creational]
     *     parameters:
     *       - name: originName
     *         in: path
     *         description: Existing robot's name
     *         required: true
     *         schema:
     *           type: string
     *       - name: newName
     *         in: query
     *         description: New name for robot
     *         schema:
     *           type: string
     *       - name: newVersion
     *         in: query
     *         description: New version for robot
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Returns new Robot by cloning existing one
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
     *                     name:
     *                       type: string
     *                     version:
     *                       type: number
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       404:
     *         $ref: '#/components/responses/404NotFound'
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    getClone(req, res) {
        const originName = req.params.originName
        const newName = req.query.newName

        const newVersionQuery = req.query.newVersion
        let newVersion = newVersionQuery !== undefined && newVersionQuery !== null
            ? Number(newVersionQuery)
            : null

        if (isNaN(newVersion)) {
            const err = new Error('newVersion must be a number')
            this.sendError(res, err, 422)
            return
        }

        try {
            this.sendOk(res, this.service.produceByClone(originName, newName, newVersion))
        } catch (e) {
            this.sendError(res, e, 404)
        }
    }
}