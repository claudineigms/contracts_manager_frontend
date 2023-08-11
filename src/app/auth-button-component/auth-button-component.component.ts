import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async ; else loggedOut">
      <ng-container *ngIf="auth.user$ | async as user">
        <p>Olá, {{ user.name }}!</p>
      </ng-container>
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>

    <button (click)="getAcessToken()">Get Access Token</button>
    <button (click)="callApiWithoutToken()">Call API Without Token</button>
    <button (click)="callApiWithToken()">Call API With Token</button>
  `,
  styles: [],
})
export class AuthButtonComponent {
  acessToken: string = '';
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService,private http: HttpClient) {
  }

  getAcessToken(): void {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      localStorage.setItem('token',token)
      this.acessToken = token;
      console.log(token);
    });
  }

  callApiWithoutToken(): void {
    console.log('callApiWithoutToken')
    this.http
      .get('http://localhost:3000',{responseType: 'text'})
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  callApiWithToken(): void {
    console.log('callApiWithToken')
    let acessToken = JSON.parse(localStorage.getItem('@@auth0spajs@@::WGJwLQDMHVYSN0GRaITAYwx7xsjQjb4E::contracts-manager::openid profile email')||'{}')['body']['access_token']
    let head_obj = new HttpHeaders().set('Authorization', `Bearer ${acessToken}`)
    this.http
      .get('http://localhost:3000/dog',
      {headers: head_obj})
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
