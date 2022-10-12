import express from "express";
import {BaseRoute} from "../base-route.js";
import {CommandRoute} from "./command.js";
import {IteratorRoute} from "./iterator.js";
import {ObserverRoute} from "./observer.js";

export class BehavioralRoute extends BaseRoute {
    constructor() {
        super();

        this.commandRoute = new CommandRoute()
        this.iteratorRoute = new IteratorRoute()
        this.observerRoute = new ObserverRoute()
    }

    router() {
        const router = express.Router()

        router.use('/command', this.commandRoute.router())
        router.use('/iterator', this.iteratorRoute.router())
        router.use('/observer', this.observerRoute.router())

        return router
    }
}