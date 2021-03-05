import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/service/common.service';


export const errorMessagesSetPassword = {
  userName: [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: `Password must be at least 8 characters.` },
    { type: 'maxlength', message: `Password can be max 15 characters.` }
  ],
  password: [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: `Password must be at least 8 characters.` },
    { type: 'maxlength', message: `Password can be max 15 characters.` }
  ]
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error_messages = errorMessagesSetPassword;
  @Output() loginSuccessfulEvent = new EventEmitter();
  constructor(public formBuilder: FormBuilder,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.configureFormGroup();
  }

  configureFormGroup() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])),
    });
  }

  signInForm(formData: NgForm) {
    if(formData.valid) {
      this.commonService.showSuccessToaster('Login Successful!!');
      this.loginSuccessfulEvent.emit(true);
    } else {
      this.commonService.showErrorToaster('Please check your form');
      this.loginSuccessfulEvent.emit(false);
    }
  }
}
