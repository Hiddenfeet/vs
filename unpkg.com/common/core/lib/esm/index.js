import axios, { AxiosError } from 'axios';

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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var ModuleType;
(function (ModuleType) {
    ModuleType["API"] = "api";
    ModuleType["DEFAULT"] = "default";
})(ModuleType || (ModuleType = {}));

/**
 * Verify if the provided class is a api type.
 * Should be used as a Typescript type-guard
 *
 * @example
 * ```
 * if(isApiModule(module)){
 *  // module is types as ApiModule here
 * }
 * ```
 */
var isApiModule = function (moralisClass) {
    if (moralisClass.type === ModuleType.API) {
        return true;
    }
    return false;
};

var CoreErrorCode;
(function (CoreErrorCode) {
    // Generic Core error
    CoreErrorCode["GENERIC_CORE_ERROR"] = "C0001";
    // A module wants to register with a name that already is registered
    CoreErrorCode["DUPLICATE_MODULE"] = "C0002";
    // The module is not registered
    CoreErrorCode["MODULE_NOT_FOUND"] = "C0003";
    // Error in validation check
    CoreErrorCode["VALIDATION_ERROR"] = "C0004";
    CoreErrorCode["INVALID_ARGUMENT"] = "C0005";
    CoreErrorCode["REQUEST_ERROR"] = "C0006";
    CoreErrorCode["NO_DATA_FOUND"] = "C0007";
    CoreErrorCode["NOT_INITIALIZED"] = "C0008";
    CoreErrorCode["ALREADY_INITIALIZED"] = "C0009";
    CoreErrorCode["METHOD_FAILED"] = "C0010";
    CoreErrorCode["STATE_MACHINE_STARTED"] = "C0011";
    CoreErrorCode["STATE_MACHINE_NOT_STARTED"] = "C0012";
    CoreErrorCode["CONFIG_KEY_NOT_EXIST"] = "C0013";
    CoreErrorCode["CONFIG_INVALID_VALUE"] = "C0014";
    CoreErrorCode["CONFIG_KEY_ALREADY_EXIST"] = "C0015";
    CoreErrorCode["INVALID_DATA"] = "C0016";
    CoreErrorCode["BIG_NUMBER_ERROR"] = "C0500";
    CoreErrorCode["NOT_IMPLEMENTED"] = "C9000";
})(CoreErrorCode || (CoreErrorCode = {}));
var ApiErrorCode;
(function (ApiErrorCode) {
    ApiErrorCode["GENERIC_API_ERROR"] = "A0001";
    ApiErrorCode["PAGE_LIMIT_EXCEEDED"] = "A0002";
    ApiErrorCode["API_KEY_NOT_SET"] = "A0003";
    ApiErrorCode["INVALID_PARAMS"] = "A0004";
    ApiErrorCode["NOT_FOUND"] = "A0404";
    ApiErrorCode["NOT_IMPLEMENTED"] = "A9000";
})(ApiErrorCode || (ApiErrorCode = {}));
var AuthErrorCode;
(function (AuthErrorCode) {
    AuthErrorCode["GENERIC_AUTH_ERROR"] = "U0001";
    AuthErrorCode["INCORRECT_NETWORK"] = "U0002";
    AuthErrorCode["INCORRECT_PARAMETER"] = "U0003";
    AuthErrorCode["NOT_IMPLEMENTED"] = "U9000";
})(AuthErrorCode || (AuthErrorCode = {}));
var StreamErrorCode;
(function (StreamErrorCode) {
    StreamErrorCode["GENERIC_STREAM_ERROR"] = "S0001";
    StreamErrorCode["INCORRECT_NETWORK"] = "S0002";
    StreamErrorCode["INCORRECT_PARAMETER"] = "S0003";
    StreamErrorCode["INVALID_SIGNATURE"] = "S0004";
    StreamErrorCode["NOT_IMPLEMENTED"] = "S9000";
})(StreamErrorCode || (StreamErrorCode = {}));

var MoralisError = /** @class */ (function (_super) {
    __extends(MoralisError, _super);
    function MoralisError(_a) {
        var message = _a.message, code = _a.code, details = _a.details, cause = _a.cause;
        var _this = 
        // @ts-ignore Typescript does not recognise 'cause' ? OR we have wrong TS version
        _super.call(this, MoralisError.makeMessage(message, code), { cause: cause }) || this;
        _this.name = 'Moralis SDK Error';
        _this.isMoralisError = true;
        // Set prototype manually, as required since Typescript 2.2: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
        Object.setPrototypeOf(_this, MoralisError.prototype);
        _this.code = code;
        _this.details = details;
        if (cause) {
            _this.cause = cause;
            if ('stack' in cause) {
                _this.stack = "".concat(_this.stack, "\nCAUSE: ").concat(cause.stack);
            }
        }
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisError);
        }
        return _this;
    }
    MoralisError.makeMessage = function (message, code) { return "[".concat(code, "] ").concat(message); };
    return MoralisError;
}(Error));
var CoreError = /** @class */ (function (_super) {
    __extends(CoreError, _super);
    function CoreError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis SDK Core Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, CoreError);
        }
        return _this;
    }
    return CoreError;
}(MoralisError));
var MoralisApiError = /** @class */ (function (_super) {
    __extends(MoralisApiError, _super);
    function MoralisApiError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis SDK API Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisApiError);
        }
        return _this;
    }
    return MoralisApiError;
}(MoralisError));
var MoralisAuthError = /** @class */ (function (_super) {
    __extends(MoralisAuthError, _super);
    function MoralisAuthError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis Auth Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisAuthError);
        }
        return _this;
    }
    return MoralisAuthError;
}(MoralisError));
var MoralisStreamError = /** @class */ (function (_super) {
    __extends(MoralisStreamError, _super);
    function MoralisStreamError(options) {
        var _this = _super.call(this, options) || this;
        _this.name = 'Moralis Stream Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MoralisStreamError);
        }
        return _this;
    }
    return MoralisStreamError;
}(MoralisError));

