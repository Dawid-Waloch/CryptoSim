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

    test('registers user with valid credentials', async ({ page }) => {
        await page.goto('/register');

        await page.getByTestId('register-username-input').fill(mockUser.username);
        await page.getByTestId('register-email-input').fill(mockUser.email);
        await page.getByTestId('register-password-input').fill(mockUser.password);
        await page.getByTestId('register-repeat-password-input').fill(mockUser.password);
        await page.getByTestId('register-submit-btn').click();

        await expect(page.getByText(/registration success/i)).toBeVisible();
        await expect(page).toHaveURL('/login');
    });

    test('registers user with already existing username', async ({ page, request }) => {
        await request.post('http://localhost:8080/api/register', { data: mockUser });
        
        await page.goto('/register');

        await page.getByTestId('register-username-input').fill(mockUser.username);
        await page.getByTestId('register-email-input').fill(mockUser.email);
        await page.getByTestId('register-password-input').fill(mockUser.password);
        await page.getByTestId('register-repeat-password-input').fill(mockUser.password);
        await page.getByTestId('register-submit-btn').click();
        
        await expect(page.getByText(/username already exists/i)).toBeVisible();
    });

    test('registers user with already existing email', async ({ page, request }) => {
        await request.post('http://localhost:8080/api/register', { data: mockUser });

        await page.goto('/register');

        await page.getByTestId('register-username-input').fill(`${mockUser.username}_new`);
        await page.getByTestId('register-email-input').fill(mockUser.email);
        await page.getByTestId('register-password-input').fill(mockUser.password);
        await page.getByTestId('register-repeat-password-input').fill(mockUser.password);
        await page.getByTestId('register-submit-btn').click();

        await expect(page.getByText(/email already exists/i)).toBeVisible();
    });
});