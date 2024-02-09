import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPorcedduComponent } from './add-porceddu.component';

describe('AddPorcedduComponent', () => {
  let component: AddPorcedduComponent;
  let fixture: ComponentFixture<AddPorcedduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPorcedduComponent]
    });
    fixture = TestBed.createComponent(AddPorcedduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
