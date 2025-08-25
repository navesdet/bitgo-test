# Bitcoin Block Testing Suite

A Playwright-based UI automation test suite for testing Bitcoin block 680000 on blockstream.info.

## Test Cases

**Test Case 1**: Validates transaction list heading shows "25 of 2875 Transactions"  
**Test Case 2**: Finds and prints transaction hashes with exactly 1 input and 2 outputs

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
```

