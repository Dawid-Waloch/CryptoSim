import { useAuth } from "../../context/AuthContext";
import {
    AppRegistrationIcon,
    HomeIcon,
    StoreIcon,
    AccountCircleIcon,
    LoginIcon
} from "../../icons";
import {
    NavbarContainer,
    NavLink,
    NavLinks,
    NavLogo
} from "./NavbarStyled";

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
                        <NavLink href={"/dashboard"}>
                            <HomeIcon />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink href={"/market"}>
                            <StoreIcon />
                            <span>Market</span>
                        </NavLink>
                        <NavLink href={"/profile"}>
                            <AccountCircleIcon />
                            <span>Profile</span>
                        </NavLink>
                    </>
                ): (
                    <>
                        <NavLink href={"/login"}>
                            <LoginIcon />
                            <span>Login</span>
                        </NavLink>
                        <NavLink href={"/register"}>
                            <AppRegistrationIcon />
                            <span>Register</span>
                        </NavLink>
                    </>
                )}
            </NavLinks>
        </NavbarContainer>
    )
}

export default Navbar;