var isMoralisError = function (error) {
    if (!(error instanceof Error)) {
        return false;
    }
    if (!error.isMoralisError) {
        return false;
    }
    return true;
};

/**
 * MoralisModues handles all registered modules.
 * Any package that is used in Moralis, should register itself via this class.
 * This allows cross-communication between modules and easy management of the modules
 *
 * This class is responsible for:
 * - registering new modules
 * - removing modules (in theory possible for exotic usecases, but might break the app if done after initialisation)
 * - getting individual modules by name, type or everything
 */
var Modules = /** @class */ (function () {
    function Modules() {
        this.modules = new Map();
    }
    /**
     * Register and setup a new module by providing a module that is extended from BaseClass.
     * This will throw an error if the name is not unique
     * @param module the module that needs to be registered
     */
    Modules.prototype.register = function (module) {
        if (this.modules.has(module.name)) {
            throw new CoreError({
                code: CoreErrorCode.DUPLICATE_MODULE,
                message: "The module \"".concat(module.name, "\" has already been registered."),
            });
        }
        this.modules.set(module.name, module);
        module.setup();
    };
    /**
     * Returns the module with the given name.
     * This module should have been registered with `register`
     * @param name the module name
     * @returns a valid BaseModule
     * @throws a CoreError if no module with the given name has been registered
     */
    Modules.prototype.get = function (name) {
        var module = this.modules.get(name);
        if (!module) {
            throw new CoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: "Module \"".concat(name, "\" does not exist.") });
        }
        return module;
    };
    /**
     * Tries to return the module with the given name if exist. Otherwise returns null.
     * @param name the module name
     * @returns a valid BaseModule or null
     */
    Modules.prototype.tryGet = function (name) {
        return this.modules.get(name) || null;
    };
    Modules.prototype.has = function (name) {
        return this.modules.has(name);
    };
    /**
     * Returns the network module with the provided name.
     * @param name the module name
     * @returns a valid ApiModule
     * @throws a CoreError if no network module with the given name has been registered
     */
    Modules.prototype.getApi = function (name) {
        var module = this.modules.get(name);
        if (!module || !isApiModule(module)) {
            throw new CoreError({
                code: CoreErrorCode.MODULE_NOT_FOUND,
                message: "No ApiModule found with the name \"".concat(name, "\""),
            });
        }
        return module;
    };
    /**
     * Remove the module with the provided name, if it has been registered,
     * @param name the module name
     * @throws a CoreError if the module cannot be found.
     */
    Modules.prototype.remove = function (name) {
        var isRemoved = this.modules.delete(name);
        if (!isRemoved) {
            throw new CoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: "Module \"".concat(name, "\" does not exist.") });
        }
    };
    /**
     * List all the registered modules
     * @returns an array of BaseModule that have been registered
     */
    Modules.prototype.list = function () {
        return Array.from(this.modules.values());
    };
    /**
     * Returns the names of all registered modules
     */
    Modules.prototype.listNames = function () {
        return this.list().map(function (module) { return module.name; });
    };
    /**
     * List all the registered api modules (eg. modules with the type CoreModuleType.API)
     */
    Modules.prototype.listApis = function () {
        return this.list().filter(isApiModule);
    };
    return Modules;
}());

var CoreConfig = {
    logLevel: {
        name: 'logLevel',
        defaultValue: 'info',
    },
    buidEnvironment: {
        name: 'buidEnvironment',
        defaultValue: 'browser',
    },
    defaultNetwork: {
        name: 'defaultNetwork',
        defaultValue: 'Evm',
    },
    product: {
        name: 'product',
        defaultValue: undefined,
    },
    /**
     * @description Maximal number of request retries.
     */
    maxRetries: {
        name: 'maxRetries',
        defaultValue: 2,
    },
};

/* eslint-disable no-console */
var logLevelMap = {
    verbose: 5,
    debug: 4,
    info: 3,
    warning: 2,
    error: 1,
    off: 0,
};
/**
 * LoggerController, responsible to create log messages for each module.
 * It should be created with the name of the module like `new Logger('module-name')`
 * It will then prefix any logs with that module-name for easy debugging
 * It will show only logs up to the specified `logLevel` in the MoralisConfig
 */
