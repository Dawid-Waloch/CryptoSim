import { test, expect } from '@playwright/test';
import { deleteTestUser, registerAndLoginTestUser } from '../../db-utils';

test.describe('Landing - logged out', () => {
    test('redirects unlogged user correctly', async ({ page }) => {
        await page.goto('/');

        await Promise.all([
            page.waitForURL('/login'),
            page.getByTestId('landing-btn').click()
        ]);

        await expect(page.getByTestId('login-span')).toBeVisible();
    });

});

test.describe('Landing - logged in', () => {
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

    test('redirects logged user correctly', async ({ page }) => {
        await page.goto('/');

        await Promise.all([
            page.waitForURL('/dashboard'),
            page.getByTestId('landing-btn').click()
        ]);

        await expect(page.getByText(/welcome/i)).toBeVisible();
    });
});