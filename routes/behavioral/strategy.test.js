import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('strategy', function() {
    let app

    beforeEach(() => app = useApp().app)

    it('retrieve available strategies', async function() {
        const resp = await request(app).get('/behavioral/strategy/bot/strategies')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual(['telegram', 'viber', 'whatsapp'])
    })

    it('set strategy', async function() {
        const data = [
            {
                strategy: 'telegram',
                expectedStatus: 200,
            },
            {
                strategy: 'viber',
                expectedStatus: 200,
            },
            {
                strategy: 'whatsapp',
                expectedStatus: 200,
            },
            {
                strategy: 'test',
                expectedStatus: 422,
            },
        ]

        for (const item of data) {
            const { strategy, expectedStatus } = item

            const resp = await request(app).post(`/behavioral/strategy/bot/set-strategy/${strategy}`)

            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(expectedStatus)
        }
    })

    it('send message without strategy', async function() {

        const resp = await request(app).post(`/behavioral/strategy/bot/send/message`)

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(400)
    })

    it('send message', async function() {
        const data = [
            {
                strategy: 'telegram',
                message: 'hello',
                expectedStatus: 200,
                expectedResponse: 'Message in telegram: hello'
            },
            {
                strategy: 'viber',
                message: '123',
                expectedStatus: 200,
                expectedResponse: 'Message in viber: 123'
            },
            {
                strategy: 'whatsapp',
                message: '|||||',
                expectedStatus: 200,
                expectedResponse: 'Message in whatsapp: |||||'
            },
        ]

        for (const item of data) {
            const {
                strategy,
                message,
                expectedStatus,
                expectedResponse
            } = item

            await request(app).post(`/behavioral/strategy/bot/set-strategy/${strategy}`)

            const resp = await request(app).post(`/behavioral/strategy/bot/send/${message}`)
            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(expectedStatus)
            expect(resp.body?.data).toEqual(expectedResponse)
        }
    })
})