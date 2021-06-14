import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserSettings } from '../data/user-settings';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: UserSettings) : Observable<any> {
    // return of(userSettings);
    return this.http.post('https://putsreq.com/ouWZBauFSZibJy2f6ayb', userSettings);
  }

  getSubscriptiontTypes() : Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime', 'Weekly']);
  }
}
