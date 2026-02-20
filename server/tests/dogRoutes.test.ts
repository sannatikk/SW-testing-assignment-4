import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import * as dogController from '../controllers/dogController'
import type { Request, Response } from 'express'

vi.mock('../controllers/dogController')

describe('dogRoutes /api/dogs/random', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('GET /api/dogs/random returns mocked dog image', async () => {

        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(200).json({
                    success: true,
                    data: {
                        imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
                        status: "success"
                    }
                })
            }
        )

        const response = await request(app)
            .get('/api/dogs/random')

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data.imageUrl)
            .toContain("https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg")
    })
})