import { Toaster } from 'react-hot-toast';
import Providers from '../components/Providers';
import FlashMessageListener from "../components/FlashMessageListener/FlashMessageListener";
import '../styles/global.css';

const CryptoSim = ({ Component, pageProps }) => {
    return (
        <Providers>
            <FlashMessageListener />
            <Component {...pageProps} />
            <Toaster />
        </Providers>
    )  
}

export default CryptoSim;