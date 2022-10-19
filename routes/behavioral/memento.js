import {BaseRoute} from "../base-route.js";
import {MementoService} from "../../services/behavioral/memento/index.js";
import express from "express";

export class MementoRoute extends BaseRoute {
    constructor() {
        super()

        this.service = new MementoService()
    }

    router() {
        const router = express.Router()

        router.get('/words', this.getWords.bind(this))
        router.post('/words/undo', this.undo.bind(this))
        router.post('/words/:word', this.addWord.bind(this))

        return router
    }

    /**
     * @swagger
     * /behavioral/memento/words:
     *   get:
     *     summary: Retrieve words
     *     tags: [Behavioral]
     *     responses:
     *       200:
     *         description: Words
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
     *                   default: "hello world"
     *                 error:
     *                   type: string
     *                   nullable: true
     *                   default: null
     */
    getWords(req, res) {
        const words = this.service.getState()
        const formattedWords = words.join(' ')
        this.sendOk(res, formattedWords)
    }

    /**
     * @swagger
     * /behavioral/memento/words/{word}:
     *   post:
     *     summary: Add word
     *     tags: [Behavioral]
     *     parameters:
     *       - name: word
     *         in: path
     *         description: New word
     *         required: true
     *         schema:
     *           type: string
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
     *       400:
     *         $ref: '#/components/responses/400BadRequestError'
     *       422:
     *         $ref: '#/components/responses/422ValidationError'
     */
    addWord(req, res) {
        const word = req.params.word
        if (!word) {
            const err = new Error('invalid word')
            this.sendError(res, err, 422)
            return
        }

        try {
            this.service.addWord(word)
            this.sendOk(res, true)
        } catch (err) {
            this.sendError(res, err, 400)
        }
    }

    /**
     * @swagger
     * /behavioral/memento/words/undo:
     *   post:
     *     summary: Undo last action
     *     tags: [Behavioral]
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
     *       400:
     *         $ref: '#/components/responses/400BadRequestError'
     */
    undo(req, res) {
        try {
            this.service.undo()
            this.sendOk(res, true)
        } catch (err) {
            this.sendError(res, err, 400)
        }
    }
}