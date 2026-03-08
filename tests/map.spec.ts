import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('map is loaded', async ({ page }) => {
  const mapElement = await page.locator('#map');
  await expect(mapElement).toBeVisible();
});

test('markers are present', async ({ page }) => {
  // Wait for the map and markers to be initialized. 
  // Leaflet markers are usually in the .leaflet-marker-pane
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
      // Set view to a specific coordinate from markers.json
      map.setView([-7490.11, 4282.91], 5);
    }
  });
  
  // Wait for map to settle
  await page.waitForTimeout(500);
  
  // Click exact center of the map
  const box = await page.locator('#map').boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);
  }
  
  // Wait for popup
  const popup = await page.locator('.leaflet-popup-content');
  await expect(popup).toBeVisible();
  
  // Verify content (e.g., check for <h2> tag)
  const header = await popup.locator('h3');
  expect(await header.count()).toBeGreaterThan(0);
});

test('copy button in popup works', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  
  // Center map on a known marker to ensure it's in viewport
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.11, 4282.91], 5);
    }
  });
  
  // Wait for map to settle
  await page.waitForTimeout(500);
  
  const box = await page.locator('#map').boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);
  }
  
  const copyButton = await page.locator('button.copy').first();
  await expect(copyButton).toBeVisible();
  
  // Verify Tailwind classes are applied (simplified check)
  const classes = await copyButton.getAttribute('class');
  expect(classes).toContain('bg-gray-700/50');
  expect(classes).toContain('transition-colors');

  // Verify aria-label is set for accessibility (added by popupopen handler)
  const ariaLabel = await copyButton.getAttribute('aria-label');
  expect(ariaLabel).toBe('Copy location coordinates');
  
  // Playwright can't directly check the clipboard contents easily,
  // but we can check if it triggers the copy event.
  // For now, we just ensure the button is clickable.
  await copyButton.click();
});


test('copy button shows "Copied!" feedback after click', async ({ page, browserName }) => {
  await page.waitForSelector('.leaflet-marker-icon');

  // Only grant clipboard permissions on chromium (Firefox/WebKit don't support these permission strings)
  if (browserName === 'chromium') {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  }

  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.11, 4282.91], 5);
    }
  });

  await page.waitForTimeout(500);

  const box = await page.locator('#map').boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);
  }

  const copyButton = page.locator('button.copy').first();
  await expect(copyButton).toBeVisible();

  // Simulate the success event via ClipboardJS by clicking (on chromium where clipboard is granted)
  // On other browsers, we verify the button is present and aria-label is set
  if (browserName === 'chromium') {
    await copyButton.click();

    // Verify the "Copied!" feedback text appears
    await expect(copyButton.locator('span')).toContainText('Copied!');

    // Verify aria-label is updated to reflect success
    const successLabel = await copyButton.getAttribute('aria-label');
    expect(successLabel).toContain('Copied');
  }
});


test('opening glightbox works', async ({ page }) => {
  await page.waitForSelector('.leaflet-marker-icon');
  
  // Center map on a known marker with an image
  await page.evaluate(() => {
    // @ts-ignore
    const map = window.map;
    if (map) {
      map.setView([-7490.11, 4282.91], 5);
    }
  });
  
  await page.waitForTimeout(500);
  
  const box = await page.locator('#map').boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2 - 15);
  }
  
  // Find the GLightbox link in the popup
  const lightboxLink = await page.locator('a.glightbox').first();
  await expect(lightboxLink).toBeVisible();
  
  // Click to open
  await lightboxLink.click();
  
  // GLightbox adds a container to the body when opened
  const glightboxContainer = await page.locator('.glightbox-container');
  await expect(glightboxContainer).toBeVisible();
  
  // Check if image is loaded (optional but good)
  const image = await glightboxContainer.locator('img').first();
  await expect(image).toBeVisible();
});

test('URL hash updates when moving the map', async ({ page }) => {
  // Wait for map to load
  await page.waitForSelector('#map');
  
  // Drag the map to move it
  const mapElement = await page.locator('#map');
  await mapElement.hover();
  await page.mouse.down();
  await page.mouse.move(200, 200);
  await page.mouse.up();
  
  // Wait for hash to update (it might be throttled)
  await page.waitForTimeout(500);
  
  const url = page.url();
  expect(url).toContain('#');
  // Check if it matches #zoom/lat/lng format
  const hash = url.split('#')[1];
  expect(hash).toMatch(/^\d+\/-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/);
});

test('map centers based on URL hash', async ({ page }) => {
  // Go to a specific location via hash
  // Format: #zoom/lat/lng
  const targetHash = '#4/-4000/4000';
  await page.goto('/' + targetHash);
  
  // Wait for map to load
  await page.waitForSelector('#map');
  
  // Give it a moment to parse the hash and set view
  await page.waitForTimeout(500);
  
  const url = page.url();
  // We expect the hash to be present, but it might have decimals like -4000.00
  expect(url).toMatch(/#4\/-4000(\.0+)?\/4000(\.0+)?/);
});

test('mouse position control updates on mouse move', async ({ page }) => {
  await page.waitForSelector('.leaflet-control-mouseposition');
  const mousePosControl = await page.locator('.leaflet-control-mouseposition');
  
  // Initial state might be "Unavailable" or similar
  // await expect(mousePosControl).toContainText('Unavailable'); // Optional, depends on config
  
  // Move mouse over the map
  const mapElement = await page.locator('#map');
  const box = await mapElement.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    
    // Check if it updated to show coordinates
    // We expect something like "-4096.00000 : 4096.00000"
    await expect(mousePosControl).not.toContainText('Unavailable');
    const text = await mousePosControl.innerText();
    expect(text).toMatch(/-?\d+(\.\d+)?\s*:\s*-?\d+(\.\d+)?/);
  }
});

