import express from "express";
import {BaseRoute} from "../base-route.js";
import {ObserverService} from "../../services/behavioral/observer/index.js";

export class ObserverRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new ObserverService()
    }

    router() {
        const router = express.Router()

        router.get('/notifiers', this.getAllNotifiers.bind(this))
        router.get('/notifiers/current', this.getCurrentNotifiers.bind(this))
        router.post('/notifiers/:name', this.addNotifier.bind(this))
        router.delete('/notifiers/:name', this.removeNotifier.bind(this))
        router.get('/notifications', this.getNotifications.bind(this))
        router.post('/notifications/:message', this.notify.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/observer/notifiers:
     *   get:
     *     summary: Retrieve available notifiers
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Available notifiers
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
    getAllNotifiers(req, res) {
        const list = this.service.getAllNotifiers()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /behavioral/observer/notifiers/current:
     *   get:
     *     summary: Retrieve current notifiers
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Current notifiers
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
    getCurrentNotifiers(req, res) {
        const list = this.service.getCurrentNotifiers()
        this.sendOk(res, list)
    }

    /**
     * @swagger
     * /behavioral/observer/notifiers/{name}:
     *   post:
     *     summary: Add notifier
     *     tags: [Behavioral]
     *     parameters:
     *       - name: name
     *         in: path
     *         description: Notifier's name
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    addNotifier(req, res) {
        const name = req.params.name

        try {
            this.service.addNotifier(name)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    /**
     * @swagger
     * /behavioral/observer/notifiers/{name}:
     *   delete:
     *     summary: Remove notifier
     *     tags: [Behavioral]
     *     parameters:
     *       - name: name
     *         in: path
     *         description: Notifier's name
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    removeNotifier(req, res) {
        const name = req.params.name

        try {
            this.service.removeNotifier(name)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    /**
     * @swagger
     * /behavioral/observer/notifications:
     *   get:
     *     summary: Retrieve sent notifications
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Sent notifications
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
    getNotifications(req, res) {
        const notifications = this.service.getNotifications()
        this.sendOk(res, notifications)
    }

    /**
     * @swagger
     * /behavioral/observer/notifications/{message}:
     *   post:
     *     summary: Send notification
     *     tags: [Behavioral]
     *     parameters:
     *       - name: message
     *         in: path
     *         description: Notification's message
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    notify(req, res) {
        const message = req.params.message
        if (!message) {
            const error = new Error('invalid message')
            this.sendError(res, error, 422)
            return
        }

        this.service.notify(message)
        this.sendOk(res, true)
    }
}