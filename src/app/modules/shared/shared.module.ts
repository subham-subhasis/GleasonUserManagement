import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/common/service/common.service';
import { AlertbarComponent } from './alertbar/alertbar.component';
import { AlertbarService } from './alertbar/service/alertbar.service';


@NgModule({
  declarations: [ AlertbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [ CommonService, AlertbarService ],
  exports: [
    AlertbarComponent,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
