import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { useToast } from "../../context/ToastContext";
import { LoginIcon, PersonIcon, LockIcon } from "../../icons";
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
    const [formError, setFormError] = useState([]);
    const { setFlashMessage } = useToast();
    const { login } = useAuth();
    const router = useRouter();

    const isFormValid = () => {
        const newErrors = [];
        if(!username) newErrors.push({id: "username", error: "Fill the username field"});
        if(!password) newErrors.push({id: "password", error: "Fill the password field"});
        setFormError(newErrors);

        return newErrors.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid()) return;

        try {
            // TODO
            // Local server
            const response = await fetch("http://localhost:8080/api/login", {
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

            if(!response.ok || data.success === false) {
                throw new Error(data.message);
            }

            setFlashMessage({ type: "success", message: "Login success" });
            login({username: data.username, userId: data.userId, email: data.email});
            router.push("/dashboard");
        } catch (err) {
            setFlashMessage({type: "error", message: err.message || "Server unreachable" });
        }
    }

    const getError = (id) => formError.find(err => err.id === id)?.error;

    return (
        <>
            <Navbar />
            <LoginContainer>
                <FormContainer>
                    <FormName>
                        <LoginIcon />
                        <span data-testid='login-span'>Login</span>
                    </FormName>
                    <form onSubmit={handleSubmit}>
                        <FieldContainer>
                            <Label htmlFor="username">
                                <PersonIcon />
                                <span>Username:</span>
                            </Label>
                            <Input
                                data-testid="login-username-input"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <ErrorContainer>{getError("username")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="password">
                                <LockIcon />
                                <span>Password:</span>
                            </Label>
                            <Input
                                data-testid="login-password-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ErrorContainer>{getError("password")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Button data-testid="login-submit-btn" type="submit">Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
            </LoginContainer>
        </>
    )
}

export default LoginPage;