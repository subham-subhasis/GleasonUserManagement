import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { ApiConfigService } from './config.service';
import { TokenInterceptor } from './common/interceptor/interceptor.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './modules/login/login.component';

import { DataService } from './common/service/data.service';
import { CommonService } from './common/service/common.service';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { UserDashboardComponent } from './modules/user-dashboard/user-dashboard.component';
import { UserManagementComponent } from './modules/user-management/user-management.component';
import { AddUserComponent } from './modules/add-user/add-user.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    UserDashboardComponent,
    UserManagementComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateModule,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CommonService,
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ApiConfigService) => () => config.loadBootstrapConfiguration(),
      deps: [ApiConfigService],
      multi: true
    },
    TokenInterceptor
  ],
  exports: [SharedModule],
  bootstrap: [AppComponent],
  entryComponents: [ AddUserComponent ]
})
export class AppModule { 
  constructor(private ngZone: NgZone, apiConfigService: ApiConfigService) {
    (window as any).ngZone = this.ngZone;
    apiConfigService.setLanguage();
  }
}
