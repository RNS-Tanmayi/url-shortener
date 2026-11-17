
import request from "supertest";
import app from "../app.js";
import Url from "../models/Url.js";

process.env.BASE_URL = "http://localhost:5000";

describe("URL Shortener API", () => {

    test("POST /shorten should reject a missing URL", async () => {
        const response = await request(app)
            .post("/shorten")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("URL is required");
    });

    test("POST /shorten should create and save a short URL", async () => {
        const originalUrl = "https://www.google.com";

        const response = await request(app)
            .post("/shorten")
            .send({ originalUrl });

        // Check the API response
        expect(response.statusCode).toBe(200);
        expect(response.body.shortId).toBeDefined();
        expect(response.body.shortId).toHaveLength(7);
        expect(response.body.shortUrl).toBe(
            `http://localhost:5000/${response.body.shortId}`
        );

        // Check that the URL was saved in MongoDB
        const savedUrl = await Url.findOne({
            shortId: response.body.shortId
        });

        expect(savedUrl).not.toBeNull();
        expect(savedUrl.originalUrl).toBe(originalUrl);
        expect(savedUrl.clicks).toBe(0);
    });
    
    test("POST /shorten should reject an invalid URL", async () => {
        const response = await request(app)
            .post("/shorten")
            .send({ originalUrl: "not-a-valid-url" });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Invalid URL");
    });


    test("GET /:shortId should redirect to the original URL and increment clicks", async () => {
        // Create a URL directly in the test database
        const savedUrl = await Url.create({
            shortId: "test123",
            originalUrl: "https://www.google.com"
        });

        // Request the shortened URL
        const response = await request(app)
            .get("/test123")
            .redirects(0);

        // Verify redirection
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("https://www.google.com");

        // Verify click count in MongoDB
        const updatedUrl = await Url.findById(savedUrl._id);

        expect(updatedUrl.clicks).toBe(1);
    });

    test("GET /:shortId should return 404 for an unknown short ID", async () => {
        const response = await request(app)
            .get("/unknown1");

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("URL not found");
    });



});
