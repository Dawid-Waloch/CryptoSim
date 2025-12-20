import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import {
    Button,
    FieldContainer,
    FormContainer,
    FormName,
    Input,
    Label,
    LoginContainer,
    ErrorContainer
} from "./styles";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const router = useRouter();
    const { login } = useAuth();

    const isFormValid = () => {
        const newErrors = [];
        if(!username) newErrors.push({id: "username", error: "Fill the username field"});
        if(!password) newErrors.push({id: "password", error: "Fill the password field"});
        setError(newErrors);

        return newErrors.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid()) return;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            const data = await response.json();

            if(!response.ok) {
                setError(data.errors || [{ id: "api", error: data.message }]);
            }

            login({ username: data.username, token: data.token });

            router.push("/");
        } catch (err) {
            setError([{id: "network", error: "Server unreachable"}]);
        }
    }

    const getError = (id) => error.find(err => err.id === id)?.error;

    return (
        <>
            <Navbar />
            <LoginContainer>
                <FormContainer>
                    <FormName>Login</FormName>
                    <form onSubmit={handleSubmit}>
                        <FieldContainer>
                            <Label htmlFor="username">Username:</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <ErrorContainer>{getError("username")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="password">Password:</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ErrorContainer>{getError("password")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Button type="submit">Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
                <ErrorContainer>{getError("network")}</ErrorContainer>
                <ErrorContainer>{getError("api")}</ErrorContainer>
            </LoginContainer>
        </>
    )
}

export default LoginPage;