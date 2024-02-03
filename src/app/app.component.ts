import { Component } from '@angular/core';
import { LoginWithEmailOTPConfiguration, LoginWithMagicLinkConfiguration, Magic } from 'magic-sdk';
import { from } from 'rxjs';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test1';
  accounts: string[] = [];
  messageToSign: string = '';
  web3: Web3 = new Web3(/* magic.rpcProvider */);
  signature: string = '';

  constructor() {

    // const web3 = new Web3(magic.rpcProvider);
    // from(magic.user.getInfo()).subscribe(info => {
    //   if (info.publicAddress) this.accounts.push(info.publicAddress);
    // });

    // from(this.web3.eth.getAccounts()).subscribe(addresses => {
    //   if (addresses.length) this.accounts = addresses;
    // });


  }

  async loginMagic() {
    // from(magic.wallet.connectWithUI()).subscribe(account => {
    //   this.accounts = account;
    //   console.log(account);
    //   from(magic.wallet.getProvider()).subscribe(provider => {
    //     this.web3 = new Web3(provider)
    //   })
    // }, error => {
    //   console.log(error);
    // });
    let provider = await magic.wallet.getProvider();
    this.web3 = new Web3(provider);

    this.accounts = await magic.wallet.connectWithUI();
    console.log(await magic.wallet.getInfo());


  }

  logoutMagic() {
    from(magic.user.logout()).subscribe(_ => this.accounts = []);
    magic.user.onUserLoggedOut((isloggedOut: boolean) => {
      this.accounts = [];
    });
  }

  async signMessage() {
    this.signature = await this.web3.eth.personal.sign(this.messageToSign, this.accounts[0], '');
    console.log(this.signature);

    // if (this.web3.currentProvider) {
    //   from(this.web3.currentProvider.request({
    //     method: 'personal_sign',
    //     params: [this.web3.utils.utf8ToHex(this.messageToSign), this.accounts[0]],
    //     requestOptions: { from: this.accounts[0] }
    //   })).subscribe(res => console.log(res));
    // }


  }

  async showBalance() {
    if ((await magic.wallet.getInfo()).walletType == 'magic') await magic.wallet.showBalances();
    else console.log('Balance: ', await this.web3.eth.getBalance(this.accounts[0]));
  }

  // signMessage() {
  //   let msg = this.web3.utils.utf8ToHex(this.messageToSign);
  //   let params: string[] = [msg, this.accounts[0]];
  //   const method = 'personal_sign'
  //   if (this.web3.currentProvider) {
  //     from(this.web3.currentProvider.request({
  //       method,
  //       params,
  //       requestOptions: { method }
  //     })).subscribe(res => {
  //       console.log(res);
  //     });
  //   }

  // }
}



const magic = new Magic('pk_live_E3F46F492F8EB8BD', {
  network: {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97
  },
  useStorageCache: true
});