import { Routes } from "@angular/router";
import { GuestComponent } from "./app/pages/guest/guest.component";
import { SignInComponent } from "./app/pages/guest/sign-in/sign-in.component";
import { SignUpComponent } from "./app/pages/guest/sign-up/sign-up.component";
import { NoAuthGuard } from "src/services/guards/no-auth.guard";
import { AuthGuard } from "src/services/guards/auth.guard";
import { UserComponent } from "./app/pages/user/user.component";
import { HomeComponent } from "./app/pages/user/home/home.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    //guest
    {
        path: '',
        canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: GuestComponent,
        children: [
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: UserComponent,
        children: [
            { path: 'home', component: HomeComponent }
        ]
    }
];