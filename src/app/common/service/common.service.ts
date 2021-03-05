import { Injectable } from '@angular/core';
import { AlertbarService } from 'src/app/modules/shared/alertbar/service/alertbar.service';
import { API, validationPatterns } from 'src/app/common/utility/constants';
import { DataService } from './data.service';
@Injectable()
export class CommonService {

    user: any = { userName: '', userId: '' };
    jsonData = [];
   
    constructor(private dataService: DataService, private alertbar: AlertbarService) { }

    getConfigurationAPI(): any {
        return this.dataService.externalGet(API.getConfiguration);
    }
    setJSONData(data: any) {
        this.jsonData = data;
    }

    getJSONData() {
        return this.jsonData;
    }

    compareDates(lessDate: any, grtrDate: any) {
        if (lessDate && grtrDate) {
            return (new Date(lessDate).getTime() - new Date(grtrDate).getTime()) > 0 ? false : true;
        }
        return true;
    }

    findFieldIndex(arr: any, id: any, key: any) {
        return arr.filter((val: any) => id === val[key]);
    }

    showSuccessToaster(msg: any) {
        this.alertbar.show('success', 'Success', msg, 4000);
    }
    showErrorToaster(msg: any) {
        this.alertbar.show('error', 'Error', msg, 4000);
    }

    showWarningToaster(msg: any) {
        this.alertbar.show('warning', 'Warning', msg, 4000);
    }

    hideToaster() {
        this.alertbar.show('none', 'NONE', '', 4000);
    }

    getConfiguration(): any {
        return this.dataService.externalGet(API.getConfiguration);
    }

    encryptData(data: any) {
        return data && data !== 'null' ? window.btoa(JSON.stringify(data)) : null;
    }

    decryptData(data: any) {
        return data && data !== 'null' ? JSON.parse(window.atob(data)) : null;
    }

    keepInSession(key: any, data: any) {
        const encData = this.encryptData(data);
        sessionStorage.setItem(key, encData);
    }

    getFromSession(key: any) {
        return this.decryptData(sessionStorage.getItem(key));
    }

    removeFromSession(key: any) {
        sessionStorage.removeItem(key);
    }

    keepInLocal(key: any, data: any) {
        const encData = this.encryptData(data);
        localStorage.setItem(key, encData);
    }

    getFromLocal(key) {
        return this.decryptData(localStorage.getItem(key));
    }

    removeFromLocal(key) {
        localStorage.removeItem(key);
    }

    getNumberFromString(value: string) {
        if (value) {
            const data = value.match(validationPatterns.extractNumber);
            return data ? parseFloat(data[0]) : null;
        }
        return null;
    }

    isNumber(value: any) {
        return value ? !isNaN(value) : false;
    }

    generateDynamicUrl(href: string) {
        let path = '';
        // tslint:disable-next-line: variable-name
        const split_one = href.split(':');
        const split2 = split_one[split_one.length - 1].split('/');
        if (split2.length > 0) {
            path = split2[1];
        }
        return path;
    }
}
