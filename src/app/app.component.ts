import { Component } from '@angular/core';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public logado = true;
  public logo = 'assets/img/logo.png';
  selectedPath = '';
  public appPages = [
    {
      title: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Sobre',
      url: '/sobre',
      icon: 'information-circle-outline'
    }
  ];

  constructor(
    private loadingController: LoadingController,
    public auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toastController: ToastController

  ) {
    this.initializeApp();
  }

  getLogout() {
    this.auth.setLoggedOut(false);
    this.presentToast('Obrigado por usar O PreSense!');
    // this.router.navigate['/login'];
    this.router.navigateByUrl('/login'); // Login
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async islogg() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    // ESCODE SIDEBAR NA ENTRADA
    // await this.configService.getConfig()
    //   .then(res => {
    //     if (res != null) {
    //       this.logado = true;
    //     } else {
    //       this.logado = false;
    //       this.islogg();
    //     }
    //   });
    setTimeout(() => {
      loading.dismiss(); // fecha
    }, 2000);
  }
  // exibe mensagem
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
}
