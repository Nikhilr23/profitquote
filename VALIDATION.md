# ProfitQuote Validation

## Calculator test results

The core formulas were checked against 10 scenarios.

| Scenario | True cost | Quote | Profit | Gross margin | Target | Minimum quote |
|---|---:|---:|---:|---:|---:|---:|
| Default residential | $237.00 | $300.00 | $63.00 | 21.00% | 35% | $364.62 |
| Small residential | $84.00 | $120.00 | $36.00 | 30.00% | 30% | $120.00 |
| Deep clean | $362.00 | $450.00 | $88.00 | 19.56% | 35% | $556.92 |
| Commercial low bid | $440.00 | $500.00 | $60.00 | 12.00% | 30% | $628.57 |
| Commercial healthy | $502.00 | $750.00 | $248.00 | 33.07% | 28% | $697.22 |
| Break-even quote | $130.00 | $130.00 | $0.00 | 0.00% | 25% | $173.33 |
| Losing job | $270.00 | $200.00 | -$70.00 | -35.00% | 30% | $385.71 |
| High-margin job | $75.00 | $150.00 | $75.00 | 50.00% | 40% | $125.00 |
| Zero quote | $160.00 | $0.00 | -$160.00 | 0.00% | 35% | $246.15 |
| Higher target | $237.00 | $300.00 | $63.00 | 21.00% | 50% | $474.00 |

Formulas:

- Labor cost = cleaners × hours per cleaner × true hourly labor cost
- True job cost = labor + supplies + travel + overhead allocation + other costs
- Profit = proposed quote − true job cost
- Gross margin = profit ÷ proposed quote
- Minimum profitable quote for target margin = true job cost ÷ (1 − target margin)

## Validation goal before paid features

Do not add accounts, subscriptions, payments, or a backend until there is evidence people want the calculator.

Initial signal target:

- 20–50 real visitors
- 5+ useful responses from cleaning-business owners
- Record repeated requests/problems
- Prioritize V2 only when the same need appears repeatedly

## Outreach message

> I built a free calculator for cleaning-business owners that checks your true job cost, profit margin, and the minimum quote needed for your target margin. Would you actually use this before sending a quote? What's missing?
>
> https://nikhilr23.github.io/profitquote/

## Feedback log

| Date | Source | Feedback | Repeated request? | Possible action |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

## V2 decision rule

A feature request is more important when multiple independent cleaning-business owners ask for the same thing or describe the same pricing problem. Avoid building one-off requests until a pattern appears.
