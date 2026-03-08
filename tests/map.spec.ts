import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Wait for map to be fully initialized
  await page.waitForSelector('[data-map-loaded="true"]');
});

test('map is loaded', async ({ page }) => {
  const mapElement = await page.locator('#map');
  await expect(mapElement).toBeVisible();
});

test('markers are present', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  const markers = await page.locator('.leaflet-marker-icon');
  expect(await markers.count()).toBeGreaterThan(0);
});

test('clicking a marker opens a popup', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  
  // Center map on a known marker to ensure it's in viewport
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      // Use the exact coordinates from playing_card.json for the first marker
      map.setView([-7490.110423553731, 4282.909974300441], 5);
    }
  });
  
  // Wait for map to settle
  await page.waitForTimeout(1000);

  // Click a specific marker directly
  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });
  
  const popup = page.locator('.leaflet-popup-content');
  await expect(popup).toBeVisible();
  
  const header = popup.locator('h3').first();
  await expect(header).toBeVisible();
});

test('copy button in popup works', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.110423553731, 4282.909974300441], 5);
    }
  });
  
  await page.waitForTimeout(1000);
  
  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });
  
  const copyButton = page.locator('button.copy').first();
  await expect(copyButton).toBeVisible();
  await copyButton.click();
});


test('copy button shows "Copied!" feedback after click', async ({ page, browserName }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  if (browserName === 'chromium') {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  }

  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.110423553731, 4282.909974300441], 5);
    }
  });

  await page.waitForTimeout(1000);

  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });

  const copyButton = page.locator('button.copy').first();
  await expect(copyButton).toBeVisible();

  if (browserName === 'chromium') {
    await copyButton.click();
    // Use a loose text check because the button might have a span or just text
    await expect(copyButton).toContainText('Copied');
  }
});


test('opening glightbox works', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.110423553731, 4282.909974300441], 5);
    }
  });
  
  await page.waitForTimeout(1000);
  
  const marker = page.locator('.leaflet-marker-icon[src*="playing_card"]').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });
  
  const popup = page.locator('.leaflet-popup-content');
  await expect(popup).toBeVisible();
  
  const lightboxLink = page.locator('a.glightbox').first();
  await expect(lightboxLink).toBeVisible();
  
  await page.waitForTimeout(500);
  await lightboxLink.click({ force: true });
  
  const glightboxContainer = page.locator('.glightbox-container');
  await expect(glightboxContainer).toBeVisible();
});

test('URL hash updates when moving the map', async ({ page }) => {
  await page.waitForSelector('#map');
  
  const mapElement = page.locator('#map');
  await mapElement.hover();
  await page.mouse.down();
  await page.mouse.move(200, 200);
  await page.mouse.up();
  
  await page.waitForTimeout(500);
  
  const url = page.url();
  expect(url).toContain('#');
  const hash = url.split('#')[1];
  expect(hash).toMatch(/^\d+\/-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/);
});

test('map centers based on URL hash', async ({ page }) => {
  const targetHash = '#4/-4000/4000';
  await page.goto('/' + targetHash);
  await page.waitForSelector('[data-map-loaded="true"]');
  await page.waitForTimeout(500);
  
  const url = page.url();
  expect(url).toMatch(/#4\/-4000(\.0+)?\/4000(\.0+)?/);
});

test('mouse position control updates on mouse move', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-mouseposition');
  const mousePosControl = page.locator('.leaflet-control-mouseposition');
  
  const mapElement = page.locator('#map');
  const box = await mapElement.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    // Give it a moment to update
    await page.waitForTimeout(200);
    
    const text = await mousePosControl.innerText();
    // It shouldn't be the empty string "0.00000 : 0.00000" if we moved to center
    expect(text).not.toBe('0.00000 : 0.00000');
    expect(text).toMatch(/-?\d+(\.\d+)?\s*:\s*-?\d+(\.\d+)?/);
  }
});
