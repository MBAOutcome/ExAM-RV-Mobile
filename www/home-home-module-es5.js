function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
  /*!***************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
    \***************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomeHomePageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar    [style.background-color]=\"schemacolor\"  [style.background]=\"schemacolor\" [style.--background]=\"schemacolor\" style=\"--background: {{schemacolor}} !important;\">\n    <ion-title class=\"ion-text-center\" [style.color]=\"headercolor\"  [style.color]=\"headercolor\" [style.--color]=\"headercolor\" style=\"--color: {{headercolor}} !important;\"  text-capitalize >ExAM RV </ion-title>\n    <img  class=\"showicon\">\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\" style=\"--background: #E2E2E2!important;\">\n \n  <form [formGroup]=\"loginForm\" novalidate>\n\n    <article class=\"slds-card loginCard\">\n      <div class=\"slds-card__header slds-grid\" [style.background-color]=\"schemacolor\"  [style.border-color]=\"schemacolor\"  style=\"text-align: center;padding-bottom: 12px;\">\n        <header class=\"slds-media slds-media_center slds-has-flexi-truncate\">\n          <div class=\"slds-media__body\">\n            <h2 class=\"slds-card__header-title\">\n                <span>Join Remote Video Inspection</span>\n            </h2>\n          </div>\n        </header>\n      </div>\n      <div class=\"slds-card__body slds-card__body_inner\">\n\n        <div class=\"slds-form-element\" style=\"display:none\">\n          <label class=\"slds-form-element__label\" for=\"roomtext\">Room Name</label>\n          <div class=\"slds-form-element__control\">\n            <input type=\"text\" style=\"padding-left:10px !important;\"  class=\"slds-input removeShadowInput\" id=\"roomtext\" formControlName=\"roomName\"  [(ngModel)]=\"RoomName.RoomName\"/>\n          </div>\n        </div>\n\n\n        <div class=\"slds-form-element\" [ngStyle]= \"RoomName.RoomName?{'display':'block'} : {'display':'none'}\">\n          <label class=\"slds-form-element__label\" for=\"roomtext\">Room Name</label>\n          <div class=\"slds-form-element__control\">\n            <ion-label>{{RoomName.RoomName}}</ion-label>\n          </div>\n        </div>\n\n        <span class=\"error-message ion-padding\" [ngStyle]= \"RoomName.RoomName?{'display':'block'} : {'display':'none'}\" *ngIf=\"(isSubmitted && loginForm.controls.roomName.errors && loginForm.controls.roomName.errors.required) || (loginForm.controls.roomName.touched && loginForm.controls.roomName.errors && loginForm.controls.roomName.errors.required)\" >\n          Enter a Room Name\n        </span>\n\n        <div class=\"slds-form-element\" [ngStyle]= \"RoomName.RoomName?{'display':'none'} : {'display':'block'}\" >\n          <label class=\"slds-form-element__label\" for=\"linktext\">Paste or Enter Room Link</label>\n          <div class=\"slds-form-element__control\">\n            <input type=\"text\" style=\"padding-left:10px !important;\" id=\"linktext\" class=\"slds-input removeShadowInput\"  formControlName=\"roomlink\" [(ngModel)]=\"roomlink.sortLink\" (change)=\"validateLink();\"/>\n          </div>\n        </div>\n        \n        <span class=\"error-message ion-padding\" [ngStyle]= \"RoomName.RoomName?{'display':'none'} : {'display':'block'}\" *ngIf=\"isSortlinkvalid\">\n          Enter a valid link\n        </span>\n\n        <!-- <div class=\"slds-form-element\" [ngStyle]= \"RoomName.RoomName?{'display':'none'} : {'display':'block'}\" >\n          <label class=\"slds-form-element__label\" for=\"linktext\">Paste or Enter Room Link</label>\n          <div class=\"slds-form-element__control\">\n            <ion-grid>\n              <ion-row>\n                <ion-col size=\"11\">\n                  <div> \n                    <input type=\"text\" style=\"padding-left:10px !important;\" id=\"linktext\" class=\"slds-input removeShadowInput\"  formControlName=\"roomlink\" [(ngModel)]=\"roomlink.sortLink\"/>\n                  </div>\n                </ion-col>\n                <ion-col size=\"1\">\n                  <div>\n                    <ion-icon  style=\"font-size:25px;float:right;\" name=\"pencil\" (click)=\"openEditModal();\"></ion-icon>\n                  </div>\n                </ion-col>\n              \n              </ion-row>\n            </ion-grid>\n          </div>\n        </div> -->\n\n       <!-- <div class=\"slds-form-element\">\n          <label class=\"slds-form-element__label\" for=\"roomtext\">Room Name</label>\n          <div class=\"slds-form-element__control\">\n            <ion-item lines=\"none\" class=\"roomnam\" >\n              <ion-label>{{RoomName.RoomName}}</ion-label>\n              <ion-icon name=\"pencil\" (click)=\"openEditModal();\"></ion-icon>\n\n            </ion-item>\n            \n          </div>\n        </div> -->\n\n   \n      \n        <div class=\"slds-form-element\" >\n          <label class=\"slds-form-element__label\"  for=\"nametext\">Name</label>\n          <div class=\"slds-form-element__control\">\n            <input type=\"text\"  class=\"slds-input removeShadowInput\" id=\"nametext\" formControlName=\"userName\"  [(ngModel)]=\"UserName\"/>\n          </div>\n        </div>\n        \n        <span class=\"error-message ion-padding\" *ngIf=\"(isSubmitted && loginForm.controls.userName.errors && loginForm.controls.userName.errors.required) || (loginForm.controls.userName.touched && loginForm.controls.userName.errors && loginForm.controls.userName.errors.required)\" >\n          Enter a Name\n        </span>\n      </div>\n      <footer class=\"\">\n        <div class=\"loginButton\">\n          <button [style.background-color]=\"schemacolor\"  [style.border-color]=\"schemacolor\"   [style.color]=\"headercolor\"  [style.color]=\"headercolor\" [style.--color]=\"headercolor\" style=\"--color: {{headercolor}} !important;\" style=\"line-height:2.1rem !important\" class=\"slds-button slds-button_brand slds-size--11-of-12 slds-medium-size--3-of-12 slds-large-size--3-of-12\" (click)=\"joinRoom()\">Join</button>\n        </div>\n      </footer>\n    </article>\n  </form>\n\n\n  <!-- <form [formGroup]=\"loginForm\" novalidate>\n\n   <div class=\"loginCard slds\">\n\n      <div class=\"slds-card\">\n\n        <div class=\"slds-card__header\" style=\"text-align: center;\">\n          <h2 class=\"slds-card__header-title\">Stream Video to ExAM RV Inspection</h2>\n        </div>\n\n        <div class=\"slds-card__body\" style=\"margin:20px;\">\n\n          <div class=\"slds-form-element\">\n            <label class=\"slds-form-element__label\" for=\"roomtext\">Room ID</label>\n            <div class=\"slds-form-element__control\">\n              <input type=\"text\"   class=\"slds-input\" id=\"roomtext\" formControlName=\"roomName\"  [(ngModel)]=\"RoomName.RoomName\"/>\n            </div>\n          </div>\n            \n          <span class=\"error-message ion-padding\" *ngIf=\"(isSubmitted && loginForm.controls.roomName.errors && loginForm.controls.roomName.errors.required) || (loginForm.controls.roomName.touched && loginForm.controls.roomName.errors && loginForm.controls.roomName.errors.required)\" >\n              Please fill the value.\n          </span>\n          \n          <div class=\"slds-form-element\" style=\"padding-top:10px;\">\n            <label class=\"slds-form-element__label\"  for=\"nametext\">Enter your Name</label>\n            <div class=\"slds-form-element__control\">\n              <input type=\"text\"  class=\"slds-input\" id=\"nametext\" formControlName=\"userName\"  [(ngModel)]=\"UserName\"/>\n            </div>\n          </div>\n            \n          <span class=\"error-message ion-padding\" *ngIf=\"(isSubmitted && loginForm.controls.userName.errors && loginForm.controls.userName.errors.required) || (loginForm.controls.userName.touched && loginForm.controls.userName.errors && loginForm.controls.userName.errors.required)\" >\n              Please fill the value.\n          </span>\n        \n          <div class=\"loginButton\">\n            <button style=\"--background:#4B7DB4;\" class=\"slds-button slds-button_brand\" (click)=\"joinRoom()\">Join</button>\n          </div>\n            \n          </div>\n      </div>\n    </div> \n  </form> -->\n</ion-content>\n\n\n\n";
    /***/
  },

  /***/
  "./src/app/home/home-routing.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/home/home-routing.module.ts ***!
    \*********************************************/

  /*! exports provided: HomePageRoutingModule */

  /***/
  function srcAppHomeHomeRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function () {
      return HomePageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./home.page */
    "./src/app/home/home.page.ts");

    var routes = [{
      path: '',
      component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"]
    }];

    var HomePageRoutingModule = function HomePageRoutingModule() {
      _classCallCheck(this, HomePageRoutingModule);
    };

    HomePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], HomePageRoutingModule);
    /***/
  },

  /***/
  "./src/app/home/home.module.ts":
  /*!*************************************!*\
    !*** ./src/app/home/home.module.ts ***!
    \*************************************/

  /*! exports provided: HomePageModule */

  /***/
  function srcAppHomeHomeModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageModule", function () {
      return HomePageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./home.page */
    "./src/app/home/home.page.ts");
    /* harmony import */


    var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./home-routing.module */
    "./src/app/home/home-routing.module.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");

    var HomePageModule = function HomePageModule() {
      _classCallCheck(this, HomePageModule);
    };

    HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]],
      declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
    })], HomePageModule);
    /***/
  },

  /***/
  "./src/app/home/home.page.scss":
  /*!*************************************!*\
    !*** ./src/app/home/home.page.scss ***!
    \*************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomeHomePageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@media only screen and (orientation: portrait) and (min-width: 481px) and (max-width: 768px) {\n  .loginCard {\n    position: absolute;\n    left: 15%;\n    right: 15%;\n    top: 25%;\n  }\n}\n@media only screen and (orientation: portrait) and (max-device-width: 480px) {\n  .loginCard {\n    position: absolute;\n    left: 5px;\n    right: 5px;\n    top: 25%;\n  }\n}\n@media only screen and (orientation: landscape) and (min-device-width: 768px) and (max-device-width: 1024px) {\n  .loginCard {\n    position: absolute;\n    left: 15%;\n    right: 15%;\n    top: 25%;\n  }\n}\n@media only screen and (orientation: landscape) and (min-device-width: 320px) and (max-device-width: 840px) {\n  .loginCard {\n    position: absolute;\n    left: 15%;\n    right: 15%;\n    top: 25%;\n  }\n}\n.loginButton {\n  width: 100%;\n  text-align: center;\n  padding-top: 10px;\n  --background:#4B7DB4;\n  padding-bottom: 18px;\n  font-size: 20px !important;\n}\n.error-message {\n  color: var(--ion-color-danger);\n}\n.md .showicon {\n  display: none;\n}\n.ios img {\n  background-size: contain !important;\n  width: 50px;\n  height: 50px;\n  line-height: 40px;\n  padding-left: 50px;\n  margin-left: 5px !important;\n  background: url('ExAMRV.png') no-repeat right center;\n  float: right;\n}\n.removeShadowInput {\n  -webkit-appearance: none;\n}\nion-title {\n  font-size: 1.6rem;\n  font-weight: bold;\n}\n.md ion-title {\n  background-size: contain !important;\n  line-height: 50px;\n  background: url('ExAMRV.png') no-repeat right center;\n  background-position: right !important;\n  text-align: center !important;\n}\n.slds-input[readonly] {\n  border-color: #ccc;\n  background-color: #f6f5f9;\n  pointer-events: none;\n  touch-action: none;\n}\n.roomnam .item-native {\n  -webkit-padding-start: 0px !important;\n  padding-inline-start: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaXZhc2Fua2FyL0RvY3VtZW50cy9FeEFNIFJWIFByb2plY3QgYW5kIGRldGFpbHMvRXhBTSBSViBGaW5hbC9FeEFNX1JWL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtJQUNBLFFBQUE7RUNGSjtBQUNGO0FES0U7RUFDRTtJQUNFLGtCQUFBO0lBQ0EsU0FBQTtJQUNBLFVBQUE7SUFDQSxRQUFBO0VDSEo7QUFDRjtBRFVFO0VBQ0U7SUFDRSxrQkFBQTtJQUNBLFNBQUE7SUFDQSxVQUFBO0lBQ0EsUUFBQTtFQ1JKO0FBQ0Y7QURXRTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtJQUNBLFFBQUE7RUNUSjtBQUNGO0FEY0E7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtBQ1pGO0FEZUE7RUFDRSw4QkFBQTtBQ1pGO0FEY0E7RUFDQSxhQUFBO0FDWEE7QURhQTtFQUNFLG1DQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxvREFBQTtFQUNBLFlBQUE7QUNWRjtBRFlBO0VBQ0Usd0JBQUE7QUNURjtBRFlBO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtBQ1RGO0FEV0E7RUFDRSxtQ0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0RBQUE7RUFDQSxxQ0FBQTtFQUNBLDZCQUFBO0FDUkY7QURXQTtFQUNFLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FDUkY7QURVQTtFQUNFLHFDQUFBO0VBQ0Msb0NBQUE7QUNQSCIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjpwb3J0cmFpdCl7XG5cblxuICBAbWVkaWEgKG1pbi13aWR0aDo0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgLmxvZ2luQ2FyZHsgICAgXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAxNSU7XG4gICAgICByaWdodDogMTUlO1xuICAgICAgdG9wOiAyNSU7XG4gICAgIC8vIGhlaWdodDo1MCVcbiAgICB9XG4gIH1cbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LWRldmljZS13aWR0aDo0ODBweCl7XG4gICAgLmxvZ2luQ2FyZHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IDVweDtcbiAgICAgIHJpZ2h0OiA1cHg7XG4gICAgICB0b3A6IDI1JTtcbiAgICAgLy8gaGVpZ2h0OjUwJTtcbiAgICB9XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOmxhbmRzY2FwZSl7XG5cblxuICBAbWVkaWEgKG1pbi1kZXZpY2Utd2lkdGggOiA3NjhweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogMTAyNHB4KSB7XG4gICAgLmxvZ2luQ2FyZHsgICAgXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAxNSU7XG4gICAgICByaWdodDogMTUlO1xuICAgICAgdG9wOiAyNSU7XG4gICAgIC8vIGhlaWdodDo1MCVcbiAgICB9XG4gIH1cbiAgQG1lZGlhIChtaW4tZGV2aWNlLXdpZHRoIDogMzIwcHgpIGFuZCAobWF4LWRldmljZS13aWR0aDo4NDBweCl7XG4gICAgLmxvZ2luQ2FyZHsgICAgXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAxNSU7XG4gICAgICByaWdodDogMTUlO1xuICAgICAgdG9wOiAyNSU7XG4gICAgIC8vIGhlaWdodDo1MCU7XG4gICAgfVxuICB9XG59XG5cbi5sb2dpbkJ1dHRvbntcbiAgd2lkdGg6MTAwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgLS1iYWNrZ3JvdW5kOiM0QjdEQjQ7XG4gIHBhZGRpbmctYm90dG9tOiAxOHB4O1xuICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcbiAgXG59XG4uZXJyb3ItbWVzc2FnZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cbi5tZCAuc2hvd2ljb257XG5kaXNwbGF5OiBub25lO1xufVxuLmlvcyBpbWcge1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW4gIWltcG9ydGFudDtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgbWFyZ2luLWxlZnQ6NXB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IHVybCgnLi4vaW1hZ2VzL0V4QU1SVi5wbmcnKSBuby1yZXBlYXQgcmlnaHQgY2VudGVyO1xuICBmbG9hdDpyaWdodDtcbn1cbi5yZW1vdmVTaGFkb3dJbnB1dHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG5pb24tdGl0bGUge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ubWQgaW9uLXRpdGxlIHtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2ltYWdlcy9FeEFNUlYucG5nJykgbm8tcmVwZWF0IHJpZ2h0IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjpyaWdodCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgXG59XG4uc2xkcy1pbnB1dFtyZWFkb25seV0ge1xuICBib3JkZXItY29sb3I6I2NjYztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjVmOTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cbi5yb29tbmFtIC5pdGVtLW5hdGl2ZSB7XG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDowcHggIWltcG9ydGFudDtcbiAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAwcHggIWltcG9ydGFudDtcbn0iLCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIGFuZCAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5sb2dpbkNhcmQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAxNSU7XG4gICAgcmlnaHQ6IDE1JTtcbiAgICB0b3A6IDI1JTtcbiAgfVxufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KSBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDQ4MHB4KSB7XG4gIC5sb2dpbkNhcmQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1cHg7XG4gICAgcmlnaHQ6IDVweDtcbiAgICB0b3A6IDI1JTtcbiAgfVxufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkgYW5kIChtaW4tZGV2aWNlLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtZGV2aWNlLXdpZHRoOiAxMDI0cHgpIHtcbiAgLmxvZ2luQ2FyZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE1JTtcbiAgICByaWdodDogMTUlO1xuICAgIHRvcDogMjUlO1xuICB9XG59XG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSBhbmQgKG1pbi1kZXZpY2Utd2lkdGg6IDMyMHB4KSBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDg0MHB4KSB7XG4gIC5sb2dpbkNhcmQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAxNSU7XG4gICAgcmlnaHQ6IDE1JTtcbiAgICB0b3A6IDI1JTtcbiAgfVxufVxuLmxvZ2luQnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIC0tYmFja2dyb3VuZDojNEI3REI0O1xuICBwYWRkaW5nLWJvdHRvbTogMThweDtcbiAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5lcnJvci1tZXNzYWdlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xufVxuXG4ubWQgLnNob3dpY29uIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmlvcyBpbWcge1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW4gIWltcG9ydGFudDtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgbWFyZ2luLWxlZnQ6IDVweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi9pbWFnZXMvRXhBTVJWLnBuZ1wiKSBuby1yZXBlYXQgcmlnaHQgY2VudGVyO1xuICBmbG9hdDogcmlnaHQ7XG59XG5cbi5yZW1vdmVTaGFkb3dJbnB1dCB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuaW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ubWQgaW9uLXRpdGxlIHtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi9pbWFnZXMvRXhBTVJWLnBuZ1wiKSBuby1yZXBlYXQgcmlnaHQgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbn1cblxuLnNsZHMtaW5wdXRbcmVhZG9ubHldIHtcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNWY5O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xufVxuXG4ucm9vbW5hbSAuaXRlbS1uYXRpdmUge1xuICAtd2Via2l0LXBhZGRpbmctc3RhcnQ6IDBweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWlubGluZS1zdGFydDogMHB4ICFpbXBvcnRhbnQ7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/home/home.page.ts":
  /*!***********************************!*\
    !*** ./src/app/home/home.page.ts ***!
    \***********************************/

  /*! exports provided: HomePage */

  /***/
  function srcAppHomeHomePageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePage", function () {
      return HomePage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _services_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../services/loader.service */
    "./src/app/services/loader.service.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _videomodel_videomodel_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../videomodel/videomodel.page */
    "./src/app/videomodel/videomodel.page.ts");
    /* harmony import */


    var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @ionic-native/http/ngx */
    "./node_modules/@ionic-native/http/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @ionic-native/geolocation/ngx */
    "./node_modules/@ionic-native/geolocation/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _ionic_native_deeplinks_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @ionic-native/deeplinks/ngx */
    "./node_modules/@ionic-native/deeplinks/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @ionic-native/status-bar/ngx */
    "./node_modules/@ionic-native/status-bar/__ivy_ngcc__/ngx/index.js");

    var HomePage = /*#__PURE__*/function () {
      function HomePage(alertController, loaderservice, http, formBuilder, modalController, httpnative, geolocation, deeplinks, zone, platform, statusBar, popoverCtrl) {
        _classCallCheck(this, HomePage);

        this.alertController = alertController;
        this.loaderservice = loaderservice;
        this.http = http;
        this.formBuilder = formBuilder;
        this.modalController = modalController;
        this.httpnative = httpnative;
        this.geolocation = geolocation;
        this.deeplinks = deeplinks;
        this.zone = zone;
        this.platform = platform;
        this.statusBar = statusBar;
        this.popoverCtrl = popoverCtrl;
        this.isOnline = false;
        this.UserName = '';
        this.RoomName = {
          RoomName: '',
          RoomId: ''
        };
        this.alertMessage = '';
        this.token_URL = 'https://toolbox-coral-3323.twil.io/getAccessToken?identity=';
        this.isSubmitted = false;
        this.roomlink = {
          roomlink: ''
        };
        this.isSortlinkvalid = false;
        this.currentlocationLat = null;
        this.currentlocationLog = null;
        this.schemacolor = "#4B7DB4";
        this.headercolor = "#ffffff";
        this.loginForm = this.formBuilder.group({
          roomName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]],
          userName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]],
          roomlink: ['']
        }); //Get geolocation

        this.getCoordinates = function () {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            var _this = _this2;

            if (_this2.platform.is('ios')) {
              _this2.geolocation.getCurrentPosition().then(function (resp) {
                // resp.coords.latitude
                // resp.coords.longitude
                // if(resp && resp['coords']){
                console.log('Error getting location  resp eee rr', resp);
                _this.currentlocationLat = resp['coords'].latitude;
                _this.currentlocationLog = resp['coords'].longitude; //_this.currentlocationLat =resp;

                resolve(''); // }else{
                //  console.log('Error getting location  resp eee');
                //   resolve();
                // }

                console.log('Error getting location  resp', resp);
              })["catch"](function (error) {
                console.log('Error getting location', error);
                resolve('');
              });
            } else {
              _this2.geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10
              }).then(function (resp) {
                // resp.coords.latitude
                // resp.coords.longitude
                // if(resp && resp['coords']){
                console.log('Error getting location  resp eee rr', resp);
                _this.currentlocationLat = resp['coords'].latitude;
                _this.currentlocationLog = resp['coords'].longitude; //_this.currentlocationLat =resp;

                resolve(''); // }else{
                //  console.log('Error getting location  resp eee');
                //   resolve();
                // }

                console.log('Error getting location  resp', resp);
              })["catch"](function (error) {
                console.log('Error getting location', error);
                resolve('');
              });
            }
          });
        }; // Added for update the location in AM


        this.updateAM = function () {
          var siteURL = '',
              AMobj = {},
              body = {};
          console.log('AppComponent.twlioURL::', _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL);

          if (_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"] && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.url) {
            console.log('this.currentlocationLog::', this.currentlocationLat, this.currentlocationLog);

            if (this.currentlocationLat && this.currentlocationLog) {
              AMobj['ExAM__Check_in_Location__Latitude__s'] = this.currentlocationLat;
              AMobj['ExAM__Check_in_Location__Longitude__s'] = this.currentlocationLog;
              body['AMObjDetail'] = AMobj;
              body['UUID'] = decodeURIComponent(_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.uuid);
              var setbody = {
                "updateAMWrapper": body
              };
              siteURL = decodeURIComponent(_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.url) + '/services/apexrest/ExAM/UpdateAMLocation';
              this.httpnative.setDataSerializer('json');
              console.log('siteURL::', siteURL);
              this.httpnative.post(siteURL, setbody, {
                'Content-Type': 'application/json'
              }).then(function (response) {
                console.log('response::', response);
              }, function (error) {
                console.log('error::;;;;', error);
              });
            } else {
              console.log('error::'); // this.alertMessage = 'Unable to get current location';
              // this.presentAlert();
            }
          }
        };

        this.data = {};
        this.data.isConnected = false;

        var _this = this; // {
        //'/':{},
        // '/link=https://examrv.com':{},
        // '/*':{},
        // '/exam':{}
        //  }
        // Added for first time launch app not prepopulate issue


        _this.deeplinks.route(null).subscribe(function (match) {
          console.log('match:::::::', match);
        }, function (nomatch) {
          // nomatch.$link - the full link data
          console.log('nomatch:::::', nomatch);

          if (navigator.connection.type != Connection.NONE) {
            _this.processDeeplinkURL(nomatch);
          } else {
            _this.zone.run(function () {
              _this.RoomName.RoomName = '';
              _this.RoomName.RoomId = '';
            });

            _this.getParamFromShortUrl(nomatch);
          }

          console.log('Got a deeplink that didn\'t match', nomatch);
        }); // added for after go to background, not prepopulate issue


        this.platform.resume.subscribe(function () {
          _this.deeplinks.route(null).subscribe(function (match) {
            console.log('1111match:::::', match);
          }, function (nomatch) {
            console.log('1111nomatch:::::', nomatch); // nomatch.$link - the full link data

            if (navigator.connection.type != Connection.NONE) {
              _this.processDeeplinkURL(nomatch);
            } else {
              _this.zone.run(function () {
                _this.RoomName.RoomName = '';
                _this.RoomName.RoomId = '';
              });

              _this.getParamFromShortUrl(nomatch);
            }

            console.log('Got a deeplink that didn\'t match', nomatch);
          });
        });
      }

      _createClass(HomePage, [{
        key: "getParamFromShortUrl",
        value: function getParamFromShortUrl(nomatch) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this, confirmalert, result;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _this = this;
                    _context.next = 3;
                    return _this.alertController.create({
                      header: 'ExAM RV',
                      message: 'No internet connection. Please turn on internet connection',
                      buttons: [{
                        text: 'Try again',
                        handler: function handler() {
                          _this.processDeeplinkURL(nomatch);
                        }
                      }]
                    });

                  case 3:
                    confirmalert = _context.sent;
                    _context.next = 6;
                    return confirmalert.present();

                  case 6:
                    _context.next = 8;
                    return confirmalert.onDidDismiss();

                  case 8:
                    result = _context.sent;

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "presentAlert",
        value: function presentAlert() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var alert, result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.alertController.create({
                      message: this.alertMessage,
                      buttons: ['OK']
                    });

                  case 2:
                    alert = _context2.sent;
                    _context2.next = 5;
                    return alert.present();

                  case 5:
                    _context2.next = 7;
                    return alert.onDidDismiss();

                  case 7:
                    result = _context2.sent;

                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        } //Added for edit link modal
        //add person modal page

      }, {
        key: "addhttp",
        value: function addhttp(url) {
          if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
          }

          return url;
        }
      }, {
        key: "validateLink",
        value: function validateLink() {
          var _this = this;

          if (_this.roomlink.sortLink.includes('examrv.com')) {
            _this.isSortlinkvalid = false;
            return true;
          } else {
            _this.isSortlinkvalid = true;
            return false;
          }
        }
      }, {
        key: "openEditModal",
        value: function openEditModal() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _this, shortlink;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    //this.schemacolor = '#'+ Math.floor(Math.random()*16777215).toString(16);
                    _this = this;

                    _this.zone.run(function () {
                      console.log('_this.RoomName.sortLink:::', _this.roomlink.sortLink);
                    });

                    if (_this.roomlink.sortLink && _this.roomlink.sortLink.includes('examrv.com') && _this.addhttp(_this.roomlink.sortLink)) {
                      shortlink = _this.addhttp(_this.roomlink.sortLink); // https://examrv.com/Jxr1W4SdxqNoxosJA

                      if (navigator.connection.type != Connection.NONE) {
                        _this.loaderservice.showLoading('');

                        _this.httpnative.get(shortlink, null, null).then(function (tokenResponse) {
                          if (tokenResponse && Object.keys(tokenResponse).length > 0 && tokenResponse.url) {
                            // added for get param from long url.
                            var q = tokenResponse.url;
                            var qIndex = q.indexOf('?');

                            if (qIndex > -1) {
                              q = q.slice(qIndex + 1);
                            }

                            var i = 0,
                                retObj = {},
                                pair = null,
                                qArr = q.split('&');

                            for (; i < qArr.length; i++) {
                              if (!qArr[i]) {
                                continue;
                              }

                              pair = qArr[i].split('=');
                              retObj[pair[0]] = pair[1];
                            }

                            console.log('retObj:::', retObj);

                            _this.zone.run(function () {
                              _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL = retObj;

                              if (_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.roomid) {
                                _this.zone.run(function () {
                                  _this.RoomName.RoomId = _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.roomid;
                                  _this.RoomName.RoomName = _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.rmname;
                                  setTimeout(function () {
                                    _this.joinRoom();
                                  }, 1000);
                                });
                              }

                              if (_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.appHeaderDetail) {
                                _this.zone.run(function () {
                                  _this.appHeaderDetail = JSON.parse(decodeURIComponent(_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.appHeaderDetail));
                                  _this.schemacolor = _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4';
                                  _this.headercolor = _this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor ? _this.appHeaderDetail.headerBtnTextColor : '#ffffff';

                                  if (_this.platform.is('ios')) {
                                    _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                                  } else {
                                    _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                                  }
                                });
                              }
                            });

                            _this.loaderservice.hideLoading();
                          } else {
                            _this.loaderservice.hideLoading();
                          }
                        }, function (error) {
                          console.log('errror', error);
                          _this.alertMessage = 'Error with processing short link';

                          _this.presentAlert();

                          _this.loaderservice.hideLoading();
                        });
                      } else {
                        _this.alertMessage = 'Network Connection Required';

                        _this.presentAlert();
                      }
                    } else {
                      _this.alertMessage = 'Please enter a valid link';

                      _this.presentAlert();
                    }

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        } //end

      }, {
        key: "openModal",
        value: function openModal() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var modal;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return this.modalController.create({
                      component: _videomodel_videomodel_page__WEBPACK_IMPORTED_MODULE_6__["VideomodelPage"],
                      cssClass: 'my-custom-modal-css',
                      componentProps: {
                        "paramID": 123
                      }
                    });

                  case 2:
                    modal = _context4.sent;
                    modal.onDidDismiss().then(function (dataReturned) {});
                    _context4.next = 6;
                    return modal.present();

                  case 6:
                    return _context4.abrupt("return", _context4.sent);

                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
        }
      }, {
        key: "closeModal",
        value: function closeModal() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var onClosedData;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    onClosedData = "Wrapped Up!";
                    _context5.next = 3;
                    return this.modalController.dismiss(onClosedData);

                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));
        } // added for process the url

      }, {
        key: "processDeeplinkURL",
        value: function processDeeplinkURL(nomatch) {
          var _this = this;

          if (navigator.connection.type != Connection.NONE) {
            _this.loaderservice.showLoading('');

            _this.httpnative.get(nomatch.$link.url, null, null).then(function (tokenResponse) {
              if (tokenResponse && Object.keys(tokenResponse).length > 0 && tokenResponse.url) {
                // added for get param from long url.
                var q = tokenResponse.url;
                var qIndex = q.indexOf('?');

                if (qIndex > -1) {
                  q = q.slice(qIndex + 1);
                }

                var i = 0,
                    retObj = {},
                    pair = null,
                    qArr = q.split('&');

                for (; i < qArr.length; i++) {
                  if (!qArr[i]) {
                    continue;
                  }

                  pair = qArr[i].split('=');
                  retObj[pair[0]] = pair[1];
                }

                console.log('retObj:::', retObj);

                _this.zone.run(function () {
                  _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL = retObj;
                });

                if (_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.appHeaderDetail) {
                  _this.zone.run(function () {
                    _this.appHeaderDetail = JSON.parse(decodeURIComponent(_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.appHeaderDetail));
                    _this.schemacolor = _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4';
                    _this.headercolor = _this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor ? _this.appHeaderDetail.headerBtnTextColor : '#ffffff';

                    if (_this.platform.is('ios')) {
                      _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                    } else {
                      _this.statusBar.backgroundColorByHexString(_this.schemacolor);
                    }
                  });
                }

                if (_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.roomid) {
                  _this.zone.run(function () {
                    _this.RoomName.RoomId = _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.roomid;
                    _this.RoomName.RoomName = _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.rmname;
                  });
                } else {
                  _this.zone.run(function () {
                    _this.RoomName.RoomId = '';
                    _this.RoomName.RoomName = '';
                  });
                }

                _this.loaderservice.hideLoading();
              } else {
                _this.loaderservice.hideLoading();
              }
            }, function (error) {
              console.log('errror', error);

              _this.loaderservice.hideLoading();
            });
          } else {
            _this.getParamFromShortUrl(nomatch);
          }
        } // added for join room

      }, {
        key: "joinRoom",
        value: function joinRoom() {
          var networkState = navigator.connection.type;

          var _this = this;

          console.log('called');

          if (!_this.RoomName.RoomId) {
            console.log('called 1');

            if (_this.roomlink.sortLink) {
              if (_this.roomlink.sortLink.includes('examrv.com')) {
                _this.openEditModal();
              } else {
                _this.isSortlinkvalid = true;
              }
            } else {
              _this.isSortlinkvalid = true;
            }
          } else {
            console.log('called 2');

            if (this.loginForm.valid) {
              console.log('called 3');
              this.isSubmitted = false;
              console.log('AppComponent.twlioURL:::', _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL, _this.appHeaderDetail);

              if (networkState != Connection.NONE) {
                this.loaderservice.showLoading('');

                _this.getCoordinates().then(function (locationStatus) {
                  _this.http.get(_this.token_URL + (_this.UserName ? _this.UserName : 'Unknown User')).subscribe(function (tokenResponse) {
                    if (tokenResponse && tokenResponse['token']) {
                      window.twiliovideo.hasRequiredPermissions().then(function (permissionResponse) {
                        window.twiliovideo.requestPermissions().then(function (permissionResponse) {
                          window.twiliovideo.openRoom(tokenResponse['token'], _this.RoomName.RoomId, function (res) {
                            console.log('res::::', res);

                            if (res == 'OPENED') {
                              _this.loaderservice.hideLoading(); //_this.UserName =""; 
                              // _this.RoomName.RoomName ="";
                              // _this.loginForm.reset();


                              _this.data.isConnected = true;

                              _this.openModal();

                              _this.updateAM();
                            }

                            if (res == 'CLOSED' || res == 'DISCONNECTED') {
                              if (_this.data.isConnected) {
                                _this.data.isConnected = false;

                                _this.closeModal();
                              }
                            }
                          }, {
                            i18nConnectionError: 'Message shown when it is not possible to join the room',
                            i18nDisconnectedWithError: 'Message show when the client is disconnected due to an error',
                            i18nAccept: 'Accept translation',
                            handleErrorInApp: false,
                            hangUpInApp: false,
                            lat: _this.currentlocationLat ? JSON.stringify(_this.currentlocationLat) : '',
                            log: _this.currentlocationLog ? JSON.stringify(_this.currentlocationLog) : '',
                            roomownerid: _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.partid ? _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.partid : '',
                            schemacolor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4',
                            headerBtnColor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4',
                            headerBtnTextColor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor ? _this.appHeaderDetail.headerBtnTextColor : '',
                            headerValue: _this.appHeaderDetail && _this.appHeaderDetail.headerValue ? _this.appHeaderDetail.headerValue : '',
                            appversion: '0.1.1'
                          });
                        }, function (error) {});
                      }, function (error) {
                        window.twiliovideo.requestPermissions().then(function (permissionResponse) {
                          window.twiliovideo.openRoom(tokenResponse['token'], _this.RoomName.RoomId, function (res) {
                            if (res == 'OPENED') {
                              _this.loaderservice.hideLoading(); // _this.UserName =""; 
                              // _this.RoomName.RoomName ="";
                              // _this.loginForm.reset();


                              _this.data.isConnected = true;

                              _this.openModal();

                              _this.updateAM();
                            }

                            if (res == 'CLOSED' || res == 'DISCONNECTED') {
                              if (_this.data.isConnected) {
                                _this.data.isConnected = false;

                                _this.closeModal();
                              }
                            }
                          }, {
                            i18nConnectionError: 'Message shown when it is not possible to join the room',
                            i18nDisconnectedWithError: 'Message show when the client is disconnected due to an error',
                            i18nAccept: 'Accept translation',
                            handleErrorInApp: false,
                            hangUpInApp: false,
                            lat: _this.currentlocationLat ? JSON.stringify(_this.currentlocationLat) : '',
                            log: _this.currentlocationLog ? JSON.stringify(_this.currentlocationLog) : '',
                            roomownerid: _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.partid ? _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"].twlioURL.partid : '',
                            schemacolor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4',
                            headerBtnColor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnColor ? _this.appHeaderDetail.headerBtnColor : '#4B7DB4',
                            headerBtnTextColor: _this.appHeaderDetail && _this.appHeaderDetail.headerBtnTextColor ? _this.appHeaderDetail.headerBtnTextColor : '',
                            headerValue: _this.appHeaderDetail && _this.appHeaderDetail.headerValue ? _this.appHeaderDetail.headerValue : '',
                            appversion: '0.1.1'
                          });
                        }, function (error) {});
                      });
                    }
                  }, function (error) {
                    _this.loaderservice.hideLoading();
                  });
                });
              } else {
                this.alertMessage = 'Please Check your internet connection';
                this.presentAlert();
              }
            } else {
              this.isSubmitted = true;
            }
          }
        }
      }]);

      return HomePage;
    }();

    HomePage.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]
      }, {
        type: _services_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"]
      }, {
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
      }, {
        type: _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_7__["HTTP"]
      }, {
        type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__["Geolocation"]
      }, {
        type: _ionic_native_deeplinks_ngx__WEBPACK_IMPORTED_MODULE_10__["Deeplinks"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"]
      }, {
        type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_11__["StatusBar"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"]
      }];
    };

    HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-home',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./home.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./home.page.scss */
      "./src/app/home/home.page.scss"))["default"]]
    })], HomePage);
    /***/
  }
}]);
//# sourceMappingURL=home-home-module-es5.js.map