import request from "@/utils/api/request";
import {Chain} from "@prisma/client";

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
