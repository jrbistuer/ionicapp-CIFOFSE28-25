import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
/* import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerScanResult, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
 */
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton],
})
export class Tab3Page {

  /* options: CapacitorBarcodeScannerOptions = {
    hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
  }; */
  scanResult = '';

  constructor() {}

  /* scanCode() {
    console.log('Scanning barcode...');
    CapacitorBarcodeScanner.scanBarcode(this.options).then((result: CapacitorBarcodeScannerScanResult) => {
      console.log('Scan result:', result);
      this.scanResult = result.ScanResult || 'No result';
    }).catch(error => {
      console.error('Scan error:', error);
    });
  } */

}
