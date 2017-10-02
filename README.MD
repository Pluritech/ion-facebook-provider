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
You can use these method to make login and receive the datas as *userID*, *accessToken* and etc:

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

  public loginTest() {
    this.ionFacebookProvider.login()
    .then((res: FbLoginResponse) => console.log(res))
    .catch(error => console.log(error));
  }
}
```
- What there in **FbLoginResponse**


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
