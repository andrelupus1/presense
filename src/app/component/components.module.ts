import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
// import { PopoverComponent } from './popover/popover.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        IonicModule
    ],
    exports: [HeaderComponent]

})
export class ComponentsModule {
    // Padrão: "https://nomesite.com.br/api/",  com "/" no final.
    private static url = 'http://localhost/web/presense/api/crimes/';

    static getUrl() {
        return this.url;
        // Utilizar nas páginas
        //  private API_URL = ComponentsModule.getUrl() + 'Usuarios/';
    }
}
