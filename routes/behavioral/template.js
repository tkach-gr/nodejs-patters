import express from "express";
import {BaseRoute} from "../base-route.js";
import {TemplateService} from "../../services/behavioral/template/index.js";

export class TemplateRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new TemplateService()
    }

    router() {
        const router = express.Router()

        router.get('/parse/:first?/:second?', this.parseGet.bind(this))
        router.post('/parse/:first?/:second?', this.parsePost.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/template/parse/{first}/{second}:
     *   get:
     *     summary: Retrieve parsed data from GET request
     *     tags: [Behavioral]
     *     parameters:
     *       - name: first
     *         in: path
     *         description: First parameter
     *         required: false
     *         schema:
     *           type: string
     *       - name: second
     *         in: path
     *         description: Second parameter
     *         required: false
     *         schema:
     *           type: string
     *       - name: id
     *         in: query
     *         description: ID
     *         required: false
     *         schema:
     *           type: number
     *       - name: name
     *         in: query
     *         description: Name
     *         required: false
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: Commands' queue
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
     *                     params:
     *                       type: array
     *                       items:
     *                         type: string
     *                     queue:
     *                       type: array
     *                       items:
     *                         type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    parseGet(req, res) {
        const data = this.service.parseGet(req)
        this.sendOk(res, data)
    }

    /**
     * @swagger
     * /behavioral/template/parse/{first}/{second}:
     *   post:
     *     summary: Retrieve parsed data from POST request
     *     tags: [Behavioral]
     *     parameters:
     *       - name: first
     *         in: path
     *         description: First parameter
     *         required: false
     *         schema:
     *           type: string
     *       - name: second
     *         in: path
     *         description: Second parameter
     *         required: false
     *         schema:
     *           type: string
     *     requestBody:
     *         content:
     *           multipart/form-data:
     *             schema:
     *               type: object
     *               properties:
     *                 login:
     *                   type: string
     *                   required: true
     *                 pass:
     *                   type: string
     *                   required: true
     *     responses:
     *       200:
     *         description: Commands' queue
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
     *                     params:
     *                       type: array
     *                       items:
     *                         type: string
     *                     body:
     *                       type: array
     *                       items:
     *                         type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    parsePost(req, res) {
        const data = this.service.parsePost(req)
        this.sendOk(res, data)
    }
}