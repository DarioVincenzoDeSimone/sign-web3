import { Routes } from "@angular/router";
import { GuestComponent } from "./app/pages/guest/guest.component";
import { SignInComponent } from "./app/pages/guest/sign-in/sign-in.component";
import { SignUpComponent } from "./app/pages/guest/sign-up/sign-up.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    //guest
    {
        path: '',
        // canActivate:[NoAuthGuard]
        // canActivateChild: [NoAuthGuard],
        component: GuestComponent,
        children: [
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent }
        ]
    }
];