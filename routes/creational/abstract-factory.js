


import express from "express";
import {BaseRoute} from "../base-route.js";
import {AbstractFactoryService} from "../../services/creational/abstract-factory/index.js";

export class AbstractFactoryRoute extends BaseRoute {
    constructor() {
        super();

        this.service = new AbstractFactoryService()
    }

    router() {
        const router = express.Router()

        router.get('/get-resolution/regular/hd', this.createRegularHdMonitor.bind(this))
        router.get('/get-resolution/regular/ultra-hd', this.createRegularUltraHdMonitor.bind(this))
        router.get('/get-resolution/wide/hd', this.createWideHdMonitor.bind(this))
        router.get('/get-resolution/wide/ultra-hd', this.createWideUltraHdMonitor.bind(this))

        return router
    }

    /**
     * @swagger
     * /creational/abstract-factory/get-resolution/regular/hd:
     *   get:
     *     summary: Returns regular hd monitor's resolution
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Regular hd monitor's resolution
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    createRegularHdMonitor(req, res) {
        const monitor = this.service.createRegularHdMonitor()
        this.sendOk(res, monitor.getResolution())
    }

    /**
     * @swagger
     * /creational/abstract-factory/get-resolution/regular/ultra-hd:
     *   get:
     *     summary: Returns regular ultra hd monitor's resolution
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Regular ultra hd monitor's resolution
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    createRegularUltraHdMonitor(req, res) {
        const monitor = this.service.createRegularUltraHdMonitor()
        this.sendOk(res, monitor.getResolution())
    }

    /**
     * @swagger
     * /creational/abstract-factory/get-resolution/wide/hd:
     *   get:
     *     summary: Returns wide hd monitor's resolution
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Wide hd monitor's resolution
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    createWideHdMonitor(req, res) {
        const monitor = this.service.createWideHdMonitor()
        this.sendOk(res, monitor.getResolution())
    }

    /**
     * @swagger
     * /creational/abstract-factory/get-resolution/wide/ultra-hd:
     *   get:
     *     summary: Returns wide ultra hd monitor's resolution
     *     tags: [Creational]
     *     responses:
     *       200:
     *         description: Wide ultra hd monitor's resolution
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: string
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    createWideUltraHdMonitor(req, res) {
        const monitor = this.service.createWideUltraHdMonitor()
        this.sendOk(res, monitor.getResolution())
    }
}