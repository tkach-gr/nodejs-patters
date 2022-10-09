import {describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('iterator', () => {
    const { app } = useApp()

    it('check iterator with empty list', async function () {
        const resp = await request(app).get('/behavioral/iterator/list')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('check reversed iterator with empty list', async function () {
        const resp = await request(app).get('/behavioral/iterator/reversed-list')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('add test value', async function () {
        for(let i = 0; i < 3; i++) {
            const resp = await request(app)
                .post('/behavioral/iterator/add')
                .send({ value: i + 1 })

            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(200)
            expect(resp.body?.data).toEqual(true)
        }
    })

    it('add empty value', async function () {
        const resp = await request(app)
            .post('/behavioral/iterator/add')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(422)
    })

    it('check list after adding', async function () {
        const resp = await request(app).get('/behavioral/iterator/list')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual(['1', '2', '3'])
    })

    it('check reversed list after adding', async function () {
        const resp = await request(app).get('/behavioral/iterator/reversed-list')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual(['3', '2', '1'])
    })
})
