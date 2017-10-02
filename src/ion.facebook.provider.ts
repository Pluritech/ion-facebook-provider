import { Injectable, Inject } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FbLoginResponse } from './models/facebook';

@Injectable()
export class IonFacebookProvider {

  private _listPermissions: string[];

  constructor(private fb: Facebook, @Inject('permissions') private permissions: string[]) {
    this._listPermissions = permissions || ['user_friends', 'email', 'public_profile'];
  }

  public login(): Promise<FbLoginResponse> {
    return this.fb.login(this.listPermisions())
      .then((res: FacebookLoginResponse) => this._getLoginResponse(res))
      .catch(error => this._handleErrorLogin(error));
  }

  public listPermisions(): string[] {
    return [].concat(this._listPermissions);
  }

  public createHeaderFbToken(tokenFb: string): Headers {
    const headers = new Headers();
    headers.append('AcessTokenFb', tokenFb);
    return headers;
  }

  private _createFbLoginResponse(res: FacebookLoginResponse): FbLoginResponse {
    return {
      status: res.status,
      authResponse: res.authResponse,
      header: this.createHeaderFbToken(res.authResponse.accessToken)
    };
  }

  private _getLoginResponse(res: FacebookLoginResponse): FbLoginResponse {
    if (res.status === 'connected') {
      return this._createFbLoginResponse(res);
    }
  }

  private _handleErrorLogin(error) {
    console.error('_handleErrorLogin', error);
    if (error && error.errorMessage
      && error.errorMessage === 'Facebook error: User logged in as different Facebook user.') {
      return this.login();
    } else {
      throw error;
    }
  }

}