var LoggerController = /** @class */ (function () {
    function LoggerController(moduleName, config) {
        this.moduleName = moduleName;
        this.config = config;
    }
    LoggerController.create = function (moduleName, core) {
        return new LoggerController(moduleName, core.config);
    };
    Object.defineProperty(LoggerController.prototype, "level", {
        get: function () {
            return this.config.get(CoreConfig.logLevel);
        },
        enumerable: false,
        configurable: true
    });
    LoggerController.prototype._transport = function (level, message, details) {
        var logMessage = this._makeLogMessage(message);
        var args = [logMessage, details].filter(function (arg) { return arg != null; });
        switch (level) {
            case 'error':
                console.error.apply(console, args);
                break;
            case 'warn':
                console.warn.apply(console, args);
                break;
            case 'log':
                console.log.apply(console, args);
                break;
        }
    };
    LoggerController.prototype._shouldLog = function (logLevel) {
        var level = logLevelMap[logLevel];
        var acceptedLevel = logLevelMap[this.level];
        if (level > acceptedLevel) {
            return false;
        }
        return true;
    };
    LoggerController.prototype._makeLogMessage = function (message) {
        return "Moralis[".concat(this.moduleName, "]: ").concat(message);
    };
    LoggerController.prototype.error = function (error, details) {
        if (!this._shouldLog('error')) {
            return;
        }
        var message = '';
        if (typeof error === 'string') {
            message = error;
        }
        else if (isMoralisError(error)) {
            message = error.message;
            if (error.details) {
                if (details) {
                    details._errorDetails = error.details;
                }
                else {
                    details = {
                        _errorDetails: error.details,
                    };
                }
            }
        }
        else {
            message = error.message;
        }
        this._transport('error', message, details);
    };
    LoggerController.prototype.warn = function (message, details) {
        if (!this._shouldLog('warning')) {
            return;
        }
        this._transport('warn', message, details);
    };
    LoggerController.prototype.info = function (message, details) {
        if (!this._shouldLog('info')) {
            return;
        }
        this._transport('log', message, details);
    };
    LoggerController.prototype.debug = function (message, details) {
        if (!this._shouldLog('debug')) {
            return;
        }
        this._transport('log', message, details);
    };
    LoggerController.prototype.verbose = function (message, details) {
        if (!this._shouldLog('verbose')) {
            return;
        }
        this._transport('log', message, details);
    };
    return LoggerController;
}());

var Config = /** @class */ (function () {
    function Config() {
        this.items = new Map();
    }
    Config.prototype.registerKey = function (key, validator) {
        if (this.items.has(key.name)) {
            throw new CoreError({
                code: CoreErrorCode.CONFIG_KEY_ALREADY_EXIST,
                message: "Key \"".concat(key.name, "\" is already registered"),
            });
        }
        this.items.set(key.name, { key: key, value: key.defaultValue, validator: validator });
    };
    Config.prototype.getKeys = function () {
        return Array.from(this.items.keys());
    };
    Config.prototype.hasKey = function (key) {
        return this.items.has(key.name);
    };
    Config.prototype.get = function (keyOrName) {
        return this.getItem(keyOrName).value;
    };
    Config.prototype.set = function (keyOrName, value) {
        var item = this.getItem(keyOrName);
        var error = item.validator ? item.validator(value) : null;
        if (error) {
            throw new CoreError({
                code: CoreErrorCode.CONFIG_INVALID_VALUE,
                message: "Cannot set this config. Invalid value for \"".concat(item.key.name, "\". ").concat(error),
            });
        }
        item.value = value;
    };
    Config.prototype.merge = function (values) {
        var _this = this;
        Object.keys(values).forEach(function (keyName) {
            _this.set(keyName, values[keyName]);
        });
    };
    Config.prototype.reset = function () {
        this.items.forEach(function (item) {
            item.value = item.key.defaultValue;
        });
    };
    Config.prototype.getItem = function (keyOrName) {
        var keyName = typeof keyOrName === 'string' ? keyOrName : keyOrName.name;
        var item = this.items.get(keyName);
        if (!item) {
            // This error occurs when a user tries to set a value for a specific key, but the key is not registered.
            // That situation may occur, when a moralis module is not registered (all keys are registered in the module setup step).
            // If you have this error, you should fix your code. Firstly, you should register all modules, later you can modify the configuration.
            throw new CoreError({
                code: CoreErrorCode.CONFIG_KEY_NOT_EXIST,
                message: "Key \"".concat(keyName, "\" is unregistered. Have you registered all required modules?"),
            });
        }
        return item;
    };
    return Config;
}());

var CoreConfigSetup = /** @class */ (function () {
    function CoreConfigSetup() {
    }
    CoreConfigSetup.register = function (config) {
        config.registerKey(CoreConfig.logLevel);
        config.registerKey(CoreConfig.buidEnvironment);
        config.registerKey(CoreConfig.defaultNetwork);
        config.registerKey(CoreConfig.product);
        config.registerKey(CoreConfig.maxRetries);
    };
    return CoreConfigSetup;
}());

