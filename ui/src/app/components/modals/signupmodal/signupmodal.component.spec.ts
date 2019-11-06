import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupmodalComponent } from './signupmodal.component';

describe('SignupmodalComponent', () => {
  let component: SignupmodalComponent;
  let fixture: ComponentFixture<SignupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
