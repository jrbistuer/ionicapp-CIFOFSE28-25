import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAccordion, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonAccordion, IonMenuButton]
})
export class Tab2Page {

  constructor() {
  }

  doTheLoop(): number {
    var result = 0;
    console.log('Starting the loop...');
    for (let i = 0; i < 100; i++) {
      // console.log('Loop iteration:', i);
      result += i;
    }
    console.log('Loop finished.');
    return result;
  }

  doTheTimoutLoop(): number {
    var result = 0;
    console.log('Starting the loop...');
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        // console.log('Loop iteration:', i);
        result += i;
      }
    }, 1000);
    console.log('Loop finished.');
    return result;
  }

  doTheTimoutLoopWithPromise(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        var result = 0;
        console.log('Starting the loop...');
        setTimeout(() => {
          for (let i = 0; i < 100; i++) {
            // console.log('Loop iteration:', i);
            result += i;
          }
          resolve(result);
        }, 7000);
        console.log('Loop finished.');
      } catch (error) {
        reject(error);
      }
    });
  }

  gimmeDoTheLoopResult() {
    const result = this.doTheLoop();
    console.log('Result from doTheLoop:', result);
  }

  gimmeDoTheTimeoutLoopResult() {
    const result = this.doTheTimoutLoop();
    console.log('Result from doTheTimeoutLoop:', result);
  } 

  gimmeDoTheTimeoutLoopResultWithPromiseResult() {
    console.log('Calling doTheTimeoutLoopWithPromise...');    
    this.doTheTimoutLoopWithPromise().then((result: number) => {
      console.log('Result from doTheTimeoutLoopWithPromise:', result);
    }, (error) => {
      console.error('Error in doTheTimeoutLoopWithPromise:', error);
    });
    console.log('Ending doTheTimeoutLoopWithPromise...');    
  }

  async gimmeDoTheTimeoutLoopResultWithPromiseResultAsync() {
    console.log('Calling doTheTimeoutLoopWithPromise (Async)...');
    try {
      const result = await this.doTheTimoutLoopWithPromise();
      console.log('Result from doTheTimeoutLoopWithPromise (Async):', result);
    } catch (error) {
      console.error('Error in doTheTimeoutLoopWithPromise (Async):', error);
    }
    console.log('Ending doTheTimeoutLoopWithPromise (Async)...');
  }

}