var LIB_VERSION = "2.22.4";

/**
 * The MoralisData class represents the value of a native currency (like ETH, SOL, BNB etc.)
 *
 * @internal
 * @category DataType
 */
var MoralisData = /** @class */ (function () {
    function MoralisData() {
    }
    return MoralisData;
}());

var MoralisDataObject = /** @class */ (function (_super) {
    __extends(MoralisDataObject, _super);
    function MoralisDataObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoralisDataObject;
}(MoralisData));

var BigNumberFormatter = /** @class */ (function () {
    function BigNumberFormatter() {
    }
    BigNumberFormatter.toDecimal = function (value, decimals) {
        if (decimals < 0) {
            throw new CoreError({
                code: CoreErrorCode.BIG_NUMBER_ERROR,
                message: 'Invalid decimals',
            });
        }
        var result = value.toString();
        if (decimals === 0) {
            return result;
        }
        var isNegative = result.startsWith('-');
        if (isNegative) {
            result = result.substring(1);
        }
        result = result.padStart(decimals, '0');
        var dot = result.length - decimals;
        var whole = dot === 0 ? '0' : result.substring(0, dot);
        var fraction = result.substring(dot);
        result = "".concat(whole, ".").concat(fraction);
        while (result[result.length - 1] === '0' && result[result.length - 2] !== '.') {
            result = result.substring(0, result.length - 1);
        }
        if (isNegative) {
            result = "-".concat(result);
        }
        return result;
    };
    BigNumberFormatter.toHex = function (value) {
        var result = value.toString(16);
        var isNegative = result.startsWith('-');
        if (isNegative) {
            result = result.substring(1);
        }
        if (result.length % 2 !== 0) {
            result = "0".concat(result);
        }
        result = "0x".concat(result);
        if (isNegative) {
            result = "-".concat(result);
        }
        return result;
    };
    return BigNumberFormatter;
}());

var BigNumberParser = /** @class */ (function () {
    function BigNumberParser() {
    }
    BigNumberParser.parseInt = function (value) {
        assertNotEmpty(value);
        if (typeof value === 'string') {
            if (value.length === 0) {
                throw createError('Value is empty');
            }
            var isNegativeHex = value.startsWith('-0x');
            if (isNegativeHex) {
                value = value.substring(1);
            }
            var result = BigInt(value);
            if (isNegativeHex) {
                result *= BigInt(-1);
            }
            return result;
        }
        return BigInt(value);
    };
    // TODO: refactor to reduce complexity
    // eslint-disable-next-line complexity
    BigNumberParser.parseDecimal = function (value, decimals) {
        assertNotEmpty(value);
        var multiplier = getMultiplier(decimals);
        if (typeof value === 'number') {
            return BigInt(value) * multiplier;
        }
        if (typeof value === 'bigint') {
            return value * multiplier;
        }
        var isNegative = value.startsWith('-');
        if (isNegative) {
            value = value.substring(1);
        }
        var fragments = value.split('.');
        if (fragments.length > 2) {
            throw createError('Value has more than one dot');
        }
        if (fragments.some(function (fragment) { return !fragment; })) {
            throw createError('Value has empty fragments');
        }
        var result;
        if (fragments.length === 1) {
            result = BigInt(fragments[0]) * multiplier;
        }
        else {
            var whole = fragments[0];
            var fraction = fragments[1];
            if (fraction.length > decimals) {
                throw createError("Value has too long fractional part: ".concat(fraction.length, ", max: ").concat(decimals));
            }
            if (fraction.length < decimals) {
                fraction = fraction.padEnd(decimals, '0');
            }
            result = BigInt(whole) * multiplier + BigInt(fraction);
        }
        if (isNegative) {
            result *= BigInt(-1);
        }
        return result;
    };
    return BigNumberParser;
}());
function assertNotEmpty(value) {
    if (value === null) {
        throw createError('Value is null');
    }
    if (value === undefined) {
        throw createError('Value is undefined');
    }
}
function getMultiplier(decimals) {
    if (decimals < 0) {
        throw createError('Invalid decimals');
    }
    // decimals = 0, multiplier = 1
    // decimals = 1, multiplier = 10
    // decimals = 2, multiplier = 100
    // ...
    var ten = BigInt(10);
    var multiplier = BigInt(1);
    while (decimals-- > 0) {
        multiplier *= ten;
    }
    return multiplier;
}
function createError(message) {
    return new CoreError({
        code: CoreErrorCode.BIG_NUMBER_ERROR,
        message: message,
    });
}

/**
 * The BigNumber class is a MoralisData that references to a the value of a BigNumber
 *
 * @category DataType
 */
