import { Core, CoreConfig, MoralisApiError, ApiErrorCode, OperationRequestValidator, RequestController, ResponseAdapter, isMoralisError, PaginationReader, NextPaginatedRequestResolver, PaginatedResponseAdapter, MoralisError, CoreErrorCode, CoreProvider, Module } from '@moralisweb3/common-core';

var ApiUtilsConfig = {
    apiKey: {
        name: 'apiKey',
        defaultValue: null,
    },
};

// TODO: we need to delete this file when this function will be not used.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertOperationToDescriptor(operation) {
    return {
        name: operation.name,
        method: operation.method.toLowerCase(),
        bodyParamNames: operation.bodyParamNames || [],
        urlPattern: operation.urlPathPattern,
        urlPatternParamNames: operation.urlPathParamNames,
    };
}

var _a;
var Environment;
(function (Environment) {
    Environment["BROWSER"] = "browser";
    Environment["NODE"] = "node";
})(Environment || (Environment = {}));
var sdkNameForEnvironment = (_a = {},
    _a[Environment.BROWSER] = 'Javascript SDK',
    _a[Environment.NODE] = 'NodeJS SDK',
    _a);
var currentEnvironment = getEnvironment();
function detectIsBrowser() {
    try {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }
    catch (error) {
        return false;
    }
}
function getEnvironment() {
    if (detectIsBrowser()) {
        return Environment.BROWSER;
    }
    // Otherwise we use NodeJs as default
    // (in theory this will also account for other environments like webworker etc. but we don't support this at the moment)
    return Environment.NODE;
}
/**
 * Gets the platform name, this is the name of the SDK,
 * Note: previously this was always named 'JS SDK', now we separate by environment / package-origin
 */
function getSdkName(environment, product) {
    // If the product is set in the config, we use this as a name, this is done in the SDKs like React/Next etc.
    if (product) {
        return product;
    }
    // Otherwise we use the name based on the environment
    return sdkNameForEnvironment[environment];
}
/**
 * Additional data for the api to specify SDK details of the request
 */
var getSdkDetailsHeaders = function (product) {
    var sdkName = getSdkName(currentEnvironment, product);
    return {
        'x-moralis-platform': sdkName,
        'x-moralis-platform-version': Core.libVersion,
        'x-moralis-build-target': currentEnvironment,
    };
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

var OperationRequestBuilder = /** @class */ (function () {
    function OperationRequestBuilder(operation, core) {
        this.operation = operation;
        this.core = core;
    }
    OperationRequestBuilder.prototype.prepareUrl = function (baseUrl, request) {
        var _this = this;
        var _a;
        var urlParams = this.operation.getRequestUrlParams(request, this.core);
        var urlPath = this.operation.urlPathPattern;
        for (var _i = 0, _b = (_a = this.operation.urlPathParamNames) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
            var paramName = _b[_i];
            var paramValue = urlParams[paramName];
            if (paramValue === undefined || paramValue === null) {
                throw new Error("Param ".concat(paramName, " is required"));
            }
            urlPath = urlPath.replace("{".concat(paramName, "}"), paramValue);
        }
        var url = "".concat(baseUrl).concat(urlPath);
        var urlSearchParams = {};
        Object.keys(urlParams)
            .filter(function (paramName) { var _a; return !((_a = _this.operation.urlPathParamNames) === null || _a === void 0 ? void 0 : _a.includes(paramName)); })
            .forEach(function (paramName) {
            var paramValue = urlParams[paramName];
            if (paramValue !== undefined && paramValue !== null) {
                urlSearchParams[paramName] = paramValue;
            }
        });
        return { url: url, urlSearchParams: urlSearchParams };
    };
    OperationRequestBuilder.prototype.prepareBody = function (request) {
        if (!this.operation.bodyType && !this.operation.getRequestBody) {
            return undefined;
        }
        if (!this.operation.getRequestBody) {
            throw new Error("getRequestBody is not implemented for operation ".concat(this.operation.name));
        }
        if (!this.operation.bodyParamNames) {
            throw new Error("bodyParamNames are empty for operation ".concat(this.operation.name));
        }
        var body = this.operation.getRequestBody(request, this.core);
        if (this.operation.bodyType === 'properties') {
            return body;
        }
        if (this.operation.bodyType === 'raw') {
            return body;
        }
        throw new Error("Not supported body type: ".concat(this.operation.bodyType));
    };
    OperationRequestBuilder.prototype.prepareHeaders = function () {
        var apiKey = this.core.config.get(ApiUtilsConfig.apiKey);
        var product = this.core.config.get(CoreConfig.product);
        if (!apiKey) {
            throw new MoralisApiError({
                code: ApiErrorCode.API_KEY_NOT_SET,
                message: 'apiKey is not set',
            });
        }
        var headers = getSdkDetailsHeaders(product);
        headers['x-api-key'] = apiKey;
        return headers;
    };
    return OperationRequestBuilder;
}());

var OperationResolver = /** @class */ (function () {
    function OperationResolver(operation, baseUrl, core) {
        var _this = this;
        this.operation = operation;
        this.baseUrl = baseUrl;
        this.core = core;
        this.requestValidator = new OperationRequestValidator(this.operation);
        this.requestBuilder = new OperationRequestBuilder(this.operation, this.core);
        this.requestController = RequestController.create(this.core);
        this.fetch = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var _a, url, urlSearchParams, body, jsonResponse;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.requestValidator.validate(request);
                        _a = this.requestBuilder.prepareUrl(this.baseUrl, request), url = _a.url, urlSearchParams = _a.urlSearchParams;
                        body = this.requestBuilder.prepareBody(request);
                        return [4 /*yield*/, this.requestController.request({
                                method: this.operation.method,
                                url: url,
                                params: urlSearchParams,
                                headers: this.requestBuilder.prepareHeaders(),
                                data: body,
                            })];
                    case 1:
                        jsonResponse = _b.sent();
                        return [2 /*return*/, new ResponseAdapter(jsonResponse, function () {
                                return _this.operation.deserializeResponse(jsonResponse, request, _this.core);
                            })];
                }
            });
        }); };
        if (operation.isNullable) {
            throw new Error("Operation ".concat(operation.name, " has invalid value for isNullable property"));
        }
    }
    return OperationResolver;
}());

