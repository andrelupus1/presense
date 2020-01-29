//import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './../../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmailValidator } from '../../validators/email.validator';
//import { UsernameValidator } from '../../validators/username.validator';
//import { PhoneValidator } from '../../validators/phone.validator';
//import { CountryPhone } from '../../validators/country-phone.model';
import { PasswordValidator } from '../../validators/password.validator';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  //forgroup: FormGroup;
  //loadingController: LoadingController;
  //country_phone_group: FormGroup;
  //countries: Array<CountryPhone>;
  //genders: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public usuariosService: UsuariosService,
    private router: Router
  ) {
    this.usuariosService;
  }

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    /*  this.countries = [
       new CountryPhone('UY', 'Uruguay'),
       new CountryPhone('US', 'United States'),
       new CountryPhone('BR', 'Brasil')
     ]; */
    /* this.sexos = [
      "Masculino",
      "Feminino"
    ]; */

    this.matching_passwords_group = new FormGroup({
      senha: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirma_senha: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    /* 
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
   this.country_phone_group = new FormGroup({
      country: country,
      phone: phone 
    });*/

    this.validations_form = this.formBuilder.group({
      /* usuarios: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])), */
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        EmailValidator.validEmail,
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      //sexo: new FormControl(this.genders[0], Validators.required),
      //country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
      termos: new FormControl(true, Validators.pattern('true'))
    });
  }

  validation_messages = {
    'usuarios': [
      { type: 'required', message: 'Usuário é obrigatório.' },
      { type: 'minlength', message: 'O nome de usuário deve ter pelo menos 5 caracteres.' },
      { type: 'maxlength', message: 'O nome de usuário não pode ter mais de 25 caracteres.' },
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
      { type: 'validEmail', message: 'Este e-mail já foi cadastrado.' }
    ],
    'phone': [
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
  };
//Produção
  onSubmit() {
    //console.log('Dados Enviados: '+JSON.stringify(this.validations_form.value));
    this.usuariosService.addUsuario(this.validations_form.value)
    .then((result:any) => {
      console.log(result);
        if(result['dados']['status_cadastro']==="1"){
          this.presentToast('Cadastro realizado com sucesso!');
          this.router.navigate(['login'])
        }else{
          this.presentToast('Erro ao realizar cadastro, tente novamente!');
          this.router.navigate(['cadastrar'])
          //this.router.navigate(['login'])
        }
      }).catch((error:any) => {
      console.log(error);
      this.presentToast('Erro ao realizar cadastro, tente novamente!');
      this.router.navigate(['cadastrar'])
    });
}
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons:['OK']
    });
    await  toast.present();
  }
}