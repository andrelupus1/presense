import { AuthService, UserList } from './../../service/auth.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  users: UserList[];//Lista de Usuários

  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private auth: AuthService
  ) {
    // let status bar overlay webview 
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#09a266');
  }

  ngOnInit() {
    //Validação Formulário
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      //sexo: new FormControl(this.genders[0], Validators.required),
      //country_phone: this.country_phone_group,
      senha: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'validEmail', message: 'Este e-mail já foi cadastrado.' }
    ],
    'senha': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha que tem ter mais de 5 caracteres.' }
    ]
  };
  onSubmit() {
    //console.log(this.validations_form.value);
    //this.router.navigate(["/login"]);

  }
  //Logar
  getLogin() {
    //this.auth.setLoggedIn(true)
    let data = this.validations_form.value;
    this.auth.setLoggedIn(data['email'], data['senha'])
      .then((result: any) => {
        console.log(result);
        if (result.status == 1||result.loginUsuario == true) {
          this.router.navigate(["/"])//Home
          this.presentToast('Seja bem-vindo ao PreSense!');
        } else {
          this.router.navigate(["/login"])//Home
          this.presentToast('Ops! Erro na autenticação!');
        }

      });
  }
  getRecuperar() {
    this.router.navigate(["/recupera"]);
    this.presentToast('A nova senha será enviada por e-mail!');
  }
  getCadastrar() {
    this.router.navigate(["/cadastrar"]);
    this.presentToast('Após cadastro, será enviado um e-mail de ativação!');
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
  //Teste
  getLogout() {
    this.storage.clear();
    console.log('Limpando storage');
    console.log('sair');
    this.presentToast("Obrigado por usar nosso APP!");
    this.router.navigate['/login'];
    //localStorage.clear();
    //this.nav.setRoot(LoginPage);
  }
  getStorage() {
    console.log(this.auth.isAuthenticated());
    this.auth.getUserAll()
      .then((result) => {
        this.users = result;
        console.log(result);
      });
  }
}

// console.log(this.auth.storageGet);
// console.log(this.auth.isAuthenticated());
// console.log(this.storage.length());
// console.log(localStorage.getItem('config'))
//Doc: https://www.freakyjolly.com/ionic-4-adding-native-storage-in-application-using-cordova-sqlite-storage-plugin/#more-1562

/*  return this.storage.get('config').then(res=>{
  console.log(res.loginUser)
 return res.loginUser
}); */

/*  let user:any;
this.storage.forEach((value, key: string, iterationNumber: Number) => {
  console.log("key " + key);
  console.log("iterationNumber " + iterationNumber);
  console.log("value " + JSON.stringify(value));
  console.log("value " + value.loginUser);
  user = value;
  console.log('User '+ JSON.stringify(user.loginUser));
}); */

/*
  return Promise.all([
  this.storage.get('config')
  .then((data)=>{
  console.log('Resolve: '+data);
  return data;
  })
]); */

    //Foreach Storage - Retorna a chave e seus valores
/* console.log('Foreach Storage \n');
this.storage.forEach((value, key)=>{
  if(key.indexOf('config') != -1){
    console.log(key);
    console.log(value);
  }
}); */
    //Ready
    //console.log('Storage Ready '+this.storage.ready());//object Promise
    //Todas as chaves armazendas : Keys
/* this.storage.keys().then((k) => {
  console.table(k)
}); */
    //Retorna o Drive usado
    //console.log("Driver Used: " + this.storage.driver);