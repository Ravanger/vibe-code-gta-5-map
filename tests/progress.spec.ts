import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-map-loaded="true"]');
});

test('marking a collectible as collected updates sidebar and persists', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) { map.setView([-7490.110423553731, 4282.909974300441], 5); }
  });

  await page.waitForTimeout(1000);

  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });

  const popup = page.locator('.leaflet-popup-content');
  await expect(popup).toBeVisible();

  const toggle = popup.locator('[data-progress-toggle]');
  await expect(toggle).toBeVisible();

  const sidebarCountBefore = await page.locator('[data-progress-category="playing_card"]').first().innerText();

  await toggle.click();

  const sidebarCountAfter = await page.locator('[data-progress-category="playing_card"]').first().innerText();
  expect(sidebarCountAfter).not.toEqual(sidebarCountBefore);

  await page.reload();
  await page.waitForSelector('[data-map-loaded="true"]');
  await page.waitForSelector('[data-progress-category="playing_card"]');

  const sidebarCountAfterReload = await page.locator('[data-progress-category="playing_card"]').first().innerText();
  expect(sidebarCountAfterReload).toEqual(sidebarCountAfter);
});

test('hiding/showing collected markers via settings', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) { map.setView([-7490.110423553731, 4282.909974300441], 5); }
  });
  await page.waitForTimeout(1000);

  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });

  const toggle = page.locator('[data-progress-toggle]');
  await expect(toggle).toBeVisible();
  
  await toggle.click();
  
  // Click outside to close popup
  await page.mouse.click(400, 400);
  await expect(page.locator('.leaflet-popup')).not.toBeVisible();

  const collectedMarker = page.locator('.marker--collected');
  await expect(collectedMarker).toBeVisible();

  const hideBtn = page.locator('#btn-toggle-collected');
  await expect(hideBtn).toContainText('Hide Found');
  await hideBtn.click();

  await expect(collectedMarker).not.toBeVisible();
  await expect(hideBtn).toContainText('Show Found');

  await page.reload();
  await page.waitForSelector('[data-map-loaded="true"]');
  
  const hideBtnAfter = page.locator('#btn-toggle-collected');
  await expect(hideBtnAfter).toContainText('Show Found');
  await expect(page.locator('.marker--collected')).not.toBeVisible();

  await hideBtnAfter.click();
  await expect(page.locator('.marker--collected')).toBeVisible();
});
