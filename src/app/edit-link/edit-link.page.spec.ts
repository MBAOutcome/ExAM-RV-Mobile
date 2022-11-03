import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLinkPage } from './edit-link.page';

describe('EditLinkPage', () => {
  let component: EditLinkPage;
  let fixture: ComponentFixture<EditLinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
