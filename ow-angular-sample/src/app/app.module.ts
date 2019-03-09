import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Window components
import { BackgroundComponent } from './windows/background/background.component';
import { InGameComponent } from './windows/in-game/in-game.component';
import { SettingsComponent } from './windows/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    InGameComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
