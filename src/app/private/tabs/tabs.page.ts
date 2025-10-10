import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTitle, IonToolbar, IonHeader, IonMenu, IonContent, IonItem, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
  IonMenu,
  IonContent, RouterLink],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public pushService = inject(PushService);

  constructor() {
    addIcons({ triangle, ellipse, square });
    if (Capacitor.isNativePlatform()) {
      this.pushService.registerNotifications().then(() => {
        this.pushService.addListeners();
      }).catch(err => {
        console.error('Error registering for push notifications', err);
      });
    }

  }
  
}
