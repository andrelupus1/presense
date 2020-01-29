import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { UsuariosService } from './service/usuarios.service';
import { ConfigService } from './service/config.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { Geofence } from '@ionic-native/geofence/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']}
    ),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule],
  providers: [
    AuthService, AuthGuard,
    UsuariosService,
    ConfigService,
    StatusBar,
    SplashScreen,
    Geolocation,
    Geofence,
    {
      provide: [RouteReuseStrategy],
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
