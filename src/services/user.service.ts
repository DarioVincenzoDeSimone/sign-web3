import { Injectable } from "@angular/core";
import { MagicService } from "./magic.service";
import { MagicUserMetadata } from "magic-sdk";
import { Observable, ReplaySubject, from, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private _userWalletInfo: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);

    constructor(
        private magicService: MagicService
    ) { }

    getUserWalletInfo$(): Observable<MagicUserMetadata> {
        return from(this.magicService.magic.user.getInfo()).pipe(
            tap(w => {
                this._userWalletInfo.next({ email: w.email, wallet: w.publicAddress })
            }
            )
        );
    }

    get userInfo$(): Observable<IUser> {
        return this._userWalletInfo.asObservable();
    }

}

export interface IUser {
    email: string
    wallet: string
}