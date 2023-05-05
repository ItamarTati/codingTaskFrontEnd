import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './components/children/children.component';
import { ParentsComponent } from './components/parents/parents.component';

const routes: Routes = [
  { path: '', component: ParentsComponent },
  { path: 'children/:parentId', component: ChildrenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
