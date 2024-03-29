// Import necessary modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ChildrenComponent } from './components/children/children.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service'
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AdvancedSettingsComponent } from './components/advanced-settings/advanced-settings.component';

@NgModule({
  // Declare components and modules
  declarations: [
    AppComponent,
    ParentsComponent,
    ChildrenComponent,
    TransactionsTableComponent,
    LoadingSpinnerComponent,
    AdvancedSettingsComponent,
  ],
  // Import necessary modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    FormsModule
  ],
  // Provide necessary services
  providers: [ApiService],
  // Bootstrap main component
  bootstrap: [AppComponent]
})
export class AppModule { }
