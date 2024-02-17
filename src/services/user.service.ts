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

    private _userWalletInfo: ReplaySubject<IUserWallet> = new ReplaySubject<IUserWallet>(1);

    constructor(
        private _httpClient: HttpClient,
        private magicService: MagicService
    ) { }

    setAuthToken(token: string) {
        sessionStorage.setItem('token', token)
    }

    get authToken(): string {
        return sessionStorage.getItem('token')
    }

    getUserWalletInfo$(): Observable<MagicUserMetadata> {
        return from(this.magicService.magic.user.getInfo()).pipe(
            tap(w => {
                this._userWalletInfo.next({ email: w.email, wallet: w.publicAddress })
            }
            )
        );
    }

    get walletInfo$(): Observable<IUserWallet> {
        return this._userWalletInfo.asObservable();
    }

    signUp(signUpData: ISignUpDTO) {
        return this._httpClient.post(environment.baseUrl + 'auth/sign-up', {
            ...signUpData
        })
    }

    signIn(signInData: ISignInDTO): Observable<IUserInfo> {
        return this._httpClient.post<IUserInfo>(environment.baseUrl + 'auth/login', {
            ...signInData
        })
    }

    updateUserWallet(id: number, addressWallet: string): Observable<any> {
        return this._httpClient.put(environment.baseUrl + 'v1/users/' + id, { addressWallet });
    }

}

export interface IUserInfo {
    token: string
}

export interface IUserWallet {
    email: string
    wallet: string
}