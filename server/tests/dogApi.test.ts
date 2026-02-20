import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import * as dogController from '../controllers/dogController'
import type { Request, Response } from 'express'

vi.mock('../controllers/dogController')

describe('Dog API tests', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('GET /api/dogs/random returns 500 and error JSON when controller fails', async () => {

        const mockedErrorJson = {
            success: false,
            error: 'Failed to fetch dog image: Network error',
        }

        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(500).json(mockedErrorJson)
            }
        )

        const response = await request(app).get('/api/dogs/random')

        expect(response.status).toBe(500)
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe('Failed to fetch dog image: Network error')

    })
})