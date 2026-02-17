import { createContext, useContext, useState } from "react";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);

    return (
        <AssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
            {children}
        </AssetContext.Provider>
    )
};

export const useAsset = () => useContext(AssetContext);