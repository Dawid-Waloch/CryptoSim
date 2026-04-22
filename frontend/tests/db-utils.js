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

    const response = await request.post('http://localhost:8080/api/login', {
        data: { username: user.username, password: user.password }
    });

    const data = await response.json();

    await page.addInitScript((data) => {
        localStorage.setItem('userInfo', JSON.stringify({
            username: data.username,
            userId: data.userId,
            email: data.email
        }));
    }, data);

    return { user, data };
};

export const deleteTestUser = async ({ request, username }) => {
    if (!username) throw new Error('Username is required to delete user');

    await request.delete(`http://localhost:8080/api/users/${username}`);
}

