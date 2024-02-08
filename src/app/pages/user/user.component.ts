import { Component, OnInit } from '@angular/core';
import { MagicService } from 'src/services/magic.service';
import { UserService } from 'src/services/user.service';
import { Web3Service } from 'src/services/web3.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private magicService: MagicService,
    private web3Service: Web3Service,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    //se sono qui sono sicuramente loggato grazie al guard
    let provider = await this.magicService.magic.wallet.getProvider();
    this.web3Service.web3 = provider;
    this.userService.getUserWalletInfo$().subscribe();
    // this.accounts = await this.web3Service.web3.eth.requestAccounts();
  }

}
