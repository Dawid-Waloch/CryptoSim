import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { useToast } from "../../context/ToastContext";
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
    const { flashMessage, setFlashMessage, clearFlashMessage } = useToast();
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!flashMessage) return;

        if(flashMessage.type === "success") {
            toast.success(flashMessage.message, { duration: 4000 });
        } else {
            toast.error(flashMessage.message, { duration: 4000 });
        }
        
        clearFlashMessage();
    }, [flashMessage])

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

            console.log("login data", data);

            if(!response.ok || data.success === false) {
                throw new Error(data.message);
            }

            setFlashMessage({ type: "success", message: "Login success" });
            login({username: data.username, userId: data.userId});
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
            </LoginContainer>
        </>
    )
}

export default LoginPage;