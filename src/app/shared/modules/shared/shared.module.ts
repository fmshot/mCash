import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NotificationService} from '../../services/notificationServices/notification.service';
import {ValidationErrorService} from '../../services/validation-error-service/validation-error.service';
import {EventsService} from '../../services/eventServices/event.service';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {DecryptDataService, EncryptDataService} from '../../services/encryption/encrypt-data.service';
import {CacheService} from '../../services/cacheService/cache.service';
import {GuardService} from '../../services/gaurdService/guard.service';
import {NotifyComponent} from "../../components/notify/notify.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NotifyComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  entryComponents: [],
  providers: [
    NotificationService,
    ValidationErrorService,
    EventsService,
    NavigatorService,
    DecryptDataService,
    GuardService,
    EncryptDataService,
    CacheService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NotifyComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    ]
})
export class SharedModule { }
