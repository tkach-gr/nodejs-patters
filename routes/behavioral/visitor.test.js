import {describe, expect, it} from "@jest/globals";
import request from 'supertest'
import { useApp } from "../../app.js";

describe('visitor', () => {
    const {app} = useApp()

    it('export text', async function() {
        const createResp = await request(app)
            .get(`/behavioral/visitor/entities/export-text`)

        expect(createResp.headers["content-type"]).toMatch(/json/)
        expect(createResp.status).toEqual(200)
        expect(createResp.body?.data).toEqual([
            "Player [health:10] [weapon:sword] [armor:iron]",
            "Player [health:2] [position:center]"
        ])
    })

    it('export json', async function() {
        const createResp = await request(app)
            .get(`/behavioral/visitor/entities/export-json`)

        expect(createResp.headers["content-type"]).toMatch(/json/)
        expect(createResp.status).toEqual(200)
        expect(createResp.body?.data).toEqual([
            {
                "health": 10,
                "weapon": "sword",
                "armor": "iron"
            },
            {
                "health": 2,
                "position": "center"
            }
        ])
    })
})