var BigNumber = /** @class */ (function () {
    function BigNumber(value) {
        this.value = value;
    }
    /**
     * Create a new instance of BigNumber from any valid address input.
     *
     * @param value - the BigNumberish type
     * @example BigNumber.create(12);
     * @example BigNumber.create("20");
     * @returns a new BigNumber instance
     */
    BigNumber.create = function (value) {
        if (value instanceof BigNumber) {
            return value;
        }
        return new BigNumber(BigNumberParser.parseInt(value));
    };
    BigNumber.fromJSON = function (json) {
        return BigNumber.create(json);
    };
    /**
     * Creates a new BigNumber from given decimals.
     * @param value
     * @param decimals - This is optional and defaults to 0
     * @example BigNumber.fromDecimal("1.23456789", 18);
     */
    BigNumber.fromDecimal = function (value, decimals) {
        if (decimals === void 0) { decimals = 0; }
        return new BigNumber(BigNumberParser.parseDecimal(value, decimals));
    };
    /**
     * @returns the value of this BigNumber as a BigInt
     * @example BigNumber.create(12).toBigInt();
     */
    BigNumber.prototype.toBigInt = function () {
        return this.value;
    };
    /**
     * Adds a BigNumber to current BigNumber instance.
     * @param value - the BigNumberish to add
     * @returns the result of the addition
     * @example BigNumber.create(12).add(7);
     * @example BigNumber.create(12).add("1000000000000000000");
     */
    BigNumber.prototype.add = function (value) {
        return new BigNumber(this.value + asBigInt(value));
    };
    /**
     * Subtracts a BigNumber from current BigNumber instance.
     * @param value - the BigNumberish to subtract
     * @returns the result of the subtraction
     * @example BigNumber.create(12).sub(7);
     * @example BigNumber.create("1000000000000000000").sub(20);
     */
    BigNumber.prototype.sub = function (value) {
        return new BigNumber(this.value - asBigInt(value));
    };
    /**
     * Multiplies a BigNumber with current BigNumber instance.
     * @param value - the BigNumberish to multiply
     * @returns the result of the multiplication
     * @example BigNumber.create(12).mul(7);
     * @example BigNumber.create(12).mul("1000000000000000000");
     */
    BigNumber.prototype.mul = function (value) {
        return new BigNumber(this.value * asBigInt(value));
    };
    /**
     * Divides a BigNumber with current BigNumber instance.
     * @param value - the BigNumberish to divide
     * @returns the result of the division
     * @example BigNumber.create(12).div(7);
     * @example BigNumber.create(1).div("1000000000000000000");
     */
    BigNumber.prototype.div = function (value) {
        return new BigNumber(this.value / asBigInt(value));
    };
    /**
     * Checks the equality of the current BigNumber with another BigNumber.
     * @param value - the BigNumberish to compare
     * @returns true if the BigNumbers are equal
     * @example BigNumber.create(12).equals(BigNumber.create(12)); // true
     */
    BigNumber.prototype.equals = function (value) {
        return this.value === value.toBigInt();
    };
    /**
     * Converts BigNumber instance to value in given decimals.
     * @param decimals - The decimals to convert to
     * @example BigNumber.create(12).toDecimal(18);
     */
    BigNumber.prototype.toDecimal = function (decimals) {
        return BigNumberFormatter.toDecimal(this.value, decimals);
    };
    /**
     * Converts BigNumber instance to string.
     * @example BigNumber.create(12).toString();
     */
    BigNumber.prototype.toString = function () {
        return this.value.toString();
    };
    /**
     * Converts BigNumber instance to hex string.
     * @example BigNumber.create(12).toHex();
     */
    BigNumber.prototype.toHex = function () {
        return BigNumberFormatter.toHex(this.value);
    };
    /**
     * Converts BigNumber instance to hex string.
     * @example BigNumber.create(12).toJSON();
     */
    BigNumber.prototype.toJSON = function () {
        return this.toHex();
    };
    return BigNumber;
}());
function asBigInt(value) {
    return BigNumber.create(value).toBigInt();
}

var dateInputToDate = function (value) { return (typeof value === 'string' ? new Date(value) : value); };

/**
 * Core is used in all Moralis applications
 * This class is **required** to be implemented in every app
 *
 * This class is responsible for:
 * - registering, removing and accessing modules
 * - accessing and changing the config
 */
