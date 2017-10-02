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

import { AppComponent } from './app.component';

// Import your library
import { IonFacebookModule } from '@pluritech/ion-facebook-provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    IonFacebookProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its provider in your Components:


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
