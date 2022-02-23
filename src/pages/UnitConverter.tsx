import { Box, Flex } from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { useState } from "react";
import PageHeader from "../components/PageHeader"
import UnitConverterInput from "../components/UnitConverterInput";

const UnitConverter = () => {

    const onUpdate = (value: BigNumber|undefined) => {
        console.log("setting value");
        setValue(value);
    };

    const [value, setValue] = useState<BigNumber|undefined>(undefined);

    return (
        <Flex flexFlow="column" style={{minHeight: "100vh"}}>
            <PageHeader>
               Unit Converter
            </PageHeader>
            <Box className="pageContent" flex="1" align="center">
                <UnitConverterInput format="wei" title="Wei" onUpdate={onUpdate} value={value} />
                <UnitConverterInput format="gwei" title="Gwei" onUpdate={onUpdate} value={value} />
                <UnitConverterInput format="ether" title="Ether" onUpdate={onUpdate} value={value} />

            </Box>
        </Flex>
    )
}

export default UnitConverter;