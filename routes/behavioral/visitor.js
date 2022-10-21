import express from "express";
import {BaseRoute} from "../base-route.js";
import {VisitorService} from "../../services/behavioral/visitor/index.js";

export class VisitorRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new VisitorService()
    }

    router() {
        const router = express.Router()

        router.get('/entities/export-text', this.textExport.bind(this))
        router.get('/entities/export-json', this.jsonExport.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/visitor/entities/export-text:
     *   get:
     *     summary: Export entities in text format
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Entities in text format
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
    textExport(req, res) {
        const data = this.service.textExport()
        this.sendOk(res, data)
    }

    /**
     * @swagger
     *
     * components:
     *   schemas:
     *     Player:
     *       type: object
     *       properties:
     *         health:
     *           type: string
     *         weapon:
     *           type: string
     *         armor:
     *           type: string
     *     Enemy:
     *       type: object
     *       properties:
     *         health:
     *           type: string
     *         position:
     *           type: string
     *
     * /behavioral/visitor/entities/export-json:
     *   get:
     *     summary: Export entities in json format
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Entities in json format
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
     *                     oneOf:
     *                       - $ref: '#/components/schemas/Player'
     *                       - $ref: '#/components/schemas/Enemy'
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    jsonExport(req, res) {
        const data = this.service.jsonExport()
        this.sendOk(res, data)
    }
}