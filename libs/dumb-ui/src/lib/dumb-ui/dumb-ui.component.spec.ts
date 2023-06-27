import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DumbUiComponent } from './dumb-ui.component';

describe('DumbUiComponent', () => {
  let component: DumbUiComponent;
  let fixture: ComponentFixture<DumbUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DumbUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DumbUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
