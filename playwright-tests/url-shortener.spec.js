
import { test, expect } from '@playwright/test';
import { UrlShortenerPage } from './pages/UrlShortenerPage.js';

test.describe('URL Shortener Application', () => {

    let urlPage;

    test.beforeEach(async ({ page }) => {
        urlPage = new UrlShortenerPage(page);
        await urlPage.open();
    });

    test('should create a short URL successfully', async () => {
        await urlPage.createShortUrl('https://example.com');

        const shortUrl = await urlPage.getShortUrl();

        expect(shortUrl).toBeTruthy();
        expect(shortUrl).toContain('/');
    });

    test('should redirect to the original URL when short link is opened', async ({ page }) => {
        await urlPage.createShortUrl('https://example.com');

        const shortUrl = await urlPage.getShortUrl();

        await page.goto(shortUrl);

        await expect(page).toHaveURL('https://example.com/');
    });

    test('should show an error popup for an invalid URL', async ({ page }) => {
        await urlPage.enterUrl('not-a-valid-url');

        const dialogPromise = page.waitForEvent('dialog');

        const clickPromise = urlPage.shortenButton.click();

        const dialog = await dialogPromise;

        expect(dialog.message()).toBe('Something went wrong');

        await dialog.accept();

        await clickPromise;
    });

});
