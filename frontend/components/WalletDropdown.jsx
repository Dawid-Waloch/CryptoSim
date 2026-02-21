import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { AccountBalanceWalletIcon } from "../icons";

const WalletDropdown = ({ wallets }) => {
    const [selectedValue, setSelectedValue] = useState(wallets[0].id);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
    <Select
        value={selectedValue}
        onChange={handleChange}
        fullWidth
        sx={{
            color: "white",
            fontSize: "1.5em",
            backgroundColor: "transparent",
            "& .MuiSelect-icon": { color: "white" }
        }}
        MenuProps={{
            PaperProps: {
                sx: {
                    backgroundColor: "#3a0000",
                    color: "white"
                }
            }
        }}
        renderValue={(selectedId) => {
            const wallet = wallets.find(w => w.id === selectedId);
            return wallet ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{wallet.currency} {wallet.balance}</span>
                    <AccountBalanceWalletIcon fontSize="large" />
                </div>
            ) : null;
        }}
    >
        {wallets.map(wallet => (
        <MenuItem
            key={wallet.id}
            value={wallet.id}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: "white",
                backgroundColor: "#3a0000",
                "&:hover": { backgroundColor: "#5a0000" },
                "&.Mui-selected": { backgroundColor: "#2c0000", color: "white" },
                "&.Mui-selected:hover": { backgroundColor: "#5a0000" },
                "&.Mui-focusVisible": { 
                    outline: "none",
                    boxShadow: "none",
                    backgroundColor: "#5a0000"
                }
            }}
        >
            <span>{wallet.currency} {wallet.balance}</span>
            <AccountBalanceWalletIcon fontSize="large" />
        </MenuItem>
        ))}
    </Select>
  );
};

export default WalletDropdown;