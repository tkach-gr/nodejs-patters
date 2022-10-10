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

    getAllNotifiers(req, res) {
        const list = this.service.getAllNotifiers()
        this.sendOk(res, list)
    }

    getCurrentNotifiers(req, res) {
        const list = this.service.getCurrentNotifiers()
        this.sendOk(res, list)
    }

    addNotifier(req, res) {
        const name = req.params.name

        try {
            this.service.addNotifier(name)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    removeNotifier(req, res) {
        const name = req.params.name

        try {
            this.service.removeNotifier(name)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    getNotifications(req, res) {
        const notifications = this.service.getNotifications()
        this.sendOk(res, notifications)
    }

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