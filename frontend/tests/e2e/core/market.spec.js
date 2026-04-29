import { test as base, expect } from '@playwright/test';
import { deleteTestUser, registerAndLoginTestUser } from '../../db-utils';

const test = base.extend({
    marketSetup: async ({ request }, use) => {
        const assets = await request.get('http://localhost:8080/assets');
        const assetsList = await assets.json();

        await use({ assetsList });
    }
})

test.describe('Market', () => {
    let testUser;

    test.beforeEach(async ({ request, page }) => {
        const { user } = await registerAndLoginTestUser({ request, page });
        testUser = user;
    });

    test.afterEach(async ({ request }) => {
        await deleteTestUser({
            request,
            username: testUser.username
        });
    });

    test('loads market correctly', async ({ page }) => {
        await page.goto('/market');

        await expect(page.getByText(/stocks & assets:/i)).toBeVisible();
    });

    test('loads data correctly from api on page', async ({ page, marketSetup }) => {
        const { assetsList } = marketSetup;

        await page.goto('/market');

        await expect(page.getByTestId('market-asset-container')).toHaveCount(assetsList.length);
    });

    test('checks if buying assets works correctly', async ({ page, marketSetup }) => {
        const { assetsList } = marketSetup;
        const firstAsset = assetsList[0];
        const quantity = 2;
        
        await page.goto('/market');

        const totalCashSpan = await page.getByTestId('market-total-cash-span');

        await expect(totalCashSpan).toHaveText(/[\d.]+/);

        const totalCashText = await totalCashSpan.innerText();
        const totalCashValue = parseFloat(totalCashText.match(/[\d.]+/)?.[0] || '0');
        const totalCashValueAfterBuy = totalCashValue - (firstAsset.currentPrice * quantity);

        await page.getByTestId('market-asset-container').first().click();
        await page.getByTestId('market-quantity-input').fill(quantity.toString());
        await page.getByTestId('market-buy-btn').click();

        await expect(totalCashSpan).toContainText(totalCashValueAfterBuy.toString());
    });
});