import { test, expect } from '@playwright/test';

const BLOCK_URL = 'https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732';

test.describe('Bitcoin Block 680000 Tests', () => {
  test('Test Case 1: Validate transaction list heading shows "25 of 2875 Transactions"', async ({ page }) => {
    await page.goto(BLOCK_URL, { waitUntil: 'networkidle' });
    
    const heading = await page.locator("//div[@class='transactions']/h3").textContent();
    console.log(`Found heading: ${heading}`);
    expect(heading?.trim()).toBe('25 of 2875 Transactions');
  });

  test('Test Case 2: Find transactions with exactly 1 input and 2 outputs', async ({ page }) => {
    await page.goto(BLOCK_URL, { waitUntil: 'networkidle' });

    const transactionsList = await page.locator("//div[@class='ins-and-outs']");
    const transactions = await transactionsList.all();
    console.log(`Found ${transactions.length} transactions`);
    
    const matchingTransactions: string[] = [];
    
    for (const transaction of transactions) {
      const inputs = await transaction.locator('.vin').count();

      const outputs = await transaction.locator('.vout').count();
      
      if (inputs === 1 && outputs === 2) {
        const transactionText = await transaction.textContent() || '';
        const hashMatch = transactionText.match(/[a-f0-9]{64}/);
        
        if (hashMatch) {
          matchingTransactions.push(hashMatch[0]);
        }
      }
    }
    
    console.log(`Found ${matchingTransactions.length} transactions with exactly 1 input and 2 outputs:`);
    matchingTransactions.forEach((hash, index) => {
      console.log(`${index + 1}. Transaction Hash: ${hash}`);
    });
    
    expect(matchingTransactions.length).toBeGreaterThan(0);
  });
});
