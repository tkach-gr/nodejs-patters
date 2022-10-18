import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('mediator', () => {
    let app = null

    const refreshApp = () => {
        app = useApp().app
    }

    beforeEach(refreshApp)

    it('empty initialized form', async function() {
        const resp = await request(app).get('/behavioral/mediator/form')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual({
            login: '',
            pass: '',
            rememberMe: false,
            isResetDisabled: true,
        })
    })

    it('edit form', async function() {
        const data = [
            {
                formRequest: { rememberMe: false },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: '', pass: '', rememberMe: false, isResetDisabled: true },
            },
            {
                formRequest: { login: '', pass: '', rememberMe: false },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: '', pass: '', rememberMe: false, isResetDisabled: true },
            },
            {
                formRequest: {  },
                expectedPutStatus: 422,
                expectedPutResponse: null,
                expectedGetStatus: 200,
                expectedGetResponse: { login: '', pass: '', rememberMe: false, isResetDisabled: true },
            },
            {
                formRequest: { login: 'user', pass: '', rememberMe: false },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: 'user', pass: '', rememberMe: false, isResetDisabled: false },
            },
            {
                formRequest: { login: '', pass: '123', rememberMe: false },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: '', pass: '123', rememberMe: false, isResetDisabled: false },
            },
            {
                formRequest: { login: '', pass: '', rememberMe: true },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: '', pass: '', rememberMe: true, isResetDisabled: false },
            },
            {
                formRequest: { login: 'user', pass: '123', rememberMe: true },
                expectedPutStatus: 200,
                expectedPutResponse: true,
                expectedGetStatus: 200,
                expectedGetResponse: { login: 'user', pass: '123', rememberMe: true, isResetDisabled: false },
            },
        ]

        for(const item of data) {
            const {
                formRequest,
                expectedPutStatus,
                expectedPutResponse,
                expectedGetStatus,
                expectedGetResponse,
            } = item

            const editResp = await request(app)
                .put('/behavioral/mediator/form')
                .send(formRequest)
            expect(editResp.headers["content-type"]).toMatch(/json/)
            expect(editResp.status).toEqual(expectedPutStatus)
            expect(editResp.body?.data).toEqual(expectedPutResponse)

            const resp = await request(app).get('/behavioral/mediator/form')
            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(expectedGetStatus)
            expect(resp.body?.data).toEqual(expectedGetResponse)

            refreshApp()
        }
    })

    it('reset empty form', async function() {
        const resp = await request(app).post('/behavioral/mediator/form/reset')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(400)
        expect(resp.body?.data).toEqual(null)
    })

    it('reset form', async function() {
        await request(app)
            .put('/behavioral/mediator/form')
            .send({ login: 'user', pass: '123', rememberMe: true })

        const resetResp = await request(app).post('/behavioral/mediator/form/reset')
        expect(resetResp.headers["content-type"]).toMatch(/json/)
        expect(resetResp.status).toEqual(200)
        expect(resetResp.body?.data).toEqual(true)

        const getResp = await request(app).get('/behavioral/mediator/form')
        expect(getResp.headers["content-type"]).toMatch(/json/)
        expect(getResp.status).toEqual(200)
        expect(getResp.body?.data).toEqual({ login: '', pass: '', rememberMe: false, isResetDisabled: true })
    })
})