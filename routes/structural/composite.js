import express from "express";
import {BaseRoute} from "../base-route.js";
import {CompositeService} from "../../services/structural/composite/index.js";

export class CompositeRoute extends BaseRoute{
    constructor() {
        super()

        this.service = new CompositeService()
    }

    router() {
        const router = express.Router()

        router.get('/tree', this.getTree.bind(this))
        router.post('/file', this.addFile.bind(this))
        router.post('/folder', this.addFolder.bind(this))
        router.delete('/delete', this.deleteFolder.bind(this))

        return router
    }

    /**
     * @swagger
     * /structural/composite/tree:
     *   get:
     *     summary: Retrieves whole filesystem
     *     tags: [Structural]
     *     responses:
     *       200:
     *         description: Whole filesystem
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
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    getTree(req, res) {
        const tree = this.service.getTree()
        this.sendOk(res, tree)
    }

    /**
     * @swagger
     * /structural/composite/file:
     *   post:
     *     summary: Creates file
     *     tags: [Structural]
     *     requestBody:
     *       description: File's info
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 description: File's name
     *                 type: string
     *                 required: true
     *               extension:
     *                 description: File's extension
     *                 type: string
     *                 required: true
     *               path:
     *                 description: Path to file
     *                 type: string
     *                 required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: boolean
     *                   default: true
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    addFile(req, res) {
        const name = req.body.name
        if (!name) {
            const error = new Error('invalid name')
            this.sendError(res, error, 422)
            return
        }

        const extension = req.body.extension
        if (!extension) {
            const error = new Error('invalid extension')
            this.sendError(res, error, 422)
            return
        }

        const path = req.body.path
        if (!path) {
            const error = new Error('invalid path')
            this.sendError(res, error, 422)
            return
        }

        try {
            this.service.addFile(name, extension, path)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    /**
     * @swagger
     * /structural/composite/folder:
     *   post:
     *     summary: Creates folder
     *     tags: [Structural]
     *     requestBody:
     *       description: Folder's info
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 description: Folder's name
     *                 type: string
     *                 required: true
     *               path:
     *                 description: Path to folder
     *                 type: string
     *                 required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: boolean
     *                   default: true
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    addFolder(req, res) {
        const name = req.body.name
        if (!name) {
            const error = new Error('invalid name')
            this.sendError(res, error, 422)
            return
        }

        const path = req.body.path
        if (!path) {
            const error = new Error('invalid path')
            this.sendError(res, error, 422)
            return
        }

        try {
            this.service.addFolder(name, path)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }

    /**
     * @swagger
     * /structural/composite/delete:
     *   delete:
     *     summary: Deletes entity
     *     tags: [Structural]
     *     requestBody:
     *       description: Entity's info
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               path:
     *                 description: Path to entity
     *                 type: string
     *                 required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   default: ok
     *                 data:
     *                   type: boolean
     *                   default: true
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    deleteFolder(req, res) {
        const path = req.body.path
        if (!path) {
            const error = new Error('invalid path')
            this.sendError(res, error, 422)
            return
        }

        try {
            this.service.deleteEntity(path)
            this.sendOk(res, true)
        } catch (e) {
            this.sendError(res, e, 422)
        }
    }
}