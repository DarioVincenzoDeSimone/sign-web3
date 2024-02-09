import { Routes } from "@angular/router";
import { NoAuthGuard } from "src/services/guards/no-auth.guard";
import { AuthGuard } from "src/services/guards/auth.guard";
import { GuestComponent } from "./pages/guest/guest.component";
import { SignInComponent } from "./pages/guest/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/guest/sign-up/sign-up.component";
import { HomeComponent } from "./pages/user/home/home.component";
import { UserComponent } from "./pages/user/user.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { AddPorcedduComponent } from "./pages/user/add-porceddu/add-porceddu.component";



export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'landing' },
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
    //landing
    {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        // component: GuestComponent,
        children: [
            { path: 'landing', component: LandingComponent }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: UserComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'add-pig', component: AddPorcedduComponent }
        ]
    }
];