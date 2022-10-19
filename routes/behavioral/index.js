import express from "express";
import {BaseRoute} from "../base-route.js";
import {ChainRoute} from "./chain.js";
import {CommandRoute} from "./command.js";
import {IteratorRoute} from "./iterator.js";
import {MediatorRoute} from "./mediator.js";
import {MementoRoute} from "./memento.js";
import {ObserverRoute} from "./observer.js";
import {TemplateRoute} from "./template.js";

export class BehavioralRoute extends BaseRoute {
    constructor() {
        super();

        this.chainRoute = new ChainRoute()
        this.commandRoute = new CommandRoute()
        this.iteratorRoute = new IteratorRoute()
        this.mediatorRoute = new MediatorRoute()
        this.mementoRoute = new MementoRoute()
        this.observerRoute = new ObserverRoute()
        this.templateRoute = new TemplateRoute()
    }

    router() {
        const router = express.Router()

        router.use('/chain', this.chainRoute.router())
        router.use('/command', this.commandRoute.router())
        router.use('/iterator', this.iteratorRoute.router())
        router.use('/mediator', this.mediatorRoute.router())
        router.use('/memento', this.mementoRoute.router())
        router.use('/observer', this.observerRoute.router())
        router.use('/template', this.templateRoute.router())

        return router
    }
}