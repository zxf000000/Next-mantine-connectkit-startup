import request from "@/utils/api/request";
import useSWR from "swr";

type UseRequestProps = {
    url: string,
    method: string,
    params?: any,
    data?: any,
    enabled: boolean
}

function useRequest({url, method, params, data, enabled = true}: UseRequestProps) {
    const {data: resData, mutate, error, isLoading} = useSWR(enabled ? url : null, (aUrl) => {
        return request({
            url: aUrl,
            method: method as "GET" | "POST" | "PUT" | "HEAD" | "PATCH",
            params,
            data,
        })
    });
    const loading = (!resData && !error) || isLoading;
    return {
        data: (resData as any)?.data,
        loading,
        mutate,
        error
    }
}

export function useWallets(address: string) {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/wallets",
        method: "GET",
        enabled: true
    })
    return {
        data,
        mutate,
        loading,
        error,
    }
}



