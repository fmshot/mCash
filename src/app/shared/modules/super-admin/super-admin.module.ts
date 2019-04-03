import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
// import { superAdminRouting } from '../../../app.routing';

@NgModule({
  imports: [
    SharedModule,
    // superAdminRouting.routes
  ],
  providers: [
    // superAdminRouting.providers
  ],
  entryComponents: [
    // superAdminRouting.entryComponent,
  ],
  declarations: [
    // superAdminRouting.components
  ],
  exports: [
    // superAdminRouting.components
  ]
})
export class SuperAdminModule { }
