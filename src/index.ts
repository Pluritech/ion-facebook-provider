import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonFacebookProvider } from './ion.facebook.provider';

export * from './ion.facebook.provider';
export * from './models/facebook';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class IonFacebookProviderModule {
  static forRoot(permissions?: string[]): ModuleWithProviders {
    return {
      ngModule: IonFacebookProviderModule,
      providers: [IonFacebookProvider, {provide: 'permissions', useValue: permissions}]
    };
  }
}
