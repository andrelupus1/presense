import { UsuariosService } from './../../service/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-recupera',
  templateUrl: './recupera.page.html',
  styleUrls: ['./recupera.page.scss'],
})
export class RecuperaPage implements OnInit {
  validations_form: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    //Validação Formulário
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Por favor, insira um e-mail válido!' },
      { type: 'validEmail', message: 'Este e-mail já foi cadastrado.' }
    ]
  };

  recuperaSenha() {
    this.usuariosService.getRecupera(this.validations_form.get('email').value)
      .then((result: any) => {
        console.log("Retorno: " + result);
        this.presentToast('Senha enviada para e-mail!');
        // aqui tem que add o providers de config
        this.router.navigate(['/login']);
      }).catch((error: any) => {
        console.log(error);
        this.presentToast('Erro ao recuperar senha. Verifique se o e-mail existe!');
        this.router.navigate(['/login']);

      });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 6000,
      buttons: ['OK']
    });
    await toast.present();
  }
}
