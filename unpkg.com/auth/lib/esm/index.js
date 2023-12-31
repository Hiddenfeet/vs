import { MoralisAuthError, AuthErrorCode, CoreProvider, ApiModule } from '@moralisweb3/common-core';
import { SolAddress } from '@moralisweb3/common-sol-utils';
import { OperationResolver } from '@moralisweb3/api-utils';
import { EvmChain, EvmAddress } from '@moralisweb3/common-evm-utils';
import { requestChallengeEvmOperation, requestChallengeSolanaOperation, requestChallengeAptosOperation, verifyChallengeEvmOperation, verifyChallengeSolanaOperation, verifyChallengeAptosOperation, getAddressesOperation, removeBindOperation, requestBindOperation, verifyRemoveBindOperation, verifyRequestBindOperation } from '@moralisweb3/common-auth-utils';
import { AptosAddress } from '@moralisweb3/common-aptos-utils';

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

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

var AuthNetworkType;
(function (AuthNetworkType) {
    AuthNetworkType["EVM"] = "evm";
    AuthNetworkType["SOLANA"] = "solana";
    AuthNetworkType["APTOS"] = "aptos";
})(AuthNetworkType || (AuthNetworkType = {}));

var makeEvmRequestMessage = function (core, _a) {
    var chain = _a.chain, address = _a.address; _a.networkType; var options = __rest(_a, ["chain", "address", "networkType"]);
    return new OperationResolver(requestChallengeEvmOperation, BASE_URL, core).fetch(__assign({ chainId: EvmChain.create(chain).hex, address: EvmAddress.create(address).checksum }, options));
};
var makeSolRequestMessage = function (core, _a) {
    var address = _a.address; _a.networkType; var solNetwork = _a.solNetwork, options = __rest(_a, ["address", "networkType", "solNetwork"]);
    // Backwards compatibility for 'solNetwork' option
    if (!options.network && solNetwork) {
        options.network = solNetwork;
    }
    return new OperationResolver(requestChallengeSolanaOperation, BASE_URL, core).fetch(__assign({ address: SolAddress.create(address).toString() }, options));
};
var makeAptosRequestMessage = function (core, _a) {
    var address = _a.address; _a.networkType; var options = __rest(_a, ["address", "networkType"]);
    return new OperationResolver(requestChallengeAptosOperation, BASE_URL, core).fetch(__assign({ address: AptosAddress.create(address).toString() }, options));
};
var makeRequestMessage = function (core) { return function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (options.networkType) {
            case AuthNetworkType.EVM:
                return [2 /*return*/, makeEvmRequestMessage(core, options)];
            case AuthNetworkType.SOLANA:
                return [2 /*return*/, makeSolRequestMessage(core, options)];
            case AuthNetworkType.APTOS:
                return [2 /*return*/, makeAptosRequestMessage(core, options)];
            default:
                if (!options.networkType) {
                    return [2 /*return*/, makeEvmRequestMessage(core, options)];
                }
                throw new MoralisAuthError({
                    code: AuthErrorCode.INCORRECT_NETWORK,
                    message: "Incorrect networkType provided. Got \"".concat(options.networkType, "\", Valid values are: ").concat(Object.values(AuthNetworkType)
                        .map(function (value) { return "\"".concat(value, "\""); })
                        .join(', ')),
                });
        }
    });
}); }; };

var makeEvmVerify = function (core, _a) {
    _a.networkType; _a.network; var options = __rest(_a, ["networkType", "network"]);
    return new OperationResolver(verifyChallengeEvmOperation, BASE_URL, core).fetch({
        message: options.message,
        signature: options.signature,
    });
};
var makeSolVerify = function (core, _a) {
    _a.networkType; _a.network; var options = __rest(_a, ["networkType", "network"]);
    return new OperationResolver(verifyChallengeSolanaOperation, BASE_URL, core).fetch({
        message: options.message,
        signature: options.signature,
    });
};
var makeAptosVerify = function (core, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(verifyChallengeAptosOperation, BASE_URL, core).fetch({
        message: options.message,
        signature: options.signature,
    });
};
var makeVerify = function (core) { return function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Backwards compatibility for the 'network' parameter
        if (!options.networkType && options.network) {
            options.networkType = options.network;
        }
        switch (options.networkType) {
            case AuthNetworkType.EVM:
                return [2 /*return*/, makeEvmVerify(core, options)];
            case AuthNetworkType.SOLANA:
                return [2 /*return*/, makeSolVerify(core, options)];
            case AuthNetworkType.APTOS:
                return [2 /*return*/, makeAptosVerify(core, options)];
            default:
                if (!options.networkType) {
                    return [2 /*return*/, makeEvmVerify(core, options)];
                }
                throw new MoralisAuthError({
                    code: AuthErrorCode.INCORRECT_NETWORK,
                    message: "Incorrect network provided. Got \"".concat(options.networkType, "\", Valid values are: ").concat(Object.values(AuthNetworkType)
                        .map(function (value) { return "\"".concat(value, "\""); })
                        .join(', ')),
                });
        }
    });
}); }; };

var BASE_URL = 'https://authapi.moralis.io';
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth(core) {
        var _this = _super.call(this, Auth.moduleName, core, function () { return BASE_URL; }) || this;
        // Client-side compatible operation, structured in a predictable way as defined in the operation
        // TODO: generate in seperate package "client-evm-auth" (similar to client-evm-auth)
        _this.evm = {
            getAddresses: function (request) {
                return new OperationResolver(getAddressesOperation, _this.baseUrl, _this.core).fetch(request);
            },
            removeBind: function (request) {
                return new OperationResolver(removeBindOperation, _this.baseUrl, _this.core).fetch(request);
            },
            requestBind: function (request) {
                return new OperationResolver(requestBindOperation, _this.baseUrl, _this.core).fetch(request);
            },
            requestChallengeEvm: function (request) {
                return new OperationResolver(requestChallengeEvmOperation, _this.baseUrl, _this.core).fetch(request);
            },
            verifyRemoveBind: function (request) {
                return new OperationResolver(verifyRemoveBindOperation, _this.baseUrl, _this.core).fetch(request);
            },
            verifyRequestBind: function (request) {
                return new OperationResolver(verifyRequestBindOperation, _this.baseUrl, _this.core).fetch(request);
            },
        };
        // Client-side compatible operation, structured in a predictable way as defined in the operation
        // TODO: generate in separate package "client-evm-auth" (similar to client-evm-auth)
        _this.solana = {
            requestChallengeSol: function (request) {
                return new OperationResolver(requestChallengeSolanaOperation, _this.baseUrl, _this.core).fetch(request);
            },
        };
        // Resolves to requestChallengeEvm/requestChallengeSol depending on provided options (defaults to evm)
        _this.requestMessage = function (options) { return makeRequestMessage(_this.core)(options); };
        return _this;
    }
    Auth.create = function (core) {
        return new Auth(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    Auth.prototype.setup = function () {
        // Nothing
    };
    Auth.prototype.start = function () {
        // Nothing
    };
    Auth.prototype.verify = function (options) {
        return makeVerify(this.core)(options);
    };
    Auth.moduleName = 'auth';
    return Auth;
}(ApiModule));

export { Auth, BASE_URL };
