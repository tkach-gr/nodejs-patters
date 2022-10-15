import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('chain', function() {
    let app

    beforeEach(() => app = useApp().app)

    it('invalid login', async function() {
        const resp = await request(app)
            .post('/behavioral/chain/login')
            .send({ login: 'invalid_login' })

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(422)
        expect(resp.body?.error).toEqual('Error: invalid login')
    })

    it('invalid pass', async function() {
        const resp = await request(app)
            .post('/behavioral/chain/login')
            .send({ login: 'user', pass: 'invalid_pass' })

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(422)
        expect(resp.body?.error).toEqual('Error: invalid pass')
    })

    it('correct credentials', async function() {
        const resp = await request(app)
            .post('/behavioral/chain/login')
            .send({ login: 'user', pass: '123456' })

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual(true)
    })
})