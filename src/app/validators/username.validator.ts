import { FormControl } from '@angular/forms';

export class UsernameValidator {

  static validUsername(fc: FormControl){
    //Inserir nomes de usuários do banco com busca em loop
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return {
        validUsername: true
      };
    } else {
      return null;
    }
  }
}
