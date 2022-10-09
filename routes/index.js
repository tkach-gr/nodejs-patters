import express from "express";
import { BaseRoute } from "./base-route.js";
import { CreationalRoute } from "./creational/index.js";
import { StructuralRoute } from "./structural/index.js";
import { BehavioralRoute } from "./behavioral/index.js";

class ApplicationRoute extends BaseRoute {
    constructor() {
        super();

        this.creationalRoute = new CreationalRoute()
        this.structuralRoute = new StructuralRoute()
        this.behavioralRoute = new BehavioralRoute()
    }

    router() {
        const router = express.Router()

        router.use('/creational', this.creationalRoute.router())
        router.use('/structural', this.structuralRoute.router())
        router.use('/behavioral', this.behavioralRoute.router())

        return router
    }
}

export function useRoutes() {
    const route = new ApplicationRoute()
    return route.router()
}