import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ChildrenComponent } from './components/children/children.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetParentsAndChildrenService } from './services/get-parents-and-children.service'
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ParentsComponent,
    ChildrenComponent,
    TransactionsTableComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [ GetParentsAndChildrenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
