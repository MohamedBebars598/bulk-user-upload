import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFormComponent } from './add-form/add-form.component';
import { CustomPrimeNgModule } from './custom-prime-ng/custom-prime-ng.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomPrimeNgModule,
    HttpClientModule,   // ← add this

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
