import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuestComponent } from './pages/guest/guest.component';
import { SignInComponent } from './pages/guest/sign-in/sign-in.component';
import { SignUpComponent } from './pages/guest/sign-up/sign-up.component';
import { HomeComponent } from './pages/user/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { MatMenuModule } from '@angular/material/menu';
import { LandingComponent } from './pages/landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPorcedduComponent } from './pages/user/add-porceddu/add-porceddu.component';


@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    HomeComponent,
    NavbarComponent,
    LandingComponent,
    AddPorcedduComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
