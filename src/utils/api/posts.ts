import request from "@/utils/api/request";
import {Category, Chain, Ecosystem, Job} from "@prisma/client";

type AddWalletProps = {
    address: string,
    fp_number?: string,
    mnemonic?: string,
    p_key?: string,
    mm_pwd: string,
    id?: number,

}
export function addWallet(props: AddWalletProps) {
    return request({
        url: "/api/wallets/add",
        method: "POST",
        data: props
    })
}

export function updateWallet(props: AddWalletProps) {
    return request({
        url: "/api/wallets/update",
        method: "POST",
        data: props
    })
}

export function deleteWallet(id: number) {
    return request({
        url: "/api/wallets/delete",
        method: "POST",
        data: {
            id,
        }
    })
}

export function addChain(props: Pick<Chain, "explore" | "chainId" | "rpc" | "name">) {
    return request({
        url: "/api/chains/add",
        method: "POST",
        data: props
    })
}

export function updateChain(props: Pick<Chain, "explore" | "chainId" | "rpc" | "name" | "id">) {
    return request({
        url: "/api/chains/update",
        method: "POST",
        data: props
    })
}

export function deleteChain(id: number) {
    return request({
        url: "/api/chains/delete",
        method: "POST",
        data: {
            id,
        }
    })
}

export function addCategory(props: Pick<Category, "name" | "description">) {
    return request({
        url: "/api/categories/add",
        method: "POST",
        data: props
    })
}

export function updateCategory(props: Pick<Category, "name" | "description" | "id">) {
    return request({
        url: "/api/categories/update",
        method: "POST",
        data: props
    })
}

export function deleteCategory(id: number) {
    return request({
        url: "/api/categories/delete",
        method: "POST",
        data: {
            id,
        }
    })
}

type EcoProps =  Pick<Ecosystem, "name"
    | "description"
    | "homepage"
    | "twitter_fans"
    | "category_id"
    | "logo"
    | "is_ico"
    | "financing"
    | "suggestion" | "chainId">

export function addEcosystem(props: EcoProps) {
    return request({
        url: "/api/ecosystems/add",
        method: "POST",
        data: props
    })
}

export function updateEcosystem(props: Pick<Ecosystem, "name" | "description" | "homepage" | "twitter_fans" | "category_id"
    | "logo" | "is_ico" | "financing" | "suggestion" | "id" | "chainId">) {
    return request({
        url: "/api/ecosystems/update",
        method: "POST",
        data: props
    })
}

export function deleteEcosystem(id: number) {
    return request({
        url: "/api/ecosystems/delete",
        method: "POST",
        data: {
            id,
        }
    })
}

export function addJobs(props: Pick<Job, "ecosystemId" | "homepage" | "description" | "networkId" | "remarks">) {
    return request({
        url: "/api/jobs/add",
        method: "POST",
        data: props
    })
}

export function updateJob(props: Pick<Job, "ecosystemId"
    | "homepage" | "description" | "networkId" | "remarks" | "id">) {
    return request({
        url: "/api/jobs/update",
        method: "POST",
        data: props
    })
}

export function deleteJob(id: number) {
    return request({
        url: "/api/jobs/delete",
        method: "POST",
        data: {
            id,
        }
    })
}


export function markCompleteJobWithWallet(jobId: number, walletId: number) {
    return request({
        url: "/api/jobs/completeWithWallet",
        method: "POST",
        data: {
            jobId,
            walletId,
        }
    })
}

