import { Chain } from "@prisma/client";
import {useEffect, useState} from "react";
import {useChains} from "@/utils/api/fetches";
import {Select, SelectItem} from "@mantine/core";

type Props = {
    value: Chain | null,
    onChange: (chain: Chain) => void;
}

const ChainSelector = ({value, onChange}: Props) => {
    const [chains, setChains] = useState<Chain[]>([]);
    const [chainValues, setChainValues] = useState<{
        value: string,
        label: string,
        item: Chain
    }[]>([])
    const [selected, setSelected] = useState<{
        value: string,
        label: string,
        item: Chain
    } | null>(null);
    useEffect(() => {
        if (value) {
            setSelected({
                value: value.id + "",
                label: value.name,
                item: value
            })
        } else {
            setSelected(null);
        }
    }, [value]);
    const handleChange = (value: any) => {
        const item = chains.find((item) => {
            return item.id + "" === value;
        });
        if (item) {
            onChange(item);
        }
    }
    const {data, loading} = useChains();
    useEffect(() => {
        if (data) {
            setChains(data);
        }
    }, [data]);

    useEffect(() => {
        if (chains) {
            setChainValues(chains.map((item) => ({
                value: item.id + "",
                label: item.name,
                item: item,
            })))
        }
    }, [chains]);

    return (
        <Select
            label={"选择网络"}
            data={chainValues}
            onChange={handleChange}
        ></Select>
    )
}

export default ChainSelector;
