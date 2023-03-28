import {Chain, Ecosystem, Job} from "@prisma/client";

export type Wallet = {
    id: number,
    address: string,
    mnemonic: string,
    mm_pwd: string,
    p_key: string,
    fp_number: string,
}


export type JobModel = Job & {
    ecosystem: Ecosystem,
    network: Chain,
};
