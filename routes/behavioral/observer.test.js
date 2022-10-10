import {describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('observer', () => {
    const {app} = useApp()

    it('get all notifiers', async function() {
        const resp = await request(app).get('/behavioral/observer/notifiers')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual(['email', 'sms', 'messenger'])
    })

    it('empty initialized notifiers', async function() {
        const resp = await request(app).get('/behavioral/observer/notifiers/current')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('add invalid notifier', async function() {
        const resp = await request(app).post('/behavioral/observer/notifiers/qwerty')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(422)
    })

    it('add notifiers', async function() {
        const notifiers = ['email', 'sms', 'messenger']

        for(let i = 0; i < notifiers.length; i++) {
            const name = notifiers[i]

            // add notifier
            const createResp = await request(app).post(`/behavioral/observer/notifiers/${name}`)
            expect(createResp.headers["content-type"]).toMatch(/json/)
            expect(createResp.status).toEqual(200)
            expect(createResp.body?.data).toEqual(true)

            // add duplicate, should receive 422
            const dupResp = await request(app).post(`/behavioral/observer/notifiers/${name}`)
            expect(dupResp.headers["content-type"]).toMatch(/json/)
            expect(dupResp.status).toEqual(422)

            // check current notifiers
            const readResp = await request(app).get('/behavioral/observer/notifiers/current')
            expect(readResp.headers["content-type"]).toMatch(/json/)
            expect(readResp.status).toEqual(200)
            expect(readResp.body?.data).toEqual(notifiers.slice(0, i + 1))
        }
    })

    it('remove notifiers', async function() {
        const notifiers = ['email', 'sms', 'messenger']

        for(let i = 0; i < notifiers.length; i++) {
            const name = notifiers[i]

            // remove existing notifier
            const createResp = await request(app).delete(`/behavioral/observer/notifiers/${name}`)
            expect(createResp.headers["content-type"]).toMatch(/json/)
            expect(createResp.status).toEqual(200)
            expect(createResp.body?.data).toEqual(true)

            // remove nonexistent notifier
            const dupResp = await request(app).delete(`/behavioral/observer/notifiers/${name}`)
            expect(dupResp.headers["content-type"]).toMatch(/json/)
            expect(dupResp.status).toEqual(422)

            // check current notifiers
            const readResp = await request(app).get('/behavioral/observer/notifiers/current')
            expect(readResp.headers["content-type"]).toMatch(/json/)
            expect(readResp.status).toEqual(200)
            expect(readResp.body?.data).toEqual(notifiers.slice(i + 1))
        }
    })

    it('empty initialized notifications', async function() {
        const resp = await request(app).get('/behavioral/observer/notifications')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual([])
    })

    it('create notifications', async function() {
        const data = [
            {
                notifiers: [],
                message: 'test1',
                response: []
            },
            {
                notifiers: ['sms'],
                message: 'test2',
                response: ['SmsNotifier -> test2']
            },
            {
                notifiers: ['email'],
                message: '123456',
                response: ['SmsNotifier -> test2', 'SmsNotifier -> 123456', 'EmailNotifier -> 123456']
            },
            {
                notifiers: ['messenger'],
                message: 'hello world',
                response: ['SmsNotifier -> test2', 'SmsNotifier -> 123456', 'EmailNotifier -> 123456', 'SmsNotifier -> hello world', 'EmailNotifier -> hello world', 'MessengerNotifier -> hello world']
            },
        ]

        for(const { notifiers, message, response } of data) {
            for(const notifier of notifiers) {
                await request(app).post(`/behavioral/observer/notifiers/${notifier}`)
            }

            const createResp = await request(app).post(`/behavioral/observer/notifications/${message}`)
            expect(createResp.headers["content-type"]).toMatch(/json/)
            expect(createResp.status).toEqual(200)
            expect(createResp.body?.data).toEqual(true)

            const readResp = await request(app).get('/behavioral/observer/notifications')
            expect(readResp.headers["content-type"]).toMatch(/json/)
            expect(readResp.status).toEqual(200)
            expect(readResp.body?.data).toEqual(response)
        }

    })
})