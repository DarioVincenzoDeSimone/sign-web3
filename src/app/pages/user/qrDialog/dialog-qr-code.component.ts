import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SafeUrl } from "@angular/platform-browser";
import { QRCodeModule } from "angularx-qrcode";


@Component({
    selector: 'qr-dialog',
    templateUrl: './dialog-qr-code.html',
    standalone: true,
    imports: [
        QRCodeModule,
        MatButtonModule,
        // MatDialogTitle,
        // MatDialogContent,
        // MatDialogActions,
        // MatDialogClose,
    ],
})
export class DialogQRcode {

    urlQRTx: SafeUrl;

    constructor(
        public dialogRef: MatDialogRef<DialogQRcode>,
        @Inject(MAT_DIALOG_DATA) public data: { txLink: string },
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    geturlQRForTx(url: SafeUrl) {
        this.urlQRTx = url;
      }
}