import request from "@/utils/api/request";

type AddWalletProps = {
    address: string,
    fp_number?: string,
    mnemonic?: string,
    p_key?: string,
    mm_pwd: string,

}
export function addWallet(props: AddWalletProps) {
    return request({
        url: "/api/wallets/add",
        method: "POST",
        data: props
    })
}
