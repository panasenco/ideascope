#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-run --allow-sys --allow-write

import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { chromium } from "npm:playwright";

async function get_urls(query: string, max_pages: number) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    for (let page_number = 0; page_number <= max_pages; page_number++) {
        await page.goto(`https://patents.google.com/?q=${encodeURIComponent(query)}&page=${page_number}`);
        // Wait for articles to load and get all articles
        const articles = await page.getByRole('article').all();
        // Process each article
        for (const article of articles) {
            const link = await article.getByRole('link').first();
            const title = await link.textContent();
            const url = await link.getAttribute('href');
            const text = await article.textContent();
            console.log('Found article:', text);
        }
        await page.screenshot({ path: `screenshot-${page_number}.png` });
    }
}

const { options } = await new Command()
  .name("google-patents")
  .description("Scrape patent information from Google Patents")
  .option("-q, --query <query:string>", "Search query for Google Patents", {
    required: true,
  })
  .option("-m, --max-pages <pages:number>", "Maximum number of pages to scrape", {
    default: 1,
    min: 1,
  })
  .parse(Deno.args);

await get_urls(options.query, options.maxPages);
