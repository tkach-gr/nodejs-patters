import express from "express";
import { BaseRoute } from "../base-route.js";
import { AdapterRoute } from "./adapter.js";

export class StructuralRoute extends BaseRoute {
    constructor() {
        super();

        this.adapterRoute = new AdapterRoute()
    }

    router() {
        const router = express.Router()

        router.use('/adapter', this.adapterRoute.router())

        return router
    }
}