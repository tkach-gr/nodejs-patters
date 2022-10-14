import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('observer', function() {
    let app

    beforeEach(() => app = useApp().app)

    it('empty initialized queue', async function() {
        const resp = await request(app).get('/behavioral/command/queue')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('commands insertion into query', async function() {
        const data = [
            {
                command: 'scale',
                expected: ['scale']
            },
            {
                command: 'move',
                expected: ['scale', 'move']
            },
            {
                command: 'scale',
                expected: ['scale', 'move', 'scale']
            },
            {
                command: 'scale',
                expected: ['scale', 'move', 'scale', 'scale']
            },
            {
                command: 'move',
                expected: ['scale', 'move', 'scale', 'scale', 'move']
            },
        ]

        for (const { command, expected } of data) {
                const createResp = await request(app).post(`/behavioral/command/${command}`)
                expect(createResp.headers["content-type"]).toMatch(/json/)
                expect(createResp.status).toEqual(200)
                expect(createResp.body?.data).toEqual(true)

                const queryResp = await request(app).get('/behavioral/command/queue')
                expect(queryResp.headers["content-type"]).toMatch(/json/)
                expect(queryResp.status).toEqual(200)
                expect(queryResp.body?.data).toEqual(expected)
        }
    })

    it('empty initialized executed commands', async function() {
        const resp = await request(app).get('/behavioral/command/executed')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('check execute', async function() {
        const expected = ['scale', 'move', 'scale', 'scale', 'move']
        for(const command of expected) {
            await request(app).post(`/behavioral/command/${command}`)
        }

        const executeAllResp = await request(app).post('/behavioral/command/execute-all')
        expect(executeAllResp.headers["content-type"]).toMatch(/json/)
        expect(executeAllResp.status).toEqual(200)
        expect(executeAllResp.body?.data).toEqual(true)

        const queueResp = await request(app).get('/behavioral/command/queue')
        expect(queueResp.headers["content-type"]).toMatch(/json/)
        expect(queueResp.status).toEqual(200)
        expect(queueResp.body?.data).toEqual([])

        const executedResp = await request(app).get('/behavioral/command/executed')
        expect(executedResp.headers["content-type"]).toMatch(/json/)
        expect(executedResp.status).toEqual(200)
        expect(executedResp.body?.data).toEqual(expected)
    })

    it('revoke-last with empty executed', async function() {
        const resp = await request(app).post('/behavioral/command/revoke-last')
        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(422)
    })

    it('check revoke', async function() {
        const commands = ['move', 'move', 'scale', 'scale', 'move']
        for(const command of commands) {
            await request(app).post(`/behavioral/command/${command}`)
        }

        await request(app).post('/behavioral/command/execute-all')

        const executedInitResp = await request(app).get('/behavioral/command/executed')
        expect(executedInitResp.headers["content-type"]).toMatch(/json/)
        expect(executedInitResp.status).toEqual(200)
        expect(executedInitResp.body?.data).toEqual(commands)

        const data = [
            {
                expected: ['move', 'move', 'scale', 'scale']
            },
            {
                expected: ['move', 'move', 'scale']
            },
            {
                expected: ['move', 'move']
            },
            {
                expected: ['move']
            },
            {
                expected: []
            },
        ]

        for (const { expected } of data) {
            const revokeResp = await request(app).post('/behavioral/command/revoke-last')
            expect(revokeResp.headers["content-type"]).toMatch(/json/)
            expect(revokeResp.status).toEqual(200)
            expect(revokeResp.body?.data).toEqual(true)

            const executedResp = await request(app).get('/behavioral/command/executed')
            expect(executedResp.headers["content-type"]).toMatch(/json/)
            expect(executedResp.status).toEqual(200)
            expect(executedResp.body?.data).toEqual(expected)
        }
    })
})