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

    getList(req, res) {
        const list = this.service.getList()
        this.sendOk(res, list)
    }

    getReversedList(req, res) {
        const list = this.service.getReversedList()
        this.sendOk(res, list)
    }

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