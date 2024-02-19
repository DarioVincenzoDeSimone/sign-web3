import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { IPigRecord, IAnimal } from 'src/app/interfaces/IPigRecord';
import { DialogQRcode } from 'src/app/pages/user/qrDialog/dialog-qr-code.component';
import { chainScan } from 'src/assets/environments/environment';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.scss'],
})
export class PigTableComponent /* implements OnChanges */ {

  displayedColumns: string[] = ['code', 'breed', 'transactionHash', 'actions'];
  /* @Input() dataSource: IPigRecord[] = []; */
  @Input() dataSource: IAnimal[] = [];
  // _dataSource: IAnimalTable[] = [];
  _chainScan: string = chainScan;

  constructor(
    private dialog: MatDialog,
  ) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this._dataSource = this.dataSource;
  // }

  ngOnInit(): void { }

  openQRDialog(txHash: string): void {
    let txLink = this._chainScan + txHash;
    const dialogRef = this.dialog.open(DialogQRcode, {
      data: { txLink }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.porcedduForm.reset();
    // });
  }
}

interface IAnimalTable extends IAnimal {
  urlQRTx?: SafeUrl
}