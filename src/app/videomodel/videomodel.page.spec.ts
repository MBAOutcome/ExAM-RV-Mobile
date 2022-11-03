import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideomodelPage } from './videomodel.page';

describe('VideomodelPage', () => {
  let component: VideomodelPage;
  let fixture: ComponentFixture<VideomodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideomodelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideomodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
