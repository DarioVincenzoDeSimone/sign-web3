import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first, from, switchMap } from 'rxjs';
import {IAnimal, IPigRecord} from 'src/app/interfaces/IPigRecord';
import { SmartContractService } from 'src/services/smart-contract.service';
import { IUser, UserService } from 'src/services/user.service';
import { Web3Service } from 'src/services/web3.service';
import { AnimalService } from '../animals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  animalSub: Subscription;

  userInfo: IUser;
  /* recordList: IPigRecord[] = []; */
  recordList: IAnimal[] = [];

  constructor(
    private web3Service: Web3Service,
    private smartContractService: SmartContractService,
    private userService: UserService,
    private animalService: AnimalService
  ) { }


  ngOnInit(): void/* : Promise<void> */ {

    this.animalService.getAnimals().pipe(first()).subscribe();
    this.animalSub = this.animalService.animals$.subscribe(animalList => this.recordList = animalList)

    this.userService.userInfo$.pipe(switchMap(user => {
      this.userInfo = user;
      return from(this.smartContractService.maialettoContract.methods['getRecordByAddress'](user.wallet).call<any[]>())
    })).subscribe(data => {
      
      console.log('data da chain', data)
      /* this.recordList = data.map(recordItem => JSON.parse(recordItem['text'])); */
      console.log('Record list: ', this.recordList)
    });
  }

  ngOnDestroy(): void {
      this.animalSub?.unsubscribe()
  }

}
