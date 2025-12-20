import styled from "styled-components"

export const RegistrationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const FormContainer = styled.div`
    min-width: 300px;
    margin: 50px auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-bottom: 5px;
`;

export const Label = styled.label`
    font-weight: 600;
    margin-top: 0.5rem;
    display: block;
    color: #fff;
`;

export const Input = styled.input`
    padding: 0.8rem 1rem;
    margin: 0.5rem 0 1rem 0;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;

    &:focus {
        border-color: #8b0000;
        outline: none;
        box-shadow: 0 0 8px #8b0000;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #3a0000, #8b0000);
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s all;

    &:hover {
        background: linear-gradient(135deg, #5c0000, #b30000);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(179, 0, 0, 0.4);
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
`;

export const FormName = styled.div`
    font-weight: bold;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
`

export const ErrorContainer = styled.div`
    color: red;
    font-weight: bolder;
`