import { test, expect } from '@playwright/test'

test('visit events and navigate to event detail', async ({ page }) => {
  // 1. Visit homepage
  await page.goto('/')

  // 2. Wait until loading is gone
  await expect(page.getByText('Loading events...')).toBeHidden()

  // 3. Click first event
  const firstEvent = page.locator('[data-testid="event-card"]').first()
  await firstEvent.click()

  // 4. Assert navigation
  await expect(page).toHaveURL(/\/event\?id=/)
})
