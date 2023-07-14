import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberViewComponent } from './subscriber-view.component';

describe('SubscriberViewComponent', () => {
  let component: SubscriberViewComponent;
  let fixture: ComponentFixture<SubscriberViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriberViewComponent]
    });
    fixture = TestBed.createComponent(SubscriberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
