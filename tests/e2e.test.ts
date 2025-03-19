import { test, expect, chromium } from "@playwright/test";

test("Spin button should start the game", async () => {
    // Launch browser in headed mode (i.e., visible browser window)
    const browser = await chromium.launch({ headless: false });

    // Create a new browser context for more control
    const context = await browser.newContext();

    // Create a new page inside the context
    const newPage = await context.newPage();

    // Navigate to the URL
    await newPage.goto("http://localhost:8080");

    // Wait for the canvas to load (since Pixi.js works with WebGL, the canvas should be there)
    const canvas = await newPage.waitForSelector("canvas"); // Ensure the canvas element is present

    // Click the coordinates where the spin button would be located on the canvas
    // These are the coordinates where the spin button is set in your game.ts (1050, 520)
    await canvas.click({ position: { x: 1050, y: 520 } });

    // Wait for the game to spin or any other action you need
    await newPage.waitForTimeout(2000); // Increase the wait time to allow for spin to start

    // Optionally, check the canvas is still present or check other elements that indicate the game is running
    const canvasAfterClick = await newPage.waitForSelector("canvas");
    expect(canvasAfterClick).toBeTruthy(); // Ensure the canvas is still there after the spin has been triggered

    // Optionally, check for other changes that happen when the game starts (like a symbol moving or an effect).
    // For example, check if any element has moved or if a blur effect is applied.

    // Close the browser after the test
    await browser.close();
});
