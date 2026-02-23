import { test, expect } from '@playwright/test'

test.describe('Dog image loads', () => {

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

    test('should retrieve image when "Get New Dog Image" button is clicked', async ({ page }) => {

        await page.goto('/')

        const img = page.locator('img.dog-image')
        await expect(img).toHaveAttribute('src', /^https:\/\//)

        const responsePromise = page.waitForResponse('**/api/dogs/random')

        await page.getByRole('button', { name: 'Get Another Dog' }).click()
        await responsePromise

        await expect(img).toHaveAttribute('src', /^https:\/\//)

    })

})

test.describe('Dog image error handling', () => {

    test('should show error message when API call fails', async ({ page }) => {

        await page.route('**/api/dogs/random', async (route) => {
            await route.abort()
        })

        await page.goto('/')

        const errorElement = page.getByText(/error/i)
        await expect(errorElement).toBeVisible()
    })

})