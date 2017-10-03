# Wrapper Ionic Facebook
The wrapper to Facebook Connect plugin from [Ionic Native](https://ionicframework.com/docs/native/facebook/).

## Installation

### First, install the Facebook Connect Plugin from Ionic Native [Ionic Native](https://ionicframework.com/docs/native/facebook/)

then install this library, run:

```bash
$ npm install @pluritech/ion-facebook-provider --save
```

## Consuming your library

and then from your Ionic Project `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MyApp } from './app.component';

//Is required import the Facebook from Ionic Native
import { Facebook } from '@ionic-native/facebook';
// Import library wrapper 
import { IonFacebookProviderModule } from '@pluritech/ion-facebook-provider';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,

    // Dont forget put them here
    IonFacebookProviderModule,
    Facebook

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its provider in your Components or Providers:
```typescript
import { IonFacebookProvider } from '@pluritech/ion-facebook-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) {
  }
}
```

### Method login(getPictureBase64?: boolean)
You can use the method Login to make login and receive the datas as *userID*, *accessToken* and etc. These method too give you a Header with access token to send to your server.

- How Use:
```typescript
import { IonFacebookProvider, FbLoginResponse } from '@pluritech/ion-facebook-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public loginTest(true) {
    this.ionFacebookProvider.login(true)
    .then((res: FbLoginResponse) => console.log(res))
    .catch(error => console.log(error));
  }
}
```
- What there in **FbLoginResponse**
 Field | Can be null | Description
------ | ----------- | ----------- 
header | false | header with key 'AcessTokenFb' and value as accessToken from authResponse at Facebook
picture| true | url picture from user logged in Facebook
picture64 | true | picture base 64 from user logged in Facebook if param getPictureBase64 set true and the Facebook allow get url picture

* FbLoginResponse extends FacebookLoginResponse, see more: https://ionicframework.com/docs/native/facebook/


### Method logout()
You can use the method Logout to log the user out from facebook, it's a best practice always call this method when the user quit of your application. See more: [Facebook Doc - Logout](https://developers.facebook.com/docs/reference/javascript/FB.logout)
```typescript
import { IonFacebookProvider, FbLoginResponse } from '@pluritech/ion-facebook-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public logoutTest() {
    this.ionFacebookProvider.logout()
      .then((res) => console.log(res))
      .catch(error => console.log(error));
  }
}
```


### Method getPictureUser()
You can get picture of user. Required open session and a token valid to use.
```typescript
import { IonFacebookProvider, UserPicture } from '@pluritech/ion-facebook-provider';

export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public getPictureUser() {
    this.ionFacebookProvider.getPictureUser()
      .then((picture: UserPicture) => console.log(picture))
      .catch(error => console.log(error));
  }
}
```
- What there in **UserPicture**
 Field | Can be null | Description
------ | ----------- | ----------- 
data | false | the data ProfilePictureSource. See more: [Profile Picture Source](https://developers.facebook.com/docs/graph-api/reference/profile-picture-source/)


### Method listPermisions()
You get only read list permissions set on root od module.

```typescript
import { IonFacebookProvider, UserPicture } from '@pluritech/ion-facebook-provider';

export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public getListPermission() {
    console.log('getListPermission', this.ionFacebookProvider.listPermisions());
  }
}
```


### Method getPermissions()
You get permissions user from Facebook.

```typescript
import { IonFacebookProvider, UserPicture } from '@pluritech/ion-facebook-provider';

export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public getPermissionUserFacebook() {
    this.ionFacebookProvider.getPermissions()
      .then((permissions: PermissionsUser) => console.log(permissions))
      .catch(error => console.log(error));
  }
}
```
- What there in **PermissionsUser**
The object {key: value} where key is the name of permission and the value is your state that can be ['granted' || 'declined'] 

### Method requestDataByGraphApi(path: string, permissions?: string[])
You can call the methods by API Grap Permissions. See more: [Graph API](https://developers.facebook.com/docs/graph-api)
```typescript
import { IonFacebookProvider, UserPicture } from '@pluritech/ion-facebook-provider';

export class HomePage {

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) { }

  public getGraphAPI() {
    this.ionFacebookProvider.requestDataByGraphApi('/me/photos')
      .then(photos => console.log(photos))
      .catch(error => console.log(error));
  }
}

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Lucas Correa](mailto:lucasccorrea@gmail.com)
