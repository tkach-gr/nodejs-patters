import express from "express";
import { BaseRoute } from "./base-route.js";
import { CreationalRoute } from "./creational/index.js";
import { StructuralRoute } from "./structural/index.js";

class ApplicationRoute extends BaseRoute {
    constructor() {
        super();

        this.creationalRoute = new CreationalRoute()
        this.structuralRoute = new StructuralRoute()
    }

    router() {
        const router = express.Router()

        router.use('/creational', this.creationalRoute.router())
        router.use('/structural', this.structuralRoute.router())

        return router
    }
}

export function useRoutes() {
    const route = new ApplicationRoute()
    return route.router()
}