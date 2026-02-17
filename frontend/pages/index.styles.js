import styled from "styled-components";
import { Button as BaseButton } from "./register/styles";

export const LandingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Header = styled.h1`
    font-size: 3em;
    margin: 0 0 15px 0;
`;

export const Subtitle = styled.div`
    font-size: 1.40em;
    font-weight: bold;
    margin: 0 0 20px 0;
`;

export const LeftColumn = styled.div`
    margin-right: 50px;
`;

export const RightColumn = styled.div`
    max-width: 500px;
    background: #5c0000;
    border-radius: 12px;
    padding: 0 25px 0 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);

    &:hover {
        transform: translateY(-2px);
        background-color: #7a0000;
        box-shadow: 0 4px 12px rgba(179, 0, 0, 0.4);
    }
`;

export const Paragraph = styled.p`
    font-size: 18px;
    line-height: 1.6;
`;

export const Button = styled(BaseButton)`
    width: 70%;
`;