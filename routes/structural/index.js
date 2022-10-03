import express from "express";
import { BaseRoute } from "../base-route.js";
import { AdapterRoute } from "./adapter.js";
import { FacadeRoute } from "./facade.js";

export class StructuralRoute extends BaseRoute {
    constructor() {
        super();

        this.adapterRoute = new AdapterRoute()
        this.facadeRoute = new FacadeRoute()
    }

    router() {
        const router = express.Router()

        router.use('/adapter', this.adapterRoute.router())
        router.use('/facade', this.facadeRoute.router())

        return router
    }
}