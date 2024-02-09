import { Component, OnInit } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { SmartContractService } from 'src/services/smart-contract.service';
import { IUser, UserService } from 'src/services/user.service';
import { Web3Service } from 'src/services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo: IUser;

  constructor(
    private web3Service: Web3Service,
    private smartContractService: SmartContractService,
    private userService: UserService
  ) { }


  async ngOnInit(): Promise<void> {
    this.userService.userInfo$.pipe(switchMap(user => {
      this.userInfo = user;
      return from(this.smartContractService.maialettoContract.methods['getRecordByAddress'](user.wallet).call())
    })).subscribe(data => console.log('data da chain', data));
  }

}
