import {describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('template', () => {
    const {app} = useApp()

    it('parse get request', async function() {
        const data = [
            {
                requestPath: '',
                expectedParams: { },
                expectedQuery: { },
            },
            {
                requestPath: '/qqq?test1=123456',
                expectedParams: { first: 'qqq' },
                expectedQuery: { test1: '123456' },
            },
            {
                requestPath: '/qqq/www?test1=123456&test2=qwerty',
                expectedParams: { first: 'qqq', second: 'www' },
                expectedQuery: { test1: '123456', test2: 'qwerty' },
            },
        ]

        for(const { requestPath, expectedParams, expectedQuery } of data) {
            const createResp = await request(app)
                .get(`/behavioral/template/parse${requestPath}`)

            expect(createResp.headers["content-type"]).toMatch(/json/)
            expect(createResp.status).toEqual(200)
            expect(createResp.body?.data).toEqual({
                params: expectedParams,
                query: expectedQuery,
            })
        }
    })

    it('parse post request', async function() {
        const data = [
            {
                requestPath: '',
                expectedParams: { },
                body: { },
            },
            {
                requestPath: '/qqq',
                expectedParams: { first: 'qqq' },
                body: { test1: '123456' },
            },
            {
                requestPath: '/qqq/www',
                expectedParams: { first: 'qqq', second: 'www' },
                body: { test1: '123456', test2: 'qwerty' },
            },
        ]

        for(const { requestPath, expectedParams, body } of data) {
            const createResp = await request(app)
                .post(`/behavioral/template/parse${requestPath}`)
                .send(body)

            expect(createResp.headers["content-type"]).toMatch(/json/)
            expect(createResp.status).toEqual(200)
            expect(createResp.body?.data).toEqual({
                params: expectedParams,
                body: body,
            })
        }
    })
})