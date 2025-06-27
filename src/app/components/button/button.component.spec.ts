import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loadingState$ true by default', (done) => {
    component.loadingState$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should set loadingState$ to true when showLoading is called', (done) => {
    component.loadingState$.next(false); // set to false first
    component.showLoading();
    component.loadingState$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should set loadingState$ to false when stopLoading is called', (done) => {
    component.stopLoading();
    component.loadingState$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should unsubscribe loadingState$ on destroy', () => {
    const unsubscribeSpy = spyOn(component.loadingState$, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
