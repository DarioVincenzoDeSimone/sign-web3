import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Web3Service } from "./web3.service";
import { Observable, async, of, switchMap } from "rxjs";
import { Contract, ContractAbi } from "web3";
import MaialettoABI from '../assets/maialettoABI.json'

@Injectable({
    providedIn: 'root'
})

export class SmartContractService {

    constructor(
        private http: HttpClient,
        private web3Service: Web3Service
    ) { }

    // getMaialettiContract(): Observable<any> {
    //     return this.http.get<ContractAbi>('/assets/maialettoABI.json').pipe(
    //         switchMap((abi: ContractAbi) => {
    //             // const _abi: string = JSON.stringify(abi);
    //             return of(new this.web3Service.web3.eth.Contract(abi, addresses[eNetwork.TESTNET][eContract.MAIALETTI]));
    //         }));
    // }

    get maialettoContract(): Contract<any> {
        return new this.web3Service.web3.eth.Contract(MaialettoABI, addresses[eNetwork.TESTNET][eContract.MAIALETTI]);
    }
}


export const addresses: { [key in eNetwork]: { [key in eContract]: string } } = {
    testnet: {
        MAIALETTI: '0x186e797C5d438c5340517fcEeB8a20800340a567'
    }
}

export enum eContract {
    MAIALETTI = 'MAIALETTI'
}

export enum eNetwork {
    TESTNET = 'testnet'
}