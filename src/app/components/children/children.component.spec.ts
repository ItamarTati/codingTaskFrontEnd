import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ChildrenComponent } from './children.component';
import { Observable, of } from 'rxjs';

describe('ChildrenComponent', () => {
  let component: ChildrenComponent;
  let fixture: ComponentFixture<ChildrenComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['getChildTransactions']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (param: string) => '1', // parent ID is '1'
        },
      } as any, // mock the snapshot property
    } as ActivatedRoute;
    
    
    TestBed.configureTestingModule({
      declarations: [ChildrenComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildrenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the parent ID on initialization', () => {
    component.ngOnInit();
    expect(component.parentId).toEqual(1);
  });

  it('should not set the parent ID if there is no ID in the URL', () => {
    mockActivatedRoute.snapshot!.paramMap!.get = (param: string) => null;
    component.ngOnInit();
    expect(component.parentId).toBeUndefined();
  });

  it('should call the API service to get child transactions', fakeAsync(() => {
    mockApiService.getChildTransactions.and.returnValue(of([]));
    component.ngOnInit();
    tick(); // Wait for async call to finish
    expect(mockApiService.getChildTransactions).toHaveBeenCalledWith(1); // Parent ID is '1'
    expect(component.childTransactions$).toBeDefined();
  }));
});