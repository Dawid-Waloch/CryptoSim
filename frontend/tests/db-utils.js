const createUser = () => {
    const id = Date.now();

    return {
        username: `test-${id}`,
        email: `test-${id}@example.com`,
        password: 'Password123!'
    }
    
};

export const registerAndloginTestUser = async ({ request }) => {
    const user = createUser();

    await request.post('http://localhost:8080/api/register', { data: user });

    await request.post('http://localhost:8080/api/login', { data: { username: user.username, password: user.password }});

    return { user };
};