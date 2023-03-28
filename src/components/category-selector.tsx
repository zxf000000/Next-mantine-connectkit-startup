import {Category, Chain} from "@prisma/client";
import {useEffect, useState} from "react";
import {useCategories, useChains} from "@/utils/api/fetches";
import {Select, SelectItem} from "@mantine/core";

type Props = {
    value: Category | null,
    onChange: (chain: Category) => void;
}

const CategorySelector = ({value, onChange}: Props) => {
    const [items, setItems] = useState<Category[]>([]);
    const [itemValues, setItemValues] = useState<{
        value: string,
        label: string,
        item: Category
    }[]>([])
    const [selected, setSelected] = useState<{
        value: string,
        label: string,
        item: Category
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
        const item = items.find((item) => {
            return item.id + "" === value;
        });
        if (item) {
            onChange(item);
        }
    }
    const {data, loading} = useCategories();
    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    useEffect(() => {
        if (items) {
            setItemValues(items.map((item) => ({
                value: item.id + "",
                label: item.name,
                item: item,
            })))
        }
    }, [items]);

    return (
        <Select
            label={"选择板块"}
            data={itemValues}
            onChange={handleChange}
        ></Select>
    )
}

export default CategorySelector;
