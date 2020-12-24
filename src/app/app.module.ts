import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddmilkComponent } from './addmilk/addmilk.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListdataComponent } from './listdata/listdata.component';
import { ShowreportComponent } from './showreport/showreport.component';
import { AdminComponent } from './admin/admin.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './editdata/edit.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AlertComponent } from './shared/alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddmilkComponent,
    ListdataComponent,
    ShowreportComponent,
    AdminComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    EditComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig, 'milk-accounting'),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
