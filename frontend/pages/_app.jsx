import { Toaster } from 'react-hot-toast';
import Providers from '../components/Providers';
import '../styles/global.css';

const CryptoSim = ({ Component, pageProps }) => {
    return (
        <Providers>
            <Component {...pageProps} />
            <Toaster />
        </Providers>
    )  
}

export default CryptoSim;