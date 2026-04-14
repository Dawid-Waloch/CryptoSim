import { test, expect } from '@playwright/test';
import { createUser, deleteTestUser } from '../../db-utils';

test.describe('Register', () => {
    let mockUser;

    test.beforeEach(async () => {
        mockUser = createUser();
    });

    test.afterEach(async ({ request }) => {
        await deleteTestUser({ request, username: mockUser.username });
    });

    test('Register user with valid credentials', async ({ page, request }) => {
        await page.goto('/register');
        await page.getByTestId('register-username-input').fill(mockUser.username);
        await page.getByTestId('register-email-input').fill(mockUser.email);
        await page.getByTestId('register-password-input').fill(mockUser.password);
        await page.getByTestId('register-repeat-password-input').fill(mockUser.password);
        await page.getByTestId('register-submit-btn').click();

        await expect(page.getByText(/registration success/i)).toBeVisible({ timeout: 4000 });
    });
});