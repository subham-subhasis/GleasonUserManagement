import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    constructor(private httpClient: HttpClient) { }
    static localeId = '';
    static urlDetails: any = {};
    properties: Object;
    tokenProperties = {};

    loadBootstrapConfiguration() {
        return new Promise((resolve, reject) => {
            this.httpClient.get('./assets/json/applicationConfiguraion.json').subscribe((response: any) => {
                if (environment.production) {
                    ApiConfigService.urlDetails = response.prod;
                } else {
                    ApiConfigService.urlDetails = response.dev;
                }
                if (response) {
                    resolve(true);
                } else {
                    reject('error');
                }
            });
        });
    }

    get applicationProperties() {
        return this.properties;
    }

    setLanguage() {
        this.httpClient.get('./assets/json/propertyFile.json').subscribe((data) => {
            this.properties = data;
            let locale: string = data['locale'];
            locale = locale.indexOf('-') > 0 ?
                locale.substring(0, locale.indexOf('-')) : locale;
            const readFromProperty: boolean = data['readFromProperty'];
            if (readFromProperty) {
                ApiConfigService.localeId = locale;
                //this.translateService.setDefaultLang(locale);
            }
        });
    }
}
