import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor(private platform: Platform, private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    // Espera a que la plataforma esté lista
    this.platform.ready().then(() => {
      console.log('Plataforma lista para inicializar Ionic y Capacitor');

      // Configuración de ngx-translate
      this.configureTranslations();
    });
  }

  private configureTranslations() {
    // Idioma por defecto
    const defaultLang = 'en';
    const browserLang = navigator.language.split('-')[0]; // Detecta idioma base (ej. 'es')
    const availableLangs = ['es', 'en', 'fr', 'pt', 'nl', 'de', 'th', 'ar-KW', 'id', 'pt-AO', 'fr-MU', 'en-MU'];

    // Selecciona el idioma si está disponible, de lo contrario usa el idioma por defecto
    //const selectedLang = availableLangs.includes(browserLang) ? browserLang : defaultLang;
    const selectedLang = 'es';
    console.log(`Idioma seleccionado: ${selectedLang}`);
    this.translate.setDefaultLang(selectedLang);
    this.translate.use(selectedLang);
  }
}

