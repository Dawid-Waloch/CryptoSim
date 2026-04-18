export const createUser = () => {
    const id = Date.now();

    return {
        username: `test-${id}`,
        email: `test-${id}@example.com`,
        password: 'Password123!'
    }
    
};

export const registerTestUser = async ({ request }) => {
    const user = createUser();

    await request.post('http://localhost:8080/api/register', { data: user });

    return { user };
};

export const registerAndLoginTestUser = async ({ request, page }) => {
    const user = createUser();

    await request.post('http://localhost:8080/api/register', { data: user });

    await page.addInitScript((user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }, user);

    return { user };
};

export const deleteTestUser = async ({ request, username }) => {
    if (!username) throw new Error('Username is required to delete user');

    await request.delete(`http://localhost:8080/api/users/${username}`);
}

