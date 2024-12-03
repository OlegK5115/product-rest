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
exports.setup = void 0;
var product_rest = require("../lib/product-rest");
function setup(app) {
    var _this = this;
    app.get('/rests', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var ans, order_l, order_r, mass_1, stor_l, stor_r, mass_2, shop_id, mass_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_rest.search_all()];
                case 1:
                    ans = _a.sent();
                    if (req.query["plu"]) {
                        ans = ans.filter(function (item1) { return item1.plu == req.query["plu"]; });
                    }
                    if (!(req.query["order_left"] && req.query["order_right"])) return [3 /*break*/, 3];
                    order_l = req.query["order_left"];
                    order_r = req.query["order_right"];
                    return [4 /*yield*/, product_rest.search_by_order(order_l, order_r)];
                case 2:
                    mass_1 = _a.sent();
                    ans = ans.filter(function (item1) {
                        return mass_1.some(function (item2) {
                            return item1.plu == item2.plu;
                        });
                    });
                    _a.label = 3;
                case 3:
                    if (!(req.query["storage_left"] && req.query["storage_right"])) return [3 /*break*/, 5];
                    stor_l = req.query["storage_left"];
                    stor_r = req.query["storage_right"];
                    return [4 /*yield*/, product_rest.search_by_storage(stor_l, stor_r)];
                case 4:
                    mass_2 = _a.sent();
                    ans = ans.filter(function (item1) {
                        return mass_2.some(function (item2) {
                            return item1.plu == item2.plu;
                        });
                    });
                    _a.label = 5;
                case 5:
                    if (!req.query["shop_id"]) return [3 /*break*/, 7];
                    shop_id = req.query["shop_id"];
                    return [4 /*yield*/, product_rest.search_by_shop_id(shop_id)];
                case 6:
                    mass_3 = _a.sent();
                    ans = ans.filter(function (item1) {
                        return mass_3.some(function (item2) {
                            return item1.plu == item2.plu;
                        });
                    });
                    _a.label = 7;
                case 7:
                    res.status(200).send(ans);
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/rest', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var prod, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    prod = {
                        plu: req.body["plu"],
                        q_order: parseInt(req.body["q_order"]),
                        q_storage: parseInt(req.body["q_storage"]),
                        shop_id: req.body["shop_id"]
                    };
                    return [4 /*yield*/, product_rest.create(prod)];
                case 1:
                    _a.sent();
                    res.send('ok');
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(404).send(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/rest/increase', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, product_rest.increase(req.body["plu"], parseInt(req.body["number"]))];
                case 1:
                    _a.sent();
                    res.send('ok');
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(404).send(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/rest/decrease', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, product_rest.decrease(req.body["plu"], parseInt(req.body["number"]))];
                case 1:
                    _a.sent();
                    res.send('ok');
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(404).send(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.setup = setup;