var Core = /** @class */ (function () {
    function Core(modules, config, logger) {
        var _this = this;
        this.modules = modules;
        this.config = config;
        this.logger = logger;
        this.name = Core.moduleName;
        this._isStarted = false;
        /**
         * Register all specified modules and configurations
         * @params array of all modules (any module that is extended from BaseModule) that you want to include
         */
        this.registerModules = function (modules) {
            modules.forEach(_this.registerModule);
        };
        /**
         * Register a new module
         */
        this.registerModule = function (module) {
            if ('create' in module) {
                module = module.create(_this);
            }
            _this.modules.register(module);
            _this.logger.verbose('Module registered', { module: module.name });
        };
        this.getModule = function (name) {
            return _this.modules.get(name);
        };
        /**
         * Start all modules, this function should be called before any interaction with a module,
         * as it is responsible for initialising the modules.
         *
         * This will call `start()` on every registered module
         */
        this.start = function (providedConfig) { return __awaiter(_this, void 0, void 0, function () {
            var allModules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isStarted) {
                            throw new MoralisError({
                                message: 'Modules are started already. This method should be called only one time.',
                                code: CoreErrorCode.ALREADY_INITIALIZED,
                            });
                        }
                        this._isStarted = true;
                        allModules = this.modules.list();
                        if (providedConfig) {
                            this.config.merge(providedConfig);
                        }
                        this.logger.verbose('Starting all registered modules', {
                            moduleNames: this.modules.listNames(),
                        });
                        return [4 /*yield*/, Promise.all(allModules.map(function (module) { return module.start(); }))];
                    case 1:
                        _a.sent();
                        this.logger.verbose('Finished starting all registered modules', {
                            moduleNames: this.modules.listNames(),
                        });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    Core.create = function () {
        var modules = new Modules();
        var config = new Config();
        var logger = new LoggerController(Core.moduleName, config);
        var core = new Core(modules, config, logger);
        CoreConfigSetup.register(config);
        return core;
    };
    Object.defineProperty(Core.prototype, "isStarted", {
        get: function () {
            return this._isStarted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Core.prototype, "BigNumber", {
        get: function () {
            return BigNumber;
        },
        enumerable: false,
        configurable: true
    });
    Core.moduleName = 'core';
    Core.libVersion = LIB_VERSION;
    return Core;
}());

var CoreProvider = /** @class */ (function () {
    function CoreProvider() {
    }
    CoreProvider.getDefault = function () {
        if (!this.core) {
            throw new CoreError({
                code: CoreErrorCode.NOT_INITIALIZED,
                message: 'Default instance of Core is not set',
            });
        }
        return this.core;
    };
    CoreProvider.setDefault = function (core) {
        if (this.core) {
            throw new CoreError({
                code: CoreErrorCode.ALREADY_INITIALIZED,
                message: 'Default instance of Core is already set',
            });
        }
        this.core = core;
    };
    return CoreProvider;
}());

/**
 * The base class of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var Module = /** @class */ (function () {
    function Module(name, core, type) {
        if (type === void 0) { type = ModuleType.DEFAULT; }
        this.name = name;
        this.core = core;
        this.type = type;
        this.logger = LoggerController.create(this.name, this.core);
    }
    /**
     * Any cleanup that needs to be done for removing this module.
     * It also should remove the module via `this.core.modules.remove(this.name)`
     */
    Module.prototype.cleanUp = function () {
        this.core.modules.remove(this.name);
    };
    return Module;
}());

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `baseUrlProvider`: the provider of the base URL.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var ApiModule = /** @class */ (function (_super) {
    __extends(ApiModule, _super);
    function ApiModule(name, core, baseUrlProvider) {
        var _this = _super.call(this, name, core, ModuleType.API) || this;
        _this.baseUrlProvider = baseUrlProvider;
        return _this;
    }
    Object.defineProperty(ApiModule.prototype, "baseUrl", {
        /**
         * @description The base URL of the API.
         */
        get: function () {
            if (!this._baseUrl) {
                this._baseUrl = this.baseUrlProvider();
            }
            return this._baseUrl;
        },
        enumerable: false,
        configurable: true
    });
    return ApiModule;
}(Module));

/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/common-sol-utils package.
 */
var solNetworkNames = ['mainnet', 'devnet'];

var UnreachableError = new CoreError({
    code: CoreErrorCode.GENERIC_CORE_ERROR,
    message: "Incorrect type provided, code should not reach here",
});
/**
 * Typesafe check, to make sure that code never reaches a certain point.
 * Can be used as an exhaustive check in swtich/if-else statements
 *
 * When used properly with Typescript, this code should never reach, as it is typed as 'never'
 *
 * If the code does reach this assertion an UnreachableError is thrown
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var assertUnreachable = function (x) {
    throw UnreachableError;
};

var AxiosRetry = /** @class */ (function () {
    function AxiosRetry() {
    }
    // TODO: refactor to reduce complexity
    // eslint-disable-next-line complexity
    AxiosRetry.request = function (retryConfig, requestConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var attempt, response, e_1, axiosError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        attempt = 1;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(requestConfig)];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, response];
                    case 3:
                        e_1 = _b.sent();
                        if (attempt >= retryConfig.maxRetries) {
                            throw e_1;
                        }
                        if (!requestConfig.method || !retryConfig.allowedMethods.includes(requestConfig.method.toUpperCase())) {
                            throw e_1;
                        }
                        if (!axios.isAxiosError(e_1)) {
                            throw e_1;
                        }
                        axiosError = e_1;
                        if (!((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || !retryConfig.allowedResponseStatuses.includes(axiosError.response.status)) {
                            throw e_1;
                        }
                        if (retryConfig.beforeRetry) {
                            retryConfig.beforeRetry(attempt, axiosError);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AxiosRetry;
}());

/**
 * Verify if the error is an AxiosError that is caused by a HTTP API error.
 */
var isApiRequestError = function (error) {
    // Check if the error is an axios error
    if (!(error instanceof AxiosError)) {
        return false;
    }
    // Check if the error is a result of a 400 or 500 response
    if (error.code !== AxiosError.ERR_BAD_REQUEST && error.code !== AxiosError.ERR_BAD_RESPONSE) {
        return false;
    }
    return true;
};
/**
 * Extract the message from a ApiRequestError. Note that this is implemented based on how the Moralis APIs return Errors.
 * This can be in the form:
 * - { message: 'some message' }
 * - { message: ['some message', 'some other message'] }
 * - { }
 */
var getMessageFromApiRequestError = function (error) {
    var _a = error.response.data, message = _a.message, details = _a.details;
    var result = 'Unknown error (no error info returned from API)';
    if (Array.isArray(message)) {
        result = message.join(', ');
    }
    else if (typeof message === 'string') {
        result = message;
    }
    if (details) {
        result += " ".concat(JSON.stringify(details));
    }
    return result;
};

/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
var RequestController = /** @class */ (function () {
    function RequestController(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    RequestController.create = function (core) {
        return new RequestController(core.config, core.logger);
    };
    RequestController.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var maxRetries, retryConfig, response, e_1, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.verbose('[RequestController] request started', {
                            url: config.url,
                            method: config.method,
                            body: config.data,
                        });
                        maxRetries = this.config.get(CoreConfig.maxRetries);
                        retryConfig = {
                            maxRetries: maxRetries,
                            allowedMethods: ['GET', 'OPTIONS'],
                            allowedResponseStatuses: [408, 413, 429, 500, 502, 503, 504],
                            beforeRetry: function (attempt, error) {
                                _this.logger.verbose('[RequestController] request retry', {
                                    url: config.url,
                                    method: config.method,
                                    body: config.data,
                                    error: error,
                                    attempt: attempt,
                                });
                            },
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AxiosRetry.request(retryConfig, __assign(__assign({}, config), { timeout: 20000, maxContentLength: Infinity, maxBodyLength: Infinity }))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        e_1 = _a.sent();
                        error = this.makeError(e_1);
                        this.logger.verbose('[RequestController] request error', {
                            url: config.url,
                            method: config.method,
                            body: config.data,
                            cause: error.cause,
                            name: error.name,
                            details: error.details,
                        });
                        throw error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestController.prototype.makeError = function (error) {
        if (isApiRequestError(error)) {
            var _a = error.response, status_1 = _a.status, statusText = _a.statusText;
            var apiMessage = getMessageFromApiRequestError(error);
            return new CoreError({
                code: CoreErrorCode.REQUEST_ERROR,
                message: "Request failed, ".concat(statusText, "(").concat(status_1, "): ").concat(apiMessage),
                cause: error,
                details: {
                    status: status_1,
                    response: error.response,
                },
            });
        }
        var err = error instanceof Error ? error : new Error("".concat(error));
        return new CoreError({
            code: CoreErrorCode.REQUEST_ERROR,
            message: "Request failed: ".concat(err.message),
            cause: err,
        });
    };
    RequestController.prototype.post = function (url, searchParams, body, options, abortSignal) {
        return this.request({
            url: url,
            params: searchParams,
            method: 'POST',
            data: body,
            headers: options === null || options === void 0 ? void 0 : options.headers,
            signal: abortSignal,
        });
    };
    RequestController.prototype.put = function (url, searchParams, body, options, abortSignal) {
        return this.request({
            url: url,
            params: searchParams,
            method: 'PUT',
            data: body,
            headers: options === null || options === void 0 ? void 0 : options.headers,
            signal: abortSignal,
        });
    };
    RequestController.prototype.get = function (url, searchParams, options, abortSignal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        url: url,
                        params: searchParams,
                        method: 'GET',
                        headers: options === null || options === void 0 ? void 0 : options.headers,
                        signal: abortSignal,
                    })];
            });
        });
    };
    RequestController.prototype.delete = function (url, searchParams, body, options, abortSignal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        url: url,
                        params: searchParams,
                        method: 'DELETE',
                        data: body,
                        headers: options === null || options === void 0 ? void 0 : options.headers,
                        signal: abortSignal,
                    })];
            });
        });
    };
    return RequestController;
}());

