import express from "express";
import {BaseRoute} from "./base-route.js";
import {CreationalRoute} from "./creational/index.js";

class ApplicationRoute extends BaseRoute {
    constructor() {
        super();

        this.creationalRoute = new CreationalRoute()
    }

    router() {
        const router = express.Router()

        router.use('/creational', this.creationalRoute.router())

        return router
    }
}

export function useRoutes() {
    const route = new ApplicationRoute()
    return route.router()
}