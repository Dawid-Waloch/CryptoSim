import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
    MarketContainer,
    MarketInfo,
    AssetsCard,
    AssetsText,
    AssetsChartCard,
    AssetsChartText,
    FormCard,
    FormText
} from "./styles";

const Market = () => {
    return (
        <ProtectedRoute>
            <Navbar />
            <MarketContainer>
                <h2>Market</h2>
                <MarketInfo>
                    <AssetsCard>
                        <AssetsText>Stocks & Assets:</AssetsText>
                        <div>coś</div>
                    </AssetsCard>
                    <AssetsChartCard>
                        <AssetsChartText>Price chart:</AssetsChartText>
                        <div>coś 2</div>
                    </AssetsChartCard>
                    <FormCard>
                        <FormText>Buy form:</FormText>
                        <div>coś 3</div>
                    </FormCard>
                </MarketInfo>
            </MarketContainer>
        </ProtectedRoute>
    )
}

export default Market;