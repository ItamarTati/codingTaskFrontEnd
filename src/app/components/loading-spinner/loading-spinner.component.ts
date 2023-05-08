/* This code defines an Angular component called "LoadingSpinnerComponent" which includes a single input property called "loadingMessage". 
  This component displays a spinner icon along with an optional message to indicate that some content is currently loading.

The "@Component" decorator is used to specify the component's selector, HTML template and CSS styles. In this case, the selector is "app-loading-spinner", 
which means that the component can be used in other parts of the application by including the tag <app-loading-spinner> in the HTML code.

The component's HTML template includes a div with a class of "spinner-container", which contains a Material Design spinner icon and a <p> tag with a class of "loading-text" 
that displays the "loadingMessage" input property.

By defining this component, developers can easily include a loading spinner in their Angular application and customize the message displayed while data is being loaded. 
The @Input decorator is used to allow for the passing of dynamic data into the component. */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
   @Input() loadingMessage!: string;
}
