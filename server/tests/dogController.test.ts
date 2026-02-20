import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getDogImage } from '../controllers/dogController'
import * as dogService from '../services/dogService'
import type { Request, Response } from 'express'

vi.mock('../services/dogService')

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res as Response
}

describe('dogController.getDogImage', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => {
        vi.resetAllMocks()
    })

    test('returns success true and data from dogService', async () => {
        const req = {} as Request
        const res = createMockResponse()

        const mockedServiceResult = {
            imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
            status: 'success',
        }

        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockedServiceResult)

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockedServiceResult,
        })

        expect(dogService.getRandomDogImage).toHaveBeenCalledOnce()
    })
})