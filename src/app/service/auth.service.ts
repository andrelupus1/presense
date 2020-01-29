import { User } from './../interface/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http/';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';

//declare var loginUser;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;
  public users: UserList[] = [];

  private API_URL = 'http://localhost/web/presense/api/Usuarios/';

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

    this.getUser()
      .then(() => {
        //console.log(this.users);
        if (this.users[0]) {
          let status = this.users[0]['user']['loginUsuario'];
          status || this.isLoggedInSubject.value ? this.isLoggedInSubject.next(true) : this.isLoggedInSubject.next(false);
          if (this.isAuthenticated()) {
            this.router.navigate(["/"])
            console.log('iniciando..')
          }
        } else {
          this.isLoggedInSubject.next(false)
        }
      })
  }

  //LOGIN : VALIDA ACESSO LOGIN
  setLoggedIn(email: string, senha: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: senha
      }
      this.http.post(this.API_URL + 'login', data)
        .subscribe((result: any) => {
          const dados = result.dados; //Recebe da API os dados se Logar
          resolve(dados);
          //console.log(dados);
          //{usuario_id: "", usuario_nome: "", usuario_sobrenome: "", usuario_email: "", loginUsuario: true, …}
          if (dados.loginUsuario == true || dados.status == 1) {
            //Grava Local Storage
            this.configService.setConfig(dados);
            console.log('Gravado no Storage!');
            this.isLoggedInSubject.next(true);//Observable recebe true
          }

        },
          (error) => {
            reject(error.error);
            console.error(error.error);
          });
    });
  }

  //Está autenticado?
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  //Logout
  setLoggedOut(_value) {
    this.isLoggedInSubject.next(_value);//false
    this.storage.clear();//Limpa Storage
  }

  // Listar Dados de Todos os usuário no Confirg : Utilizar no perfil
  public getUserAll() {
    //let users: UserList[] = [];
    return this.storage.forEach((value: User, key: string, iterationNumber: Number) => {
      let user = new UserList();
      user.key = key;
      user.user = value;
      if (this.users[0]) { //Se existir o primeiro concatena 
        this.users.concat(user);
      }
      else {
        this.users.push(user);
      }
    })
      .then(() => {
        return Promise.resolve(this.users);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
   // Listar Dados de apenas um usuário no Confirg : Utilizar no perfil
  public async getUser() {
    try {
      const result = await this.storage.get('config');
      let user = new UserList();
      user.key = 'config';
      user.user = result;
      if (this.users[0]) { //Se existir o primeiro concatena 
        this.users.concat(user);
      }
      else {
        this.users.push(user);
      }
      //console.log(this.users);
      return Promise.resolve(this.users);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
}

export class UserList {
  key: string;
  user: User;
}
