export interface User {
    id;
    nome: string;
    sobrenome: string;
    email: string;
    loginUser: boolean;
    status: string;
    notifica_email: string;
    nasc: string;
    idade: string;
    sexo: string;
    pessoa_id: string;
    carro_id: string;
    celular_id: string
    ano_auto: string;
    marca_auto: string;
    tipo_auto: string;
    uf_placa: string;
    marca_celular: string;
}
/*    dados.usuario_id,
             id: values['id'],
        sobrenome: values['sobrenome'],
        nome: values['nome'],
        email: values['email'],
        //senha: values['senha'],
         loginUser: boolean;---
        notifica_email: values['notifica_email'],
        datanascimento: values['datanascimento'],
        idade: values['idade'],
        sexo: values['sexo'],
        pessoa_id: values['pessoa_id'],-ok
        carro_id: values['carro_id'],
        celular_id: values['celular_id'],
        ano_auto: values['ano_auto'],
        marca_auto: values['marca_auto'],
        tipo_auto: values['tipo_auto'],
        uf_placa: values['uf_placa'],
        marca_celular: values['marca_celular']  */