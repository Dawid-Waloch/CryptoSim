import { test, expect } from '@playwright/test';
import { deleteTestUser, registerTestUser } from '../../db-utils';

test.describe('Login', () => {
    let testUser;

    test.beforeAll(async ({ request }) => {
        testUser = await registerTestUser({ request });
    });

    test.afterAll(async ({ request }) => {
        await deleteTestUser({
            request,
            username: testUser.user.username,
        });
    });

    test('allows user to log in with valid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.getByTestId('login-username-input').fill(testUser.user.username);
        await page.getByTestId('login-password-input').fill(testUser.user.password);
        await page.getByTestId('login-submit-btn').click();
        await expect(page).toHaveURL('/dashboard');
    });

    test('refuses user to log in with invalid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.getByTestId('login-username-input').fill('wrongUser');
        await page.getByTestId('login-password-input').fill('wrongUser123');
        await page.getByTestId('login-submit-btn').click();
        await expect(page.getByText(/user not found/i)).toBeVisible({ timeout: 4000 });
        await expect(page).toHaveURL('/login');
    });

    test('does not logging out after page refresh', async ({ page }) => {
        await page.goto('/login');
        await page.getByTestId('login-username-input').fill(testUser.user.username);
        await page.getByTestId('login-password-input').fill(testUser.user.password);
        await page.getByTestId('login-submit-btn').click();
        await expect(page).toHaveURL('/dashboard');
        await page.reload();
        await expect(page).toHaveURL('/dashboard');
    });
});