var OperationRequestValidator = /** @class */ (function () {
    function OperationRequestValidator(operation) {
        this.allParamNames = __spreadArray(__spreadArray(__spreadArray([], (operation.urlPathParamNames || []), true), (operation.urlSearchParamNames || []), true), (operation.bodyParamNames || []), true);
    }
    OperationRequestValidator.prototype.validate = function (request) {
        var requestParamNames = Object.keys(request);
        for (var _i = 0, requestParamNames_1 = requestParamNames; _i < requestParamNames_1.length; _i++) {
            var paramName = requestParamNames_1[_i];
            if (!this.allParamNames.includes(paramName)) {
                var allParamsNames = this.allParamNames.join(', ');
                throw new MoralisError({
                    code: CoreErrorCode.INVALID_ARGUMENT,
                    message: "Request contains unknown parameter: ".concat(paramName, ". This operation supports the following parameters: ").concat(allParamsNames),
                });
            }
        }
    };
    return OperationRequestValidator;
}());

var OperationType;
(function (OperationType) {
    OperationType["NON_NULLABLE"] = "nonNullable";
    OperationType["NULLABLE"] = "nullable";
    OperationType["PAGINATED"] = "paginated";
})(OperationType || (OperationType = {}));
function determineOperationType(operation) {
    if (operation.firstPageIndex === 0 || operation.firstPageIndex === 1) {
        return OperationType.PAGINATED;
    }
    if (operation.isNullable) {
        return OperationType.NULLABLE;
    }
    return OperationType.NON_NULLABLE;
}

