import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonFacebookProvider } from './ion.facebook.provider';

export * from './ion.facebook.provider';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class IonFacebookProviderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonFacebookProviderModule,
      providers: [IonFacebookProvider]
    };
  }
}
