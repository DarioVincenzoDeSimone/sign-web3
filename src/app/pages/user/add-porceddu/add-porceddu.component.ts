import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { from, of, switchMap } from 'rxjs';
import { chainScan } from 'src/assets/environments/environment';
import { SmartContractService } from 'src/services/smart-contract.service';
import { IUser, UserService } from 'src/services/user.service';
import { DialogQRcode } from '../qrDialog/dialog-qr-code.component';
import { Web3Service } from 'src/services/web3.service';

@Component({
  selector: 'app-add-porceddu',
  templateUrl: './add-porceddu.component.html',
  styleUrls: ['./add-porceddu.component.scss']
})
export class AddPorcedduComponent {

  porcedduForm: FormGroup;
  userInfo: IUser;
  txLink: string;

  constructor(
    fb: FormBuilder,
    private smartContractService: SmartContractService,
    private userService: UserService,
    private dialog: MatDialog,
    private web3Service: Web3Service
  ) {
    this.porcedduForm = fb.group(
      {
        company: fb.control('', [Validators.required]),
        id: fb.control('', [Validators.required]),
        razza: fb.control('', [Validators.required]),
        weight: fb.control('', [Validators.required]),
      }
    );
    this.userService.userInfo$.subscribe(userInfo => this.userInfo = userInfo);
  }

  addOnChain() {
    // console.log(this.porcedduForm.value);
    from(this.smartContractService.maialettoContract
      .methods['addRecord'](JSON.stringify(this.porcedduForm.value))
      .send({ from: this.userInfo.wallet })).pipe(switchMap(
        res => {
          this.txLink = chainScan + res.transactionHash;
          return of(true);//TODO Chiamata al backEnd
        }
      )).subscribe(beRes => {
        console.log('Chiamata al BE fatta');
        this.openDialog(this.txLink);
      }
      );
    // this.openDialog('https://testnet.bscscan.com/tx/0x5b798d9cb7347a5fee98360b75ea6e53935a31318b965d9aa23f69f353def4db');

    // let dataTx: string = this.smartContractService.maialettoContract.methods['addRecord'](JSON.stringify(this.porcedduForm.value)).encodeABI();
    // from(this.web3Service.web3.eth.sendTransaction({
    //   from: this.userInfo.wallet,
    //   data: dataTx,
    // })).pipe(switchMap(
    //   res => {
    //     this.txLink = chainScan + res.transactionHash;
    //     return of(true);//TODO Chiamata al backEnd
    //   }
    // )).subscribe(beRes => {
    //   console.log('Chiamata al BE fatta');
    //   this.openDialog(this.txLink);
    // });
  }


  openDialog(txLink: string): void {
    const dialogRef = this.dialog.open(DialogQRcode, {
      data: { txLink }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.porcedduForm.reset();
    });
  }

}
