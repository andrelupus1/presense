import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http/';

@Injectable()

export class UsuariosService {
  private API_URL = 'http://localhost/web/presense/api/Usuarios/';

  constructor(public http: HttpClient,
    // private configProvider: ConfigProvider,
              // tslint:disable-next-line: variable-name
              private _platform: Platform,
              private configService: ConfigService
  ) {
    // verifica em qual plataforma esta sendo aberto o app para redirecionamento de url de acesso
    // este comando evita erros de cabeçalhos
    if (this._platform.is('cordova')) {
      this.API_URL = 'http://localhost/web/presense/api/Usuarios/';
    }
  }
  // CADASTRAR USUARIO
  addUsuario(values) {
    return new Promise((resolve, reject) => {
      const data = {
        nome: values.nome,
        sobrenome: values.sobrenome,
        email: values.email,
        senha: values.matching_passwords['senha']
      };
      this.http.post(this.API_URL + 'addUsuario', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error.error);
          });
    });
  }
  // ATUALIZA USUÁRIO - PERFIL
  upUsuario(values) {
    console.log(values);

    return new Promise((resolve, reject) => {
      let data = {
        id: values.id,
        sobrenome: values.sobrenome,
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        notifica_email: values.notifica_email,
        datanascimento: values.datanascimento,
        idade: values.idade,
        sexo: values.sexo,
        pessoa_id: values.pessoa_id,
        carro_id: values.carro_id,
        celular_id: values.celular_id,
        ano_auto: values.ano_auto,
        marca_auto: values.marca_auto,
        tipo_auto: values.tipo_auto,
        uf_placa: values.uf_placa,
        marca_celular: values.marca_celular
       /*  ano_auto: values['automovel']['ano_auto'],
        marca_auto: values['automovel']['marca_auto'],
        tipo_auto: values['automovel']['tipo_auto'],
        uf_placa: values['automovel']['uf_placa'],
        marca_celular: values['celular']['marca_celular'] */
      };
      // console.log("dados de cadastro: ");
      // console.log(data);
      this.http.post(this.API_URL + 'upUsuario', data)
        .subscribe((result: any) => {
          const dados = result.dados;
          // console.log(dados);
          resolve(dados);
          if (dados.loginUsuario == true || dados.status == 1) {
            // Grava Local Storage
            this.configService.setConfig(dados );
            console.log('Gravado no Storage!');

          }
        },
          (error) => {
            reject(error.error);
          });
    });
  }

  // RECUPERA SENHA
  getRecupera(email: string) {
    return new Promise((resolve, reject) => {
      let data = {
        email
      };
      this.http.post(this.API_URL + 'recuperaSenha', data)
        .subscribe((result: any) => {
          return resolve(result);
        },
          (error) => {
            return reject(error.error);
          });

    });
  }
}
