import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteComponent } from './post-delete.component';

describe('PostDeleteComponent', () => {
  let component: PostDeleteComponent;
  let fixture: ComponentFixture<PostDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDeleteComponent]
    });
    fixture = TestBed.createComponent(PostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
