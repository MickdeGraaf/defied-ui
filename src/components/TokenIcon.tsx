import { utils } from "ethers";
import { useEffect, useState } from "react";

interface tokenIconProps {
    address: string
    size?: string;
}

const TokenIcon: React.FunctionComponent<tokenIconProps> = ({address, size}) => {
    const tokenURLBase = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/"

    const [errored, setErrored] = useState(false);

    const handleError = () => {
        setErrored(true)
    }

    useEffect(() => {
        setErrored(false);
    }, [address])

    if(errored) {
        return <span style={{height: size, width: size, textAlign: "center"}}>❓</span>
    }

    return(
        <img onError={handleError} style={{height: size}} src={`${tokenURLBase}/${utils.getAddress(address)}/logo.png`} />
    )
}

export default TokenIcon;