function isNotFoundError(e) {
    var _a;
    if (isMoralisError(e)) {
        if (((_a = e.details) === null || _a === void 0 ? void 0 : _a.status) === 404) {
            return true;
        }
        if (e.code === ApiErrorCode.NOT_FOUND) {
            return true;
        }
    }
    return false;
}

var NullableOperationResolver = /** @class */ (function () {
    function NullableOperationResolver(operation, baseUrl, core) {
        var _this = this;
        this.operation = operation;
        this.baseUrl = baseUrl;
        this.core = core;
        this.requestValidator = new OperationRequestValidator(this.operation);
        this.requestBuilder = new OperationRequestBuilder(this.operation, this.core);
        this.requestController = RequestController.create(this.core);
        this.fetch = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.requestValidator.validate(request);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._fetch(request)];
                    case 2:
                        result = _a.sent();
                        // TODO: this block should be deleted after the back-end adjustments.
                        if (!result.raw || (typeof result.raw === 'object' && Object.keys(result.raw).length === 0)) {
                            throw new MoralisApiError({
                                code: ApiErrorCode.NOT_FOUND,
                                message: 'The resource is not found',
                            });
                        }
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        if (isNotFoundError(e_1)) {
                            return [2 /*return*/, null];
                        }
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (!operation.isNullable) {
            throw new Error("Operation ".concat(operation.name, " has invalid value for isNullable property"));
        }
    }
    NullableOperationResolver.prototype._fetch = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, url, urlSearchParams, body, jsonResponse;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.requestBuilder.prepareUrl(this.baseUrl, request), url = _a.url, urlSearchParams = _a.urlSearchParams;
                        body = this.requestBuilder.prepareBody(request);
                        return [4 /*yield*/, this.requestController.request({
                                method: this.operation.method,
                                url: url,
                                params: urlSearchParams,
                                headers: this.requestBuilder.prepareHeaders(),
                                data: body,
                            })];
                    case 1:
                        jsonResponse = _b.sent();
                        return [2 /*return*/, new ResponseAdapter(jsonResponse, function () {
                                return _this.operation.deserializeResponse(jsonResponse, request, _this.core);
                            })];
                }
            });
        });
    };
    return NullableOperationResolver;
}());

