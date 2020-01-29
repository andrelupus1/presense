import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { GoogleMap} from '@ionic-native/google-maps/ngx';
import { UsuariosService } from '../service/usuarios.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserList } from '../service/auth.service';
import { CrimesService } from '../service/crimes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    public navCtrl: NavController,
    // public api: RestApiService,
    private crimes: CrimesService,
    public loadingController: LoadingController,
    // private usuariosService: UsuariosService,
    private auth: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    // private router: Router
  ) {
    this.usersSubject = new BehaviorSubject<any>(this.users);
    this.isusers = this.usersSubject.asObservable();
    this.fatorSubject = new BehaviorSubject<any>(this.fator);
    this.isfator = this.usersSubject.asObservable();
  }
  fator: any;
  // Mensagem
  title = ['AVISO!', 'ATENÇÃO', 'ALERTA', 'PERIGO'];
  subtitle = ['Local Seguro!', 'Cuidado', 'Cuidado', 'Risco Elevado'];
  // tslint:disable-next-line: max-line-length
  content = ['Local Seguro, pode ficar tranquilo.', 'Local com baixo índice de criminalidade, mas fique em alerta!', 'Local com requer atenção, pois alguns crimes aconteceram na redondeza.', 'Local com Elevado índice de criminalidade. Procure um lugar mais seguro!'];
  icon = ['happy', 'eye', 'alert', 'walk']
  cor = ['primary', 'success', 'warning', 'danger', 'light'];

  getPosicao: any = { 'latLng': { 'lat': -1.421682, 'lng': -48.464005 } };
  getTempo: any;
  getPerfil: any;
  fatorPerido: any;

  // dados: any;
  map: GoogleMap;
  users: UserList[];

  private usersSubject: BehaviorSubject<any>;
  public isusers: Observable<any>;
  private fatorSubject: BehaviorSubject<any>;
  public isfator: Observable<any>;
  // Dados
  dado = [
    {
      position: { lat: -1.421682, lng: -48.464005 }
    },
    {
      position: { lat: -1.421682, lng: -48.464005 },
      tempo: {},
      perfil: { sexo: 'Masculino', carro: true }// Esse cruza informações com o storage
    },
    {
      position: { lat: -1.421682, lng: -48.464005 },
      tempo: {},
      local: {},
      perfil: {}
    },
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
  ];
  ngOnInit(): void {
    // this.dataHora();
    /*  this.getUser()
       .then(() => {
         this.analise();
       }) */
  /* SetInterval seria uma solução ao invés de websocket */
  // setInterval(() => this.getData(), 3000);
  this.getData();
  }
  // FATOR
  async getData() {
    const loading = await this.loadingController.create({
      message: 'PreSense Analisando...',
    });
    await loading.present();

    await this.crimes.getNotify()
      .pipe(map(res => res))
      .subscribe(res => {
        console.log(res);
        // this.fator = res[0];
        this.fator = res['dados']['fator'];
        this.fatorSubject.next(this.fator);
        loading.dismiss();
      }, err => {
        // console.log(err);
        loading.dismiss();
      });
  }
  // IA
  async analise() {
    console.log(this.dado[1]['position']);
    console.log(this.getPosicao['latLng'].toLocaleString);
    console.log(this.dado[1]['position']['lat'] == this.getPosicao['latLng']['lat']);
  }
  // PERFIL
  perfil() {
    // console.log();
  }
  // DATA e Hora
  dataHora() {
    // const currentDate = new Date().toISOString().substring(0, 10);
    // 2019-06-05T13:52:02.605Z
    // tslint:disable-next-line: ban-types
    const datahoje: String = new Date().toISOString();
    console.log(datahoje);
    const ano = datahoje.split('-')[0];
    const mes = datahoje.split('-')[1];
    const dia = datahoje.split('-')[2];
    const hora = dia.slice(3, 5);
    const min = dia.slice(6, 8);
    const seg = dia.slice(9, 11);

    // tslint:disable-next-line: max-line-length
    const datacerta = 'Hoje é dia: ' + dia.slice(0, 2) + '/' + (mes).slice(-2) + '/' + (ano) + ' Hora: ' + hora + ' Minuto: ' + min + ' Segundos: ' + seg;
    console.log(datacerta);
  }
  // PERFIL: Pega o Usuário gravado
  async getUser() {
    await this.auth.getUser()
      .then((result) => {
        this.usersSubject.next(result)
        // console.log(this.usersSubject.value)
        this.users = result;
        // console.log(this.users);
      }, err => {
        console.log(err);
      });
  }

  // cria uma função async
  async btnOnClick() {
    // loga no console o que vai acontecer.
    console.log('Por favor aguarde 2s.');
    // Chama a função delay asyncronamente.
    await this.delay(2000);
    // Chama o sweetalert2 após o delay.
    this.presentAlert();
  }

  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  // Mensagem
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Information',
      message: 'Success:Mensagem com delay de 2000ms.',
      translucent: true,
      buttons: ['OK']
    });

    await alert.present();
  }

}
