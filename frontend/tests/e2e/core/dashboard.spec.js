import { test, expect } from '@playwright/test';
import { deleteTestUser, registerAndLoginTestUser } from '../../db-utils';

test.describe('Dashboard', () => {
    const quantity = 1;
    let testUser;
    let asset;
    let usdWalletBalance;
    let walletBalanceAfterBuy;

    test.beforeEach(async ({ request, page }) => {
        const { data, user } = await registerAndLoginTestUser({ request, page });
        testUser = user;

        const assets = await request.get('http://localhost:8080/assets');
        const assetsList = await assets.json();
        asset = assetsList[0];
        

        const wallets = await request.post(`http://localhost:8080/wallets/${data.userId}`);
        const walletsList = await wallets.json();
        usdWalletBalance = walletsList.wallets.find(w => w.currency === "USD").balance;
        walletBalanceAfterBuy = usdWalletBalance - (asset.currentPrice * quantity);

        await request.post('http://localhost:8080/transactions/buy', { data: 
            { userId: data.userId, assetId: asset.id, quantity: quantity }
        });
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

    test('renders data correctly', async ({ page }) => {
        await page.goto('/dashboard');

        await page.getByTestId('dashboard-select').click();
        await page.getByTestId('dashboard-menu-item').click();
        await expect(page.getByTestId('dashboard-wallet-balance')).toContainText(walletBalanceAfterBuy.toString());

        await expect(page.getByTestId('dashboard-overview-asset-name')).toContainText(asset.name);

        await expect(page.getByTestId('dashboard-transactions-asset-name')).toContainText(asset.name);
        await expect(page.getByTestId('dashboard-transactions-op-type')).toContainText(/buy/i);
    });
});