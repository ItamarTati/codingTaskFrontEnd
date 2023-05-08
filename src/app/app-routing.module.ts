// This file defines the routing configuration for the Angular application.
// The RouterModule is imported from the Angular Router library.
// The Routes array contains the mapping of paths to the corresponding components.
// When a user navigates to a specific URL, the Angular Router will match the URL to the
// corresponding route and load the associated component.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
