# ProfitQuote

**Know what to charge before you send the quote.**

ProfitQuote is a free, browser-based profit and pricing calculator for small cleaning businesses. It helps owners estimate the true cost of a job, check the gross margin on a proposed quote, and work backward from a target margin to a minimum price.

## What it does

- Calculates labor cost from number of cleaners, hours, and hourly labor cost
- Includes supplies, travel, overhead allocation, and other job costs
- Calculates estimated profit and gross margin
- Shows whether a proposed quote meets the owner's target margin
- Calculates the minimum quote required to reach the target gross margin
- Works entirely in the browser

## Example

If a job has a total estimated cost of `$237` and the owner wants a `35%` gross margin:

```text
Minimum quote = Cost / (1 - Target margin)
Minimum quote = 237 / (1 - 0.35)
Minimum quote = $364.62
```

This is different from simply adding a 35% markup to cost.

## Tech

- HTML
- CSS
- Vanilla JavaScript
- No backend
- No database
- No API keys
- No AI dependency

## Run locally

Clone the repository and open `index.html` in a browser, or serve the folder with any static web server.

## GitHub Pages

The project is designed for static GitHub Pages hosting. Enable Pages in the repository settings and deploy from the `main` branch/root folder.

## Disclaimer

ProfitQuote is a planning tool. Results depend on the inputs supplied by the user and are not accounting, tax, legal, or financial advice.

## Roadmap

Future features should be driven by real user feedback. Candidates include saved pricing profiles, residential/commercial presets, profitability history, printable quote summaries, and pricing worksheets.
