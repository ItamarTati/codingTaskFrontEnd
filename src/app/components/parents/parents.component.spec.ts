import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

import { ApiService, ParentTransaction } from '../../services/api.service';
import { ParentsComponent } from './parents.component';

describe('ParentsComponent', () => {
  let component: ParentsComponent;
  let fixture: ComponentFixture<ParentsComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize current page to 1', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should set loading status to true on initialization', () => {
    expect(component.isLoading$.getValue()).toBe(true);
  });

  it('should fetch parent transactions on initialization', () => {
    const parentTransactions: ParentTransaction[] = [
      { id: 1, sender: 'Parent 1', receiver: 'Receiver 1', totalAmount: 100 },
      { id: 2, sender: 'Parent 2', receiver: 'Receiver 2', totalAmount: 200 },
    ];
    spyOn(apiService, 'getParentTransactions').and.returnValue(
      of(parentTransactions)
    );
    component.ngOnInit();
    expect(component.parentTransactions$).toBeDefined();
    component.parentTransactions$?.subscribe((transactions) => {
      expect(transactions).toEqual(parentTransactions);
    });
  });

  it('should fetch first page of parent transactions', () => {
    spyOn(apiService, 'getParentTransactions').and.returnValue(of([]));
    component.firstPage();
    expect(component.currentPage).toBe(1);
  });

  it('should fetch next page of parent transactions', () => {
    spyOn(apiService, 'getParentTransactions').and.returnValue(of([]));
    component.currentPage = 2;
    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should fetch previous page of parent transactions', () => {
    spyOn(apiService, 'getParentTransactions').and.returnValue(of([]));
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not fetch previous page of parent transactions when on first page', () => {
    spyOn(apiService, 'getParentTransactions').and.returnValue(of([]));
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should fetch last page of parent transactions', () => {
    spyOn(apiService, 'getParentTransactions').and.returnValue(of([]));
    component.lastPage();
    expect(component.currentPage).toBe(4);
  });

  it('should handle page change event from paginator', () => {
    spyOn(component, 'firstPage');
    spyOn(component, 'lastPage');
    spyOn(component, 'nextPage');
    spyOn(component, 'prevPage');
    const event = {
      pageIndex: 0,
      previousPageIndex: undefined,
      length: 7,
      pageSize: 2,
    };
    component.pageChanged(event);
    expect(component.firstPage).toHaveBeenCalled();
    expect(component.lastPage).not.toHaveBeenCalled();
    expect(component.nextPage).not.toHaveBeenCalled();
    expect(component.prevPage).not.toHaveBeenCalled();
  });
});
