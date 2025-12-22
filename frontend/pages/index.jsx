import Link from "next/link";
import { Header, LandingContainer, Button, Subtitle, LeftColumn, RightColumn, Paragraph, Card } from "./index.styles";

const LandingPage = () => (
        <LandingContainer>
            <LeftColumn>
                <Header>CryptoSim</Header>
                <Subtitle>Trade. Learn. Repeat.</Subtitle>
                <Link href={"/login"}>
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

export default LandingPage;