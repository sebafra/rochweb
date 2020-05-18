import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptorsComponent } from './suscriptors.component';

describe('SuscriptorsComponent', () => {
  let component: SuscriptorsComponent;
  let fixture: ComponentFixture<SuscriptorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuscriptorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
