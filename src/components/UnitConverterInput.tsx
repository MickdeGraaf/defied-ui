import { FormControl, FormLabel, Input, propNames } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import React from "react";

interface UnitConverterProps {
    format: "wei" | "gwei" | "ether"
    title: string;
    value: BigNumber | undefined
    onUpdate: (value: BigNumber|undefined) => void
}




const UnitConverterInput = (props: UnitConverterProps) => {

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.currentTarget.value);
    
        if(e.currentTarget.value === "") {
            props.onUpdate(undefined);
            return;
        }

        props.onUpdate(
            ethers.utils.parseUnits(e.currentTarget.value, props.format)
        );
    
        console.log(typeof e.currentTarget.value);
    }

    const formattedValue = props.value ? ethers.utils.formatUnits(props.value, props.format).replace(/\.0+$/,'') : "";
    console.log(formattedValue);

    return(
        <FormControl>
            <FormLabel htmlFor={props.format}>{props.title}</FormLabel>
            <Input onChange={handleChange} id={props.format} type='number' placeholder={props.title} value={ formattedValue } />
        </FormControl>
    )
}

export default UnitConverterInput;