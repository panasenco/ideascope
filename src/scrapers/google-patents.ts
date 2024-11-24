#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-run --allow-sys --allow-write

import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { chromium } from "npm:playwright";

async function get_previews(query: string, max_pages: number) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://patents.google.com/?q=${encodeURIComponent(query)}`);
    await page.screenshot({ path: 'screenshot.png' });
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

await get_previews(options.query, options.maxPages);
