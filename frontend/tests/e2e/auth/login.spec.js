import { test, expect } from '@playwright/test';
import { deleteTestUser, registerTestUser } from '../../db-utils';

test.describe('Login', () => {
    let testUser;

    test.beforeEach(async ({ request }) => {
        testUser = await registerTestUser({ request });
    });

    test.afterEach(async ({ request }) => {
        await deleteTestUser({
            request,
            username: testUser.user.username,
        });
    });

    test('allows user to log in with valid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.getByTestId('login-username-input').fill(testUser.user.username);
        await page.getByTestId('login-password-input').fill(testUser.user.password);

        await Promise.all([
            page.waitForURL('/dashboard'),
            page.getByTestId('login-submit-btn').click()
        ]);

        await expect(page.getByText(/welcome/i)).toBeVisible();
    });

    test('refuses user to log in with invalid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.getByTestId('login-username-input').fill('wrongUser');
        await page.getByTestId('login-password-input').fill('wrongUser123');
        await page.getByTestId('login-submit-btn').click();

        await expect(page.getByText(/user not found/i)).toBeVisible();
        await expect(page).toHaveURL('/login');
    });

    test('does not logging out after page refresh', async ({ page }) => {
        await page.goto('/login');

        await page.getByTestId('login-username-input').fill(testUser.user.username);
        await page.getByTestId('login-password-input').fill(testUser.user.password);

        await Promise.all([
            page.waitForURL('/dashboard'),
            page.getByTestId('login-submit-btn').click()
        ]);

        await page.reload();

        await expect(page).toHaveURL('/dashboard');
    });
});
