import styled from "styled-components";
import CancelIcon from '@mui/icons-material/Cancel';

export const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background: linear-gradient(
        135deg,
        #000000,
        #200000,
        #3a0000,
        #5c0000,
        #8b0000
    );
    padding: 24px;
    border-radius: 12px;
    color: white;
    min-width: 300px;
`;

export const CancelContainer = styled.div`
    display: flex;
    justify-content: right;
`

export const Icon = styled(CancelIcon)`
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 0 0 15px white;
        border-radius: 1em;
        transform: translateY(-1px);
    }
`

export const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
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

export const AssetInfo = styled.h3`
    margin: 5px;
    text-align: center;
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
`