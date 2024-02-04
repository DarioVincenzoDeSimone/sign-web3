import { Injectable } from "@angular/core";
import Web3 from "web3";

@Injectable({
    providedIn: 'root'
})

export class Web3Service {
    private _web3: Web3 = new Web3();

    get web3(): Web3 {
        return this._web3;
    }

    set web3(provider: any) {
        this._web3 = new Web3(provider);
    }
}