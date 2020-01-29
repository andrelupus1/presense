import { FormControl } from '@angular/forms';

export class EmailValidator {
  //Cadastro
  static validEmail(fc: FormControl) {
    //Inserir emails de usuários do banco em loop
    let consultaEmail = ['a@a.com', '1@1.c', '1@1.com'];
    //console.log(consultaEmail);
    //Busca o indice do email no array
    if (consultaEmail.indexOf(fc.value.toLowerCase()) >= 0) {
      return {
        validEmail: true
      };
    } else {
      return null;
    }
  }
  //Atualização: Utilizado no Peril do usuário

  static upValidEmail(fc: FormControl) {
    //Inserir emails de usuários do banco em loop
    let consultaEmail = ['a@a.com', '1@1.c', '1@1.com'];
    let emailUsuario: any = 'a@b.com';

    if (consultaEmail.indexOf(fc.value.toLowerCase()) >= 0 && fc.value.toLowerCase() != emailUsuario) {
      // Se o email existe e não é do próprio usuário gere erro
      //console.log('O email já existe!');
      return { upValidEmail: true };
    } else {
      //Se o email a ser atualizado for igual do próptio usuário, então não gere erro
      //console.log(fc.value.toLowerCase()!=emailUsuario?"Diferentes":"Iguais");
      return null;
    }
  }
}
