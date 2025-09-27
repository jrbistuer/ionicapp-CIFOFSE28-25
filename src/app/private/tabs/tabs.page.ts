import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public pushService = inject(PushService);

  constructor() {
    addIcons({ triangle, ellipse, square });
    this.pushService.registerNotifications().then(() => {
      this.pushService.addListeners();
    }).catch(err => {
      console.error('Error registering for push notifications', err);
    });
  }
  
}
