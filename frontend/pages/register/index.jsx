import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
    Button,
    FieldContainer,
    FormContainer,
    FormName,
    Input,
    Label,
    RegistrationContainer
} from "./styles";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState([]);

    const isFormValid = () => {
        const newErrors = [];
        if(!username) newErrors.push({id: 1, error: "Fill the username field"});
        if(!email.includes("@")) newErrors.push({id: 2, error: "Your email has to include @"});
        if(password.length < 8) newErrors.push({id: 3, error: "Your password has to contain more than 7 characters"});
        if(password !== repeatPassword) newErrors.push({id: 4, error: "You password and repeat password have to be the same"});
        setError(newErrors);

        return newErrors.length === 0;
    }

    const isFormReady = username && email && password && repeatPassword;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            console.log("Form submitted");
        }
    }

    return (
        <>
            <Navbar />
            <RegistrationContainer>
                <FormContainer>
                    <FormName>Registration</FormName>
                    <form>
                        <FieldContainer>
                            <Label htmlFor="username">Username:</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="email">E-mail:</Label>
                            <Input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="password">Password:</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="repeat_password">Repeat password:</Label>
                            <Input
                                type="password"
                                placeholder="Repeat password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <Button disabled={!isFormReady} onClick={handleSubmit}>Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
            </RegistrationContainer>
        </>
    )
}

export default RegisterPage;