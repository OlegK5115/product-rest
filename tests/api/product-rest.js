"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var product_rest = require("../../lib/product-rest");
var product = require("../../lib/product");
var should = require("should");
var supertest = require("supertest");
var uuid_1 = require("uuid");
describe('api', function () {
    var agent;
    var app;
    before(function () {
        app = require('../../main');
        agent = supertest.agent(app, {});
    });
    context('check post requests', function () {
        var p1;
        var r1;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p1 = { plu: (0, uuid_1.v4)(), name: 'pen', q_order: 5, q_storage: 10 };
                            r1 = { plu: p1.plu, q_order: 3, q_storage: 4, shop_id: "shop" };
                            return [4 /*yield*/, product.create(p1)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("check '/rest'", function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, agent
                                .post('/rest')
                                .send(r1)
                                .set('X-Request-With', 'XMLHttpRequest')
                                .set('Content-Type', 'application/json')
                                .expect(200)];
                        case 1:
                            result = _a.sent();
                            should(result.text).be.equal('ok');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("check '/rest/increase'", function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, agent
                                .post('/rest/increase')
                                .send({ plu: r1.plu, number: 1 })
                                .set('X-Request-With', 'XMLHttpRequest')
                                .set('Content-Type', 'application/json')
                                .expect(200)];
                        case 1:
                            result = _a.sent();
                            should(result.text).be.equal('ok');
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("check '/rest/decrease'", function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, agent
                                .post('/rest/decrease')
                                .send({ plu: r1.plu, number: 1 })
                                .set('X-Request-With', 'XMLHttpRequest')
                                .set('Content-Type', 'application/json')
                                .expect(200)];
                        case 1:
                            result = _a.sent();
                            should(result.text).be.equal('ok');
                            return [2 /*return*/];
                    }
                });
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.clear_all()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product.clear_all()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    context('check get requests', function () {
        var p1;
        var r1;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p1 = { plu: (0, uuid_1.v4)(), name: 'pen', q_order: 5, q_storage: 10 };
                            r1 = { plu: p1.plu, q_order: 3, q_storage: 4, shop_id: "shop" };
                            return [4 /*yield*/, product.create(p1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.create(r1)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("check '/rests' with params", function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, agent
                                .get("/rests?plu=".concat(r1.plu))
                                .set('X-Request-With', 'XMLHttpRequest')
                                .set('Content-Type', 'application/json')
                                .expect(200)];
                        case 1:
                            result = _a.sent();
                            should(result._body).be.instanceOf(Array).and.have.length(1);
                            should(result._body[0]).have.property('plu');
                            should(result._body[0].plu).be.equal(r1.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.clear_all()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product.clear_all()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
