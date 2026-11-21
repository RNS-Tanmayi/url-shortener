
export class UrlShortenerPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.urlInput = page.getByPlaceholder("Enter long URL");
        this.shortenButton = page.getByRole("button", { name: "Shorten" });
        this.shortLink = page.locator("a.link-primary");
    }

    async open() {
        await this.page.goto("/");
    }

    async enterUrl(url) {
        await this.urlInput.fill(url);
    }

    async shortenUrl() {
        await this.shortenButton.click();
    }

    async createShortUrl(url) {
        await this.enterUrl(url);
        await this.shortenUrl();
    }

    async getShortUrl() {
        await this.shortLink.waitFor();
        return await this.shortLink.getAttribute("href");
    }
}
