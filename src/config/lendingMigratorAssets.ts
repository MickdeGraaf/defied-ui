const lendingMigratorAssets = {
    
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
        "protocol": "none",
        "decimals": 6,
        "name": "USDC",
        "symbol": "USDC",

        "lendingTokens": {
            "0xbcca60bb61934080951369a648fb03df4f96263c": {
                // "underlying": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "protocol": "AaveV2",
                "decimals": 6,
                "name": "aUSDC",
                "symbol": "aUSDC",
            },
            "0xeb91861f8a4e1c12333f42dce8fb0ecdc28da716": {
                "protocol": "Euler",
                "decimals": 18,
                "name": "eUSDC",
                "symbol": "eUSDC",
            }
        }
    }
}

export default lendingMigratorAssets;