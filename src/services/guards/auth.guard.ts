import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { MagicService } from "../magic.service";
import { Observable, switchMap, of, from } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private _router: Router,
        private magicService: MagicService
    ) { }
    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, route);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl, childRoute, state);
    }
    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._check('/');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(queryPar: string, route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> {
        // Check the authentication status
        return from(this.magicService.magic.user.isLoggedIn())
            .pipe(
                switchMap((authenticated: boolean) => {
                    //if user is not autenticated
                    if (!authenticated) {
                        let redirectURL = queryPar.split('?')[0];
                        // let extraQueryPar: { [key: string]: string } = {};
                        // queryPar.split('?')[1]?.split('&').forEach(q => {
                        //     extraQueryPar[q.split('=')[0]] = q.split('=')[1];
                        // });
                        this._router.navigate(['sign-in'], { queryParams: { redirectURL: redirectURL/* , ...extraQueryPar */ } });
                        //Prevent the access
                        return of(false);
                        // else if()//to handle not allowed page if user is logged
                    }
                    return of(true);
                })
            );
    }
}