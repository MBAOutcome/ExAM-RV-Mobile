function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit-link-edit-link-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-link/edit-link.page.html":
  /*!*************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-link/edit-link.page.html ***!
    \*************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditLinkEditLinkPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar style=\"--background: #4B7DB4 !important;height:60px !important\">\n    <ion-buttons slot=\"start\" style=\"height:60px !important\">\n      <ion-button color=\"dark\" (click)=\"closeModal()\">\n          <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n  </ion-buttons>\n    <ion-title class=\"ion-text-center\" text-capitalize style=\"color: white;\">Update Video Room Link</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <article class=\"slds-card loginCard\">\n      <div class=\"slds-card__body slds-card__body_inner\">\n        <div class=\"slds-form-element\" >\n          <label class=\"slds-form-element__label\"  for=\"nametext\">Paste or Enter Room Link</label>\n          <div class=\"slds-form-element__control\">\n            <input type=\"text\"  class=\"slds-input removeShadowInput\" id=\"nametext\"  [(ngModel)]=\"roomlink.roomlink\"/>\n          </div>\n        </div>\n      </div>\n  </article>\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar style=\"text-align:center\">\n    <button style=\"--background:#4B7DB4;line-height:2.1rem !important\" class=\"slds-button slds-button_brand slds-size--11-of-12 slds-medium-size--3-of-12 slds-large-size--3-of-12\" (click)=\"processDeeplinkURL()\">Update</button>\n  </ion-toolbar>\n</ion-footer>";
    /***/
  },

  /***/
  "./src/app/edit-link/edit-link-routing.module.ts":
  /*!*******************************************************!*\
    !*** ./src/app/edit-link/edit-link-routing.module.ts ***!
    \*******************************************************/

  /*! exports provided: EditLinkPageRoutingModule */

  /***/
  function srcAppEditLinkEditLinkRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditLinkPageRoutingModule", function () {
      return EditLinkPageRoutingModule;
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


    var _edit_link_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./edit-link.page */
    "./src/app/edit-link/edit-link.page.ts");

    var routes = [{
      path: '',
      component: _edit_link_page__WEBPACK_IMPORTED_MODULE_3__["EditLinkPage"]
    }];

    var EditLinkPageRoutingModule = function EditLinkPageRoutingModule() {
      _classCallCheck(this, EditLinkPageRoutingModule);
    };

    EditLinkPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], EditLinkPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/edit-link/edit-link.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/edit-link/edit-link.module.ts ***!
    \***********************************************/

  /*! exports provided: EditLinkPageModule */

  /***/
  function srcAppEditLinkEditLinkModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditLinkPageModule", function () {
      return EditLinkPageModule;
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


    var _edit_link_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./edit-link-routing.module */
    "./src/app/edit-link/edit-link-routing.module.ts");
    /* harmony import */


    var _edit_link_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./edit-link.page */
    "./src/app/edit-link/edit-link.page.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var EditLinkPageModule = function EditLinkPageModule() {
      _classCallCheck(this, EditLinkPageModule);
    };

    EditLinkPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"], _edit_link_routing_module__WEBPACK_IMPORTED_MODULE_4__["EditLinkPageRoutingModule"]],
      declarations: [_edit_link_page__WEBPACK_IMPORTED_MODULE_5__["EditLinkPage"]]
    })], EditLinkPageModule);
    /***/
  },

  /***/
  "./src/app/edit-link/edit-link.page.scss":
  /*!***********************************************!*\
    !*** ./src/app/edit-link/edit-link.page.scss ***!
    \***********************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditLinkEditLinkPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VkaXQtbGluay9lZGl0LWxpbmsucGFnZS5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/edit-link/edit-link.page.ts":
  /*!*********************************************!*\
    !*** ./src/app/edit-link/edit-link.page.ts ***!
    \*********************************************/

  /*! exports provided: EditLinkPage */

  /***/
  function srcAppEditLinkEditLinkPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditLinkPage", function () {
      return EditLinkPage;
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


    var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic-native/http/ngx */
    "./node_modules/@ionic-native/http/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../app.component */
    "./src/app/app.component.ts");

    var EditLinkPage = /*#__PURE__*/function () {
      function EditLinkPage(modalController, loaderservice, http, alertController, httpnative, zone) {
        _classCallCheck(this, EditLinkPage);

        this.modalController = modalController;
        this.loaderservice = loaderservice;
        this.http = http;
        this.alertController = alertController;
        this.httpnative = httpnative;
        this.zone = zone;
        this.roomlink = {
          roomlink: ''
        };
      }

      _createClass(EditLinkPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "presentAlert",
        value: function presentAlert(alertMessage) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var alert, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.alertController.create({
                      message: alertMessage,
                      buttons: ['OK']
                    });

                  case 2:
                    alert = _context.sent;
                    _context.next = 5;
                    return alert.present();

                  case 5:
                    _context.next = 7;
                    return alert.onDidDismiss();

                  case 7:
                    result = _context.sent;

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "closeModal",
        value: function closeModal() {
          this.modalController.dismiss(null);

          var _this = this; // _this.processDeeplinkURL();

        }
      }, {
        key: "savemodal",
        value: function savemodal() {
          var _this = this;

          console.log(':::::_this.roolink', _this.roomlink.roomlink);
          this.modalController.dismiss(_this.roomlink);
        }
      }, {
        key: "addhttp",
        value: function addhttp(url) {
          if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
          }

          return url;
        } // added for process the url

      }, {
        key: "processDeeplinkURL",
        value: function processDeeplinkURL() {
          var _this = this;

          var shortlink = _this.roomlink.roomlink;
          console.log('shortlink', shortlink);

          if (shortlink && shortlink.includes('examrv.com') && _this.addhttp(shortlink)) {
            shortlink = _this.addhttp(shortlink); // https://examrv.com/Jxr1W4SdxqNoxosJA

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
                    _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"].twlioURL = retObj;

                    if (_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"].twlioURL && _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"].twlioURL.roomid) {
                      _this.modalController.dismiss(retObj);
                    } else {
                      _this.presentAlert("Room id not found.Please enter a valid link");
                    }
                  });

                  _this.loaderservice.hideLoading();
                } else {
                  _this.loaderservice.hideLoading();
                }
              }, function (error) {
                console.log('errror', error);

                _this.presentAlert("Error with processing short link");

                _this.loaderservice.hideLoading();
              });
            } else {
              _this.presentAlert("Network Connection Required");
            }
          } else {
            _this.presentAlert("Please enter a valid link");
          }
        }
      }]);

      return EditLinkPage;
    }();

    EditLinkPage.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
      }, {
        type: _services_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"]
      }, {
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]
      }, {
        type: _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_5__["HTTP"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
      }];
    };

    EditLinkPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-link',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./edit-link.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-link/edit-link.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./edit-link.page.scss */
      "./src/app/edit-link/edit-link.page.scss"))["default"]]
    })], EditLinkPage);
    /***/
  }
}]);
//# sourceMappingURL=edit-link-edit-link-module-es5.js.map