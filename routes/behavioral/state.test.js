import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('state', function() {
    let app

    beforeEach(() => app = useApp().app)

    it('check initial state', async function() {
        const resp = await request(app).get('/behavioral/state/traffic-light/state')
        expect(resp.status).toEqual(200)
        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.body?.data).toEqual('can\'t walk across')
    })

    it('check states', async function() {
        const data = [
            {
                state: 'just wait few seconds'
            },
            {
                state: 'you can go'
            },
            {
                state: 'can\'t walk across'
            },
        ]

        for (const item of data) {
            const { state } = item

            const actionResp = await request(app).post('/behavioral/state/traffic-light/action')
            expect(actionResp.status).toEqual(200)
            expect(actionResp.headers["content-type"]).toMatch(/json/)
            expect(actionResp.body?.data).toEqual(true)

            const stateResp = await request(app).get('/behavioral/state/traffic-light/state')
            expect(stateResp.status).toEqual(200)
            expect(stateResp.headers["content-type"]).toMatch(/json/)
            expect(stateResp.body?.data).toEqual(state)
        }
    })
})