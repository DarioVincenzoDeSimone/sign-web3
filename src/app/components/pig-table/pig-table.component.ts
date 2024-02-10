import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import IPigRecord from 'src/app/interfaces/IPigRecord';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.scss'],
})
export class PigTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'company', 'weight', 'razza'];
  @Input() dataSource: IPigRecord[] = [];

  ngOnInit(): void { }

}
