import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  BaseArrayClass,
  Environment,
  Circle
} from '@ionic-native/google-maps/ngx';
import { Platform, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']

})

export class Tab1Page implements OnInit {
  map: GoogleMap;
  loading: any;
  image = 'http://maps.google.com/mapfiles/ms/icons/blue.png';

  constructor(private platform: Platform,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    Environment.setEnv({// Teste no navegador sem erro
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyBd5rXdiVmWX27jBOmoas8aZZiO-W9fQXQ',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyBd5rXdiVmWX27jBOmoas8aZZiO-W9fQXQ'
      // 'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBd5rXdiVmWX27jBOmoas8aZZiO-W9fQXQ'
    });
    // Dados
    const POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([ // Objeto
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.421682, lng: -48.464005 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.4214816, lng: -48.4643619 } },
      { position: { lat: -1.421240, lng: -48.462422 } },
      { position: { lat: -1.421240, lng: -48.462422 } },
      { position: { lat: -1.421240, lng: -48.462422 } },
      { position: { lat: -1.421240, lng: -48.462422 } }
    ]);
    const bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      // console.log(data);
      return data.position;
    });

    // Carrega Mapa
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: bounds
      }
    });
    // Marcar os pontos
    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      // Add um circulo
      let circle: Circle = this.map.addCircleSync({
        center: data.position,
        radius: 10, // metros
        fillColor: 'rgba(200, 54, 54, 0.2)',
        strokeColor: 'rgba(200, 54, 54, 0.2)',
        strokeWidth: 0.1,
      });
      circle.setRadius(30);
      // console.log(data);
    });

    // Pega a sua localização
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    // Pega Posição (precisa Carregar o mapa antes)
    await this.loading.present();
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null, 2));
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });
      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        title: 'Sua Localização!',
        snippet: 'Segundo o GPS do seu aparelho.',
        icon: this.image,
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
        // animation: GoogleMapsAnimation.DROP
      });
      // Mostra Info
      marker.showInfoWindow();

      // Se clicar mostra alerta
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('PreSense!!!');
      });
    }).catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
