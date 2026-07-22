import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and shows hero section and component cards', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const heading = page.getByRole('heading', { name: /beautiful/ui })
    await expect(heading).toBeVisible()

    const componentCards = page.locator('article')
    const count = await componentCards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('Ctrl+K opens command palette', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Control+k')
    const searchInput = page.getByPlaceholder(/search|type/i)
    await expect(searchInput).toBeVisible()
  })
})
