//"use strict"; //it's not compatible with EBModulesToLoad
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var sizmekComponents = sizmekComponents || {};
(function() {
    const fired = {
        ONLOAD: 1,
        ONSHOW: 2
    };
    if (window.customElements && window.customElements.define) {
        sizmekComponents.video = sizmekComponents.video || {};
        var szmkComponent = function(_HTMLElement) {
            _inherits(szmkComponent, _HTMLElement);
            function szmkComponent() {
                var _this;
                _classCallCheck(this, szmkComponent);
                _this = _possibleConstructorReturn(this, _getPrototypeOf(szmkComponent).call(this));
                _this.isInitNow = 0;
                _this.adformat = null;
                _this.videoapi = null;
                return _this;
            }
            _createClass(szmkComponent, [{
                key: "connectedCallback",
                value: function connectedCallback() {
                    this.adformat = this.getAttribute('adformat');
                    this.videoapi = this.getAttribute('videoapi');
                    this.isInitNow += 1;
                    if (this.isInitNow === fired.ONLOAD) {
                        this.initModules();
                    }
                    if (this.isInitNow === fired.ONSHOW) {
                        this.initComponent();
                    }
                }
            }, {
                key: "initModules",
                value: function addingModules() {
                    if (this.adformat != 'Standard') {
                        if (this.videoapi == 'true') {
                            EBModulesToLoad = ['Video', 'EBAPI', 'EBCMD'];
                        }
                        else {
                            EBModulesToLoad = ['EBAPI', 'EBCMD'];
                        }
                    }
                }
            }, {
                key: "initComponent",
                value: function initComponent() {
                    if (this.adformat != 'Standard') {
                        if (document.location.hostname != 'localhost') {
                            adkit.onReady(function() {
                                var videos = document.querySelectorAll('gwd-video > div > video');
                                if (videos) {
                                    for (var i = 0; i < videos.length; i++) {
                                        if (!sizmekComponents.video[videos[i].parentElement.parentElement.id + '-vid']) {
                                            var videoTrackingModule = new EBG.VideoModule(videos[i]);
                                            sizmekComponents.video[videos[i].parentElement.parentElement.id + '-vid'] = videoTrackingModule;
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            var videos = document.querySelectorAll('gwd-video > div > video');
                            if (videos && this.videoapi == 'true') {
                                for (var i = 0; i < videos.length; i++) {
                                    if (!sizmekComponents.video[videos[i].parentElement.parentElement.id + '-vid']) {
                                        console.log('%c SIZMEK AdKit Component has found a Video:' + videos[i].parentElement.parentElement.id, 'color:#3b68fb;');
                                        sizmekComponents.video[videos[i].parentElement.parentElement.id + '-vid'] = videos[i];
                                    }
                                }
                            }
                            if (this.videoapi == 'false') {
                                console.log('%c SIZMEK AdKit Component - Video API is disabled', 'color:#3b68fb;');
                            }
                        }
                    }
                }
            }]);
            return szmkComponent;
        }(_wrapNativeSuper(HTMLElement));
        customElements.define('szmk-adkit', szmkComponent);
    }
})();