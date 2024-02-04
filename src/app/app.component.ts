import { Component, OnInit } from '@angular/core';
import { LoginWithEmailOTPConfiguration, LoginWithMagicLinkConfiguration, Magic } from 'magic-sdk';
import { from, of, switchMap } from 'rxjs';
import { SmartContractService } from 'src/services/smart-contract.service';
import { Web3Service } from 'src/services/web3.service';
import Web3, { Numbers } from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test1';
  accounts: string[] = [];
  messageToSign: string = '';
  // web3: Web3 = new Web3(/* magic.rpcProvider */);
  signature: string = '';
  receiverAddress: string = '';
  bnbAmount: Numbers = '';
  txLink: string = '';
  isLoggedCheck: boolean = false;

  constructor(
    private web3Service: Web3Service,
    private smartContractService: SmartContractService
  ) {

  }

  async ngOnInit(): Promise<void> {
    // console.log(magic.user.getInfo())
    let isLogged: boolean = await magic.user.isLoggedIn();
    if (isLogged) {
      let provider = await magic.wallet.getProvider();
      this.web3Service.web3 = provider;
      this.accounts = await this.web3Service.web3.eth.requestAccounts();
      this.isLoggedCheck = true;
    } else this.isLoggedCheck = true;
  }

  async loginMagic() {
    // from(magic.wallet.connectWithUI()).subscribe(account => {
    //   this.accounts = account;
    //   console.log(account);
    //   from(magic.wallet.getProvider()).subscribe(provider => {
    //     this.web3Service.web3 = new Web3(provider)
    //   })
    // }, error => {
    //   console.log(error);
    // });

    // this.web3Service.web3 = new Web3(provider);

    this.accounts = await magic.wallet.connectWithUI();
    console.log(await magic.wallet.getInfo());
    // await provider.connect();
    let provider = await magic.wallet.getProvider();
    this.web3Service.web3 = provider;


  }

  logoutMagic() {
    from(magic.user.logout()).subscribe(_ => this.accounts = []);
    magic.user.onUserLoggedOut((isloggedOut: boolean) => {
      this.accounts = [];
    });
  }

  async signMessage() {
    this.signature = await this.web3Service.web3.eth.personal.sign(this.messageToSign, this.accounts[0], '');
    console.log(this.signature);
    // let res = await this.web3Service.web3.eth.sign(this.web3Service.web3.utils.utf8ToHex(this.messageToSign), this.accounts[0]);
    // console.log(res);
    // if (this.web3Service.web3.currentProvider) {
    //   from(this.web3Service.web3.currentProvider.request({
    //     method: 'personal_sign',
    //     params: [this.web3Service.web3.utils.utf8ToHex(this.messageToSign), this.accounts[0]],
    //     requestOptions: { from: this.accounts[0] }
    //   })).subscribe(res => console.log(res));
    // }


  }

  async showBalance() {
    if ((await magic.wallet.getInfo()).walletType == 'magic') await magic.wallet.showBalances();
    else console.log('Balance: ', await this.web3Service.web3.eth.getBalance(this.accounts[0]));
  }

  // signMessage() {
  //   let msg = this.web3Service.web3.utils.utf8ToHex(this.messageToSign);
  //   let params: string[] = [msg, this.accounts[0]];
  //   const method = 'personal_sign'
  //   if (this.web3Service.web3.currentProvider) {
  //     from(this.web3Service.web3.currentProvider.request({
  //       method,
  //       params,
  //       requestOptions: { method }
  //     })).subscribe(res => {
  //       console.log(res);
  //     });
  //   }

  // }

  async sendBnB() {
    let res = await this.web3Service.web3.eth.sendTransaction({ from: this.accounts[0], to: this.receiverAddress, value: this.web3Service.web3.utils.toWei(this.bnbAmount, 'ether'), gas: 21000 });
    console.log(res);
    this.txLink = 'https://testnet.bscscan.com/tx/' + res.transactionHash;
  }

  async sendPorceddu() {
    // this.smartContractService.getMaialettiContract().pipe(
    //   switchMap((contract: any) => {
    //     return from(contract.methods.addRecord(this.messageToSign).send({ from: this.accounts[0] }));
    //   })).subscribe(res => console.log(res));

    this.smartContractService.maialettoContract.methods['addRecord'](this.messageToSign).send({ from: this.accounts[0] })
      .on('receipt', (res) => {
        this.txLink = 'https://testnet.bscscan.com/tx/' + res.transactionHash;
      })
      .on('error', (err) => {
        console.error('errore', err);
      })
  }

}



const magic = new Magic('pk_live_E3F46F492F8EB8BD', {
  network: {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97
  },
  useStorageCache: true
});