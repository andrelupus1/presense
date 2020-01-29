import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
 
  { path: '', canActivate: [AuthGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login',  loadChildren: './pages/login/login.module#LoginPageModule' },//NOT canActivate
  { path: 'cadastrar', loadChildren: './pages/cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'noticias', canActivate: [AuthGuard], loadChildren: './pages/noticias/noticias.module#NoticiasPageModule' },
  { path: 'sobre', canActivate: [AuthGuard], loadChildren: './pages/sobre/sobre.module#SobrePageModule' },
  { path: 'recupera', loadChildren: './pages/recupera/recupera.module#RecuperaPageModule' },
  { path: 'termos', loadChildren: './pages/termos/termos.module#TermosPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
