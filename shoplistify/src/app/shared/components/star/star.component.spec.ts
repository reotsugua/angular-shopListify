import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarComponent } from './star.component';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarComponent]
    });
    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate starWidth correctly based on rating', () => {
    
    component.rating = 3;

    component.ngOnChanges();

    expect(component.starWidth).toBe(3 * 68 / 5);
  });
  
});
