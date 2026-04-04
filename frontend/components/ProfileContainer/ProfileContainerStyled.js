import styled from "styled-components";
import { Button as BaseButton } from "../ModalWindow/ModalWindowStyled";

export const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    width: 80%;
    margin: 0 auto;
`;

export const UserInfoCard = styled.div`
    border: 1px solid white;
    border-radius: 12px;
    grid-column: 1;
    grid-row: 1;
`;

export const UserInfoText = styled.div`
    background: #3a0000;
    border-radius: 12px 12px 0 0;
    padding: 10px;
    font-weight: bold;
`;

export const SimulationCard = styled(UserInfoCard)`
    grid-column: 2;
    grid-row: 1;    
`;

export const UserInfoBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`

export const SimulationBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`

export const InfoSpan = styled.span`
    margin: 5px;
    display: flex;
    align-items: center;
    gap: 3px;
`

export const BoldSpan = styled.span`
    font-weight: bold;
    margin-right: 2px;
`

export const SimulationText = styled(UserInfoText)``;

export const Button = styled(BaseButton)``;