var NextPaginatedRequestResolver = /** @class */ (function () {
    function NextPaginatedRequestResolver() {
    }
    NextPaginatedRequestResolver.resolve = function (firstPageIndex, request, pagination) {
        if (pagination.cursor) {
            return __assign(__assign({}, request), { cursor: pagination.cursor });
        }
        if (typeof pagination.total === 'number') {
            var currentPage = firstPageIndex === 1 ? pagination.page : pagination.page + 1;
            var hasNextPage = pagination.total > pagination.pageSize * currentPage;
            if (hasNextPage) {
                var offset = (pagination.page + 1) * (request.limit || 500);
                return __assign(__assign({}, request), { offset: offset });
            }
        }
        return null;
    };
    return NextPaginatedRequestResolver;
}());

var PaginationReader = /** @class */ (function () {
    function PaginationReader() {
    }
    PaginationReader.read = function (jsonResponse) {
        var _a, _b;
        return {
            page: (_a = jsonResponse.page) !== null && _a !== void 0 ? _a : 0,
            pageSize: (_b = jsonResponse.page_size) !== null && _b !== void 0 ? _b : 0,
            total: jsonResponse.total,
            cursor: jsonResponse.cursor,
        };
    };
    return PaginationReader;
}());

var ResponseAdapter = /** @class */ (function () {
    function ResponseAdapter(jsonResponse, getResponse) {
        this.jsonResponse = jsonResponse;
        this.getResponse = getResponse;
    }
    Object.defineProperty(ResponseAdapter.prototype, "result", {
        get: function () {
            return this.getResponse();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResponseAdapter.prototype, "raw", {
        get: function () {
            return this.jsonResponse;
        },
        enumerable: false,
        configurable: true
    });
    ResponseAdapter.prototype.toJSON = function () {
        return this.jsonResponse;
    };
    return ResponseAdapter;
}());

var PaginatedResponseAdapter = /** @class */ (function () {
    function PaginatedResponseAdapter(pagination, jsonResponse, getResult, nextHandler) {
        var _this = this;
        this.pagination = pagination;
        this.jsonResponse = jsonResponse;
        this.getResult = getResult;
        this.nextHandler = nextHandler;
        this.hasNext = function () { return !!_this.nextHandler; };
        this.next = function () {
            if (!_this.nextHandler) {
                throw new MoralisError({
                    code: CoreErrorCode.NO_DATA_FOUND,
                    message: 'Page limit exceeded! Before call this method check an existence of the next page by .hasNext() method.',
                });
            }
            return _this.nextHandler();
        };
    }
    Object.defineProperty(PaginatedResponseAdapter.prototype, "result", {
        get: function () {
            return this.getResult();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaginatedResponseAdapter.prototype, "raw", {
        get: function () {
            return this.jsonResponse;
        },
        enumerable: false,
        configurable: true
    });
    PaginatedResponseAdapter.prototype.toJSON = function () {
        return this.jsonResponse;
    };
    return PaginatedResponseAdapter;
}());

var toCamel = function (value) {
    return value.replace(/([-_][a-z])/gi, function ($1) {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};
var isObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};
var toCamelCase = function (data) {
    if (isObject(data)) {
        var n_1 = {};
        Object.keys(data).forEach(function (k) {
            // @ts-ignore TODO: fix typing
            n_1[toCamel(k)] = toCamelCase(data[k]);
        });
        return n_1;
    }
    if (Array.isArray(data)) {
        // @ts-ignore TODO: difficult to type with recursive arrays
        return data.map(function (i) {
            return toCamelCase(i);
        });
    }
    return data;
};

function maybe(value, transform) {
    if (value == null) {
        return undefined;
    }
    if (transform) {
        return transform(value);
    }
    return value;
}

export { ApiErrorCode, ApiModule, AuthErrorCode, AxiosRetry, BigNumber, Config, Core, CoreConfig, CoreError, CoreErrorCode, CoreProvider, LoggerController, Module, ModuleType, Modules, MoralisApiError, MoralisAuthError, MoralisData, MoralisDataObject, MoralisError, MoralisStreamError, NextPaginatedRequestResolver, OperationRequestValidator, OperationType, PaginatedResponseAdapter, PaginationReader, RequestController, ResponseAdapter, StreamErrorCode, UnreachableError, assertUnreachable, dateInputToDate, determineOperationType, isApiModule, isMoralisError, maybe, solNetworkNames, toCamel, toCamelCase };
