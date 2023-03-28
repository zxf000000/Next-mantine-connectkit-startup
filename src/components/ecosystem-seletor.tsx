import {Chain, Ecosystem} from "@prisma/client";
import {useEffect, useState} from "react";
import {useChains, useEcosystems} from "@/utils/api/fetches";
import {Select, SelectItem} from "@mantine/core";

type Props = {
    value: Ecosystem | null,
    onChange: (chain: Ecosystem) => void;
}

const EcosystemSelector = ({value, onChange}: Props) => {
    const [chains, setChains] = useState<Ecosystem[]>([]);
    const [chainValues, setChainValues] = useState<{
        value: string,
        label: string,
        item: Ecosystem
    }[]>([])
    const [selected, setSelected] = useState<{
        value: string,
        label: string,
        item: Ecosystem
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
    const {data, loading} = useEcosystems();
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
            label={"选择生态"}
            data={chainValues}
            value={selected?.value}
            onChange={handleChange}
        ></Select>
    )
}

export default EcosystemSelector;
