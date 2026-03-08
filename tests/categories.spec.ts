import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('sidebar panel is present', async ({ page }) => {
  await page.waitForSelector('#sidebar');
  const sidebar = page.locator('#sidebar');
  await expect(sidebar).toBeVisible();
});

test('sidebar lists Playing Card category', async ({ page }) => {
  await page.waitForSelector('#sb-cats');
  const label = page.locator('#sb-cats .cat-name').getByText('Playing Card');
  await expect(label).toBeVisible();
});

test('sidebar has Show All and Hide All buttons', async ({ page }) => {
  await page.waitForSelector('#sidebar');
  await expect(page.locator('#btn-show-all')).toBeVisible();
  await expect(page.locator('#btn-hide-all')).toBeVisible();
});

test('sidebar search filters categories', async ({ page }) => {
  await page.waitForSelector('#sb-search');
  const search = page.locator('#sb-search');
  await search.fill('playing');
  await page.waitForTimeout(200);

  // Playing Card should still be visible
  const playingCard = page.locator('.cat-name').getByText('Playing Card');
  await expect(playingCard).toBeVisible();

  // A category that doesn't match should be hidden
  const atm = page.locator('.cat-item').filter({ hasText: 'ATM' });
  await expect(atm).toHaveCSS('display', 'none');

  // Clear search
  await search.fill('');
});

test('toggling category updates markers', async ({ page }) => {
  // Wait for markers to load
  await page.waitForSelector('.leaflet-marker-icon');
  const markersBefore = await page.locator('.leaflet-marker-icon').count();
  expect(markersBefore).toBeGreaterThan(0);

  // Click Hide All
  await page.locator('#btn-hide-all').click();
  await page.waitForTimeout(500);

  // Markers should be gone
  const markersAfter = await page.locator('.leaflet-marker-icon').count();
  expect(markersAfter).toBe(0);

  // Click Show All to restore
  await page.locator('#btn-show-all').click();
  await page.waitForTimeout(500);

  const markersRestored = await page.locator('.leaflet-marker-icon').count();
  expect(markersRestored).toBeGreaterThan(0);
});

test('group collapse toggle works', async ({ page }) => {
  await page.waitForSelector('#sb-cats');

  // Click on the Locations group header to collapse it
  const locationsHeader = page.locator('[data-ghd="Locations"]');
  await expect(locationsHeader).toBeVisible();
  await locationsHeader.click();
  await page.waitForTimeout(300);

  // The group body should be collapsed
  const groupBody = page.locator('[data-gbody="Locations"]');
  await expect(groupBody).toHaveClass(/group-body--closed/);

  // Click again to expand
  await locationsHeader.click();
  await page.waitForTimeout(300);
  await expect(groupBody).not.toHaveClass(/group-body--closed/);
});
