import { CoreError, CoreErrorCode, BigNumber, CoreProvider, Module, MoralisApiError, ApiErrorCode } from '@moralisweb3/common-core';
import BN from 'bn.js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

/**
 * Copied (and remove obsolete functionalities) from https://github.com/solana-labs/solana-web3.js/blob/master/src/publickey.ts because
 * - We only care about address validation and conversion
 * - Resolving this dependency in UMD gives dependency errors
 */
/**
 * Size of public key in bytes
 */
var PUBLIC_KEY_LENGTH = 32;
function isPublicKeyData(value) {
    return value._bn !== undefined;
}
var PublicKey = /** @class */ (function () {
    /**
     * Create a new PublicKey object
     * @param value ed25519 public key as buffer or base-58 encoded string
     */
    function PublicKey(value) {
        if (isPublicKeyData(value)) {
            this._bn = value._bn;
        }
        else {
            if (typeof value === 'string') {
                // assume base 58 encoding by default
                var decoded = bs58.decode(value);
                if (decoded.length !== PUBLIC_KEY_LENGTH) {
                    throw new Error("Invalid public key input");
                }
                this._bn = new BN(decoded);
            }
            else {
                this._bn = new BN(value);
            }
            if (this._bn.byteLength() > PUBLIC_KEY_LENGTH) {
                throw new Error("Invalid public key input");
            }
        }
    }
    /**
     * Return the base-58 representation of the public key
     */
    PublicKey.prototype.toBase58 = function () {
        return bs58.encode(this.toBytes());
    };
    /**
     * Return the byte array representation of the public key in big endian
     */
    PublicKey.prototype.toBytes = function () {
        var buf = this.toBuffer();
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    };
    /**
     * Return the Buffer representation of the public key in big endian
     */
    PublicKey.prototype.toBuffer = function () {
        var b = this._bn.toArrayLike(Buffer);
        if (b.length === PUBLIC_KEY_LENGTH) {
            return b;
        }
        var zeroPad = Buffer.alloc(32);
        b.copy(zeroPad, 32 - b.length);
        return zeroPad;
    };
    Object.defineProperty(PublicKey.prototype, Symbol.toStringTag, {
        get: function () {
            return "PublicKey(".concat(this.toString(), ")");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the base-58 representation of the public key
     */
    PublicKey.prototype.toString = function () {
        return this.toBase58();
    };
    return PublicKey;
}());

/**
 * A representation of an address on the Solana network.
 *
 * Use this class any time you work with an address.
 *
 * @category DataType
 */
var SolAddress = /** @class */ (function () {
    function SolAddress(address) {
        this.address = address;
    }
    /**
     * Create a new instance of SolAddress from any valid address input.
     *
     * @example `const address = SolAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")`
     * @throws an error when a passed address is invalid.
     */
    SolAddress.create = function (address) {
        return address instanceof SolAddress ? address : new SolAddress(SolAddress.parse(address));
    };
    SolAddress.fromJSON = function (address) {
        return SolAddress.create(address);
    };
    SolAddress.parse = function (address) {
        try {
            var publicKey = new PublicKey(address);
            return publicKey.toBase58();
        }
        catch (e) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid Solana address provided: ".concat(address),
                cause: e,
            });
        }
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    SolAddress.prototype.format = function () {
        return this.address;
    };
    /**
     * Checks the equality of the current address with another Solana address.
     * @example `address.equals("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM")`
     * @example `address.equals(SolAddress.create("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"))`
     */
    SolAddress.prototype.equals = function (address) {
        return this.address === SolAddress.create(address).address;
    };
    /**
     * @returns a string representing the address.
     * @example address.toString(); // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
     */
    SolAddress.prototype.toString = function () {
        return this.address;
    };
    /**
     * @returns a string representing the address.
     * @example address.toJSON(); // "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
     */
    SolAddress.prototype.toJSON = function () {
        return this.address;
    };
    return SolAddress;
}());

var solNetworkNames = ['mainnet', 'devnet'];
/**
 * A representation of a Solana network.
 *
 * @category DataType
 */
var SolNetwork = /** @class */ (function () {
    function SolNetwork(network) {
        this.network = network;
    }
    Object.defineProperty(SolNetwork, "MAINNET", {
        /**
         * Returns MAINNET network
         *
         * @example SolNetwork.MAINNET
         */
        get: function () {
            return SolNetwork.create('mainnet');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolNetwork, "DEVNET", {
        /**
         * Returns DEVNET network
         *
         * @example SolNetwork.MAINNET
         */
        get: function () {
            return SolNetwork.create('devnet');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new instance of SolNetwork from any valid network input.
     *
     * @example `const network = SolNetwork.create("mainnet")`
     * @throws an error when a passed network is invalid.
     */
    SolNetwork.create = function (network) {
        return network instanceof SolNetwork ? network : new SolNetwork(SolNetwork.parse(network));
    };
    SolNetwork.fromJSON = function (network) {
        return SolNetwork.create(network);
    };
    SolNetwork.parse = function (network) {
        if (typeof network === 'string') {
            if (!solNetworkNames.includes(network)) {
                throw new CoreError({
                    code: CoreErrorCode.INVALID_ARGUMENT,
                    message: "Solana network is not supported: ".concat(network),
                });
            }
        }
        return network;
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    SolNetwork.prototype.format = function () {
        return this.network;
    };
    /**
     * Checks the equality of the current network with another Solana network.
     * @example `network.equals("mainnet")`
     * @example `network.equals(SolNetwork.create("mainnet"))`
     */
    SolNetwork.prototype.equals = function (network) {
        return this.network === SolNetwork.create(network).network;
    };
    /**
     * @returns a string representing the network.
     * @example network.toJSON(); // "mainnet"
     */
    SolNetwork.prototype.toJSON = function () {
        return this.network;
    };
    /**
     * @returns a string representing the network.
     * @example network.toString(); // "mainnet"
     */
    SolNetwork.prototype.toString = function () {
        return this.network;
    };
    return SolNetwork;
}());

var unitToDecimals = {
    solana: 9,
    lamports: 0,
};
/**
 * The SolNative class is a MoralisData that references to the value of Solana native currency SOL
 *
 * @category DataType
 */
var SolNative = /** @class */ (function () {
    function SolNative(rawValue) {
        this.rawValue = rawValue;
    }
    /**
     * Create a new instance of SolNative from any valid {@link SolNativeish} value.
     * @param value - the value to create the SolNative from
     * @param unit - the unit of the value (optional), defaults to `solana`
     * @returns a new instance of SolNative
     * @example
     * ```ts
     * const native = SolNative.create(2, 'lamports');
     * const native = SolNative.create(2);
     *```
     */
    SolNative.create = function (value, unit) {
        if (value instanceof SolNative) {
            return value;
        }
        return new SolNative(SolNative.parse(value, unit));
    };
    SolNative.fromJSON = function (json) {
        return SolNative.create(json, 'lamports');
    };
    SolNative.parse = function (value, unit) {
        if (unit === void 0) { unit = 'solana'; }
        var decimal;
        if (typeof unit === 'number') {
            decimal = unit;
        }
        else if (unitToDecimals[unit] !== undefined) {
            decimal = unitToDecimals[unit];
        }
        else {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Not supported Solana unit: ".concat(unit),
            });
        }
        return BigNumber.fromDecimal(value.toString(), decimal);
    };
    /**
     * Compares two SolNativeish values.
     * @param valueA - the first value to compare
     * @param valueB - the second value to compare
     * @returns true if the values are equal
     * @example
     * ```ts
     * SolNative.equals(SolNative.create(1), SolNative.create(1)); // true
     * ```
     */
    SolNative.equals = function (valueA, valueB) {
        var solNativeA = SolNative.create(valueA);
        var solNativeB = SolNative.create(valueB);
        return solNativeA.lamports === solNativeB.lamports;
    };
    /**
     * Compares SolNative with current instance.
     * @param value - the value to compare with
     * @returns true if the values are equal
     * @example
     * ```ts
     * const native = SolNative.create(2, 'lamports');
     * native.equals(SolNative.create(1)); // false
     * ```
     */
    SolNative.prototype.equals = function (value) {
        return SolNative.equals(this, value);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    SolNative.prototype.format = function () {
        // TODO: add `format` argument
        return this.lamports;
    };
    /**
     * Converts the SolNative to a string.
     * @returns the value of the SolNative as a string
     * @example `native.toJSON()`
     */
    SolNative.prototype.toJSON = function () {
        return this.lamports;
    };
    /**
     * Converts the SolNative to a string.
     * @returns the value of the SolNative as a string
     * @example `native.toString()`
     */
    SolNative.prototype.toString = function () {
        return this.lamports;
    };
    Object.defineProperty(SolNative.prototype, "value", {
        /**
         * @returns the value of the SolNative as a BigNumber
         * @example `native.value`
         */
        get: function () {
            return this.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolNative.prototype, "solana", {
        /**
         * Converts the SolNative to a solana unit.
         * @returns the value of the SolNative as a solana string
         * @example `native.solana`
         */
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['solana']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolNative.prototype, "lamports", {
        /**
         * Converts the SolNative to a string.
         * @returns the value of the SolNative as a string
         * @example `native.lamports`
         */
        get: function () {
            return this.rawValue.toString();
        },
        enumerable: false,
        configurable: true
    });
    return SolNative;
}());

// $ref: #/components/schemas/SPLNativePrice
// type: SPLNativePrice
// properties:
// - value ($ref: #/components/schemas/SPLNativePrice/properties/value)
// - decimals ($ref: #/components/schemas/SPLNativePrice/properties/decimals)
// - name ($ref: #/components/schemas/SPLNativePrice/properties/name)
// - symbol ($ref: #/components/schemas/SPLNativePrice/properties/symbol)
var SolSPLNativePrice = /** @class */ (function () {
    function SolSPLNativePrice(input) {
        this.value = input.value;
        this.decimals = input.decimals;
        this.name = input.name;
        this.symbol = input.symbol;
    }
    SolSPLNativePrice.create = function (input) {
        if (input instanceof SolSPLNativePrice) {
            return input;
        }
        return new SolSPLNativePrice(input);
    };
    SolSPLNativePrice.fromJSON = function (json) {
        var input = {
            value: json.value,
            decimals: json.decimals,
            name: json.name,
            symbol: json.symbol,
        };
        return SolSPLNativePrice.create(input);
    };
    SolSPLNativePrice.prototype.toJSON = function () {
        return {
            value: this.value,
            decimals: this.decimals,
            name: this.name,
            symbol: this.symbol,
        };
    };
    return SolSPLNativePrice;
}());

var SolSPLTokenPrice = /** @class */ (function () {
    function SolSPLTokenPrice(input) {
        this.nativePrice = input.nativePrice ? SolSPLNativePrice.create(input.nativePrice) : undefined;
        this.usdPrice = input.usdPrice;
        this.exchangeAddress = SolAddress.create(input.exchangeAddress);
        this.exchangeName = input.exchangeName;
    }
    SolSPLTokenPrice.create = function (input) {
        if (input instanceof SolSPLTokenPrice) {
            return input;
        }
        return new SolSPLTokenPrice(input);
    };
    SolSPLTokenPrice.fromJSON = function (json) {
        var input = {
            nativePrice: json.nativePrice ? SolSPLNativePrice.fromJSON(json.nativePrice) : undefined,
            usdPrice: json.usdPrice,
            exchangeAddress: SolAddress.fromJSON(json.exchangeAddress),
            exchangeName: json.exchangeName,
        };
        return SolSPLTokenPrice.create(input);
    };
    SolSPLTokenPrice.prototype.toJSON = function () {
        return {
            nativePrice: this.nativePrice ? this.nativePrice.toJSON() : undefined,
            usdPrice: this.usdPrice,
            exchangeAddress: this.exchangeAddress.toJSON(),
            exchangeName: this.exchangeName,
        };
    };
    return SolSPLTokenPrice;
}());

var GetTokenPriceOperation = {
    operationId: "getTokenPrice",
    groupName: "token",
    httpMethod: "get",
    routePattern: "/token/{network}/{address}/price",
    parameterNames: ["network", "address"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return SolSPLTokenPrice.fromJSON(json);
    },
    serializeRequest: function (request) {
        var network = SolNetwork.create(request.network);
        var address = SolAddress.create(request.address);
        return {
            network: network.toJSON(),
            address: address.toJSON(),
        };
    },
};

var operations = [
    GetTokenPriceOperation,
];

// $ref: #/paths/~1token~1{network}~1{address}~1price/get/parameters/0/schema
// typeName: getTokenPrice_network_Enum
var SolGetTokenPriceNetworkEnum = /** @class */ (function () {
    function SolGetTokenPriceNetworkEnum() {
    }
    SolGetTokenPriceNetworkEnum.create = function (input) {
        return input;
    };
    SolGetTokenPriceNetworkEnum.fromJSON = function (json) {
        return json;
    };
    return SolGetTokenPriceNetworkEnum;
}());

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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var CommonSolUtilsConfig = {
    defaultSolNetwork: {
        name: 'defaultSolNetwork',
        defaultValue: 'mainnet',
    },
};

var CommonSolUtilsConfigSetup = /** @class */ (function () {
    function CommonSolUtilsConfigSetup() {
    }
    CommonSolUtilsConfigSetup.register = function (config) {
        config.registerKey(CommonSolUtilsConfig.defaultSolNetwork);
    };
    return CommonSolUtilsConfigSetup;
}());

var CommonSolUtils = /** @class */ (function (_super) {
    __extends(CommonSolUtils, _super);
    function CommonSolUtils(core) {
        return _super.call(this, CommonSolUtils.moduleName, core) || this;
    }
    CommonSolUtils.create = function (core) {
        return new CommonSolUtils(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    CommonSolUtils.prototype.setup = function () {
        CommonSolUtilsConfigSetup.register(this.core.config);
    };
    CommonSolUtils.prototype.start = function () {
        // Nothing
    };
    Object.defineProperty(CommonSolUtils.prototype, "SolAddress", {
        get: function () {
            return SolAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonSolUtils.prototype, "SolNative", {
        get: function () {
            return SolNative;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonSolUtils.prototype, "SolNetwork", {
        get: function () {
            return SolNetwork;
        },
        enumerable: false,
        configurable: true
    });
    CommonSolUtils.moduleName = 'solUtils';
    return CommonSolUtils;
}(Module));

var SolNetworkResolver = /** @class */ (function () {
    function SolNetworkResolver() {
    }
    SolNetworkResolver.resolve = function (network, core) {
        if (!network) {
            network = core.config.get(CommonSolUtilsConfig.defaultSolNetwork);
        }
        return SolNetwork.create(network).network;
    };
    return SolNetworkResolver;
}());

/** Gets native balance owned by the given network and address */
var getBalanceOperation = {
    method: 'GET',
    name: 'getBalance',
    id: 'balance',
    groupName: 'account',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/account/{network}/{address}/balance',
    getRequestUrlParams: getRequestUrlParams$5,
    deserializeResponse: deserializeResponse$5,
    serializeRequest: serializeRequest$5,
    deserializeRequest: deserializeRequest$5,
};
// Methods
function getRequestUrlParams$5(request, core) {
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse$5(jsonResponse) {
    return SolNative.create(jsonResponse.lamports);
}
function serializeRequest$5(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest$5(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

/** Gets NFTs owned by the given network and address */
var getNFTsOperation = {
    method: 'GET',
    name: 'getNFTs',
    id: 'getNFTs',
    groupName: 'account',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/account/{network}/{address}/nft',
    getRequestUrlParams: getRequestUrlParams$4,
    deserializeResponse: deserializeResponse$4,
    serializeRequest: serializeRequest$4,
    deserializeRequest: deserializeRequest$4,
};
// Methods
function getRequestUrlParams$4(request, core) {
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse$4(jsonResponse) {
    return jsonResponse.map(function (item) {
        return {
            associatedTokenAddress: SolAddress.create(item.associatedTokenAddress),
            mint: SolAddress.create(item.mint),
            name: item.name,
            symbol: item.symbol,
        };
    });
}
function serializeRequest$4(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest$4(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

/** Gets the portfolio of the given network and address */
var getPortfolioOperation = {
    method: 'GET',
    name: 'getPortfolio',
    id: 'getPortfolio',
    groupName: 'account',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/account/{network}/{address}/portfolio',
    getRequestUrlParams: getRequestUrlParams$3,
    deserializeResponse: deserializeResponse$3,
    serializeRequest: serializeRequest$3,
    deserializeRequest: deserializeRequest$3,
};
// Methods
function getRequestUrlParams$3(request, core) {
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse$3(jsonResponse) {
    return {
        nativeBalance: SolNative.create(jsonResponse.nativeBalance.lamports, 'lamports'),
        nfts: jsonResponse.nfts.map(function (nft) {
            return {
                associatedTokenAddress: SolAddress.create(nft.associatedTokenAddress),
                mint: SolAddress.create(nft.mint),
                name: nft.name,
                symbol: nft.symbol,
            };
        }),
        tokens: jsonResponse.tokens.map(function (token) {
            return {
                associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
                mint: SolAddress.create(token.mint),
                amount: SolNative.create(token.amountRaw, 'lamports'),
                name: token.name,
                symbol: token.symbol,
            };
        }),
    };
}
function serializeRequest$3(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest$3(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

/** Gets token balances owned by the given network and address */
var getSPLOperation = {
    method: 'GET',
    name: 'getSPL',
    id: 'getSPL',
    groupName: 'account',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/account/{network}/{address}/tokens',
    getRequestUrlParams: getRequestUrlParams$2,
    deserializeResponse: deserializeResponse$2,
    serializeRequest: serializeRequest$2,
    deserializeRequest: deserializeRequest$2,
};
// Methods
function getRequestUrlParams$2(request, core) {
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse$2(jsonResponse) {
    return jsonResponse.map(function (token) {
        return {
            associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
            mint: SolAddress.create(token.mint),
            amount: SolNative.create(token.amountRaw, 'lamports'),
            name: token.name,
            symbol: token.symbol,
        };
    });
}
function serializeRequest$2(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest$2(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

/** Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given network and contract */
var getNFTMetadataOperation = {
    method: 'GET',
    name: 'getNFTMetadata',
    id: 'getNFTMetadata',
    groupName: 'nft',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/nft/{network}/{address}/metadata',
    getRequestUrlParams: getRequestUrlParams$1,
    deserializeResponse: deserializeResponse$1,
    serializeRequest: serializeRequest$1,
    deserializeRequest: deserializeRequest$1,
};
// Methods
function getRequestUrlParams$1(request, core) {
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse$1(jsonResponse) {
    return {
        mint: SolAddress.create(jsonResponse.mint),
        standard: jsonResponse.standard,
        name: jsonResponse.name,
        symbol: jsonResponse.symbol,
        metaplex: {
            metadataUri: jsonResponse.metaplex.metadataUri,
            updateAuthority: SolAddress.create(jsonResponse.metaplex.updateAuthority),
            sellerFeeBasisPoints: jsonResponse.metaplex.sellerFeeBasisPoints,
            primarySaleHappened: jsonResponse.metaplex.primarySaleHappened,
            isMutable: jsonResponse.metaplex.isMutable,
            masterEdition: jsonResponse.metaplex.masterEdition,
        },
    };
}
function serializeRequest$1(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest$1(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

/** Gets the token price (usd and native) for a given contract address and network */
var getTokenPriceOperation = {
    method: 'GET',
    name: 'getTokenPrice',
    id: 'getTokenPrice',
    groupName: 'token',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/token/{network}/{address}/price',
    getRequestUrlParams: getRequestUrlParams,
    deserializeResponse: deserializeResponse,
    serializeRequest: serializeRequest,
    deserializeRequest: deserializeRequest,
};
// Methods
function getRequestUrlParams(request, core) {
    var network = SolNetworkResolver.resolve(request.network, core);
    if (network !== 'mainnet') {
        throw new MoralisApiError({
            message: "Incorrct value for 'network', getTokenPrice is only available on mainnet",
            code: ApiErrorCode.INVALID_PARAMS,
        });
    }
    return {
        network: SolNetworkResolver.resolve(request.network, core),
        address: SolAddress.create(request.address).address,
    };
}
function deserializeResponse(jsonResponse) {
    return SolSPLTokenPrice.fromJSON(jsonResponse);
}
function serializeRequest(request, core) {
    return {
        address: SolAddress.create(request.address).address,
        network: SolNetworkResolver.resolve(request.network, core),
    };
}
function deserializeRequest(jsonRequest) {
    return {
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
    };
}

var operationsV2 = [
    getBalanceOperation,
    getNFTsOperation,
    getPortfolioOperation,
    getSPLOperation,
    getNFTMetadataOperation,
];
/**
 * @deprecated This list includes upgraded operations to the hybrid approach in the old format.
 */
var operationsV2All = __spreadArray(__spreadArray([], operationsV2, true), [getTokenPriceOperation], false);

export { CommonSolUtils, CommonSolUtilsConfig, CommonSolUtilsConfigSetup, GetTokenPriceOperation, SolAddress, SolGetTokenPriceNetworkEnum, SolNative, SolNetwork, SolNetworkResolver, SolSPLNativePrice, SolSPLTokenPrice, getBalanceOperation, getNFTMetadataOperation, getNFTsOperation, getPortfolioOperation, getSPLOperation, getTokenPriceOperation, operations, operationsV2, operationsV2All };
