// This component is the root component of the Angular application.
// It sets the selector, template and style URLs for the component.
/* It also sets the change detection strategy to OnPush, which means 
  that Angular will only check for changes in the component's inputs and 
  outputs, and not the component's internal state. */
/* This can provide a performance boost in certain scenarios, 
  such as when the component has a large number of child components or 
  when the component is frequently re-rendered. */
/* The component itself doesn't contain any logic or data, it simply 
  acts as a container for other components. */
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
