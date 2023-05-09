// This component is responsible for rendering the advanced settings panel and managing user interactions with it.
// It imports the necessary dependencies from Angular core and the ApiService, which provides the Direction enum.
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Direction } from '../../services/api.service';

// The component decorator specifies the selector, template, and style URLs for this component.
@Component({
  selector: 'app-advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Using OnPush change detection strategy for performance optimization
})

// The class that defines the component and its properties and methods.
export class AdvancedSettingsComponent implements OnInit {
  // An EventEmitter that emits the parent ID order, which will be sent to the parent component.
  @Output() parentIdOrder = new EventEmitter<Direction>();
  // A boolean flag that indicates whether the panel is open or not.
  public panelOpenState = false;
  // The initial direction for sorting the parent IDs is set to ascending.
  public direction = Direction.ASCENDING;

  // The ngOnInit method is called when the component is initialized, and it emits the ascending order direction to the parent component.
  public ngOnInit() {
    this.parentIdOrder.emit(Direction.ASCENDING);
  }

  // This method is called when the user selects the ascending sort order, and it emits the ascending order direction to the parent component.
  public onOrderChangeAscending(): void {
    this.parentIdOrder.emit(Direction.ASCENDING);
  }

  // This method is called when the user selects the descending sort order, and it emits the descending order direction to the parent component.
  public onOrderChangeDescending(): void {
    this.parentIdOrder.emit(Direction.DESCENDING);
  }
}

// The template for the advanced settings panel, which uses the mat-accordion and mat-expansion-panel components provided by Angular Material.
// When the user selects the sort order, the onOrderChangeAscending or onOrderChangeDescending method is called, which emits the appropriate direction to the parent component.
// The [(ngModel)] directive binds the selected direction to the component's direction property.
