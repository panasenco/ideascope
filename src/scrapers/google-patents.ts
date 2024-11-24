#!/usr/bin/env -S deno run --allow-net

import { parseArgs } from "jsr:@std/cli/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["query"],
  alias: {
    q: "query",
    h: "help",
  },
});

if (flags.help) {
  console.log(`
Usage: google-patents.ts [options]

Options:
  -q, --query    Search query for Google Patents
  -h, --help     Show help
`);
  Deno.exit(0);
}

if (!flags.query) {
  console.error("Error: --query parameter is required");
  Deno.exit(1);
}

console.log(`Searching Google Patents for: "${flags.query}"`);
