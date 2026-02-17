import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
    Header,
    LandingContainer,
    Button,
    Subtitle,
    LeftColumn,
    RightColumn,
    Paragraph,
} from "./index.styles";

const LandingPage = () => {
    const { user } = useAuth();
    
    return (
        <LandingContainer>
            <LeftColumn>
                <Header>CryptoSim</Header>
                <Subtitle>Trade. Learn. Repeat.</Subtitle>
                <Link href={user ? "/dashboard" : "/login"}>
                    <Button>Start Trading</Button>
                </Link>
            </LeftColumn>
            <RightColumn>
                <Paragraph>
                    Educational market simulator that allows you to trade cryptocurrencies and stocks using virtual money.
                    Learn how financial markets work, analyze real price movements, and test investment strategies — all without any risk.
                </Paragraph>
                <Paragraph>
                    Create an account, get a virtual balance, and start trading.
                </Paragraph>
            </RightColumn>
        </LandingContainer>
    )
}

export default LandingPage;