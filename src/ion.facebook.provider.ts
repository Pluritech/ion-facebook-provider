import { Injectable, Inject } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FbLoginResponse, UserPicture, PermissionsUser } from './models/facebook';

@Injectable()
export class IonFacebookProvider {

  private _listPermissions: string[];

  constructor(private fb: Facebook, @Inject('permissions') private permissions: string[]) {
    this._listPermissions = permissions || ['email', 'public_profile'];
  }

  public login(getPictureBase64?: boolean): Promise<FbLoginResponse> {
    return this.fb.login(this.listPermisions())
      .then((res: FacebookLoginResponse) => this._getLoginResponse(res))
      .then(res => {
        if (!getPictureBase64) {
          return res;
        } else {
          return this._handleUserPicture(res);
        }
      })
      .catch(error => this._handleErrorLogin(error));
  }

  public logout(): Promise<any> {
    return this.fb.logout();
  }

  public getPictureUser(config?: {setBase64?: boolean}): Promise<UserPicture> {
    return this.requestDataByGraphApi('me/picture/?redirect=false')
      .then((picture: UserPicture) => {
        if  (config && config.setBase64) {
          return this.getBase64FromPicture(picture.data.url)
            .then(base64 => {
              picture.data.base64 = base64;
              return picture;
            }).catch(error => picture);
        } else {
          return picture;
        }
      })
      .catch(error => { throw error; });
  }

  public listPermisions(): string[] {
    return [].concat(this._listPermissions);
  }

  public createHeaderFbToken(tokenFb: string): Headers {
    const headers = new Headers();
    headers.append('AcessTokenFb', tokenFb);
    return headers;
  }

  public getBase64FromPicture(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let dataURL;
        canvas.width = image.width; // or 'width' if you want a special/scaled size
        canvas.height = image.height; // or 'height' if you want a special/scaled size
        ctx.drawImage(image, 0, 0);
        dataURL = canvas.toDataURL('image/jpg');
        resolve(dataURL);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = url;
    });
  }

  public getPermissions(): Promise<PermissionsUser> {
    return this.requestDataByGraphApi('/me/permissions')
      .then(data => this._handleDataPermission(data));
  }

  public requestDataByGraphApi(path: string, permissions?: string[]) {
    return this.fb.api(path, permissions);
  }

  private _handleUserPicture(user: FbLoginResponse): Promise<FbLoginResponse> {
    return this.getPictureUser({setBase64: true})
      .then(picture => {
        user.picture = picture.data.url;
        let base64 = picture.data.base64;
        if (base64.startsWith('data:')) {
          base64 = base64.substring(22, base64.length);
        }
        user.picture64 = base64;
        return user;
      })
      .catch(error => user);
  }

  private _handleDataPermission(data: any): PermissionsUser {
    const permissions = {};
    data.data.forEach(p => permissions[p.permission] = p.status);
    return permissions;
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

  private _getTokenFb(): Promise<string> {
    return this.fb.getAccessToken();
  }

}
