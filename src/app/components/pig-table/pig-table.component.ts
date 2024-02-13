import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import {IPigRecord, IAnimal} from 'src/app/interfaces/IPigRecord';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.scss'],
})
export class PigTableComponent implements OnInit {

  displayedColumns: string[] = ['code', 'breed', 'transactionHash'];
  /* @Input() dataSource: IPigRecord[] = []; */
  @Input() dataSource: IAnimal[] = [];

  ngOnInit(): void { }

}
