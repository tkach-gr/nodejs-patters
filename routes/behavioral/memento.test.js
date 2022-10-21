import {beforeEach, describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('memento', () => {
    let app = null

    const refreshApp = () => {
        app = useApp().app
    }

    beforeEach(refreshApp)

    it('empty initialized words', async function() {
        const resp = await request(app).get('/behavioral/memento/words')

        expect(resp.headers["content-type"]).toMatch(/json/)
        expect(resp.status).toEqual(200)
        expect(resp.body?.data).toEqual('')
    })

    it('add words', async function() {
        const data = [
            {
                newWord: 'Hello',
                expectedStatus: 200,
                expectedTotal:  'Hello'
            },
            {
                newWord: 'world',
                expectedStatus: 200,
                expectedTotal:  'Hello world'
            },
            {
                newWord: '1111',
                expectedStatus: 200,
                expectedTotal:  'Hello world 1111'
            },
            {
                newWord: '2222',
                expectedStatus: 200,
                expectedTotal: 'Hello world 1111 2222',
            },
        ]

        for(const item of data) {
            const { newWord, expectedStatus, expectedTotal } = item

            const addResp = await request(app).post(`/behavioral/memento/words/${newWord}`)
            expect(addResp.headers["content-type"]).toMatch(/json/)
            expect(addResp.status).toEqual(expectedStatus)
            expect(addResp.body?.data).toEqual(true)

            const resp = await request(app).get('/behavioral/memento/words')
            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(200)
            expect(resp.body?.data).toEqual(expectedTotal)
        }
    })

    it('undo operations', async function() {
        const initialWords = ['hello', 'world', '1111', '!!!!']
        for (const word of initialWords) {
            await request(app).post(`/behavioral/memento/words/${word}`)
        }

        const data = [
            {
                expectedUndoStatus: 200,
                expectedUndoResponse: true,
                expectedWords: 'hello world 1111',
            },
            {
                expectedUndoStatus: 200,
                expectedUndoResponse: true,
                expectedWords: 'hello world',
            },
            {
                expectedUndoStatus: 200,
                expectedUndoResponse: true,
                expectedWords: 'hello',
            },
            {
                expectedUndoStatus: 200,
                expectedUndoResponse: true,
                expectedWords: '',
            },
            {
                expectedUndoStatus: 400,
                expectedUndoResponse: null,
                expectedWords: '',
            },
        ]

        for(const item of data) {
            const {
                expectedUndoStatus,
                expectedUndoResponse,
                expectedWords
            } = item


            const undoResp = await request(app).post('/behavioral/memento/words/undo')
            expect(undoResp.headers["content-type"]).toMatch(/json/)
            expect(undoResp.status).toEqual(expectedUndoStatus)
            expect(undoResp.body?.data).toEqual(expectedUndoResponse)

            const resp = await request(app).get('/behavioral/memento/words')
            expect(resp.headers["content-type"]).toMatch(/json/)
            expect(resp.status).toEqual(200)
            expect(resp.body?.data).toEqual(expectedWords)
        }
    })
})