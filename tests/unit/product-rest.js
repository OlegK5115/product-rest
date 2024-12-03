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
var should = require("should");
var uuid_1 = require("uuid");
var product = require("../../lib/product");
var product_rest = require("../../lib/product-rest");
var history = require("../../lib/history");
describe('rest', function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, history.clear_all()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_rest.clear_all()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, product.clear_all()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    context('zero rests', function () {
        var prod;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            prod = {
                                plu: (0, uuid_1.v4)(),
                                name: 'pen',
                                q_order: 5,
                                q_storage: 10
                            };
                            return [4 /*yield*/, product.create(prod)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get zero rests', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_all()];
                        case 1:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('create rest with wrong plu', function () {
            return __awaiter(this, void 0, void 0, function () {
                var r1, _a, _b, err_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            r1 = {
                                plu: "000",
                                q_order: 3,
                                q_storage: 4,
                                shop_id: (0, uuid_1.v4)()
                            };
                            _b = (_a = should).fail;
                            return [4 /*yield*/, product_rest.create(r1)];
                        case 1:
                            _b.apply(_a, [_c.sent(), null, "error"]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _c.sent();
                            should(err_1).be.equal("error: product doesn't exist");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        it('create rest with wrong q_order', function () {
            return __awaiter(this, void 0, void 0, function () {
                var r1, _a, _b, err_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            r1 = {
                                plu: prod.plu,
                                q_order: 20,
                                q_storage: 4,
                                shop_id: (0, uuid_1.v4)()
                            };
                            _b = (_a = should).fail;
                            return [4 /*yield*/, product_rest.create(r1)];
                        case 1:
                            _b.apply(_a, [_c.sent(), null, "error"]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _c.sent();
                            should(err_2).be.equal("error: rest is too large");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        it('create rest', function () {
            return __awaiter(this, void 0, void 0, function () {
                var r1, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            r1 = {
                                plu: prod.plu,
                                q_order: 3,
                                q_storage: 4,
                                shop_id: (0, uuid_1.v4)()
                            };
                            return [4 /*yield*/, product_rest.create(r1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.search_all()];
                        case 2:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(1);
                            should(res[0]).have.property('plu');
                            should(res[0].plu).be.equal(r1.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, history.clear_all()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.clear_all()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, product.clear_all()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    context('one rest', function () {
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
        it('get rest by plu', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_by_plu(r1.plu)];
                        case 1:
                            res = _a.sent();
                            should(res).have.property('plu');
                            should(res.plu).be.equal(r1.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get rest by wrong plu', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, err_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            _b = (_a = should).fail;
                            return [4 /*yield*/, product_rest.search_by_plu("000")];
                        case 1:
                            _b.apply(_a, [_c.sent(), null, "error"]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _c.sent();
                            should(err_3).be.equal("error: rest doesn't exist");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        it('increase rest', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.increase(r1.plu, 1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.search_by_plu(r1.plu)];
                        case 2:
                            res = _a.sent();
                            should(res).have.property('q_order');
                            should(res.q_order).be.equal(r1.q_order + 1);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('increase rest by wrong number', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, err_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            _b = (_a = should).fail;
                            return [4 /*yield*/, product_rest.increase(r1.plu, 3)];
                        case 1:
                            _b.apply(_a, [_c.sent(), null, "error"]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _c.sent();
                            should(err_4).be.equal("error: rest is too large");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        it('decrease rest', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.decrease(r1.plu, 1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.search_by_plu(r1.plu)];
                        case 2:
                            res = _a.sent();
                            should(res).have.property('q_order');
                            should(res.q_order).be.equal(r1.q_order);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('decrease rest by wrong number', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, err_5;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            _b = (_a = should).fail;
                            return [4 /*yield*/, product_rest.decrease(r1.plu, 10)];
                        case 1:
                            _b.apply(_a, [_c.sent(), null, "error"]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _c.sent();
                            should(err_5).be.equal("error: rest is too small");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, history.clear_all()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.clear_all()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, product.clear_all()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    context('few rests', function () {
        var p1;
        var p2;
        var r1;
        var r2;
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p1 = { plu: (0, uuid_1.v4)(), name: 'pen', q_order: 50, q_storage: 100 };
                            p2 = { plu: (0, uuid_1.v4)(), name: 'car', q_order: 3, q_storage: 7 };
                            r1 = { plu: p1.plu, q_order: 30, q_storage: 60, shop_id: "shop1" };
                            r2 = { plu: p2.plu, q_order: 1, q_storage: 2, shop_id: "shop1" };
                            return [4 /*yield*/, product.create(p1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product.create(p2)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, product_rest.create(r1)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, product_rest.create(r2)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get rests by shop_id', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_by_shop_id(r1.shop_id)];
                        case 1:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(2);
                            should(res[0]).have.property('plu');
                            should(res[0].plu).be.equal(r1.plu);
                            should(res[1]).have.property('plu');
                            should(res[1].plu).be.equal(r2.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get zero rests by wrong shop_id', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_by_shop_id("biba")];
                        case 1:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get rests by q_order', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_by_order(15, 100)];
                        case 1:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(1);
                            should(res[0]).have.property('plu');
                            should(res[0].plu).be.equal(r1.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('get rests by q_storage', function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, product_rest.search_by_storage(2, 100)];
                        case 1:
                            res = _a.sent();
                            should(res).be.instanceOf(Array).and.have.length(2);
                            should(res[0]).have.property('plu');
                            should(res[0].plu).be.equal(r1.plu);
                            should(res[1]).have.property('plu');
                            should(res[1].plu).be.equal(r2.plu);
                            return [2 /*return*/];
                    }
                });
            });
        });
        after(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, history.clear_all()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, product_rest.clear_all()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, product.clear_all()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
