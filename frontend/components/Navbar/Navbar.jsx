import { useAuth } from "../../context/AuthContext";
import { NavbarContainer, NavLink, NavLinks, NavLogo } from "./NavbarStyled";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <NavbarContainer>
            <NavLogo>
                <NavLink href={"/"}>CryptoSim</NavLink>
            </NavLogo>
            <NavLinks>
                {user ? (
                    <>
                        <NavLink href={"/portfolio"}>Portfolio</NavLink>
                        <NavLink href={"/trade"}>Trade</NavLink>
                        <NavLink href={"/market"}>Market</NavLink>
                        <NavLink href={"/profile"}>Profile</NavLink>
                    </>
                ): (
                    <>
                        <NavLink href={"/login"}>Login</NavLink>
                        <NavLink href={"/register"}>Register</NavLink>
                    </>
                )}
            </NavLinks>
        </NavbarContainer>
    )
}

export default Navbar;