import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // ✅ NEW
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]  // ✅ This replaces HttpClientModule
}).catch(err => console.error(err));
