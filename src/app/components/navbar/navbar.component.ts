import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { from } from 'rxjs';
import { MagicService } from 'src/services/magic.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userMenuList: IMenuList[] = [];

  constructor(
    private userService: UserService,
    private magicService: MagicService
  ) {

    userService.userInfo$.subscribe(ui => {
      this.userMenuList.push(
        {
          label: 'Email',
          value: ui.email,
          action: () => this.clickOnEmail(ui.email)
        },
        {
          label: 'wallet',
          value: ui.wallet.slice(0, 5) + '...' + ui.wallet.slice(0, 4),
          action: () => this.clickOnWallet(ui.wallet)
        },
        {
          label: '',
          value: 'Esci',
          action: () => this.logout()
        },
      );
      // this.userMenuList.push(ui.wallet);
    });
  }

  clickOnEmail(email: string) {
    console.log(email);
  }

  clickOnWallet(wallet: string) {
    console.log('wallet', wallet);
    this.magicService.magic.wallet.showBalances();
  }

  logout() {
    from(this.magicService.magic.user.logout()).subscribe(_ => {
      // this.magicService.magic.user.onUserLoggedOut((isloggedOut: boolean) => {
        location.reload();
      // });
    });
  }

}

interface IMenuList {
  label: string
  value: string
  action: (data?: any) => any
}
