import { test, expect } from '@playwright/test';

test.describe('Dog image loads on page load', () => {

    test('should retrieve dog image successfully when page is loaded', async ({ page }) => {

        await page.goto('/')

        const responsePromise = page.waitForResponse('**/api/dogs/random')
        const response = await responsePromise

        expect(response.status()).toBe(200)

        const responseData = await response.json()
        expect(responseData).toHaveProperty('success', true)
        expect(responseData).toHaveProperty('data')
        expect(responseData.data).toHaveProperty('imageUrl')
        expect(responseData.data).toHaveProperty('status', 'success')
        expect(responseData.data.imageUrl).toContain('https://')
    })

})