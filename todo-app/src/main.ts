// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http'; // ✅ ADD THIS

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient() // ✅ IMPORTANT
  ]
});
