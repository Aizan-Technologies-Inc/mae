# YupMD Test Executor Agent

Starter runner for executing selected rows from the `YMD-TEST-EXEC-v01` Google Sheet against the dev YupMD site.

## GitHub Pages Theneo-Style MAE Docs Prototype

This repo also includes a static MAE documentation prototype under `docs/`. It is designed to approximate the existing Theneo overview page at `https://app.theneo.io/aizan/mae/overview` with:

- a light fixed left navigation matching the Theneo sections
- the full single-page overview flow: Overview, Authorization, SMS Outbound Request, MMS Outbound Request, Media Creation Request, Delivery Callback, and Inbound Message Callback
- endpoint notes, request fields, response notes, and dark request/response example cards
- no build step, so GitHub Pages can serve it directly

Preview locally:

```bash
python3 -m http.server 8000 -d docs
```

Then open:

```text
http://localhost:8000
```

To publish it with GitHub Pages, use GitHub repository settings:

```text
Settings > Pages > Build and deployment > Deploy from a branch > main > /docs
```

## Current MVP

The runner:

- reads rows from `YMD-TEST-EXEC-v01`
- filters rows where `Automation Candidate = Yes`
- dispatches to a deterministic Playwright recipe by `Test Case ID`
- writes execution results back to the sheet
- captures screenshots/traces under `artifacts/`
- creates or reuses a bug record when a failure has no existing real `Bug ID(s)`

The runner supports two bug tracker modes:

- `BUG_TRACKER=local` writes `LOCAL-BUG-####` placeholders to `.yupmd-bugs.json` and links them on the execution row only.
- `BUG_TRACKER=google-sheets` appends real bug rows to `YMD-BUGS-v01` and links the generated `BUG-###` back on the execution row.

Both modes dedupe by automation fingerprint. If a row already has a real bug ID, such as `BUG-018`, the runner reuses that ID instead of creating another bug.

## Sheet Contract

The runner reads:

| Column | Header |
| --- | --- |
| A | Test Case ID |
| E | Scenario |
| F | Preconditions / Test Data |
| G | Steps |
| H | Expected Result |
| I | Priority |
| J | Status |
| M | Bug ID(s) |
| Q | Automation Candidate |

The runner writes:

| Column | Header |
| --- | --- |
| J | Status |
| K | Date Executed |
| L | Actual Result |
| M | Bug ID(s) |
| N | Evidence Ref |
| O | Console Errors |
| P | Notes |

Allowed runner statuses are `Pass`, `Fail`, `Blocked`, `Not Run`, and `In Progress / Retest`.

## Setup

1. Install dependencies:

```bash
npm install
npx playwright install chromium
```

2. Copy `.env.example` to `.env` and fill in credentials.

3. Share the Google Sheet with the service account email from `GOOGLE_APPLICATION_CREDENTIALS`.

4. Use `BUG_TRACKER=local` for safe test runs, or `BUG_TRACKER=google-sheets` when failures should be written to `YMD-BUGS-v01`.

5. Confirm the sheet rows marked `Automation Candidate = Yes` are the ones you want the runner to touch.

6. Keep `YUPMD_PRODUCT_PATHS` limited to product routes that are expected to exist. The default starter list is:

```text
/products/2,/products/1,/products/3,/products/8,/products/9
```

7. `YUPMD_MOBILE_DEVICE` controls the device profile used by `--mobile`; it defaults to `iPhone 14`.

8. `YUPMD_CHECKOUT_INTAKE_PATH` controls the product intake used by checkout-boundary tests; it defaults to `/medicine-form/3-NAD+`.

## Commands

List runnable rows and recipe coverage:

```bash
npm run list
```

Run a suite against all matching rows, regardless of current sheet status:

```bash
npm run run -- --suite=regression --all-statuses
npm run run -- --suite=public --all-statuses
npm run run -- --suite=auth --all-statuses
npm run run -- --suite=smoke --all-statuses
```

Run the combined regression suite in a mobile web view:

```bash
npm run run -- --suite=regression --all-statuses --mobile --no-write
npm run run -- --suite=regression --all-statuses --mobile
```

Run checkout-boundary checks without submitting an order:

```bash
npm run run -- --id=CHK-01,CHK-10,CHK-11 --no-write
```

Use a specific Playwright mobile device profile:

```bash
npm run run -- --suite=regression --all-statuses --mobile --device="iPhone 14"
```

Dry run the first five eligible rows without touching the browser or writing results:

```bash
npm run run:dry
```

Run a single recipe:

```bash
npm run run -- --id=AUTH-03
```

Watch a browser run visibly:

```bash
npm run run -- --id=AUTH-03 --headed --slow-mo=250
```

Run the browser without updating the Google Sheet:

```bash
npm run run -- --id=AUTH-03 --headed --slow-mo=250 --no-write
```

Run up to five eligible rows:

```bash
npm run run -- --limit=5
```

## First Recipes

Implemented recipes:

- `AUTH-03` login with valid credentials
- `AUTH-04` login with invalid password
- `AUTH-06` session persistence after refresh
- `AUTH-07` logout clears session
- `INT-01` active product page console smoke
- `INT-03` required intake question blocks empty progression
- `INT-08` multi-choice intake question accepts multiple answers
- `INT-09` back navigation preserves intake selections
- `CHK-01` checkout plan, discount, and payment method controls render
- `CHK-10` invalid checkout discount code shows an error
- `CHK-11` Add New Card opens secure Stripe payment entry
- `PROD-12` configured product route audit

## Expansion Plan

The suite should grow in this order:

1. `public` smoke: product pages, legal/footer links, contact/help routes.
2. `auth`: signup validation, duplicate email, login, logout, password reset trigger.
3. `intake`: required fields, invalid DOB/phone/state validation, mobile intake checks.
4. `checkout`: payment error cards, consent required, order summary accuracy.
5. `dashboard`: orders, documents, profile, chat, referrals, invitations.
6. Full `e2e`: product-specific purchase flows using isolated test accounts and Stripe cards.

Rows whose steps are still manual or destructive should stay unsupported until they have deterministic setup data and safe assertions.
