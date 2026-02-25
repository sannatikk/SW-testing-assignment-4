import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import * as dogController from '../controllers/dogController'
import type { Request, Response } from 'express'

vi.mock('../controllers/dogController')


describe('Assignment 5 API tests', () => {

    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
    })

    test('GET /api/dogs/random returns random dog image', async () => {
        
        const mockedJson = {
            success: true,
            data: {
                imageUrl: 'https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg',
                status: 'success',
            },
        }

        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(200).json(mockedJson)
            }
        )

        const response = await request(app).get('/api/dogs/random')

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)

        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBeDefined()

        expect(response.body.data).toHaveProperty('imageUrl')
        expect(typeof response.body.data.imageUrl).toBe('string')
    })

    test('GET /api/dogs/invalid returns 404 with error message', async () => {

        const response = await request(app)
            .get('/api/dogs/invalid')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Route not found')
    })


})