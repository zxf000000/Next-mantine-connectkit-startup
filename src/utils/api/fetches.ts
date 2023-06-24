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

export function useWallets() {
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

export function useChains() {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/chains",
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

export function useCategories() {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/categories",
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

export function useEcosystems() {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/ecosystems",
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

export function useJobs() {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/jobs",
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

export function useSocialAccounts() {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/accounts",
        method: "GET",
        enabled: true,
    })
    return {
        data,
        loading,
        mutate,
        error
    }
}

export function useJob(id: number) {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/jobs/" + id,
        method: "GET",
        enabled: Boolean(id)
    })
    return {
        data,
        mutate,
        loading,
        error,
    }
}

export function useWalletsWithJob(jobId: number) {
    const {data, mutate, error, loading} = useRequest({
        url: "/api/wallets/withJob?jobId=" + jobId,
        method: "GET",
        enabled: Boolean(jobId)
    })
    return {
        data,
        mutate,
        loading,
        error,
    }
}


