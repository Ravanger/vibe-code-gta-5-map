import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-map-loaded="true"]');
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

  const playingCard = page.locator('.cat-name').getByText('Playing Card');
  await expect(playingCard).toBeVisible();

  const atm = page.locator('.cat-item').filter({ hasText: 'ATM' });
  await expect(atm).toHaveCSS('display', 'none');

  await search.fill('');
});

test('toggling category updates markers', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  const markersBefore = await page.locator('.leaflet-marker-icon').count();
  expect(markersBefore).toBeGreaterThan(0);

  await page.locator('#btn-hide-all').click();
  
  // Give it a moment to remove from DOM
  await page.waitForFunction(() => document.querySelectorAll('.leaflet-marker-icon').length === 0, { timeout: 5000 });

  const markersAfter = await page.locator('.leaflet-marker-icon').count();
  expect(markersAfter).toBe(0);

  await page.locator('#btn-show-all').click();
  await page.waitForSelector('.leaflet-marker-icon');

  const markersRestored = await page.locator('.leaflet-marker-icon').count();
  expect(markersRestored).toBeGreaterThan(0);
});

test('group collapse toggle works', async ({ page }) => {
  await page.waitForSelector('#sb-cats');

  const locationsHeader = page.locator('[data-ghd="Locations"]');
  await expect(locationsHeader).toBeVisible();
  await locationsHeader.click();
  
  const groupBody = page.locator('[data-gbody="Locations"]');
  await expect(groupBody).toHaveClass(/group-body--closed/);

  await locationsHeader.click();
  await expect(groupBody).not.toHaveClass(/group-body--closed/);
});
