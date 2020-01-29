import { Router } from '@angular/router';
import { UsuariosService } from './../../service/usuarios.service';
import { AuthService, UserList } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmailValidator } from './../../validators/email.validator';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  users: UserList[];//Lista dos dados do Usuário
  key: string;

  notifica_toggle: boolean = false;
  automovel_toggle: boolean = false;
  celular_toggle: boolean = false;
  confirmar: boolean = false;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  automovel_group: FormGroup;
  celular_group: FormGroup;
  sexos: Array<string>;
  marcas: Array<string>;
  estados: Array<any>;

  private usersSubject: BehaviorSubject<any>;
  public isusers: Observable<any>;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.usersSubject = new BehaviorSubject<any>(this.users);
    this.isusers = this.usersSubject.asObservable();
    //const currentDate = new Date().toISOString().substring(0, 10);
    //Set Valor
    this.getUser();
  }

  ngOnInit() {
    //Valida formulário
    this.perfilForm();
   
  }

  async getUser() {
    await this.auth.getUser()
      .then((result) => {
        this.usersSubject.next(result)
        // console.log(this.usersSubject.value)
        this.users = result;
        // console.log(this.users);
        this.validations_form.setValue({
          marca_auto: this.users[0]['user']['marca_carro'],
          ano_auto: this.users[0]['user']['ano_carro'],
          tipo_auto: this.users[0]['user']['tipo_carro'],
          uf_placa: this.users[0]['user']['uf_carro'],
          marca_celular: this.users[0]['user']['celular_marca'],
          id: this.users[0]['user']['id'],
          nome: this.users[0]['user']['nome'],
          sobrenome: this.users[0]['user']['sobrenome'],
          email: this.users[0]['user']['email'],
          senha: '',
          //automovel:  this.automovel_group,
          //celular:  this.celular_group,
          notifica_email: this.users[0]['user']['notifica_email'],
          sexo: this.users[0]['user']['sexo'],
          idade: this.users[0]['user']['idade'],
          datanascimento: this.users[0]['user']['nasc'],
          pessoa_id: this.users[0]['user']['pessoa_id'],
          carro_id: this.users[0]['user']['carro_id'],
          celular_id: this.users[0]['user']['celular_id']
        });
      }, err => {
        console.log(err);
      });
  }

  perfilForm() {
    //Option Value Padrão
    this.sexos = ["Masculino", "Feminino"];
    this.marcas = ["Outros", "Asus", "Alcatel", "Apple", "Blackberry", "Lg", "Motorola", "Nokia", "Sansung", "Sony", "ZTE"];
    this.estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];
 /*    //Automóvel
    this.automovel_group = new FormGroup({
      marca_auto: new FormControl('', Validators.nullValidator),
      ano_auto: new FormControl('', Validators.nullValidator),
      tipo_auto: new FormControl('', Validators.nullValidator),
      uf_placa: new FormControl(this.estados[13], Validators.nullValidator),
    });

    //Celular
    this.celular_group = new FormGroup({
      marca_celular: new FormControl(this.marcas[0], Validators.nullValidator),//Não valida
    });
 */
    //Validação do Form
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.nullValidator),//this.users[0]['user']['id']
      nome: new FormControl('', Validators.nullValidator), // this.users[0]['user']['nome']
      sobrenome: new FormControl('', Validators.nullValidator),
      email: new FormControl('', Validators.compose([
        EmailValidator.upValidEmail,//Se for atualizar com um e-mail que esteja cadastrado vai dar erro.
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      notifica_email: new FormControl('', Validators.compose([
        EmailValidator.upValidEmail,//Se for atualizar com um e-mail que esteja cadastrado vai dar erro.
        Validators.nullValidator,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      sexo: new FormControl(this.sexos[0], Validators.required),
      idade: new FormControl('', Validators.nullValidator),
      /*  datanascimento: new FormControl('', Validators.compose([
         DateValidator.ptDate])), */
      datanascimento: new FormControl('', Validators.nullValidator),
      senha: new FormControl('', Validators.nullValidator),
      //automovel: this.automovel_group,
      //celular: this.celular_group,
      pessoa_id: new FormControl('', Validators.nullValidator),
      carro_id: new FormControl('', Validators.nullValidator),
      celular_id: new FormControl('', Validators.nullValidator),
      // Teste
      marca_auto: new FormControl('', Validators.nullValidator),
      ano_auto: new FormControl('', Validators.nullValidator),
      tipo_auto: new FormControl('', Validators.nullValidator),
      uf_placa: new FormControl(this.estados[13], Validators.nullValidator),
      marca_celular: new FormControl(this.marcas[0], Validators.nullValidator),//Não valida
    });//, {updateOn: 'submit'});

  }
  //Mensagens de Erros
  validation_messages = {
    'usuario': [
      { type: 'required', message: 'Usuário é obrigatório.' },
      { type: 'minlength', message: 'Usuário tem que ter no mínimo 5 caracteres.' },
      { type: 'maxlength', message: 'Usuário não pode ter mais de 25 caracteres.' },
      { type: 'pattern', message: 'Seu nome de usuário deve conter apenas números e letras.' },
      { type: 'validUsername', message: 'Seu nome de usuário já foi usado.' }
    ],
    'nome': [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    'sobrenome': [
      { type: 'required', message: 'Sobrenome é obrigatório.' }
    ],
    'email': [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'upValidEmail', message: 'Este e-mail já está cadastrado.' }
    ],
    'notifica_email': [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' }
    ],
    'fone': [
      { type: 'required', message: 'Telefone é obrigatório.' },
      { type: 'validCountryPhone', message: 'O telefone está incorreto para o país selecionado.' }
    ],
    'senha': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'A senha que tem ter mais de 5 caracteres.' },
      { type: 'pattern', message: 'Sua senha deve conter pelo menos uma maiúscula, uma minúscula e um número.' }
    ],
    'confirma_senha': [
      { type: 'required', message: 'Precisa confirmar a senha.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Senha incorreta.' }
    ],
    'termos': [
      { type: 'pattern', message: 'Você deve aceitar os termos e condições.' }
    ],
    'datanascimento': [
      { type: 'ptDate', message: 'Data inválida.' }
    ],
  };

  onSubmit() {
    //this.auth.setLoggedIn(true)
    let data = this.validations_form.value;
    //console.log(data);
    this.usuariosService.upUsuario(data)
      .then((result: any) => {
        //console.log(result);
        if (result.status == 1 || result.loginUsuario == true) {
          this.router.navigate(["/"])
          this.presentToast('Atualizado com sucesso!');
        } else {
          this.router.navigate(["/perfil"])
          this.presentToast('Ops! Erro ao atualizar!');
        }
      });
  }

  //Toggle
  toggle(value: string) {
    switch (value) {
      case "notifica_email": {
        this.notifica_toggle = !this.notifica_toggle;
        break;
      }
      case "automovel": {
        this.automovel_toggle = !this.automovel_toggle;
        break;
      }
      case "celular": {
        this.celular_toggle = !this.celular_toggle;
        break;
      }
      default: {
        console.log("Nenhuma opção escolhida!");
        break;
      }
    }
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
  /* 
    ngOnDestroy() {
      this.usersSubject.unsubscribe();
    } */
  //TESTES
  logKeyValuePairs(group: FormGroup): void {
    //console.log(Object.keys(group.controls))
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      } else {
        //console.log('Key = '+key+' Value = '+abstractControl.value);
        let ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

        if (key == 'datanascimento')
          if (!abstractControl.value.match(ptDatePattern)) {
            console.log(abstractControl.value);
            let datanasc = abstractControl.value;
            let ano = datanasc.split("-")[0];
            let mes = datanasc.split("-")[1];
            let dia = datanasc.split("-")[2];

            let datacerta = dia.slice(0, 2) + '/' + (mes).slice(-2) + '/' + (ano);
            console.log(datacerta);
          }

        return null;
      }
    });
    //Teste
    //this.logKeyValuePairs(this.validations_form);
    // Fim teste
  }
}
