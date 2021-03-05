import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../app/common/service/common.service';
import { ApiConfigService } from './config.service';
const THEME_DARKNESS_SUFFIX = `-dark`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  pageloader = false;
  title = 'UserManagement';
  isThemeDark = false;
  activeTheme: string;
  userLoginSuccessful = true;
  @HostBinding('class') activeThemeCssClass: string;
  
  getJsonDataSubscription: Subscription;
  constructor(
    private commonService: CommonService,
    private overlayContainer: OverlayContainer,
    private appConfigService: ApiConfigService) {
      this.setActiveTheme('deeppurple-amber', false);
  }

  ngOnInit() {
    this.getJsonData();
  }

  mainLoader(status: boolean) {
    status ? (this.pageloader = status) : setTimeout(() => {
      this.pageloader = status;
    }, 500);
  }

  showMaster() {
    setTimeout(() => {
      this.pageloader = false;
    }, 1000);
  }

  toggleDarkness() {
    this.setActiveTheme(this.activeTheme, !this.isThemeDark);
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) { return; }
    } else {
      this.isThemeDark = darkness;
    }
    this.activeTheme = theme;
    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }
    this.activeThemeCssClass = cssClass;
  }


   signInCheck(loginSuccessFul: any) {
     if(loginSuccessFul) {
      this.userLoginSuccessful = false;
     }
     else {
      this.userLoginSuccessful = true;
     }
   }

  getJsonData() {
    this.getJsonDataSubscription = this.commonService.getConfigurationAPI().subscribe((data: any) => {
      if (data) {
        this.commonService.setJSONData(data);
      }
    },
      err => {
        console.log('-----Failed to fetch JSON details-----');
      });
  }

  ngOnDestroy(): void {
    this.getJsonDataSubscription && this.getJsonDataSubscription.unsubscribe();
  }
}
