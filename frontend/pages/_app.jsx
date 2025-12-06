import { AuthProvider } from '../context/AuthContext';
import '../styles/global.css';

const CryptoSim = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )  
}

export default CryptoSim;