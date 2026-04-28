import { test as base, expect } from '@playwright/test';
import { deleteTestUser, registerAndLoginTestUser } from '../../db-utils';

const test = base.extend({
    dashboardSetup: async ({ request }, use) => {
        const assets = await request.get('http://localhost:8080/assets');
        const assetsList = await assets.json();
        const asset = assetsList[0];
        
        await use({ asset });
    }
});

test.describe('Dashboard', () => {
    let testUser;
    let testData;

    test.beforeEach(async ({ request, page }) => {
        const { data, user } = await registerAndLoginTestUser({ request, page });
        testUser = user;
        testData = data;
    });

    test.afterEach(async ({ request }) => {
        await deleteTestUser({
            request,
            username: testUser.username
        });
    });
    
    test('loads dashboard correctly', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page.getByText(/welcome/i)).toBeVisible();
    });

    test('renders data correctly', async ({ page, request, dashboardSetup }) => {
        const { asset } = dashboardSetup;

        const quantity = 1;

        const wallets = await request.post(`http://localhost:8080/wallets/${testData.userId}`);
        const walletsList = await wallets.json();
        const usdWalletBalance = walletsList.wallets.find(w => w.currency === "USD").balance;
        const walletBalanceAfterBuy = usdWalletBalance - (asset.currentPrice * quantity);

        await request.post('http://localhost:8080/transactions/buy', { data: 
            { userId: testData.userId, assetId: asset.id, quantity: quantity }
        });

        await page.goto('/dashboard');

        await page.getByTestId('dashboard-select').click();
        await page.getByTestId('dashboard-menu-item').click();

        await expect(page.getByTestId('dashboard-wallet-balance')).toContainText(walletBalanceAfterBuy.toString());

        await expect(page.getByTestId('dashboard-overview-asset-name')).toContainText(asset.name);

        await expect(page.getByTestId('dashboard-transactions-asset-name')).toContainText(asset.name);
        await expect(page.getByTestId('dashboard-transactions-op-type')).toContainText(/buy/i);
    });
});