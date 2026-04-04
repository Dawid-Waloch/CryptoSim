import { useAuth } from "../../context/AuthContext";
import { PersonIcon, EmailIcon, AccountBalanceWalletIcon } from "../../icons";
import {
    BoldSpan,
    Button,
    InfoSpan,
    ProfileWrapper,
    SimulationBody,
    SimulationCard,
    SimulationText,
    UserInfoBody,
    UserInfoCard,
    UserInfoText
} from "./ProfileContainerStyled";

const ProfileContainer = ({ handleLogout, usdWallet, resetSimulation }) => {
    const { user } = useAuth();

    const { username, email } = user || {};

    return (
        <ProfileWrapper>
                <UserInfoCard>
                    <UserInfoText>User Info:</UserInfoText>
                    <UserInfoBody>
                        <InfoSpan>
                            <PersonIcon />
                            <BoldSpan>Username:</BoldSpan>
                            <span>{username}</span>
                        </InfoSpan>
                        <InfoSpan>
                            <EmailIcon />
                            <BoldSpan>E-mail:</BoldSpan>
                            <span>{email}</span>
                        </InfoSpan>
                        <Button onClick={handleLogout}>Logout</Button>
                    </UserInfoBody>
                </UserInfoCard>
                <SimulationCard>
                    <SimulationText>Simulation:</SimulationText>
                    <SimulationBody>
                        <InfoSpan>
                            <AccountBalanceWalletIcon />
                            <BoldSpan>Balance:</BoldSpan>
                            <span data-testid="wallet-balance">{Number(usdWallet.balance).toFixed(2)}$</span>
                        </InfoSpan>
                        <InfoSpan>
                            <AccountBalanceWalletIcon />
                            <BoldSpan>Start Balance:</BoldSpan>
                            <span  data-testid="start-balance">{Number(100).toFixed(2)}$</span>
                        </InfoSpan>
                        <Button onClick={resetSimulation}>Reset Simulation</Button>
                    </SimulationBody>
                </SimulationCard>
            </ProfileWrapper>
    );
}

export default ProfileContainer;