import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction } from '../../services/api.service';

import { AdvancedSettingsComponent } from './advanced-settings.component';

describe('AdvancedSettingsComponent', () => {
  let component: AdvancedSettingsComponent;
  let fixture: ComponentFixture<AdvancedSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit ascending direction on initialization', () => {
    spyOn(component.parentIdOrder, 'emit');
    component.ngOnInit();
    expect(component.parentIdOrder.emit).toHaveBeenCalledWith(
      Direction.ASCENDING
    );
  });

  it('should emit ascending direction on selecting "Ascending" option', () => {
    spyOn(component.parentIdOrder, 'emit');
    const ascendingRadioButton = fixture.nativeElement.querySelector(
      '#ascending-radio-button'
    );
    ascendingRadioButton.click();
    expect(component.parentIdOrder.emit).toHaveBeenCalledWith(
      Direction.ASCENDING
    );
  });

  it('should emit descending direction on selecting "Descending" option', () => {
    spyOn(component.parentIdOrder, 'emit');
    const descendingRadioButton = fixture.nativeElement.querySelector(
      '#descending-radio-button'
    );
    descendingRadioButton.click();
    expect(component.parentIdOrder.emit).toHaveBeenCalledWith(
      Direction.DESCENDING
    );
  });
});
