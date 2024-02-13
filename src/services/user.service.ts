import { Injectable } from "@angular/core";
import { MagicService } from "./magic.service";
import { MagicUserMetadata } from "magic-sdk";
import { Observable, ReplaySubject, from, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { ISignInDTO, ISignUpDTO } from "src/app/interfaces/ISignUp";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private _userWalletInfo: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);

    constructor(
        private _httpClient: HttpClient,
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

    signUp(signUpData: ISignUpDTO){
        return this._httpClient.post(environment.baseUrl + 'auth/sign-up', {
            ...signUpData
        })
    }

    signIn(signInData: ISignInDTO){
        return this._httpClient.post(environment.baseUrl + 'auth/login', {
            ...signInData
        })
    }

}

export interface IUser {
    email: string
    wallet: string
}