import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesManagmentComponent } from './dishes-managment.component';

describe('DishesManagmentComponent', () => {
  let component: DishesManagmentComponent;
  let fixture: ComponentFixture<DishesManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
