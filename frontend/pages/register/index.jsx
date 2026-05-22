import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import { useToast } from "../../context/ToastContext";
import { AppRegistrationIcon, EmailIcon, PersonIcon, LockIcon } from "../../icons";
import {
    Button,
    FieldContainer,
    FormContainer,
    FormName,
    Input,
    Label,
    RegistrationContainer,
    ErrorContainer
} from "./styles";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [formError, setFormError] = useState([]);
    const { setFlashMessage } = useToast();
    const router = useRouter();

    const isFormValid = () => {
        const newErrors = [];
        if(!username) newErrors.push({id: "username", error: "Fill the username field"});
        if(!email.includes("@")) newErrors.push({id: "email", error: "Your email has to include @"});
        if(password.length < 8) newErrors.push({id: "password", error: "Your password has to contain more than 7 characters"});
        if(password !== repeatPassword) newErrors.push({id: "repeatPassword", error: "You password and repeat password have to be the same"});
        setFormError(newErrors);

        return newErrors.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid()) return;

        try {
            // TODO
            // Local server
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if(!response.ok || data.success === false) {
                throw new Error(data.message);
            }

            setFlashMessage({ type: "success", message: "Registration success" });
            router.push("/login");
        } catch (err) {
            setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
        }
    }

    const getError = (id) => formError.find(err => err.id == id)?.error;

    return (
        <>
            <Navbar />
            <RegistrationContainer>
                <FormContainer>
                    <FormName>
                        <AppRegistrationIcon />
                        <span>Registration</span>
                    </FormName>
                    <form onSubmit={handleSubmit}>
                        <FieldContainer>
                            <Label htmlFor="username">
                                <PersonIcon />
                                <span>Username:</span>
                            </Label>
                            <Input
                                data-testid="register-username-input"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <ErrorContainer>{getError("username")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="email">
                                <EmailIcon />
                                <span>E-mail:</span>
                            </Label>
                            <Input
                                data-testid="register-email-input"
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <ErrorContainer>{getError("email")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="password">
                                <LockIcon />
                                <span>Password:</span>
                            </Label>
                            <Input
                                data-testid="register-password-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ErrorContainer>{getError("password")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="repeat_password">
                                <LockIcon />
                                <span>Repeat password:</span>
                            </Label>
                            <Input
                                data-testid="register-repeat-password-input"
                                type="password"
                                placeholder="Repeat password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <ErrorContainer>{getError("repeatPassword")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Button data-testid="register-submit-btn" type="submit">Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
            </RegistrationContainer>
        </>
    )
}

export default RegisterPage;