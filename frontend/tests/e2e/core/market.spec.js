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
});