import { NgModule } from "@angular/core";
import { PigTableComponent } from "./pig-table.component";
import { CommonModule } from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        PigTableComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        RouterModule
    ],
    exports: [
        PigTableComponent
    ]
})

export class PigTableModule {};