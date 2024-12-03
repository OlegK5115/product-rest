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
exports.clear_all = exports.search_all = exports.search_by_name = exports.search_by_plu = exports.create = exports.init = void 0;
var uuid_1 = require("uuid");
var history = require("./history");
var db_1 = require("./db");
var tablename = 'product';
var init_check = false;
function parse_to_product(res) {
    if (!res) {
        throw ("error: product doesn't exist");
    }
    var product = {
        plu: res.plu,
        name: res.name,
        q_order: parseInt(res.q_order),
        q_storage: parseInt(res.q_storage)
    };
    return product;
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = "create table if not exists ".concat(tablename, "(\n\t\tid serial primary key,\n\t\tplu varchar not null unique,\n\t\tname varchar not null,\n\t\tq_order integer not null,\n\t\tq_storage integer not null\n\t);");
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 1:
                    _a.sent();
                    init_check = true;
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
function create(product) {
    return __awaiter(this, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!init_check) return [3 /*break*/, 2];
                    return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    req = "insert into ".concat(tablename, " (plu, name, q_order, q_storage) \n\tvalues ('").concat(product.plu, "', '").concat(product.name, "', ").concat(product.q_order, ", \n\t").concat(product.q_storage, ");");
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, history.create({
                            uuid: (0, uuid_1.v4)(),
                            plu: product.plu,
                            action: 'create_product',
                            date: new Date().toDateString(),
                            shop_id: null
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function search_by_plu(plu) {
    return __awaiter(this, void 0, void 0, function () {
        var req, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!init_check) return [3 /*break*/, 2];
                    return [4 /*yield*/, init()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    req = "select * from ".concat(tablename, "\twhere plu = '").concat(plu, "';");
                    _a = parse_to_product;
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 3:
                    result = _a.apply(void 0, [(_b.sent())[0]]);
                    return [4 /*yield*/, history.create({
                            uuid: (0, uuid_1.v4)(),
                            plu: plu,
                            action: 'search_product_by_plu',
                            date: new Date().toDateString(),
                            shop_id: null
                        })];
                case 4:
                    _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.search_by_plu = search_by_plu;
function search_by_name(name) {
    return __awaiter(this, void 0, void 0, function () {
        var req, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!init_check) return [3 /*break*/, 2];
                    return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    req = "select * from ".concat(tablename, "\twhere name = '").concat(name, "';");
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 3:
                    result = (_a.sent()).map(function (res) { return parse_to_product(res); });
                    return [4 /*yield*/, history.create({
                            uuid: (0, uuid_1.v4)(),
                            plu: null,
                            action: 'search_product_by_name',
                            date: new Date().toDateString(),
                            shop_id: null
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.search_by_name = search_by_name;
function search_all() {
    return __awaiter(this, void 0, void 0, function () {
        var req, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!init_check) return [3 /*break*/, 2];
                    return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    req = "select * from ".concat(tablename, ";");
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 3:
                    result = (_a.sent()).map(function (res) { return parse_to_product(res); });
                    return [4 /*yield*/, history.create({
                            uuid: (0, uuid_1.v4)(),
                            plu: null,
                            action: 'search_all_products',
                            date: new Date().toDateString(),
                            shop_id: null
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.search_all = search_all;
function clear_all() {
    return __awaiter(this, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!init_check) return [3 /*break*/, 2];
                    return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    req = "delete from ".concat(tablename, ";");
                    return [4 /*yield*/, (0, db_1.exec)(req)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clear_all = clear_all;
