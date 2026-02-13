import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute"
import { useAuth } from "../../context/AuthContext";
import {
    InfoSpan,
    ProfileContainer,
    SimulationBody,
    SimulationCard,
    SimulationText,
    UserInfoBody,
    UserInfoCard,
    UserInfoText
} from "./styles";

const Profile = () => {
    const { user } = useAuth();

    const { username } = user || {};

    return (
        <ProtectedRoute>
            <Navbar />
            <ProfileContainer>
                <UserInfoCard>
                    <UserInfoText>User Info:</UserInfoText>
                    <UserInfoBody>
                        <InfoSpan>Username: {username}</InfoSpan>
                        <InfoSpan>E-mail: {}</InfoSpan>
                    </UserInfoBody>
                </UserInfoCard>
                <SimulationCard>
                    <SimulationText>Simulation:</SimulationText>
                    <SimulationBody>
                        <InfoSpan>Balance: {}</InfoSpan>
                    </SimulationBody>
                </SimulationCard>
            </ProfileContainer>
        </ProtectedRoute>
    )
}

export default Profile;