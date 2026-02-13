import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute"

const Profile = () => {
    return (
        <ProtectedRoute>
            <Navbar />
            <div>Profile</div>
        </ProtectedRoute>
    )
}

export default Profile;