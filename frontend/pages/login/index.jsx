import Navbar from "../../components/Navbar/Navbar";
import {
    Button,
    FieldContainer,
    FormContainer,
    FormName,
    Input,
    Label,
    LoginContainer
} from "./styles";

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <LoginContainer>
                <FormContainer>
                    <FormName>Login</FormName>
                    <form>
                        <FieldContainer>
                            <Label htmlFor="username">Username:</Label>
                            <Input type="text" placeholder="Username" />
                        </FieldContainer>
                        <FieldContainer>
                            <Label htmlFor="password">Password:</Label>
                            <Input type="password" placeholder="Password" />
                        </FieldContainer>
                        <FieldContainer>
                            <Button>Submit</Button>
                        </FieldContainer>
                    </form>
                </FormContainer>
            </LoginContainer>
        </>
    )
}

export default LoginPage;