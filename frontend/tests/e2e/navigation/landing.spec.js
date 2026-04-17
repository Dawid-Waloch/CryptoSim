import { test, expect } from '@playwright/test';
import { registerAndLoginTestUser } from '../../db-utils';

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