var PaginatedOperationResolver = /** @class */ (function () {
    function PaginatedOperationResolver(operation, baseUrl, core) {
        var _this = this;
        this.operation = operation;
        this.baseUrl = baseUrl;
        this.core = core;
        this.requestValidator = new OperationRequestValidator(this.operation);
        this.requestBuilder = new OperationRequestBuilder(this.operation, this.core);
        this.requestController = RequestController.create(this.core);
        this.fetch = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var _a, url, urlSearchParams, body, jsonResponse, pagination, nextRequest;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.requestValidator.validate(request);
                        _a = this.requestBuilder.prepareUrl(this.baseUrl, request), url = _a.url, urlSearchParams = _a.urlSearchParams;
                        body = this.requestBuilder.prepareBody(request);
                        return [4 /*yield*/, this.requestController.request({
                                method: this.operation.method,
                                url: url,
                                params: urlSearchParams,
                                headers: this.requestBuilder.prepareHeaders(),
                                data: body,
                            })];
                    case 1:
                        jsonResponse = _b.sent();
                        pagination = PaginationReader.read(jsonResponse);
                        nextRequest = NextPaginatedRequestResolver.resolve(this.operation.firstPageIndex, request, pagination);
                        return [2 /*return*/, new PaginatedResponseAdapter(pagination, jsonResponse, function () { return _this.operation.deserializeResponse(jsonResponse, request, _this.core); }, nextRequest ? function () { return _this.fetch(nextRequest); } : undefined)];
                }
            });
        }); };
        if (operation.firstPageIndex !== 0 && operation.firstPageIndex !== 1) {
            throw new Error("Operation ".concat(operation.name, " has invalid value for firstPageIndex property"));
        }
    }
    return PaginatedOperationResolver;
}());

var OperationV3Resolver = /** @class */ (function () {
    function OperationV3Resolver(operation, baseUrl, core) {
        this.operation = operation;
        this.baseUrl = baseUrl;
        this.core = core;
        this.requestController = RequestController.create(this.core);
    }
    OperationV3Resolver.prototype.request = function (request, body) {
        return __awaiter(this, void 0, void 0, function () {
            var urlParamNames, requestJSON, url, searchParams, bodyJSON, responseJson;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlParamNames = this.operation.parameterNames.filter(function (name) {
                            return _this.operation.routePattern.includes("{".concat(name, "}"));
                        });
                        requestJSON = this.operation.serializeRequest
                            ? this.operation.serializeRequest(request)
                            : {};
                        url = urlParamNames.reduce(function (current, name) {
                            var value = requestJSON[name];
                            current = current.replace("{".concat(name, "}"), String(value));
                            return current;
                        }, this.operation.routePattern);
                        searchParams = this.operation.parameterNames
                            .filter(function (name) { return !urlParamNames.includes(name); })
                            .reduce(function (current, name) {
                            current[name] = requestJSON[name];
                            return current;
                        }, {});
                        bodyJSON = body && this.operation.serializeBody ? this.operation.serializeBody(body) : undefined;
                        return [4 /*yield*/, this.requestController.request({
                                url: url,
                                params: searchParams,
                                baseURL: this.resolveBaseUrl(request),
                                method: this.operation.httpMethod,
                                data: bodyJSON,
                                headers: this.prepareHeaders(),
                            })];
                    case 1:
                        responseJson = _a.sent();
                        if (!responseJson || !this.operation.parseResponse) {
                            if (this.operation.hasResponse) {
                                throw new Error('Expected response, but API has returned empty response');
                            }
                            // TODO: find a better way to handle this
                            return [2 /*return*/, {
                                    response: null,
                                    responseJson: null,
                                }];
                        }
                        return [2 /*return*/, {
                                response: this.operation.parseResponse(responseJson),
                                responseJson: responseJson,
                            }];
                }
            });
        });
    };
    OperationV3Resolver.prototype.resolve = function (request, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(request, body)];
                    case 1: return [2 /*return*/, (_a.sent()).response];
                }
            });
        });
    };
    /**
     * @deprecated This method is dedicated to V2 API only.
     */
    OperationV3Resolver.prototype.fetch = function (request, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(request, body)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new ResponseAdapter(data.responseJson, function () { return data.response; })];
                }
            });
        });
    };
    OperationV3Resolver.prototype.resolveBaseUrl = function (request) {
        return typeof this.baseUrl === 'string' ? this.baseUrl : this.baseUrl(request);
    };
    OperationV3Resolver.prototype.prepareHeaders = function () {
        var apiKey = this.core.config.get(ApiUtilsConfig.apiKey);
        var product = this.core.config.get(CoreConfig.product);
        if (!apiKey) {
            throw new MoralisApiError({
                code: ApiErrorCode.API_KEY_NOT_SET,
                message: 'apiKey is not set',
            });
        }
        var headers = getSdkDetailsHeaders();
        headers['x-api-key'] = "".concat(apiKey);
        headers['Authorization'] = "Bearer ".concat(apiKey);
        if (product) {
            headers['x-moralis-product'] = product;
        }
        return headers;
    };
    return OperationV3Resolver;
}());

