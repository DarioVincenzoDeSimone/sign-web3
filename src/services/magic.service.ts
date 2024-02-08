import { Injectable } from "@angular/core";
import { Magic } from "magic-sdk";
import { magicKey, network } from "src/assets/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class MagicService {

    get magic(): Magic {
        return new Magic(magicKey, {
            network: network,
            useStorageCache: true
        });
    }

}