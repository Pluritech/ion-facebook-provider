# ion-facebook-provider
The wrapper to Facebook Connect plugin from Ionic Native.

## Installation

To install this library, run:

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

### Method Login
```typescript
public login(getPictureBase64?: boolean);
```
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

  constructor(public navCtrl: NavController, private ionFacebookProvider: IonFacebookProvider) {
    console.log('IonFacebookProvider', this.ionFacebookProvider.listPermisions());
  }

  public loginTest(true) {
    this.ionFacebookProvider.login()
    .then((res: FbLoginResponse) => console.log(res))
    .catch(error => console.log(error));
  }
}
```
- What there in **FbLoginResponse**
 Field | Can be null | Description
------ | ----------- | ----------- 
email | true | email from user logged in Facebook
userIdFace | false | ID Facebook from user logged in Facebook
accessToken | false | token of session from user logged in Facebook
name | false | name from user logged in Facebook
picture| true | url picture from user logged in Facebook
picture64 | true | picture base 64 from user logged in Facebook if param getPictureBase64 set true and the Facebook allow get url picture

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
