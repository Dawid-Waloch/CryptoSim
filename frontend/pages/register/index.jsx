import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
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
    const [error, setError] = useState([]);
    const router = useRouter();

    const isFormValid = () => {
        const newErrors = [];
        if(!username) newErrors.push({id: "username", error: "Fill the username field"});
        if(!email.includes("@")) newErrors.push({id: "email", error: "Your email has to include @"});
        if(password.length < 8) newErrors.push({id: "password", error: "Your password has to contain more than 7 characters"});
        if(password !== repeatPassword) newErrors.push({id: "repeatPassword", error: "You password and repeat password have to be the same"});
        setError(newErrors);

        return newErrors.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid()) return;

        try {
            const response = await fetch("/api/register", {
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

            if(!response.ok) {
                setError([{ id: "api", error: data.message }]);
            }

            console.log("REGISTRATION SUCCESS", data);
            router.push("/");
        } catch (err) {
            setError([{ id: "network", error: "Server unreachable" }]);
        }
    }

    const getError = (id) => error.find(err => err.id == id)?.error;

    return (
        <>
            <Navbar />
            <RegistrationContainer>
                <FormContainer>
                    <FormName>Registration</FormName>
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
                            <Label htmlFor="email">E-mail:</Label>
                            <Input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <ErrorContainer>{getError("email")}</ErrorContainer>
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
                            <Label htmlFor="repeat_password">Repeat password:</Label>
                            <Input
                                type="password"
                                placeholder="Repeat password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <ErrorContainer>{getError("repeatPassword")}</ErrorContainer>
                        </FieldContainer>
                        <FieldContainer>
                            <Button type="submit">Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
                <ErrorContainer>{getError("network")}</ErrorContainer>
                <ErrorContainer>{getError("api")}</ErrorContainer>
            </RegistrationContainer>
        </>
    )
}

export default RegisterPage;