import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
      <button (click)="callApi()">Call API</button>
    `
})

export class UserProfileComponent {
  constructor(private http: HttpClient,public auth: AuthService) {}
  callApi(): void {
    this.http
      .get('http://localhost:3000/dog')
      .subscribe((result: any) => {
        console.log(result);
      });
    }
}
