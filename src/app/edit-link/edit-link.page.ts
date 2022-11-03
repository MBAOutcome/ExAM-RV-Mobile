import { Component, OnInit,NgZone } from '@angular/core';
import { ModalController, NavParams, PopoverController, ToastController, AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from '../app.component';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.page.html',
  styleUrls: ['./edit-link.page.scss'],
})
export class EditLinkPage implements OnInit {

  roomlink:any = {roomlink:''};
  constructor(
    private modalController: ModalController,
    public loaderservice: LoaderService,
    public http: HttpClient,
    public alertController:AlertController,
    public httpnative:HTTP,
    private zone: NgZone
  ) { }

  ngOnInit() {
  }
  async presentAlert(alertMessage) {
    const alert = await this.alertController.create({
      message: alertMessage,
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  closeModal() {
    this.modalController.dismiss(null);
    var _this = this;
   // _this.processDeeplinkURL();
  }
  savemodal() {
    var _this = this;
    console.log(':::::_this.roolink',_this.roomlink.roomlink);
    this.modalController.dismiss(_this.roomlink);
  }
  addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }
  // added for process the url
  processDeeplinkURL(){
    var _this = this;
    var shortlink =  _this.roomlink.roomlink;

    console.log('shortlink',shortlink);
    if(shortlink && shortlink.includes('examrv.com') && _this.addhttp(shortlink)){

      shortlink = _this.addhttp(shortlink);
// https://examrv.com/Jxr1W4SdxqNoxosJA
      if (navigator.connection.type != Connection.NONE) {

        _this.loaderservice.showLoading('');
        _this.httpnative.get( shortlink ,null,null).then(function(tokenResponse){

          if(tokenResponse && Object.keys(tokenResponse).length > 0 && tokenResponse.url){
            // added for get param from long url.
              var q = tokenResponse.url;

              var qIndex = q.indexOf('?');

              if (qIndex > -1) {
                q = q.slice(qIndex + 1);
              }

              var i 			= 0,
                retObj 	= {},
                pair 		= null,
                qArr 		= q.split('&');

              for (; i < qArr.length; i++) {
                if (!qArr[i]) {
                  continue;
                }

                pair = qArr[i].split('=');
                retObj[pair[0]] = pair[1];
              }
              console.log('retObj:::',retObj);
              _this.zone.run(() => {
                AppComponent.twlioURL = retObj;
                if(AppComponent.twlioURL && AppComponent.twlioURL.roomid){
                  _this.modalController.dismiss(retObj);
                }else{
                  _this.presentAlert("Room id not found.Please enter a valid link");
                }
               
              });
              
              _this.loaderservice.hideLoading();
          }else{
            _this.loaderservice.hideLoading();
          }
        },function(error){
          console.log('errror',error);
          _this.presentAlert("Error with processing short link");
          _this.loaderservice.hideLoading();
        });
      }else{
        _this.presentAlert("Network Connection Required");
      }

    }else{
      _this.presentAlert("Please enter a valid link");
    }
  }

  


}
