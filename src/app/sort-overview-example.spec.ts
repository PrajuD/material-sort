import { SortOverviewExample } from './sort-overview-example';
import { fakeAsync,TestBed,ComponentFixture } from '@angular/core/testing';


describe('SortOverviewExample', () => {
  let component: SortOverviewExample;
  let fixture: ComponentFixture<SortOverviewExample>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SortOverviewExample
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SortOverviewExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SortOverviewExample);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 
 

 
  it('should render table title', () => {
    const fixture = TestBed.createComponent(SortOverviewExample);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('th')?.textContent).toContain('Favorite');
  });
});
