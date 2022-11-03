import { Component,NgZone } from '@angular/core';
import { AlertController ,ModalController, PopoverController} from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { connect, createLocalTracks, createLocalVideoTrack } from 'twilio-video';
import { VideomodelPage } from '../videomodel/videomodel.page';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from '../app.component';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Platform } from '@ionic/angular';
import { tokenReference } from '@angular/compiler';
import { EditLinkPage } from '../edit-link/edit-link.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var cordova: any;
declare var navigator: any;
declare var Connection: any;
declare var window : any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isOnline:boolean = false;
  UserName:string = '';
  RoomName:any = {RoomName:'',RoomId:''};
  alertMessage:any = '';
  token_URL = 'https://toolbox-coral-3323.twil.io/getAccessToken?identity=';
  isSubmitted = false;
  data:any;
  roomlink:any = {roomlink:''};
  isSortlinkvalid = false;

  public static twlioURL:any;
  currentlocationLat:any = null;
  currentlocationLog:any = null;
  public schemacolor: string = "#4B7DB4";
  public appHeaderDetail:any;
  public headercolor: string = "#ffffff";
  constructor(
    public alertController: AlertController,
    public loaderservice: LoaderService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public httpnative:HTTP,
    public geolocation :Geolocation,
    private deeplinks: Deeplinks,
    private zone: NgZone,
    private platform:Platform,
    private statusBar: StatusBar,
    public popoverCtrl: PopoverController
  ) {
    this.data = {};
    this.data.isConnected = false;
    var _this = this;
    // {
        //'/':{},
      // '/link=https://examrv.com':{},
      // '/*':{},
      // '/exam':{}
    //  }
      
    // Added for first time launch app not prepopulate issue
    _this.deeplinks.route(null).subscribe(match => {
          console.log('match:::::::',match);
    }, nomatch => {
      // nomatch.$link - the full link data
      console.log('nomatch:::::',nomatch);
      if (navigator.connection.type != Connection.NONE) { 
        _this.processDeeplinkURL(nomatch);
      }else{
        _this.zone.run(() => {
          _this.RoomName.RoomName = '';
          _this.RoomName.RoomId = '';
        });
        _this.getParamFromShortUrl(nomatch);
      }
      console.log('Got a deeplink that didn\'t match', nomatch);
    });
      // added for after go to background, not prepopulate issue
      this.platform.resume.subscribe(() => {
      
        _this.deeplinks.route(null).subscribe(match => {
          console.log('1111match:::::',match);

        }, nomatch => {
          console.log('1111nomatch:::::',nomatch);

          // nomatch.$link - the full link data
          if (navigator.connection.type != Connection.NONE) { 
            _this.processDeeplinkURL(nomatch);
          }else{
            _this.zone.run(() => {
              _this.RoomName.RoomName = '';
              _this.RoomName.RoomId = '';
            });
            _this.getParamFromShortUrl(nomatch);
          }
          console.log('Got a deeplink that didn\'t match', nomatch);
        });
      });
  }
  
  async getParamFromShortUrl(nomatch) {
    var _this = this;
      const confirmalert = await _this.alertController.create({
        header: 'ExAM RV',
        message:'No internet connection. Please turn on internet connection',
        buttons: [
           {
            text: 'Try again',
            handler: () => {
              _this.processDeeplinkURL(nomatch);
            }
          }
        ]
      });
    
      await confirmalert.present();
      let result = await confirmalert.onDidDismiss();

  }
  

  async presentAlert() {
    const alert = await this.alertController.create({
      message: this.alertMessage,
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  //Added for edit link modal
  //add person modal page

  addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }

  validateLink(){

    const _this = this;
    if(_this.roomlink.sortLink.includes('examrv.com')){

      _this.isSortlinkvalid = false;
       return true;
    }else{
      _this.isSortlinkvalid = true;

      return false;
    }
  }

  async openEditModal() {

    //this.schemacolor = '#'+ Math.floor(Math.random()*16777215).toString(16);

    const _this = this;
    _this.zone.run(() => {
       console.log('_this.RoomName.sortLink:::',_this.roomlink.sortLink);
    });
    if(_this.roomlink.sortLink && _this.roomlink.sortLink.includes('examrv.com') && _this.addhttp(_this.roomlink.sortLink)){

      var shortlink = _this.addhttp(_this.roomlink.sortLink);
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
                  _this.zone.run(() => {
                    _this.RoomName.RoomId = AppComponent.twlioURL.roomid;
                    _this.RoomName.RoomName = AppComponent.twlioURL.rmname;

                    setTimeout( () => {
                      _this.joinRoom();
                    },1000);

                   

                  });
                }
               
                if(AppComponent.twlioURL && AppComponent.twlioURL.appHeaderDetail){
                  _this.zone.run(() => {

                   
                    _this.appHeaderDetail = JSON.parse(decodeURIComponent(AppComponent.twlioURL.appHeaderDetail));
                    _this.schemacolor = (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4';
                    _this.headercolor = (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor)? _this.appHeaderDetail.headerBtnTextColor:'#ffffff';
        
                    if(_this.platform.is('ios')){
                      _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                    }else{
                      _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                    }

                  });
                }
               
              });
              
              _this.loaderservice.hideLoading();
          }else{
            _this.loaderservice.hideLoading();
          }
        },function(error){
          console.log('errror',error);
          _this.alertMessage = 'Error with processing short link';
          _this.presentAlert();
          _this.loaderservice.hideLoading();
        });
      }else{
       
        _this.alertMessage = 'Network Connection Required';
          _this.presentAlert();
      }

    }else{
          _this.alertMessage = 'Please enter a valid link';
          _this.presentAlert();
      
    }
  }
  //end

  async openModal() {
    const modal = await this.modalController.create({
      component: VideomodelPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        "paramID": 123
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  loginForm = this.formBuilder.group({
    roomName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    roomlink:['']
  });
  // added for process the url
  processDeeplinkURL(nomatch){
    var _this = this;
   
    if (navigator.connection.type != Connection.NONE) {

      _this.loaderservice.showLoading('');
      _this.httpnative.get(nomatch.$link.url,null,null).then(function(tokenResponse){

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
            });

            
            if(AppComponent.twlioURL && AppComponent.twlioURL.appHeaderDetail){
              _this.zone.run(() => {
                _this.appHeaderDetail = JSON.parse(decodeURIComponent(AppComponent.twlioURL.appHeaderDetail));

                _this.schemacolor = (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4';
                _this.headercolor = (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor)? _this.appHeaderDetail.headerBtnTextColor:'#ffffff';
              
                if(_this.platform.is('ios')){
                  _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                }else{
                  _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                }
                
              });
            }

            if(AppComponent.twlioURL && AppComponent.twlioURL.roomid){
              _this.zone.run(() => {
                _this.RoomName.RoomId = AppComponent.twlioURL.roomid;
                _this.RoomName.RoomName = AppComponent.twlioURL.rmname;
              });
            }else{
              _this.zone.run(() => {
                _this.RoomName.RoomId = '';
                _this.RoomName.RoomName = '';
              });
              
            }
            _this.loaderservice.hideLoading();
        }else{
          _this.loaderservice.hideLoading();
        }
      },function(error){
        console.log('errror',error);
        _this.loaderservice.hideLoading();
      });
    }else{
      _this.getParamFromShortUrl(nomatch);
    }
  }
  // added for join room
  joinRoom(){

    var networkState = navigator.connection.type;
    var _this = this;
    console.log('called');
    if(!_this.RoomName.RoomId){
      console.log('called 1');
      if(_this.roomlink.sortLink){

        if(_this.roomlink.sortLink.includes('examrv.com')){
          _this.openEditModal();
        }else{
          _this.isSortlinkvalid = true;
        }
       
      }else{
        _this.isSortlinkvalid = true;
      }
      
    }else{

      console.log('called 2');
      if(this.loginForm.valid){
        console.log('called 3');
       
        this.isSubmitted = false;

        console.log('AppComponent.twlioURL:::',AppComponent.twlioURL,_this.appHeaderDetail);
        
        if (networkState != Connection.NONE) {

          this.loaderservice.showLoading('');

          _this.getCoordinates().then(function(locationStatus){

            _this.http.get(_this.token_URL+(_this.UserName?_this.UserName:'Unknown User')).subscribe(function(tokenResponse){

              if(tokenResponse && tokenResponse['token']){
                  
                    window.twiliovideo.hasRequiredPermissions().then(function(permissionResponse){
                      
                      window.twiliovideo.requestPermissions().then(function(permissionResponse){

                        window.twiliovideo.openRoom(tokenResponse['token'], _this.RoomName.RoomId,function(res){

                          console.log('res::::',res);
                          if(res == 'OPENED'){
                            _this.loaderservice.hideLoading();
                            //_this.UserName =""; 
                          // _this.RoomName.RoomName ="";
                          // _this.loginForm.reset();
                            _this.data.isConnected  =true ;
                            _this.openModal();
                            _this.updateAM();
                          }
                          if(res =='CLOSED' || res == 'DISCONNECTED'){

                            if(_this.data.isConnected){
                              _this.data.isConnected = false;
                              _this.closeModal();
                            }
                          }
                        },
                        {i18nConnectionError :'Message shown when it is not possible to join the room',
                        i18nDisconnectedWithError :'Message show when the client is disconnected due to an error',
                        i18nAccept :'Accept translation',
                        handleErrorInApp :false, // Flag to indicate the application will manage any error in the app by events emitted by the plugin
                        hangUpInApp :false, //Flag to indicate the application should hang up the call by calling 'closeRoom'
                        lat:_this.currentlocationLat?JSON.stringify(_this.currentlocationLat):'',
                        log:_this.currentlocationLog?JSON.stringify(_this.currentlocationLog):'',
                        roomownerid: (AppComponent.twlioURL && AppComponent.twlioURL.partid)? AppComponent.twlioURL.partid:'',
                        schemacolor:(_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4',
                        headerBtnColor:(_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4',
                        headerBtnTextColor: (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor)? _this.appHeaderDetail.headerBtnTextColor:'',
                        headerValue:(_this.appHeaderDetail && _this.appHeaderDetail.headerValue)? _this.appHeaderDetail.headerValue:'',
                        appversion:'0.1.1'
                      });
                      
                      },function(error){
                      });
                    },function(error){
                      window.twiliovideo.requestPermissions().then(function(permissionResponse){
                        window.twiliovideo.openRoom(tokenResponse['token'], _this.RoomName.RoomId,function(res){
                          if(res == 'OPENED'){
                            _this.loaderservice.hideLoading();
                          // _this.UserName =""; 
                          // _this.RoomName.RoomName ="";
                          // _this.loginForm.reset();
                            _this.data.isConnected  =true ;
                            _this.openModal();
                            _this.updateAM();
                          }
                          if(res =='CLOSED' || res == 'DISCONNECTED'){

                            if(_this.data.isConnected){
                              _this.data.isConnected = false;
                              _this.closeModal();
                            }
                          }
                        },
                        {i18nConnectionError :'Message shown when it is not possible to join the room',
                        i18nDisconnectedWithError :'Message show when the client is disconnected due to an error',
                        i18nAccept :'Accept translation',
                        handleErrorInApp :false, // Flag to indicate the application will manage any error in the app by events emitted by the plugin
                        hangUpInApp :false, //Flag to indicate the application should hang up the call by calling 'closeRoom'
                        lat:_this.currentlocationLat?JSON.stringify(_this.currentlocationLat):'',
                        log:_this.currentlocationLog?JSON.stringify(_this.currentlocationLog):'',
                        roomownerid:(AppComponent.twlioURL && AppComponent.twlioURL.partid)? AppComponent.twlioURL.partid:'',
                        schemacolor:(_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4',
                        headerBtnColor:(_this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor)? _this.appHeaderDetail.headerBtnColor:'#4B7DB4',
                        headerBtnTextColor: (_this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor)? _this.appHeaderDetail.headerBtnTextColor:'',
                        headerValue:(_this.appHeaderDetail && _this.appHeaderDetail.headerValue)? _this.appHeaderDetail.headerValue:'',
                        appversion:'0.1.1'

                      });
                      },function(error){
                      });
                    });
              }
            },function(error){
              _this.loaderservice.hideLoading();
            });
        });

        } else {
            
            this.alertMessage = 'Please Check your internet connection';
            this.presentAlert();

        }

      }else{
        this.isSubmitted = true;
      }
    }
  }
  //Get geolocation
  getCoordinates = function() {
    return new Promise((resolve, reject) => {
      var _this =this;

      if(this.platform.is('ios')){

        this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
         // if(resp && resp['coords']){
            console.log('Error getting location  resp eee rr',resp);
            _this.currentlocationLat = resp['coords'].latitude;
            _this.currentlocationLog =  resp['coords'].longitude;
            //_this.currentlocationLat =resp;
  
            resolve('');
         // }else{
          //  console.log('Error getting location  resp eee');
         //   resolve();
         // }
          console.log('Error getting location  resp', resp);
         }).catch((error) => {
           console.log('Error getting location', error);
           resolve('');
         });
      }else{

        this.geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10
        }).then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
         // if(resp && resp['coords']){
            console.log('Error getting location  resp eee rr',resp);
  
            _this.currentlocationLat =resp['coords'].latitude;
            _this.currentlocationLog =resp['coords'].longitude;
            //_this.currentlocationLat =resp;
  
            resolve('');
         // }else{
          //  console.log('Error getting location  resp eee');
         //   resolve();
         // }
          console.log('Error getting location  resp', resp);
         }).catch((error) => {
           console.log('Error getting location', error);
           resolve('');
         });
      }
    });
  }
  // Added for update the location in AM
  updateAM = function(){

    var siteURL ='',AMobj ={},body={};
    console.log('AppComponent.twlioURL::',AppComponent.twlioURL);
    if(AppComponent && AppComponent.twlioURL && AppComponent.twlioURL.url){

      console.log('this.currentlocationLog::',this.currentlocationLat,this.currentlocationLog);

      if(this.currentlocationLat && this.currentlocationLog){

        AMobj['ExAM__Check_in_Location__Latitude__s'] = this.currentlocationLat;
        AMobj['ExAM__Check_in_Location__Longitude__s'] = this.currentlocationLog;
      
        body['AMObjDetail'] = AMobj;
        body['UUID'] = decodeURIComponent(AppComponent.twlioURL.uuid);
        var setbody={"updateAMWrapper":body};
        siteURL = decodeURIComponent(AppComponent.twlioURL.url)+'/services/apexrest/ExAM/UpdateAMLocation';
        this.httpnative.setDataSerializer('json');
        console.log('siteURL::',siteURL);
        this.httpnative.post(siteURL,setbody,{'Content-Type':'application/json'}).then(function(response){
          console.log('response::',response);
        },function(error){
          console.log('error::;;;;',error);
        });
      
      }else{
        console.log('error::');
       // this.alertMessage = 'Unable to get current location';
       // this.presentAlert();
      }
    }
  }
  
}
