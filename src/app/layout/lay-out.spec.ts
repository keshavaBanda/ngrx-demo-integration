import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayOut } from './lay-out';

describe('LayOut', () => {
  let component: LayOut;
  let fixture: ComponentFixture<LayOut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayOut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayOut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
