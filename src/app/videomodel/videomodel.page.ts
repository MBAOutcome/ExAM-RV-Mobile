import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-videomodel',
  templateUrl: './videomodel.page.html',
  styleUrls: ['./videomodel.page.scss'],
})
export class VideomodelPage implements OnInit {

  public roomlink: any;
  constructor(private modalController: ModalController) {
    
   }

  ngOnInit() {
   // this.roomlink = 
  }

}
