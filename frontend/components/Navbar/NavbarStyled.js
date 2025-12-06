import Link from "next/link";
import styled from "styled-components"

export const NavbarContainer = styled.nav`
    display: flex;
    background: transparent;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    border-radius: 1em;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
`;

export const NavLinks = styled.div`
    display: flex;
    padding: 0 20px;
`;

export const NavLogo = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`;

export const NavLink = styled(Link)`
    padding: 10px;
    color: white;
    text-decoration: none;
    font-size: 1.25em;

    &:hover {
        color: #ffffffd5;
    }
`