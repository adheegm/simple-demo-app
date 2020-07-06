import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NetworkComponent } from './network.component';
import { NetworkReducer } from '../network.reducers';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('MyCounterComponent', () => {
  let component: NetworkComponent;
  let mockStore: MockStore;
  let fixture: ComponentFixture<NetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        StoreModule.forRoot({
          networks: NetworkReducer
        }),
        ScrollingModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            networks: [],
            cursor: null,
            error: null
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.debugElement.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
