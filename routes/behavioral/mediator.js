import express from "express";
import {BaseRoute} from "../base-route.js";
import {MediatorService} from "../../services/behavioral/mediator/index.js";

export class MediatorRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new MediatorService()
    }

    router() {
        const router = express.Router()

        router.get('/form', this.getState.bind(this))
        router.put('/form', this.updateState.bind(this))
        router.post('/form/reset', this.resetState.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/mediator/form:
     *   get:
     *     summary: Get state
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Form
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
     *                     login:
     *                       type: string
     *                     pass:
     *                       type: string
     *                     rememberMe:
     *                       type: boolean
     *                     isResetDisabled:
     *                       type: boolean
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getState(req, res) {
        const state = this.service.getState()
        this.sendOk(res, state)
    }

    /**
     * @swagger
     * /behavioral/mediator/form:
     *   put:
     *     summary: Edit form
     *     tags: [Behavioral]
     *     requestBody:
     *         content:
     *           multipart/form-data:
     *             schema:
     *               type: object
     *               required:
     *                 - rememberMe
     *               properties:
     *                 login:
     *                   type: string
     *                   description: User's login
     *                 pass:
     *                   type: string
     *                   description: User's pass
     *                 rememberMe:
     *                   type: boolean
     *                   description: Remember user
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
    updateState(req, res) {
        const login = req.body.login || ''
        const pass = req.body.pass || ''

        let rememberMe = null
        try {
            rememberMe = this.parseBoolean(req.body.rememberMe)
        } catch {
            const err = new Error('invalid rememberMe')
            this.sendError(res, err, 422)
            return
        }

        this.service.updateState(login, pass, rememberMe)
        this.sendOk(res, true)
    }

    parseBoolean(raw) {
        if (typeof raw === 'boolean') {
            return raw
        } else if (raw === 'true' || raw === 'false') {
            return raw === 'true'
        }

        throw new Error('invalid boolean')
    }

    /**
     * @swagger
     * /behavioral/mediator/form/reset:
     *   post:
     *     summary: Reset form
     *     tags: [Behavioral]
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
     *       400:
     *         $ref: '#/components/responses/400BadRequestError'
     */
    resetState(req, res) {
        try {
            this.service.resetState()
            this.sendOk(res, true)
        } catch (err) {
            this.sendError(res, err, 400)
        }

    }
}