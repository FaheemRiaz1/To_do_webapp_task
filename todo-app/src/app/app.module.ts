import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// ✅ Import the standalone component instead of declaring it
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent, // ✅ standalone component should be imported here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
