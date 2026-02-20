import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe('dogService.getRandomDogImage', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.resetAllMocks()
    })

    test('returns imageUrl and success status when Dog API responds successfully', async () => {
        
        const mockedApiData = {
            message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
            status: 'success',
        }

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => mockedApiData,
        } as Response)

        const result = await getRandomDogImage()

        expect(result.imageUrl).toBe(mockedApiData.message)
        expect(result.status).toBe('success')
        expect(fetch).toHaveBeenCalledOnce()
    })

    test('rejects when Dog API responds with ok:false', async () => {

        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500
        } as Response)

        await expect(getRandomDogImage())
        .rejects
        .toThrow('Failed to fetch dog image')

        expect(fetch).toHaveBeenCalledOnce()
    })
})