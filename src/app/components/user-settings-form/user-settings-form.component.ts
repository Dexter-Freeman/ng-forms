import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserSettings } from 'src/app/data/user-settings';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }

  postError: boolean = false;

  postErrorMessage: string = '';

  userSettings: UserSettings = { ...this.originalUserSettings };

  subscriptionTypes: Observable<string[]>;

  constructor(private dataService : UserDataService) {
    this.subscriptionTypes = this.dataService.getSubscriptiontTypes();
   }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
   
    if (form.valid) {
      console.log('on submit ', form.value);
      this.postError = false;
      this.postErrorMessage = '';
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success', result),
        error => this.onHttpError(error)
      )
    } 
    else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
    
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onBlur(el: NgModel) {
    console.log('on blur ', el.value);
  }

}
