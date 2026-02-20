import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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