var PaginatedResponseV3Adapter = /** @class */ (function () {
    function PaginatedResponseV3Adapter(response, json, nextHandler) {
        this.response = response;
        this.json = json;
        this.nextHandler = nextHandler;
    }
    Object.defineProperty(PaginatedResponseV3Adapter.prototype, "result", {
        get: function () {
            if (!this.response.result) {
                throw new Error('No result');
            }
            return this.response.result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaginatedResponseV3Adapter.prototype, "pagination", {
        get: function () {
            return {
                total: this.response.total || 0,
                page: this.response.page || 0,
                pageSize: this.response.pageSize || 0,
                cursor: this.response.cursor,
            };
        },
        enumerable: false,
        configurable: true
    });
    PaginatedResponseV3Adapter.prototype.hasNext = function () {
        return !!this.nextHandler;
    };
    PaginatedResponseV3Adapter.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.nextHandler) {
                    throw new MoralisError({
                        code: CoreErrorCode.NO_DATA_FOUND,
                        message: 'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
                    });
                }
                return [2 /*return*/, this.nextHandler()];
            });
        });
    };
    /**
     * @deprecated Use `toJSON()` method from the result.
     */
    PaginatedResponseV3Adapter.prototype.raw = function () {
        return this.json;
    };
    /**
     * @deprecated Use `toJSON()` method from the result.
     */
    PaginatedResponseV3Adapter.prototype.toJSON = function () {
        return this.json;
    };
    return PaginatedResponseV3Adapter;
}());

var PaginatedOperationV3Resolver = /** @class */ (function () {
    function PaginatedOperationV3Resolver(operation, baseUrl, core) {
        this.resolver = new OperationV3Resolver(operation, baseUrl, core);
    }
    /**
     * @deprecated This method is dedicated to V2 API only.
     */
    PaginatedOperationV3Resolver.prototype.fetch = function (request, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data, nextHandler;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolver.request(request, body)];
                    case 1:
                        data = _a.sent();
                        nextHandler = null;
                        if (data.responseJson.cursor) {
                            nextHandler = function () { return __awaiter(_this, void 0, void 0, function () {
                                var nextRequest;
                                return __generator(this, function (_a) {
                                    nextRequest = __assign(__assign({}, request), { cursor: data.response.cursor });
                                    return [2 /*return*/, this.fetch(nextRequest, body)];
                                });
                            }); };
                        }
                        return [2 /*return*/, new PaginatedResponseV3Adapter(data.response, data.responseJson, nextHandler)];
                }
            });
        });
    };
    return PaginatedOperationV3Resolver;
}());

var ApiUtilsConfigSetup = /** @class */ (function () {
    function ApiUtilsConfigSetup() {
    }
    ApiUtilsConfigSetup.register = function (config) {
        if (!config.hasKey(ApiUtilsConfig.apiKey)) {
            config.registerKey(ApiUtilsConfig.apiKey);
        }
    };
    return ApiUtilsConfigSetup;
}());

var ApiUtils = /** @class */ (function (_super) {
    __extends(ApiUtils, _super);
    function ApiUtils(core) {
        return _super.call(this, ApiUtils.moduleName, core) || this;
    }
    ApiUtils.create = function (core) {
        return new ApiUtils(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    ApiUtils.prototype.setup = function () {
        ApiUtilsConfigSetup.register(this.core.config);
    };
    ApiUtils.prototype.start = function () {
        // Nothing...
    };
    ApiUtils.moduleName = 'api';
    return ApiUtils;
}(Module));

export { ApiUtils, ApiUtilsConfig, NullableOperationResolver, OperationResolver, OperationV3Resolver, PaginatedOperationResolver, PaginatedOperationV3Resolver, PaginatedResponseV3Adapter, convertOperationToDescriptor, getSdkDetailsHeaders };
