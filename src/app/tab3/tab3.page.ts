import { GoogleMap, GoogleMaps, Environment, BaseArrayClass, ILatLng, Circle, Marker, GoogleMapsAnimation, GoogleMapsEvent, MyLocation } from '@ionic-native/google-maps/ngx';
import { Component, OnInit } from '@angular/core';
import { Geofence } from '@ionic-native/geofence/ngx';
//import generateUUID from "../utils/uuid";
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  map: GoogleMap;
  loading: any;

  constructor(
    private geofence: Geofence,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    // initialize the plugin
    geofence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )
  }
  ngOnInit() {
    //this.loadMap();
    this.addGeofence();
  }
  //Add Geoference
  private addGeofence() {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: -1.421682, //center of geofence radius
      longitude: -48.464005,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 1, //1 -Dentro, 2-Fora, 3 Ambos
      notification: { //notification settings
        id: 1,//1, //any unique ID
        title: 'You crossed a fence', //notification title
        text: 'You just arrived to Gliwice city center.', //notification body
        openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }
  //Load mapa
  async loadMap() {
    Environment.setEnv({//Teste no navegador sem erro
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBd5rXdiVmWX27jBOmoas8aZZiO-W9fQXQ',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBd5rXdiVmWX27jBOmoas8aZZiO-W9fQXQ'
    });
    //Dados
    let POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([ //Objeto
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

    let bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      //console.log(data);
      return data.position;
    });

    //Carrega Mapa
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: bounds
      }
    });
    //Marcar os pontos
    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      //Add um circulo
      var circle: Circle = this.map.addCircleSync({
        'center': data.position,
        'radius': 10,//metros
        'fillColor': 'rgba(200, 54, 54, 0.2)',
        'strokeColor': 'rgba(200, 54, 54, 0.2)',
        'strokeWidth': 0.1,
      });
      circle.setRadius(30);
      //console.log(data);
    });

    //Pega a sua localização
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    //Pega Posição (precisa Carregar o mapa antes)
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
      let marker: Marker = this.map.addMarkerSync({
        title: 'Sua Localização!',
        snippet: 'Segundo o GPS do seu aparelho.',
        icon: 'blue',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
        //animation: GoogleMapsAnimation.DROP
      });
      //Mostra Info
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
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}