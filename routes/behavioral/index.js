import express from "express";
import {BaseRoute} from "../base-route.js";
import {IteratorRoute} from "./iterator.js";

export class BehavioralRoute extends BaseRoute {
    constructor() {
        super();

        this.iteratorRoute = new IteratorRoute()
    }

    router() {
        const router = express.Router()

        router.use('/iterator', this.iteratorRoute.router())

        return router
    }
}