import { CoreError, CoreErrorCode, BigNumber, CoreProvider, Module } from '@moralisweb3/common-core';

var CommonAptosUtilsConfig = {
    defaultAptosNetwork: {
        name: 'defaultAptosNetwork',
        defaultValue: 'mainnet',
    },
};

var CommonAptosUtilsConfigSetup = /** @class */ (function () {
    function CommonAptosUtilsConfigSetup() {
    }
    CommonAptosUtilsConfigSetup.register = function (config) {
        config.registerKey(CommonAptosUtilsConfig.defaultAptosNetwork);
    };
    return CommonAptosUtilsConfigSetup;
}());

/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// There is almost no big endian hardware, but js typed arrays uses platform specific endianness.
// So, just to be sure not to corrupt anything.
if (!isLE)
    throw new Error('Non little-endian hardware is not supported');
const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xde, 0xad, 0xbe, 0xef]))
 */
function bytesToHex(uint8a) {
    // pre-caching improves the speed 6x
    if (!(uint8a instanceof Uint8Array))
        throw new Error('Uint8Array expected');
    let hex = '';
    for (let i = 0; i < uint8a.length; i++) {
        hex += hexes[uint8a[i]];
    }
    return hex;
}
/**
 * @example hexToBytes('deadbeef')
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string') {
        throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
    }
    if (hex.length % 2)
        throw new Error('hexToBytes: received invalid unpadded hex');
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
            throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}

/**
 * Copied (and remove obsolete functionalities) from https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/hex_string.ts because
 * - We only care about address validation and conversion, this is a dependency for AccountAddress
 * - Resolving this dependency in UMD gives dependency errors
 */
/**
 * A util class for working with hex strings.
 * Hex strings are strings that are prefixed with `0x`
 */
var HexString = /** @class */ (function () {
    /**
     * Creates new HexString instance from regular string. If specified string already starts with "0x" prefix,
     * it will not add another one
     * @param hexString String to convert
     * @example
     * ```
     *  const string = "string";
     *  new HexString(string); // "0xstring"
     * ```
     */
    function HexString(hexString) {
        if (hexString.startsWith('0x')) {
            this.hexString = hexString;
        }
        else {
            this.hexString = "0x".concat(hexString);
        }
    }
    /**
     * Creates new hex string from Buffer
     * @param buffer A buffer to convert
     * @returns New HexString
     */
    HexString.fromBuffer = function (buffer) {
        return HexString.fromUint8Array(buffer);
    };
    /**
     * Creates new hex string from Uint8Array
     * @param arr Uint8Array to convert
     * @returns New HexString
     */
    HexString.fromUint8Array = function (arr) {
        return new HexString(bytesToHex(arr));
    };
    /**
     * Ensures `hexString` is instance of `HexString` class
     * @param hexString String to check
     * @returns New HexString if `hexString` is regular string or `hexString` if it is HexString instance
     * @example
     * ```
     *  const regularString = "string";
     *  const hexString = new HexString("string"); // "0xstring"
     *  HexString.ensure(regularString); // "0xstring"
     *  HexString.ensure(hexString); // "0xstring"
     * ```
     */
    HexString.ensure = function (hexString) {
        if (typeof hexString === 'string') {
            return new HexString(hexString);
        }
        return hexString;
    };
    /**
     * Getter for inner hexString
     * @returns Inner hex string
     */
    HexString.prototype.hex = function () {
        return this.hexString;
    };
    /**
     * Getter for inner hexString without prefix
     * @returns Inner hex string without prefix
     * @example
     * ```
     *  const hexString = new HexString("string"); // "0xstring"
     *  hexString.noPrefix(); // "string"
     * ```
     */
    HexString.prototype.noPrefix = function () {
        return this.hexString.slice(2);
    };
    /**
     * Overrides default `toString` method
     * @returns Inner hex string
     */
    HexString.prototype.toString = function () {
        return this.hex();
    };
    /**
     * Trimmes extra zeroes in the begining of a string
     * @returns Inner hexString without leading zeroes
     * @example
     * ```
     *  new HexString("0x000000string").toShortString(); // result = "0xstring"
     * ```
     */
    HexString.prototype.toShortString = function () {
        var trimmed = this.hexString.replace(/^0x0*/, '');
        return "0x".concat(trimmed);
    };
    /**
     * Converts hex string to a Uint8Array
     * @returns Uint8Array from inner hexString without prefix
     */
    HexString.prototype.toUint8Array = function () {
        return Uint8Array.from(hexToBytes(this.noPrefix()));
    };
    return HexString;
}());

/**
 * Copied (and remove obsolete functionalities) from https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/aptos_types/account_address.ts because
 * - We only care about address validation and conversion
 * - Resolving this dependency in UMD gives dependency errors
 */
var AccountAddress = /** @class */ (function () {
    function AccountAddress(address) {
        if (address.length !== AccountAddress.LENGTH) {
            throw new Error('Expected address of length 32');
        }
        this.address = address;
    }
    /**
     * Creates AccountAddress from a hex string.
     * @param addr Hex string can be with a prefix or without a prefix,
     *   e.g. '0x1aa' or '1aa'. Hex string will be left padded with 0s if too short.
     */
    AccountAddress.fromHex = function (addr) {
        var address = HexString.ensure(addr);
        // If an address hex has odd number of digits, padd the hex string with 0
        // e.g. '1aa' would become '01aa'.
        if (address.noPrefix().length % 2 !== 0) {
            address = new HexString("0".concat(address.noPrefix()));
        }
        var addressBytes = address.toUint8Array();
        if (addressBytes.length > AccountAddress.LENGTH) {
            // eslint-disable-next-line quotes
            throw new Error("Hex string is too long. Address's length is 32 bytes.");
        }
        else if (addressBytes.length === AccountAddress.LENGTH) {
            return new AccountAddress(addressBytes);
        }
        var res = new Uint8Array(AccountAddress.LENGTH);
        res.set(addressBytes, AccountAddress.LENGTH - addressBytes.length);
        return new AccountAddress(res);
    };
    /**
     * Checks if the string is a valid AccountAddress
     * @param addr Hex string can be with a prefix or without a prefix,
     *   e.g. '0x1aa' or '1aa'. Hex string will be left padded with 0s if too short.
     */
    AccountAddress.isValid = function (addr) {
        // At least one zero is required
        if (addr === '') {
            return false;
        }
        var address = HexString.ensure(addr);
        // If an address hex has odd number of digits, padd the hex string with 0
        // e.g. '1aa' would become '01aa'.
        if (address.noPrefix().length % 2 !== 0) {
            address = new HexString("0".concat(address.noPrefix()));
        }
        var addressBytes = address.toUint8Array();
        return addressBytes.length <= AccountAddress.LENGTH;
    };
    AccountAddress.LENGTH = 32;
    AccountAddress.CORE_CODE_ADDRESS = AccountAddress.fromHex('0x1');
    return AccountAddress;
}());

/**
 * A representation of an address on the Aptos network.
 *
 * Use this class any time you work with an address.
 *
 * @category DataType
 */
var AptosAddress = /** @class */ (function () {
    function AptosAddress(address) {
        this.address = address;
    }
    /**
     * Create a new instance of AptosAddress from any valid address input.
     *
     * @example `const address = AptosAddress.create("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
     * @throws an error when a passed address is invalid.
     */
    AptosAddress.create = function (address) {
        if (address instanceof AptosAddress) {
            return address;
        }
        return new AptosAddress(AptosAddress.parse(address));
    };
    AptosAddress.fromJSON = function (json) {
        return AptosAddress.create(json);
    };
    AptosAddress.parse = function (address) {
        try {
            if (!AccountAddress.isValid(address)) {
                throw new Error('Address is invalid');
            }
        }
        catch (e) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid address provided: ".concat(address),
                cause: e,
            });
        }
        if (address.startsWith('0x')) {
            address = address.substring(2);
        }
        var addr = address.padStart(64, '0');
        return "0x".concat(addr);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    AptosAddress.prototype.format = function () {
        return this.address;
    };
    /**
     * Check the equality between two Aptos addresses
     * @example `AptosAddress.equals("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90", "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
     */
    AptosAddress.equals = function (addressA, addressB) {
        return AptosAddress.create(addressA).equals(addressB);
    };
    /**
     * Checks the equality of the current address with another Aptos address.
     * @example `address.equals("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90")`
     * @example `address.equals(AptosAddress.create("0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"))`
     */
    AptosAddress.prototype.equals = function (address) {
        return this.address === AptosAddress.create(address).address;
    };
    /**
     * @returns a string representing the address.
     * @example address.toString(); // "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
     */
    AptosAddress.prototype.toString = function () {
        return this.address;
    };
    /**
     * @returns a string representing the address.
     * @example address.toJSON(); // "0x54ad3d30af77b60d939ae356e6606de9a4da67583f02b962d2d3f2e481484e90"
     */
    AptosAddress.prototype.toJSON = function () {
        return this.address;
    };
    Object.defineProperty(AptosAddress.prototype, "short", {
        /**
         * @returns a string representing the address, the leading zeros are removed from the address.
         * @example address.short; // "0x1"
         */
        get: function () {
            var address = this.address.substring(2).replace(/^0+/, '');
            return "0x".concat(address);
        },
        enumerable: false,
        configurable: true
    });
    return AptosAddress;
}());

var aptosNetworkNames = ['mainnet', 'testnet', 'devnet'];
var aptosChainIdToNetworkNames = {
    '1': 'mainnet',
    '2': 'testnet',
};
/**
 * A representation of a Aptos network.
 *
 * @category DataType
 */
var AptosNetwork = /** @class */ (function () {
    function AptosNetwork(network) {
        this.network = network;
    }
    Object.defineProperty(AptosNetwork, "MAINNET", {
        /**
         * Returns MAINNET network
         *
         * @example AptosNetwork.MAINNET
         */
        get: function () {
            return AptosNetwork.create('mainnet');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosNetwork, "TESTNET", {
        /**
         * Returns TESTNET network
         *
         * @example AptosNetwork.MAINNET
         */
        get: function () {
            return AptosNetwork.create('testnet');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosNetwork, "DEVNET", {
        /**
         * Returns DEVNET network
         *
         * @example AptosNetwork.MAINNET
         */
        get: function () {
            return AptosNetwork.create('devnet');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new instance of AptosNetwork from any valid network input.
     *
     * @example `const network = AptosNetwork.create("mainnet")`
     * @throws an error when a passed network is invalid.
     */
    AptosNetwork.create = function (network) {
        return network instanceof AptosNetwork ? network : new AptosNetwork(AptosNetwork.parse(network));
    };
    AptosNetwork.parse = function (network) {
        var _a;
        if (typeof network !== 'string') {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Aptos network is not supported: ".concat(network),
            });
        }
        var networkName = (_a = aptosChainIdToNetworkNames[network]) !== null && _a !== void 0 ? _a : network;
        if (!aptosNetworkNames.includes(networkName)) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Aptos network is not supported: ".concat(network),
            });
        }
        return networkName;
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    AptosNetwork.prototype.format = function () {
        return this.network;
    };
    /**
     * Checks the equality of the current network with another Aptos network.
     * @example `network.equals("mainnet")`
     * @example `network.equals(AptosNetwork.create("mainnet"))`
     */
    AptosNetwork.prototype.equals = function (network) {
        return this.network === AptosNetwork.create(network).network;
    };
    /**
     * @returns a string representing the network.
     * @example network.toJSON(); // "mainnet"
     */
    AptosNetwork.prototype.toJSON = function () {
        return this.network;
    };
    /**
     * @returns a string representing the network.
     * @example network.toString(); // "mainnet"
     */
    AptosNetwork.prototype.toString = function () {
        return this.network;
    };
    return AptosNetwork;
}());

var unitToDecimals = {
    aptos: 8,
    octas: 0,
};
/**
 * The AptosNative class is a MoralisData that references to the value of Aptos native currency APT
 *
 * @category DataType
 */
var AptosNative = /** @class */ (function () {
    function AptosNative(rawValue) {
        this.rawValue = rawValue;
    }
    /**
     * Create a new instance of AptosNative from any valid {@link AptosNativeInput} value.
     * @param value - the value to create the AptosNative from
     * @param unit - the unit of the value (optional), defaults to `aptos`
     * @returns a new instance of AptosNative
     * @example
     * ```ts
     * const native = AptosNative.create(2, 'octas');
     * const native = AptosNative.create(2);
     *```
     */
    AptosNative.create = function (value, unit) {
        if (value instanceof AptosNative) {
            return value;
        }
        return new AptosNative(AptosNative.parse(value, unit));
    };
    AptosNative.fromJSON = function (json) {
        return AptosNative.create(json, 'octas');
    };
    AptosNative.parse = function (value, unit) {
        if (unit === void 0) { unit = 'aptos'; }
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
                message: "Not supported Aptos unit: ".concat(unit),
            });
        }
        return BigNumber.fromDecimal(value.toString(), decimal);
    };
    /**
     * Compares two AptosNativeish values.
     * @param valueA - the first value to compare
     * @param valueB - the second value to compare
     * @returns true if the values are equal
     * @example
     * ```ts
     * AptosNative.equals(AptosNative.create(1), AptosNative.create(1)); // true
     * ```
     */
    AptosNative.equals = function (valueA, valueB) {
        var aptosNativeA = AptosNative.create(valueA);
        var aptosNativeB = AptosNative.create(valueB);
        return aptosNativeA.octas === aptosNativeB.octas;
    };
    /**
     * Compares AptosNative with current instance.
     * @param value - the value to compare with
     * @returns true if the values are equal
     * @example
     * ```ts
     * const native = AptosNative.create(2, 'octas');
     * native.equals(AptosNative.create(1)); // false
     * ```
     */
    AptosNative.prototype.equals = function (value) {
        return AptosNative.equals(this, value);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    AptosNative.prototype.format = function () {
        return this.octas;
    };
    /**
     * Converts the AptosNative to a string.
     * @returns the value of the AptosNative as a string
     * @example `native.toJSON()`
     */
    AptosNative.prototype.toJSON = function () {
        return this.octas;
    };
    /**
     * Converts the AptosNative to a string.
     * @returns the value of the AptosNative as a string
     * @example `native.toString()`
     */
    AptosNative.prototype.toString = function () {
        return this.octas;
    };
    Object.defineProperty(AptosNative.prototype, "value", {
        /**
         * @returns the value of the AptosNative as a BigNumber
         * @example `native.value`
         */
        get: function () {
            return this.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosNative.prototype, "aptos", {
        /**
         * Converts the AptosNative to an aptos unit.
         * @returns the value of the AptosNative as an aptos string
         * @example `native.aptos`
         */
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['aptos']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosNative.prototype, "octas", {
        /**
         * Converts the AptosNative to a string.
         * @returns the value of the AptosNative as a string
         * @example `native.lamports`
         */
        get: function () {
            return this.rawValue.toString();
        },
        enumerable: false,
        configurable: true
    });
    return AptosNative;
}());

var AptosNetworkResolver = /** @class */ (function () {
    function AptosNetworkResolver() {
    }
    AptosNetworkResolver.resolve = function (network, core) {
        if (!network) {
            network = core.config.get(CommonAptosUtilsConfig.defaultAptosNetwork);
        }
        return AptosNetwork.create(network).network;
    };
    return AptosNetworkResolver;
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

var CommonAptosUtils = /** @class */ (function (_super) {
    __extends(CommonAptosUtils, _super);
    function CommonAptosUtils(core) {
        return _super.call(this, CommonAptosUtils.moduleName, core) || this;
    }
    CommonAptosUtils.create = function (core) {
        return new CommonAptosUtils(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    CommonAptosUtils.prototype.setup = function () {
        CommonAptosUtilsConfigSetup.register(this.core.config);
    };
    CommonAptosUtils.prototype.start = function () {
        // Nothing
    };
    Object.defineProperty(CommonAptosUtils.prototype, "AptosAddress", {
        get: function () {
            return AptosAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonAptosUtils.prototype, "AptosNative", {
        get: function () {
            return AptosNative;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonAptosUtils.prototype, "AptosNetwork", {
        get: function () {
            return AptosNetwork;
        },
        enumerable: false,
        configurable: true
    });
    CommonAptosUtils.moduleName = 'aptosUtils';
    return CommonAptosUtils;
}(Module));

// $ref: #/components/schemas/NFTTokenResponse/properties/default_properties
// typeName: NFTTokenResponse_default_properties
var AptosNFTTokenResponseDefaultProperties = /** @class */ (function () {
    function AptosNFTTokenResponseDefaultProperties() {
    }
    AptosNFTTokenResponseDefaultProperties.create = function (input) {
        return input;
    };
    AptosNFTTokenResponseDefaultProperties.fromJSON = function (json) {
        return json;
    };
    return AptosNFTTokenResponseDefaultProperties;
}());

var AptosNFTTokenResponse = /** @class */ (function () {
    function AptosNFTTokenResponse(input) {
        this.collectionDataIdHash = input.collectionDataIdHash;
        this.collectionName = input.collectionName;
        this.creatorAddress = AptosAddress.create(input.creatorAddress);
        this.defaultProperties = AptosNFTTokenResponseDefaultProperties.create(input.defaultProperties);
        this.description = input.description;
        this.descriptionMutable = input.descriptionMutable;
        this.largestPropertyVersion = input.largestPropertyVersion;
        this.lastTransactionTimestamp = input.lastTransactionTimestamp;
        this.lastTransactionVersion = input.lastTransactionVersion;
        this.maximum = input.maximum;
        this.maximumMutable = input.maximumMutable;
        this.metadataUri = input.metadataUri;
        this.name = input.name;
        this.payeeAddress = AptosAddress.create(input.payeeAddress);
        this.propertiesMutable = input.propertiesMutable;
        this.royaltyMutable = input.royaltyMutable;
        this.royaltyPointsDenominator = input.royaltyPointsDenominator;
        this.royaltyPointsNumerator = input.royaltyPointsNumerator;
        this.supply = input.supply;
        this.tokenDataIdHash = input.tokenDataIdHash;
        this.uriMutable = input.uriMutable;
    }
    AptosNFTTokenResponse.create = function (input) {
        if (input instanceof AptosNFTTokenResponse) {
            return input;
        }
        return new AptosNFTTokenResponse(input);
    };
    AptosNFTTokenResponse.fromJSON = function (json) {
        var input = {
            collectionDataIdHash: json.collection_data_id_hash,
            collectionName: json.collection_name,
            creatorAddress: AptosAddress.fromJSON(json.creator_address),
            defaultProperties: AptosNFTTokenResponseDefaultProperties.fromJSON(json.default_properties),
            description: json.description,
            descriptionMutable: json.description_mutable,
            largestPropertyVersion: json.largest_property_version,
            lastTransactionTimestamp: json.last_transaction_timestamp,
            lastTransactionVersion: json.last_transaction_version,
            maximum: json.maximum,
            maximumMutable: json.maximum_mutable,
            metadataUri: json.metadata_uri,
            name: json.name,
            payeeAddress: AptosAddress.fromJSON(json.payee_address),
            propertiesMutable: json.properties_mutable,
            royaltyMutable: json.royalty_mutable,
            royaltyPointsDenominator: json.royalty_points_denominator,
            royaltyPointsNumerator: json.royalty_points_numerator,
            supply: json.supply,
            tokenDataIdHash: json.token_data_id_hash,
            uriMutable: json.uri_mutable,
        };
        return AptosNFTTokenResponse.create(input);
    };
    AptosNFTTokenResponse.prototype.toJSON = function () {
        return {
            collection_data_id_hash: this.collectionDataIdHash,
            collection_name: this.collectionName,
            creator_address: this.creatorAddress.toJSON(),
            default_properties: this.defaultProperties,
            description: this.description,
            description_mutable: this.descriptionMutable,
            largest_property_version: this.largestPropertyVersion,
            last_transaction_timestamp: this.lastTransactionTimestamp,
            last_transaction_version: this.lastTransactionVersion,
            maximum: this.maximum,
            maximum_mutable: this.maximumMutable,
            metadata_uri: this.metadataUri,
            name: this.name,
            payee_address: this.payeeAddress.toJSON(),
            properties_mutable: this.propertiesMutable,
            royalty_mutable: this.royaltyMutable,
            royalty_points_denominator: this.royaltyPointsDenominator,
            royalty_points_numerator: this.royaltyPointsNumerator,
            supply: this.supply,
            token_data_id_hash: this.tokenDataIdHash,
            uri_mutable: this.uriMutable,
        };
    };
    return AptosNFTTokenResponse;
}());

var GetNFTsByIdsOperation = {
    operationId: "getNFTsByIds",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts",
    parameterNames: ["token_ids", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosNFTTokenResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var tokenIds = request.tokenIds;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            token_ids: tokenIds,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTTokensByCollectionResponse = /** @class */ (function () {
    function AptosNFTTokensByCollectionResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTokenResponse.create(item); });
    }
    AptosNFTTokensByCollectionResponse.create = function (input) {
        if (input instanceof AptosNFTTokensByCollectionResponse) {
            return input;
        }
        return new AptosNFTTokensByCollectionResponse(input);
    };
    AptosNFTTokensByCollectionResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTokenResponse.fromJSON(item); }),
        };
        return AptosNFTTokensByCollectionResponse.create(input);
    };
    AptosNFTTokensByCollectionResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTTokensByCollectionResponse;
}());

var GetNFTsByCollectionOperation = {
    operationId: "getNFTsByCollection",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/collections/{collection_data_id_hash}/tokens",
    parameterNames: ["collection_data_id_hash", "limit", "offset", "cursor", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTTokensByCollectionResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var collectionDataIdHash = request.collectionDataIdHash;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            collection_data_id_hash: collectionDataIdHash,
            limit: limit,
            offset: offset,
            cursor: cursor,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTTokensByCreatorsResponse = /** @class */ (function () {
    function AptosNFTTokensByCreatorsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTokenResponse.create(item); });
    }
    AptosNFTTokensByCreatorsResponse.create = function (input) {
        if (input instanceof AptosNFTTokensByCreatorsResponse) {
            return input;
        }
        return new AptosNFTTokensByCreatorsResponse(input);
    };
    AptosNFTTokensByCreatorsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTokenResponse.fromJSON(item); }),
        };
        return AptosNFTTokensByCreatorsResponse.create(input);
    };
    AptosNFTTokensByCreatorsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTTokensByCreatorsResponse;
}());

var GetNFTsByCreatorsOperation = {
    operationId: "getNFTsByCreators",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/creators",
    parameterNames: ["limit", "offset", "cursor", "creator_addresses", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTTokensByCreatorsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var creatorAddresses = request.creatorAddresses.map(function (item) { return AptosAddress.create(item); });
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            creator_addresses: creatorAddresses.map(function (item) { return item.toJSON(); }),
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTCollectionItemResponse = /** @class */ (function () {
    function AptosNFTCollectionItemResponse(input) {
        this.collectionDataIdHash = input.collectionDataIdHash;
        this.collectionName = input.collectionName;
        this.creatorAddress = AptosAddress.create(input.creatorAddress);
        this.description = input.description;
        this.descriptionMutable = input.descriptionMutable;
        this.lastTransactionTimestamp = input.lastTransactionTimestamp;
        this.lastTransactionVersion = input.lastTransactionVersion;
        this.maximum = input.maximum;
        this.maximumMutable = input.maximumMutable;
        this.metadataUri = input.metadataUri;
        this.supply = input.supply;
        this.tableHandle = input.tableHandle;
        this.uriMutable = input.uriMutable;
    }
    AptosNFTCollectionItemResponse.create = function (input) {
        if (input instanceof AptosNFTCollectionItemResponse) {
            return input;
        }
        return new AptosNFTCollectionItemResponse(input);
    };
    AptosNFTCollectionItemResponse.fromJSON = function (json) {
        var input = {
            collectionDataIdHash: json.collection_data_id_hash,
            collectionName: json.collection_name,
            creatorAddress: AptosAddress.fromJSON(json.creator_address),
            description: json.description,
            descriptionMutable: json.description_mutable,
            lastTransactionTimestamp: json.last_transaction_timestamp,
            lastTransactionVersion: json.last_transaction_version,
            maximum: json.maximum,
            maximumMutable: json.maximum_mutable,
            metadataUri: json.metadata_uri,
            supply: json.supply,
            tableHandle: json.table_handle,
            uriMutable: json.uri_mutable,
        };
        return AptosNFTCollectionItemResponse.create(input);
    };
    AptosNFTCollectionItemResponse.prototype.toJSON = function () {
        return {
            collection_data_id_hash: this.collectionDataIdHash,
            collection_name: this.collectionName,
            creator_address: this.creatorAddress.toJSON(),
            description: this.description,
            description_mutable: this.descriptionMutable,
            last_transaction_timestamp: this.lastTransactionTimestamp,
            last_transaction_version: this.lastTransactionVersion,
            maximum: this.maximum,
            maximum_mutable: this.maximumMutable,
            metadata_uri: this.metadataUri,
            supply: this.supply,
            table_handle: this.tableHandle,
            uri_mutable: this.uriMutable,
        };
    };
    return AptosNFTCollectionItemResponse;
}());

var AptosNFTCollectionsByNameRangeResponse = /** @class */ (function () {
    function AptosNFTCollectionsByNameRangeResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTCollectionItemResponse.create(item); });
    }
    AptosNFTCollectionsByNameRangeResponse.create = function (input) {
        if (input instanceof AptosNFTCollectionsByNameRangeResponse) {
            return input;
        }
        return new AptosNFTCollectionsByNameRangeResponse(input);
    };
    AptosNFTCollectionsByNameRangeResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTCollectionItemResponse.fromJSON(item); }),
        };
        return AptosNFTCollectionsByNameRangeResponse.create(input);
    };
    AptosNFTCollectionsByNameRangeResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTCollectionsByNameRangeResponse;
}());

var GetNFTCollectionsOperation = {
    operationId: "getNFTCollections",
    groupName: "collections",
    httpMethod: "get",
    routePattern: "/collections",
    parameterNames: ["limit", "offset", "cursor", "fromName", "toName", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTCollectionsByNameRangeResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var fromName = request.fromName;
        var toName = request.toName;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            fromName: fromName,
            toName: toName,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetNFTCollectionsByIdsOperation = {
    operationId: "getNFTCollectionsByIds",
    groupName: "collections",
    httpMethod: "get",
    routePattern: "/collections/ids",
    parameterNames: ["ids", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosNFTCollectionItemResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var ids = request.ids;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            ids: ids,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTCollectionsByCreatorResponse = /** @class */ (function () {
    function AptosNFTCollectionsByCreatorResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTCollectionItemResponse.create(item); });
    }
    AptosNFTCollectionsByCreatorResponse.create = function (input) {
        if (input instanceof AptosNFTCollectionsByCreatorResponse) {
            return input;
        }
        return new AptosNFTCollectionsByCreatorResponse(input);
    };
    AptosNFTCollectionsByCreatorResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTCollectionItemResponse.fromJSON(item); }),
        };
        return AptosNFTCollectionsByCreatorResponse.create(input);
    };
    AptosNFTCollectionsByCreatorResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTCollectionsByCreatorResponse;
}());

var GetNFTCollectionsByCreatorOperation = {
    operationId: "getNFTCollectionsByCreator",
    groupName: "collections",
    httpMethod: "get",
    routePattern: "/collections/creators",
    parameterNames: ["limit", "offset", "cursor", "creator_address", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTCollectionsByCreatorResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var creatorAddress = AptosAddress.create(request.creatorAddress);
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            creator_address: creatorAddress.toJSON(),
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/NFTOwnerResponse/properties/token_properties
// typeName: NFTOwnerResponse_token_properties
var AptosNFTOwnerResponseTokenProperties = /** @class */ (function () {
    function AptosNFTOwnerResponseTokenProperties() {
    }
    AptosNFTOwnerResponseTokenProperties.create = function (input) {
        return input;
    };
    AptosNFTOwnerResponseTokenProperties.fromJSON = function (json) {
        return json;
    };
    return AptosNFTOwnerResponseTokenProperties;
}());

var AptosNFTOwnerResponse = /** @class */ (function () {
    function AptosNFTOwnerResponse(input) {
        this.amount = AptosNative.create(input.amount);
        this.collectionDataIdHash = input.collectionDataIdHash;
        this.collectionName = input.collectionName;
        this.creatorAddress = AptosAddress.create(input.creatorAddress);
        this.lastTransactionTimestamp = input.lastTransactionTimestamp;
        this.lastTransactionVersion = input.lastTransactionVersion;
        this.name = input.name;
        this.ownerAddress = AptosAddress.create(input.ownerAddress);
        this.propertyVersion = input.propertyVersion;
        this.tableType = input.tableType;
        this.tokenDataIdHash = input.tokenDataIdHash;
        this.tokenProperties = AptosNFTOwnerResponseTokenProperties.create(input.tokenProperties);
    }
    AptosNFTOwnerResponse.create = function (input) {
        if (input instanceof AptosNFTOwnerResponse) {
            return input;
        }
        return new AptosNFTOwnerResponse(input);
    };
    AptosNFTOwnerResponse.fromJSON = function (json) {
        var input = {
            amount: AptosNative.fromJSON(json.amount),
            collectionDataIdHash: json.collection_data_id_hash,
            collectionName: json.collection_name,
            creatorAddress: AptosAddress.fromJSON(json.creator_address),
            lastTransactionTimestamp: json.last_transaction_timestamp,
            lastTransactionVersion: json.last_transaction_version,
            name: json.name,
            ownerAddress: AptosAddress.fromJSON(json.owner_address),
            propertyVersion: json.property_version,
            tableType: json.table_type,
            tokenDataIdHash: json.token_data_id_hash,
            tokenProperties: AptosNFTOwnerResponseTokenProperties.fromJSON(json.token_properties),
        };
        return AptosNFTOwnerResponse.create(input);
    };
    AptosNFTOwnerResponse.prototype.toJSON = function () {
        return {
            amount: this.amount.toJSON(),
            collection_data_id_hash: this.collectionDataIdHash,
            collection_name: this.collectionName,
            creator_address: this.creatorAddress.toJSON(),
            last_transaction_timestamp: this.lastTransactionTimestamp,
            last_transaction_version: this.lastTransactionVersion,
            name: this.name,
            owner_address: this.ownerAddress.toJSON(),
            property_version: this.propertyVersion,
            table_type: this.tableType,
            token_data_id_hash: this.tokenDataIdHash,
            token_properties: this.tokenProperties,
        };
    };
    return AptosNFTOwnerResponse;
}());

var AptosNFTOwnersByTokensResponse = /** @class */ (function () {
    function AptosNFTOwnersByTokensResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTOwnerResponse.create(item); });
    }
    AptosNFTOwnersByTokensResponse.create = function (input) {
        if (input instanceof AptosNFTOwnersByTokensResponse) {
            return input;
        }
        return new AptosNFTOwnersByTokensResponse(input);
    };
    AptosNFTOwnersByTokensResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTOwnerResponse.fromJSON(item); }),
        };
        return AptosNFTOwnersByTokensResponse.create(input);
    };
    AptosNFTOwnersByTokensResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTOwnersByTokensResponse;
}());

var GetNFTOwnersByTokensOperation = {
    operationId: "getNFTOwnersByTokens",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/owners",
    parameterNames: ["limit", "offset", "cursor", "token_ids", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTOwnersByTokensResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var tokenIds = request.tokenIds;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            token_ids: tokenIds,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTOwnersByCollectionResponse = /** @class */ (function () {
    function AptosNFTOwnersByCollectionResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTOwnerResponse.create(item); });
    }
    AptosNFTOwnersByCollectionResponse.create = function (input) {
        if (input instanceof AptosNFTOwnersByCollectionResponse) {
            return input;
        }
        return new AptosNFTOwnersByCollectionResponse(input);
    };
    AptosNFTOwnersByCollectionResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTOwnerResponse.fromJSON(item); }),
        };
        return AptosNFTOwnersByCollectionResponse.create(input);
    };
    AptosNFTOwnersByCollectionResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTOwnersByCollectionResponse;
}());

var GetNFTOwnersByCollectionOperation = {
    operationId: "getNFTOwnersByCollection",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/collections/{collection_data_id_hash}/owners",
    parameterNames: ["collection_data_id_hash", "limit", "offset", "cursor", "wallet_blacklist", "wallet_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTOwnersByCollectionResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var collectionDataIdHash = request.collectionDataIdHash;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var walletBlacklist = request.walletBlacklist;
        var walletWhitelist = request.walletWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            collection_data_id_hash: collectionDataIdHash,
            limit: limit,
            offset: offset,
            cursor: cursor,
            wallet_blacklist: walletBlacklist,
            wallet_whitelist: walletWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/NFTOwnersOfCollectionResponse
// type: NFTOwnersOfCollectionResponse
// properties:
// - cursor ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/cursor)
// - hasNextPage ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/hasNextPage)
// - result ($ref: #/components/schemas/NFTOwnersOfCollectionResponse/properties/result)
var AptosNFTOwnersOfCollectionResponse = /** @class */ (function () {
    function AptosNFTOwnersOfCollectionResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result;
    }
    AptosNFTOwnersOfCollectionResponse.create = function (input) {
        if (input instanceof AptosNFTOwnersOfCollectionResponse) {
            return input;
        }
        return new AptosNFTOwnersOfCollectionResponse(input);
    };
    AptosNFTOwnersOfCollectionResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result,
        };
        return AptosNFTOwnersOfCollectionResponse.create(input);
    };
    AptosNFTOwnersOfCollectionResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result,
        };
    };
    return AptosNFTOwnersOfCollectionResponse;
}());

var GetNFTOwnersOfCollectionOperation = {
    operationId: "getNFTOwnersOfCollection",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/collections/{collection_data_id_hash}/owners/list",
    parameterNames: ["collection_data_id_hash", "limit", "offset", "cursor", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTOwnersOfCollectionResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var collectionDataIdHash = request.collectionDataIdHash;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            collection_data_id_hash: collectionDataIdHash,
            limit: limit,
            offset: offset,
            cursor: cursor,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTTransferResponse = /** @class */ (function () {
    function AptosNFTTransferResponse(input) {
        this.coinAmount = input.coinAmount ? AptosNative.create(input.coinAmount) : undefined;
        this.coinType = input.coinType;
        this.collectionDataIdHash = input.collectionDataIdHash;
        this.collectionName = input.collectionName;
        this.creatorAddress = AptosAddress.create(input.creatorAddress);
        this.eventAccountAddress = input.eventAccountAddress;
        this.eventCreationNumber = input.eventCreationNumber;
        this.eventSequenceNumber = input.eventSequenceNumber;
        this.fromAddress = input.fromAddress ? AptosAddress.create(input.fromAddress) : undefined;
        this.name = input.name;
        this.propertyVersion = input.propertyVersion;
        this.toAddress = input.toAddress ? AptosAddress.create(input.toAddress) : undefined;
        this.tokenAmount = AptosNative.create(input.tokenAmount);
        this.tokenDataIdHash = input.tokenDataIdHash;
        this.transactionTimestamp = input.transactionTimestamp;
        this.transactionVersion = input.transactionVersion;
        this.transferType = input.transferType;
    }
    AptosNFTTransferResponse.create = function (input) {
        if (input instanceof AptosNFTTransferResponse) {
            return input;
        }
        return new AptosNFTTransferResponse(input);
    };
    AptosNFTTransferResponse.fromJSON = function (json) {
        var input = {
            coinAmount: json.coin_amount ? AptosNative.fromJSON(json.coin_amount) : undefined,
            coinType: json.coin_type,
            collectionDataIdHash: json.collection_data_id_hash,
            collectionName: json.collection_name,
            creatorAddress: AptosAddress.fromJSON(json.creator_address),
            eventAccountAddress: json.event_account_address,
            eventCreationNumber: json.event_creation_number,
            eventSequenceNumber: json.event_sequence_number,
            fromAddress: json.from_address ? AptosAddress.fromJSON(json.from_address) : undefined,
            name: json.name,
            propertyVersion: json.property_version,
            toAddress: json.to_address ? AptosAddress.fromJSON(json.to_address) : undefined,
            tokenAmount: AptosNative.fromJSON(json.token_amount),
            tokenDataIdHash: json.token_data_id_hash,
            transactionTimestamp: json.transaction_timestamp,
            transactionVersion: json.transaction_version,
            transferType: json.transfer_type,
        };
        return AptosNFTTransferResponse.create(input);
    };
    AptosNFTTransferResponse.prototype.toJSON = function () {
        return {
            coin_amount: this.coinAmount ? this.coinAmount.toJSON() : undefined,
            coin_type: this.coinType,
            collection_data_id_hash: this.collectionDataIdHash,
            collection_name: this.collectionName,
            creator_address: this.creatorAddress.toJSON(),
            event_account_address: this.eventAccountAddress,
            event_creation_number: this.eventCreationNumber,
            event_sequence_number: this.eventSequenceNumber,
            from_address: this.fromAddress ? this.fromAddress.toJSON() : undefined,
            name: this.name,
            property_version: this.propertyVersion,
            to_address: this.toAddress ? this.toAddress.toJSON() : undefined,
            token_amount: this.tokenAmount.toJSON(),
            token_data_id_hash: this.tokenDataIdHash,
            transaction_timestamp: this.transactionTimestamp,
            transaction_version: this.transactionVersion,
            transfer_type: this.transferType,
        };
    };
    return AptosNFTTransferResponse;
}());

var AptosNFTTransfersByTokensResponse = /** @class */ (function () {
    function AptosNFTTransfersByTokensResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTransferResponse.create(item); });
    }
    AptosNFTTransfersByTokensResponse.create = function (input) {
        if (input instanceof AptosNFTTransfersByTokensResponse) {
            return input;
        }
        return new AptosNFTTransfersByTokensResponse(input);
    };
    AptosNFTTransfersByTokensResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTransferResponse.fromJSON(item); }),
        };
        return AptosNFTTransfersByTokensResponse.create(input);
    };
    AptosNFTTransfersByTokensResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTTransfersByTokensResponse;
}());

var GetNFTTransfersByIdsOperation = {
    operationId: "getNFTTransfersByIds",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/transfers",
    parameterNames: ["limit", "offset", "cursor", "wallet_blacklist", "wallet_whitelist", "token_ids", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTTransfersByTokensResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var walletBlacklist = request.walletBlacklist;
        var walletWhitelist = request.walletWhitelist;
        var tokenIds = request.tokenIds;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            wallet_blacklist: walletBlacklist,
            wallet_whitelist: walletWhitelist,
            token_ids: tokenIds,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetNFTTransfersByCollectionResponse = /** @class */ (function () {
    function AptosGetNFTTransfersByCollectionResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTransferResponse.create(item); });
    }
    AptosGetNFTTransfersByCollectionResponse.create = function (input) {
        if (input instanceof AptosGetNFTTransfersByCollectionResponse) {
            return input;
        }
        return new AptosGetNFTTransfersByCollectionResponse(input);
    };
    AptosGetNFTTransfersByCollectionResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTransferResponse.fromJSON(item); }),
        };
        return AptosGetNFTTransfersByCollectionResponse.create(input);
    };
    AptosGetNFTTransfersByCollectionResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetNFTTransfersByCollectionResponse;
}());

var GetNFTTransfersByCollectionOperation = {
    operationId: "getNFTTransfersByCollection",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/transfers/collections/{collection_data_id_hash}",
    parameterNames: ["collection_data_id_hash", "limit", "offset", "cursor", "wallet_whitelist", "wallet_blacklist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetNFTTransfersByCollectionResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var collectionDataIdHash = request.collectionDataIdHash;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var walletWhitelist = request.walletWhitelist;
        var walletBlacklist = request.walletBlacklist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            collection_data_id_hash: collectionDataIdHash,
            limit: limit,
            offset: offset,
            cursor: cursor,
            wallet_whitelist: walletWhitelist,
            wallet_blacklist: walletBlacklist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetNFTTransfersByCreatorsResponse = /** @class */ (function () {
    function AptosGetNFTTransfersByCreatorsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTransferResponse.create(item); });
    }
    AptosGetNFTTransfersByCreatorsResponse.create = function (input) {
        if (input instanceof AptosGetNFTTransfersByCreatorsResponse) {
            return input;
        }
        return new AptosGetNFTTransfersByCreatorsResponse(input);
    };
    AptosGetNFTTransfersByCreatorsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTransferResponse.fromJSON(item); }),
        };
        return AptosGetNFTTransfersByCreatorsResponse.create(input);
    };
    AptosGetNFTTransfersByCreatorsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetNFTTransfersByCreatorsResponse;
}());

var GetNFTTransfersByCreatorsOperation = {
    operationId: "getNFTTransfersByCreators",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/transfers/creators",
    parameterNames: ["limit", "offset", "cursor", "creator_addresses", "collection_blacklist", "collection_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetNFTTransfersByCreatorsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var creatorAddresses = request.creatorAddresses.map(function (item) { return AptosAddress.create(item); });
        var collectionBlacklist = request.collectionBlacklist;
        var collectionWhitelist = request.collectionWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            creator_addresses: creatorAddresses.map(function (item) { return item.toJSON(); }),
            collection_blacklist: collectionBlacklist,
            collection_whitelist: collectionWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTTransfersByWalletsResponse = /** @class */ (function () {
    function AptosNFTTransfersByWalletsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTTransferResponse.create(item); });
    }
    AptosNFTTransfersByWalletsResponse.create = function (input) {
        if (input instanceof AptosNFTTransfersByWalletsResponse) {
            return input;
        }
        return new AptosNFTTransfersByWalletsResponse(input);
    };
    AptosNFTTransfersByWalletsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTTransferResponse.fromJSON(item); }),
        };
        return AptosNFTTransfersByWalletsResponse.create(input);
    };
    AptosNFTTransfersByWalletsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTTransfersByWalletsResponse;
}());

var GetNFTTransfersByWalletsOperation = {
    operationId: "getNFTTransfersByWallets",
    groupName: "nfts",
    httpMethod: "get",
    routePattern: "/nfts/transfers/wallets",
    parameterNames: ["limit", "offset", "cursor", "wallet_addresses", "collection_blacklist", "collection_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTTransfersByWalletsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var walletAddresses = request.walletAddresses.map(function (item) { return AptosAddress.create(item); });
        var collectionBlacklist = request.collectionBlacklist;
        var collectionWhitelist = request.collectionWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            wallet_addresses: walletAddresses.map(function (item) { return item.toJSON(); }),
            collection_blacklist: collectionBlacklist,
            collection_whitelist: collectionWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosCoinInfoDto = /** @class */ (function () {
    function AptosCoinInfoDto(input) {
        this.coinType = input.coinType;
        this.coinTypeHash = input.coinTypeHash;
        this.creatorAddress = AptosAddress.create(input.creatorAddress);
        this.decimals = input.decimals;
        this.name = input.name;
        this.supplyAggregatorTableHandle = input.supplyAggregatorTableHandle;
        this.supplyAggregatorTableKey = input.supplyAggregatorTableKey;
        this.symbol = input.symbol;
        this.transactionCreatedTimestamp = input.transactionCreatedTimestamp;
        this.transactionVersionCreated = input.transactionVersionCreated;
    }
    AptosCoinInfoDto.create = function (input) {
        if (input instanceof AptosCoinInfoDto) {
            return input;
        }
        return new AptosCoinInfoDto(input);
    };
    AptosCoinInfoDto.fromJSON = function (json) {
        var input = {
            coinType: json.coin_type,
            coinTypeHash: json.coin_type_hash,
            creatorAddress: AptosAddress.fromJSON(json.creator_address),
            decimals: json.decimals,
            name: json.name,
            supplyAggregatorTableHandle: json.supply_aggregator_table_handle,
            supplyAggregatorTableKey: json.supply_aggregator_table_key,
            symbol: json.symbol,
            transactionCreatedTimestamp: json.transaction_created_timestamp,
            transactionVersionCreated: json.transaction_version_created,
        };
        return AptosCoinInfoDto.create(input);
    };
    AptosCoinInfoDto.prototype.toJSON = function () {
        return {
            coin_type: this.coinType,
            coin_type_hash: this.coinTypeHash,
            creator_address: this.creatorAddress.toJSON(),
            decimals: this.decimals,
            name: this.name,
            supply_aggregator_table_handle: this.supplyAggregatorTableHandle,
            supply_aggregator_table_key: this.supplyAggregatorTableKey,
            symbol: this.symbol,
            transaction_created_timestamp: this.transactionCreatedTimestamp,
            transaction_version_created: this.transactionVersionCreated,
        };
    };
    return AptosCoinInfoDto;
}());

var GetCoinInfoByCoinTypeHashesOperation = {
    operationId: "getCoinInfoByCoinTypeHashes",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins",
    parameterNames: ["coin_type_hashes", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosCoinInfoDto.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var coinTypeHashes = request.coinTypeHashes;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            coin_type_hashes: coinTypeHashes,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetLatestCoinsResponse = /** @class */ (function () {
    function AptosGetLatestCoinsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinInfoDto.create(item); });
    }
    AptosGetLatestCoinsResponse.create = function (input) {
        if (input instanceof AptosGetLatestCoinsResponse) {
            return input;
        }
        return new AptosGetLatestCoinsResponse(input);
    };
    AptosGetLatestCoinsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinInfoDto.fromJSON(item); }),
        };
        return AptosGetLatestCoinsResponse.create(input);
    };
    AptosGetLatestCoinsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetLatestCoinsResponse;
}());

var GetLatestCoinsOperation = {
    operationId: "getLatestCoins",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/latest",
    parameterNames: ["limit", "offset", "cursor", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetLatestCoinsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinsByNameRangeResponse = /** @class */ (function () {
    function AptosGetCoinsByNameRangeResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinInfoDto.create(item); });
    }
    AptosGetCoinsByNameRangeResponse.create = function (input) {
        if (input instanceof AptosGetCoinsByNameRangeResponse) {
            return input;
        }
        return new AptosGetCoinsByNameRangeResponse(input);
    };
    AptosGetCoinsByNameRangeResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinInfoDto.fromJSON(item); }),
        };
        return AptosGetCoinsByNameRangeResponse.create(input);
    };
    AptosGetCoinsByNameRangeResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinsByNameRangeResponse;
}());

var GetCoinsByNameRangeOperation = {
    operationId: "getCoinsByNameRange",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/names",
    parameterNames: ["limit", "offset", "cursor", "from_name", "to_name", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinsByNameRangeResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var fromName = request.fromName;
        var toName = request.toName;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            from_name: fromName,
            to_name: toName,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinsBySymbolRangeResponse = /** @class */ (function () {
    function AptosGetCoinsBySymbolRangeResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinInfoDto.create(item); });
    }
    AptosGetCoinsBySymbolRangeResponse.create = function (input) {
        if (input instanceof AptosGetCoinsBySymbolRangeResponse) {
            return input;
        }
        return new AptosGetCoinsBySymbolRangeResponse(input);
    };
    AptosGetCoinsBySymbolRangeResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinInfoDto.fromJSON(item); }),
        };
        return AptosGetCoinsBySymbolRangeResponse.create(input);
    };
    AptosGetCoinsBySymbolRangeResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinsBySymbolRangeResponse;
}());

var GetCoinsBySymbolRangeOperation = {
    operationId: "getCoinsBySymbolRange",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/symbols",
    parameterNames: ["limit", "offset", "cursor", "from_symbol", "to_symbol", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinsBySymbolRangeResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var fromSymbol = request.fromSymbol;
        var toSymbol = request.toSymbol;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            from_symbol: fromSymbol,
            to_symbol: toSymbol,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinsByCreatorsResponse = /** @class */ (function () {
    function AptosGetCoinsByCreatorsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinInfoDto.create(item); });
    }
    AptosGetCoinsByCreatorsResponse.create = function (input) {
        if (input instanceof AptosGetCoinsByCreatorsResponse) {
            return input;
        }
        return new AptosGetCoinsByCreatorsResponse(input);
    };
    AptosGetCoinsByCreatorsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinInfoDto.fromJSON(item); }),
        };
        return AptosGetCoinsByCreatorsResponse.create(input);
    };
    AptosGetCoinsByCreatorsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinsByCreatorsResponse;
}());

var GetCoinsByCreatorsOperation = {
    operationId: "getCoinsByCreators",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/creators",
    parameterNames: ["limit", "offset", "cursor", "creator_addresses", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinsByCreatorsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var creatorAddresses = request.creatorAddresses.map(function (item) { return AptosAddress.create(item); });
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            creator_addresses: creatorAddresses.map(function (item) { return item.toJSON(); }),
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosCoinTransferDto = /** @class */ (function () {
    function AptosCoinTransferDto(input) {
        this.activityType = input.activityType;
        this.amount = AptosNative.create(input.amount);
        this.blockHeight = input.blockHeight;
        this.coinType = input.coinType;
        this.entryFunctionIdStr = input.entryFunctionIdStr;
        this.eventAccountAddress = input.eventAccountAddress;
        this.eventCreationNumber = input.eventCreationNumber;
        this.eventSequenceNumber = input.eventSequenceNumber;
        this.isGasFee = input.isGasFee;
        this.isTransactionSuccess = input.isTransactionSuccess;
        this.ownerAddress = AptosAddress.create(input.ownerAddress);
        this.transactionTimestamp = input.transactionTimestamp;
        this.transactionVersion = input.transactionVersion;
    }
    AptosCoinTransferDto.create = function (input) {
        if (input instanceof AptosCoinTransferDto) {
            return input;
        }
        return new AptosCoinTransferDto(input);
    };
    AptosCoinTransferDto.fromJSON = function (json) {
        var input = {
            activityType: json.activity_type,
            amount: AptosNative.fromJSON(json.amount),
            blockHeight: json.block_height,
            coinType: json.coin_type,
            entryFunctionIdStr: json.entry_function_id_str,
            eventAccountAddress: json.event_account_address,
            eventCreationNumber: json.event_creation_number,
            eventSequenceNumber: json.event_sequence_number,
            isGasFee: json.is_gas_fee,
            isTransactionSuccess: json.is_transaction_success,
            ownerAddress: AptosAddress.fromJSON(json.owner_address),
            transactionTimestamp: json.transaction_timestamp,
            transactionVersion: json.transaction_version,
        };
        return AptosCoinTransferDto.create(input);
    };
    AptosCoinTransferDto.prototype.toJSON = function () {
        return {
            activity_type: this.activityType,
            amount: this.amount.toJSON(),
            block_height: this.blockHeight,
            coin_type: this.coinType,
            entry_function_id_str: this.entryFunctionIdStr,
            event_account_address: this.eventAccountAddress,
            event_creation_number: this.eventCreationNumber,
            event_sequence_number: this.eventSequenceNumber,
            is_gas_fee: this.isGasFee,
            is_transaction_success: this.isTransactionSuccess,
            owner_address: this.ownerAddress.toJSON(),
            transaction_timestamp: this.transactionTimestamp,
            transaction_version: this.transactionVersion,
        };
    };
    return AptosCoinTransferDto;
}());

var AptosGetCoinTransfersByOwnerAddressesResponse = /** @class */ (function () {
    function AptosGetCoinTransfersByOwnerAddressesResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinTransferDto.create(item); });
    }
    AptosGetCoinTransfersByOwnerAddressesResponse.create = function (input) {
        if (input instanceof AptosGetCoinTransfersByOwnerAddressesResponse) {
            return input;
        }
        return new AptosGetCoinTransfersByOwnerAddressesResponse(input);
    };
    AptosGetCoinTransfersByOwnerAddressesResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinTransferDto.fromJSON(item); }),
        };
        return AptosGetCoinTransfersByOwnerAddressesResponse.create(input);
    };
    AptosGetCoinTransfersByOwnerAddressesResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinTransfersByOwnerAddressesResponse;
}());

var GetCoinTransfersByOwnerAddressesOperation = {
    operationId: "getCoinTransfersByOwnerAddresses",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/transfers/wallets",
    parameterNames: ["limit", "offset", "cursor", "owner_addresses", "from_date", "to_date", "coin_type_blacklist", "coin_type_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinTransfersByOwnerAddressesResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var ownerAddresses = request.ownerAddresses.map(function (item) { return AptosAddress.create(item); });
        var fromDate = request.fromDate;
        var toDate = request.toDate;
        var coinTypeBlacklist = request.coinTypeBlacklist;
        var coinTypeWhitelist = request.coinTypeWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            owner_addresses: ownerAddresses.map(function (item) { return item.toJSON(); }),
            from_date: fromDate,
            to_date: toDate,
            coin_type_blacklist: coinTypeBlacklist,
            coin_type_whitelist: coinTypeWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinTransfersByBlockHeightsResponse = /** @class */ (function () {
    function AptosGetCoinTransfersByBlockHeightsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinTransferDto.create(item); });
    }
    AptosGetCoinTransfersByBlockHeightsResponse.create = function (input) {
        if (input instanceof AptosGetCoinTransfersByBlockHeightsResponse) {
            return input;
        }
        return new AptosGetCoinTransfersByBlockHeightsResponse(input);
    };
    AptosGetCoinTransfersByBlockHeightsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinTransferDto.fromJSON(item); }),
        };
        return AptosGetCoinTransfersByBlockHeightsResponse.create(input);
    };
    AptosGetCoinTransfersByBlockHeightsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinTransfersByBlockHeightsResponse;
}());

var GetCoinTransfersByBlockHeightsOperation = {
    operationId: "getCoinTransfersByBlockHeights",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/transfers/blocks",
    parameterNames: ["limit", "offset", "cursor", "block_heights", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinTransfersByBlockHeightsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var blockHeights = request.blockHeights;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            block_heights: blockHeights,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinTransfersByCoinTypeResponse = /** @class */ (function () {
    function AptosGetCoinTransfersByCoinTypeResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCoinTransferDto.create(item); });
    }
    AptosGetCoinTransfersByCoinTypeResponse.create = function (input) {
        if (input instanceof AptosGetCoinTransfersByCoinTypeResponse) {
            return input;
        }
        return new AptosGetCoinTransfersByCoinTypeResponse(input);
    };
    AptosGetCoinTransfersByCoinTypeResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCoinTransferDto.fromJSON(item); }),
        };
        return AptosGetCoinTransfersByCoinTypeResponse.create(input);
    };
    AptosGetCoinTransfersByCoinTypeResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinTransfersByCoinTypeResponse;
}());

var GetCoinTransfersByCoinTypeOperation = {
    operationId: "getCoinTransfersByCoinType",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/transfers/{coin_type}",
    parameterNames: ["coin_type", "limit", "offset", "cursor", "from_date", "to_date", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinTransfersByCoinTypeResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var coinType = request.coinType;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var fromDate = request.fromDate;
        var toDate = request.toDate;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            coin_type: coinType,
            limit: limit,
            offset: offset,
            cursor: cursor,
            from_date: fromDate,
            to_date: toDate,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosCurrentCoinBalanceDto = /** @class */ (function () {
    function AptosCurrentCoinBalanceDto(input) {
        this.amount = AptosNative.create(input.amount);
        this.coinType = input.coinType;
        this.coinTypeHash = input.coinTypeHash;
        this.lastTransactionTimestamp = input.lastTransactionTimestamp;
        this.lastTransactionVersion = input.lastTransactionVersion;
        this.ownerAddress = AptosAddress.create(input.ownerAddress);
    }
    AptosCurrentCoinBalanceDto.create = function (input) {
        if (input instanceof AptosCurrentCoinBalanceDto) {
            return input;
        }
        return new AptosCurrentCoinBalanceDto(input);
    };
    AptosCurrentCoinBalanceDto.fromJSON = function (json) {
        var input = {
            amount: AptosNative.fromJSON(json.amount),
            coinType: json.coin_type,
            coinTypeHash: json.coin_type_hash,
            lastTransactionTimestamp: json.last_transaction_timestamp,
            lastTransactionVersion: json.last_transaction_version,
            ownerAddress: AptosAddress.fromJSON(json.owner_address),
        };
        return AptosCurrentCoinBalanceDto.create(input);
    };
    AptosCurrentCoinBalanceDto.prototype.toJSON = function () {
        return {
            amount: this.amount.toJSON(),
            coin_type: this.coinType,
            coin_type_hash: this.coinTypeHash,
            last_transaction_timestamp: this.lastTransactionTimestamp,
            last_transaction_version: this.lastTransactionVersion,
            owner_address: this.ownerAddress.toJSON(),
        };
    };
    return AptosCurrentCoinBalanceDto;
}());

var AptosGetTopHoldersByCoinResponse = /** @class */ (function () {
    function AptosGetTopHoldersByCoinResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCurrentCoinBalanceDto.create(item); });
    }
    AptosGetTopHoldersByCoinResponse.create = function (input) {
        if (input instanceof AptosGetTopHoldersByCoinResponse) {
            return input;
        }
        return new AptosGetTopHoldersByCoinResponse(input);
    };
    AptosGetTopHoldersByCoinResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCurrentCoinBalanceDto.fromJSON(item); }),
        };
        return AptosGetTopHoldersByCoinResponse.create(input);
    };
    AptosGetTopHoldersByCoinResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetTopHoldersByCoinResponse;
}());

var GetTopHoldersByCoinOperation = {
    operationId: "getTopHoldersByCoin",
    groupName: "coins",
    httpMethod: "get",
    routePattern: "/coins/owners/{coin_type_hash}/top-holders",
    parameterNames: ["coin_type_hash", "limit", "offset", "cursor", "min_amount", "min_version", "wallet_blacklist", "wallet_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetTopHoldersByCoinResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var coinTypeHash = request.coinTypeHash;
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var minAmount = request.minAmount ? AptosNative.create(request.minAmount) : undefined;
        var minVersion = request.minVersion;
        var walletBlacklist = request.walletBlacklist;
        var walletWhitelist = request.walletWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            coin_type_hash: coinTypeHash,
            limit: limit,
            offset: offset,
            cursor: cursor,
            min_amount: minAmount ? minAmount.toJSON() : undefined,
            min_version: minVersion,
            wallet_blacklist: walletBlacklist,
            wallet_whitelist: walletWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetCoinBalancesByWalletsResponse = /** @class */ (function () {
    function AptosGetCoinBalancesByWalletsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosCurrentCoinBalanceDto.create(item); });
    }
    AptosGetCoinBalancesByWalletsResponse.create = function (input) {
        if (input instanceof AptosGetCoinBalancesByWalletsResponse) {
            return input;
        }
        return new AptosGetCoinBalancesByWalletsResponse(input);
    };
    AptosGetCoinBalancesByWalletsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosCurrentCoinBalanceDto.fromJSON(item); }),
        };
        return AptosGetCoinBalancesByWalletsResponse.create(input);
    };
    AptosGetCoinBalancesByWalletsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetCoinBalancesByWalletsResponse;
}());

var GetCoinBalancesByWalletsOperation = {
    operationId: "getCoinBalancesByWallets",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/coins",
    parameterNames: ["limit", "offset", "cursor", "owner_addresses", "coin_type_hash_blacklist", "coin_type_hash_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinBalancesByWalletsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var ownerAddresses = request.ownerAddresses.map(function (item) { return AptosAddress.create(item); });
        var coinTypeHashBlacklist = request.coinTypeHashBlacklist;
        var coinTypeHashWhitelist = request.coinTypeHashWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            owner_addresses: ownerAddresses.map(function (item) { return item.toJSON(); }),
            coin_type_hash_blacklist: coinTypeHashBlacklist,
            coin_type_hash_whitelist: coinTypeHashWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosHistoricalCoinBalanceDto = /** @class */ (function () {
    function AptosHistoricalCoinBalanceDto(input) {
        this.amount = AptosNative.create(input.amount);
        this.coinType = input.coinType;
        this.coinTypeHash = input.coinTypeHash;
        this.transactionTimestamp = input.transactionTimestamp;
        this.transactionVersion = input.transactionVersion;
        this.ownerAddress = AptosAddress.create(input.ownerAddress);
    }
    AptosHistoricalCoinBalanceDto.create = function (input) {
        if (input instanceof AptosHistoricalCoinBalanceDto) {
            return input;
        }
        return new AptosHistoricalCoinBalanceDto(input);
    };
    AptosHistoricalCoinBalanceDto.fromJSON = function (json) {
        var input = {
            amount: AptosNative.fromJSON(json.amount),
            coinType: json.coin_type,
            coinTypeHash: json.coin_type_hash,
            transactionTimestamp: json.transaction_timestamp,
            transactionVersion: json.transaction_version,
            ownerAddress: AptosAddress.fromJSON(json.owner_address),
        };
        return AptosHistoricalCoinBalanceDto.create(input);
    };
    AptosHistoricalCoinBalanceDto.prototype.toJSON = function () {
        return {
            amount: this.amount.toJSON(),
            coin_type: this.coinType,
            coin_type_hash: this.coinTypeHash,
            transaction_timestamp: this.transactionTimestamp,
            transaction_version: this.transactionVersion,
            owner_address: this.ownerAddress.toJSON(),
        };
    };
    return AptosHistoricalCoinBalanceDto;
}());

var AptosGetHistoricalCoinBalancesByWalletsResponse = /** @class */ (function () {
    function AptosGetHistoricalCoinBalancesByWalletsResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosHistoricalCoinBalanceDto.create(item); });
    }
    AptosGetHistoricalCoinBalancesByWalletsResponse.create = function (input) {
        if (input instanceof AptosGetHistoricalCoinBalancesByWalletsResponse) {
            return input;
        }
        return new AptosGetHistoricalCoinBalancesByWalletsResponse(input);
    };
    AptosGetHistoricalCoinBalancesByWalletsResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosHistoricalCoinBalanceDto.fromJSON(item); }),
        };
        return AptosGetHistoricalCoinBalancesByWalletsResponse.create(input);
    };
    AptosGetHistoricalCoinBalancesByWalletsResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGetHistoricalCoinBalancesByWalletsResponse;
}());

var GetHistoricalCoinBalancesByWalletsOperation = {
    operationId: "getHistoricalCoinBalancesByWallets",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/coins/history",
    parameterNames: ["limit", "offset", "cursor", "owner_addresses", "coin_type_hash_blacklist", "coin_type_hash_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetHistoricalCoinBalancesByWalletsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var ownerAddresses = request.ownerAddresses.map(function (item) { return AptosAddress.create(item); });
        var coinTypeHashBlacklist = request.coinTypeHashBlacklist;
        var coinTypeHashWhitelist = request.coinTypeHashWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            owner_addresses: ownerAddresses.map(function (item) { return item.toJSON(); }),
            coin_type_hash_blacklist: coinTypeHashBlacklist,
            coin_type_hash_whitelist: coinTypeHashWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetCoinTransfersByWalletAddressesOperation = {
    operationId: "getCoinTransfersByWalletAddresses",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/coins/transfers",
    parameterNames: ["limit", "offset", "cursor", "owner_addresses", "from_date", "to_date", "coin_type_blacklist", "coin_type_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetCoinTransfersByOwnerAddressesResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var ownerAddresses = request.ownerAddresses.map(function (item) { return AptosAddress.create(item); });
        var fromDate = request.fromDate;
        var toDate = request.toDate;
        var coinTypeBlacklist = request.coinTypeBlacklist;
        var coinTypeWhitelist = request.coinTypeWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            owner_addresses: ownerAddresses.map(function (item) { return item.toJSON(); }),
            from_date: fromDate,
            to_date: toDate,
            coin_type_blacklist: coinTypeBlacklist,
            coin_type_whitelist: coinTypeWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosNFTsByOwnersResponse = /** @class */ (function () {
    function AptosNFTsByOwnersResponse(input) {
        this.cursor = input.cursor;
        this.hasNextPage = input.hasNextPage;
        this.result = input.result.map(function (item) { return AptosNFTOwnerResponse.create(item); });
    }
    AptosNFTsByOwnersResponse.create = function (input) {
        if (input instanceof AptosNFTsByOwnersResponse) {
            return input;
        }
        return new AptosNFTsByOwnersResponse(input);
    };
    AptosNFTsByOwnersResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            hasNextPage: json.hasNextPage,
            result: json.result.map(function (item) { return AptosNFTOwnerResponse.fromJSON(item); }),
        };
        return AptosNFTsByOwnersResponse.create(input);
    };
    AptosNFTsByOwnersResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            hasNextPage: this.hasNextPage,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosNFTsByOwnersResponse;
}());

var GetNFTByOwnersOperation = {
    operationId: "getNFTByOwners",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/nfts",
    parameterNames: ["limit", "offset", "cursor", "owner_addresses", "collection_blacklist", "collection_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTsByOwnersResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var ownerAddresses = request.ownerAddresses.map(function (item) { return AptosAddress.create(item); });
        var collectionBlacklist = request.collectionBlacklist;
        var collectionWhitelist = request.collectionWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            owner_addresses: ownerAddresses.map(function (item) { return item.toJSON(); }),
            collection_blacklist: collectionBlacklist,
            collection_whitelist: collectionWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetWalletsNFTTransfersOperation = {
    operationId: "getWalletsNFTTransfers",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/nfts/transfers",
    parameterNames: ["limit", "offset", "cursor", "wallet_addresses", "collection_blacklist", "collection_whitelist", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosNFTTransfersByWalletsResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var offset = request.offset;
        var cursor = request.cursor;
        var walletAddresses = request.walletAddresses.map(function (item) { return AptosAddress.create(item); });
        var collectionBlacklist = request.collectionBlacklist;
        var collectionWhitelist = request.collectionWhitelist;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            offset: offset,
            cursor: cursor,
            wallet_addresses: walletAddresses.map(function (item) { return item.toJSON(); }),
            collection_blacklist: collectionBlacklist,
            collection_whitelist: collectionWhitelist,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/GetAccountResponse
// type: GetAccountResponse
// properties:
// - sequence_number ($ref: #/components/schemas/GetAccountResponse/properties/sequence_number)
// - authentication_key ($ref: #/components/schemas/GetAccountResponse/properties/authentication_key)
var AptosGetAccountResponse = /** @class */ (function () {
    function AptosGetAccountResponse(input) {
        this.sequenceNumber = input.sequenceNumber;
        this.authenticationKey = input.authenticationKey;
    }
    AptosGetAccountResponse.create = function (input) {
        if (input instanceof AptosGetAccountResponse) {
            return input;
        }
        return new AptosGetAccountResponse(input);
    };
    AptosGetAccountResponse.fromJSON = function (json) {
        var input = {
            sequenceNumber: json.sequence_number,
            authenticationKey: json.authentication_key,
        };
        return AptosGetAccountResponse.create(input);
    };
    AptosGetAccountResponse.prototype.toJSON = function () {
        return {
            sequence_number: this.sequenceNumber,
            authentication_key: this.authenticationKey,
        };
    };
    return AptosGetAccountResponse;
}());

var GetAccountOperation = {
    operationId: "getAccount",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}",
    parameterNames: ["address", "ledger_version", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetAccountResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var address = request.address;
        var ledgerVersion = request.ledgerVersion;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            ledger_version: ledgerVersion,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/GetAccountResourceResponse/properties/data
// typeName: GetAccountResourceResponse_data
var AptosGetAccountResourceResponseData = /** @class */ (function () {
    function AptosGetAccountResourceResponseData() {
    }
    AptosGetAccountResourceResponseData.create = function (input) {
        return input;
    };
    AptosGetAccountResourceResponseData.fromJSON = function (json) {
        return json;
    };
    return AptosGetAccountResourceResponseData;
}());

var AptosGetAccountResourceResponse = /** @class */ (function () {
    function AptosGetAccountResourceResponse(input) {
        this.type = input.type;
        this.data = AptosGetAccountResourceResponseData.create(input.data);
    }
    AptosGetAccountResourceResponse.create = function (input) {
        if (input instanceof AptosGetAccountResourceResponse) {
            return input;
        }
        return new AptosGetAccountResourceResponse(input);
    };
    AptosGetAccountResourceResponse.fromJSON = function (json) {
        var input = {
            type: json.type,
            data: AptosGetAccountResourceResponseData.fromJSON(json.data),
        };
        return AptosGetAccountResourceResponse.create(input);
    };
    AptosGetAccountResourceResponse.prototype.toJSON = function () {
        return {
            type: this.type,
            data: this.data,
        };
    };
    return AptosGetAccountResourceResponse;
}());

var GetAccountResourcesOperation = {
    operationId: "getAccountResources",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/resources",
    parameterNames: ["address", "ledger_version", "limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetAccountResourceResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var address = request.address;
        var ledgerVersion = request.ledgerVersion;
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            ledger_version: ledgerVersion,
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/GenericTypeParam
// type: GenericTypeParam
// properties:
// - constraints ($ref: #/components/schemas/GenericTypeParam/properties/constraints)
var AptosGenericTypeParam = /** @class */ (function () {
    function AptosGenericTypeParam(input) {
        this.constraints = input.constraints;
    }
    AptosGenericTypeParam.create = function (input) {
        if (input instanceof AptosGenericTypeParam) {
            return input;
        }
        return new AptosGenericTypeParam(input);
    };
    AptosGenericTypeParam.fromJSON = function (json) {
        var input = {
            constraints: json.constraints,
        };
        return AptosGenericTypeParam.create(input);
    };
    AptosGenericTypeParam.prototype.toJSON = function () {
        return {
            constraints: this.constraints,
        };
    };
    return AptosGenericTypeParam;
}());

var AptosModuleExposedFunction = /** @class */ (function () {
    function AptosModuleExposedFunction(input) {
        this.name = input.name;
        this.visibility = input.visibility;
        this.isEntry = input.isEntry;
        this.genericTypeParams = input.genericTypeParams.map(function (item) { return AptosGenericTypeParam.create(item); });
        this.params = input.params;
        this.return = input.return;
    }
    AptosModuleExposedFunction.create = function (input) {
        if (input instanceof AptosModuleExposedFunction) {
            return input;
        }
        return new AptosModuleExposedFunction(input);
    };
    AptosModuleExposedFunction.fromJSON = function (json) {
        var input = {
            name: json.name,
            visibility: json.visibility,
            isEntry: json.is_entry,
            genericTypeParams: json.generic_type_params.map(function (item) { return AptosGenericTypeParam.fromJSON(item); }),
            params: json.params,
            return: json.return,
        };
        return AptosModuleExposedFunction.create(input);
    };
    AptosModuleExposedFunction.prototype.toJSON = function () {
        return {
            name: this.name,
            visibility: this.visibility,
            is_entry: this.isEntry,
            generic_type_params: this.genericTypeParams.map(function (item) { return item.toJSON(); }),
            params: this.params,
            return: this.return,
        };
    };
    return AptosModuleExposedFunction;
}());

// $ref: #/components/schemas/ModuleStructField
// type: ModuleStructField
// properties:
// - name ($ref: #/components/schemas/ModuleStructField/properties/name)
// - type ($ref: #/components/schemas/ModuleStructField/properties/type)
var AptosModuleStructField = /** @class */ (function () {
    function AptosModuleStructField(input) {
        this.name = input.name;
        this.type = input.type;
    }
    AptosModuleStructField.create = function (input) {
        if (input instanceof AptosModuleStructField) {
            return input;
        }
        return new AptosModuleStructField(input);
    };
    AptosModuleStructField.fromJSON = function (json) {
        var input = {
            name: json.name,
            type: json.type,
        };
        return AptosModuleStructField.create(input);
    };
    AptosModuleStructField.prototype.toJSON = function () {
        return {
            name: this.name,
            type: this.type,
        };
    };
    return AptosModuleStructField;
}());

var AptosModuleStruct = /** @class */ (function () {
    function AptosModuleStruct(input) {
        this.name = input.name;
        this.isNative = input.isNative;
        this.abilities = input.abilities;
        this.genericTypeParams = input.genericTypeParams.map(function (item) { return AptosGenericTypeParam.create(item); });
        this.fields = input.fields.map(function (item) { return AptosModuleStructField.create(item); });
    }
    AptosModuleStruct.create = function (input) {
        if (input instanceof AptosModuleStruct) {
            return input;
        }
        return new AptosModuleStruct(input);
    };
    AptosModuleStruct.fromJSON = function (json) {
        var input = {
            name: json.name,
            isNative: json.is_native,
            abilities: json.abilities,
            genericTypeParams: json.generic_type_params.map(function (item) { return AptosGenericTypeParam.fromJSON(item); }),
            fields: json.fields.map(function (item) { return AptosModuleStructField.fromJSON(item); }),
        };
        return AptosModuleStruct.create(input);
    };
    AptosModuleStruct.prototype.toJSON = function () {
        return {
            name: this.name,
            is_native: this.isNative,
            abilities: this.abilities,
            generic_type_params: this.genericTypeParams.map(function (item) { return item.toJSON(); }),
            fields: this.fields.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosModuleStruct;
}());

var AptosMoveModuleAbi = /** @class */ (function () {
    function AptosMoveModuleAbi(input) {
        this.address = AptosAddress.create(input.address);
        this.name = input.name;
        this.friends = input.friends;
        this.exposedFunctions = input.exposedFunctions.map(function (item) { return AptosModuleExposedFunction.create(item); });
        this.structs = input.structs.map(function (item) { return AptosModuleStruct.create(item); });
    }
    AptosMoveModuleAbi.create = function (input) {
        if (input instanceof AptosMoveModuleAbi) {
            return input;
        }
        return new AptosMoveModuleAbi(input);
    };
    AptosMoveModuleAbi.fromJSON = function (json) {
        var input = {
            address: AptosAddress.fromJSON(json.address),
            name: json.name,
            friends: json.friends,
            exposedFunctions: json.exposed_functions.map(function (item) { return AptosModuleExposedFunction.fromJSON(item); }),
            structs: json.structs.map(function (item) { return AptosModuleStruct.fromJSON(item); }),
        };
        return AptosMoveModuleAbi.create(input);
    };
    AptosMoveModuleAbi.prototype.toJSON = function () {
        return {
            address: this.address.toJSON(),
            name: this.name,
            friends: this.friends,
            exposed_functions: this.exposedFunctions.map(function (item) { return item.toJSON(); }),
            structs: this.structs.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosMoveModuleAbi;
}());

var AptosGetAccountModuleResponse = /** @class */ (function () {
    function AptosGetAccountModuleResponse(input) {
        this.bytecode = input.bytecode;
        this.abi = AptosMoveModuleAbi.create(input.abi);
    }
    AptosGetAccountModuleResponse.create = function (input) {
        if (input instanceof AptosGetAccountModuleResponse) {
            return input;
        }
        return new AptosGetAccountModuleResponse(input);
    };
    AptosGetAccountModuleResponse.fromJSON = function (json) {
        var input = {
            bytecode: json.bytecode,
            abi: AptosMoveModuleAbi.fromJSON(json.abi),
        };
        return AptosGetAccountModuleResponse.create(input);
    };
    AptosGetAccountModuleResponse.prototype.toJSON = function () {
        return {
            bytecode: this.bytecode,
            abi: this.abi.toJSON(),
        };
    };
    return AptosGetAccountModuleResponse;
}());

var GetAccountModulesOperation = {
    operationId: "getAccountModules",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/modules",
    parameterNames: ["address", "ledger_version", "limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetAccountModuleResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var address = request.address;
        var ledgerVersion = request.ledgerVersion;
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            ledger_version: ledgerVersion,
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetAccountResourceOperation = {
    operationId: "getAccountResource",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/resource/{resource_type}",
    parameterNames: ["address", "resource_type", "ledger_version", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetAccountResourceResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var address = request.address;
        var resourceType = request.resourceType;
        var ledgerVersion = request.ledgerVersion;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            resource_type: resourceType,
            ledger_version: ledgerVersion,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetAccountModuleOperation = {
    operationId: "getAccountModule",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/resource/{module_name}",
    parameterNames: ["address", "module_name", "ledger_version", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetAccountModuleResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var address = request.address;
        var moduleName = request.moduleName;
        var ledgerVersion = request.ledgerVersion;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            module_name: moduleName,
            ledger_version: ledgerVersion,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosTransactionEventGuid = /** @class */ (function () {
    function AptosTransactionEventGuid(input) {
        this.creationNumber = input.creationNumber;
        this.accountAddress = AptosAddress.create(input.accountAddress);
    }
    AptosTransactionEventGuid.create = function (input) {
        if (input instanceof AptosTransactionEventGuid) {
            return input;
        }
        return new AptosTransactionEventGuid(input);
    };
    AptosTransactionEventGuid.fromJSON = function (json) {
        var input = {
            creationNumber: json.creation_number,
            accountAddress: AptosAddress.fromJSON(json.account_address),
        };
        return AptosTransactionEventGuid.create(input);
    };
    AptosTransactionEventGuid.prototype.toJSON = function () {
        return {
            creation_number: this.creationNumber,
            account_address: this.accountAddress.toJSON(),
        };
    };
    return AptosTransactionEventGuid;
}());

// $ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/data
// typeName: GetEventsByCreationNumberResponse_data
var AptosGetEventsByCreationNumberResponseData = /** @class */ (function () {
    function AptosGetEventsByCreationNumberResponseData() {
    }
    AptosGetEventsByCreationNumberResponseData.create = function (input) {
        return input;
    };
    AptosGetEventsByCreationNumberResponseData.fromJSON = function (json) {
        return json;
    };
    return AptosGetEventsByCreationNumberResponseData;
}());

var AptosGetEventsByCreationNumberResponse = /** @class */ (function () {
    function AptosGetEventsByCreationNumberResponse(input) {
        this.version = input.version;
        this.guid = AptosTransactionEventGuid.create(input.guid);
        this.sequenceNumber = input.sequenceNumber;
        this.type = input.type;
        this.data = AptosGetEventsByCreationNumberResponseData.create(input.data);
    }
    AptosGetEventsByCreationNumberResponse.create = function (input) {
        if (input instanceof AptosGetEventsByCreationNumberResponse) {
            return input;
        }
        return new AptosGetEventsByCreationNumberResponse(input);
    };
    AptosGetEventsByCreationNumberResponse.fromJSON = function (json) {
        var input = {
            version: json.version,
            guid: AptosTransactionEventGuid.fromJSON(json.guid),
            sequenceNumber: json.sequence_number,
            type: json.type,
            data: AptosGetEventsByCreationNumberResponseData.fromJSON(json.data),
        };
        return AptosGetEventsByCreationNumberResponse.create(input);
    };
    AptosGetEventsByCreationNumberResponse.prototype.toJSON = function () {
        return {
            version: this.version,
            guid: this.guid.toJSON(),
            sequence_number: this.sequenceNumber,
            type: this.type,
            data: this.data,
        };
    };
    return AptosGetEventsByCreationNumberResponse;
}());

var GetEventsByCreationNumberOperation = {
    operationId: "getEventsByCreationNumber",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/events/{creation_number}",
    parameterNames: ["address", "creation_number", "limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetEventsByCreationNumberResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var address = request.address;
        var creationNumber = request.creationNumber;
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            creation_number: creationNumber,
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/GetEventsByEventHandleResponse/properties/data
// typeName: GetEventsByEventHandleResponse_data
var AptosGetEventsByEventHandleResponseData = /** @class */ (function () {
    function AptosGetEventsByEventHandleResponseData() {
    }
    AptosGetEventsByEventHandleResponseData.create = function (input) {
        return input;
    };
    AptosGetEventsByEventHandleResponseData.fromJSON = function (json) {
        return json;
    };
    return AptosGetEventsByEventHandleResponseData;
}());

var AptosGetEventsByEventHandleResponse = /** @class */ (function () {
    function AptosGetEventsByEventHandleResponse(input) {
        this.version = input.version;
        this.guid = AptosTransactionEventGuid.create(input.guid);
        this.sequenceNumber = input.sequenceNumber;
        this.type = input.type;
        this.data = AptosGetEventsByEventHandleResponseData.create(input.data);
    }
    AptosGetEventsByEventHandleResponse.create = function (input) {
        if (input instanceof AptosGetEventsByEventHandleResponse) {
            return input;
        }
        return new AptosGetEventsByEventHandleResponse(input);
    };
    AptosGetEventsByEventHandleResponse.fromJSON = function (json) {
        var input = {
            version: json.version,
            guid: AptosTransactionEventGuid.fromJSON(json.guid),
            sequenceNumber: json.sequence_number,
            type: json.type,
            data: AptosGetEventsByEventHandleResponseData.fromJSON(json.data),
        };
        return AptosGetEventsByEventHandleResponse.create(input);
    };
    AptosGetEventsByEventHandleResponse.prototype.toJSON = function () {
        return {
            version: this.version,
            guid: this.guid.toJSON(),
            sequence_number: this.sequenceNumber,
            type: this.type,
            data: this.data,
        };
    };
    return AptosGetEventsByEventHandleResponse;
}());

var GetEventsByEventHandleOperation = {
    operationId: "getEventsByEventHandle",
    groupName: "accounts",
    httpMethod: "get",
    routePattern: "/accounts/{address}/events/{event_handle}/{field_name}",
    parameterNames: ["address", "event_handle", "field_name", "limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetEventsByEventHandleResponse.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var address = request.address;
        var eventHandle = request.eventHandle;
        var fieldName = request.fieldName;
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            event_handle: eventHandle,
            field_name: fieldName,
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/EntryFunctionPayloadRequest
// type: EntryFunctionPayloadRequest
// properties:
// - type ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/type)
// - function ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/function)
// - type_arguments ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/type_arguments)
// - arguments ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/arguments)
var AptosEntryFunctionPayloadRequest = /** @class */ (function () {
    function AptosEntryFunctionPayloadRequest(input) {
        this.type = input.type;
        this.function = input.function;
        this.typeArguments = input.typeArguments;
        this.arguments = input.arguments;
    }
    AptosEntryFunctionPayloadRequest.create = function (input) {
        if (input instanceof AptosEntryFunctionPayloadRequest) {
            return input;
        }
        return new AptosEntryFunctionPayloadRequest(input);
    };
    AptosEntryFunctionPayloadRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            function: json.function,
            typeArguments: json.type_arguments,
            arguments: json.arguments,
        };
        return AptosEntryFunctionPayloadRequest.create(input);
    };
    AptosEntryFunctionPayloadRequest.isInput = function (input) {
        return ["type", "function", "typeArguments", "arguments"].every(function (name) { return input[name] !== undefined; });
    };
    AptosEntryFunctionPayloadRequest.isJSON = function (json) {
        return ["type", "function", "type_arguments", "arguments"].every(function (name) { return json[name] !== undefined; });
    };
    AptosEntryFunctionPayloadRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            function: this.function,
            type_arguments: this.typeArguments,
            arguments: this.arguments,
        };
    };
    return AptosEntryFunctionPayloadRequest;
}());

// $ref: #/components/schemas/ScriptPayloadRequest/properties/code
// typeName: ScriptPayloadRequest_code
var AptosScriptPayloadRequestCode = /** @class */ (function () {
    function AptosScriptPayloadRequestCode() {
    }
    AptosScriptPayloadRequestCode.create = function (input) {
        return input;
    };
    AptosScriptPayloadRequestCode.fromJSON = function (json) {
        return json;
    };
    return AptosScriptPayloadRequestCode;
}());

var AptosScriptPayloadRequest = /** @class */ (function () {
    function AptosScriptPayloadRequest(input) {
        this.type = input.type;
        this.code = AptosScriptPayloadRequestCode.create(input.code);
        this.typeArguments = input.typeArguments;
        this.arguments = input.arguments;
    }
    AptosScriptPayloadRequest.create = function (input) {
        if (input instanceof AptosScriptPayloadRequest) {
            return input;
        }
        return new AptosScriptPayloadRequest(input);
    };
    AptosScriptPayloadRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            code: AptosScriptPayloadRequestCode.fromJSON(json.code),
            typeArguments: json.type_arguments,
            arguments: json.arguments,
        };
        return AptosScriptPayloadRequest.create(input);
    };
    AptosScriptPayloadRequest.isInput = function (input) {
        return ["type", "code", "typeArguments", "arguments"].every(function (name) { return input[name] !== undefined; });
    };
    AptosScriptPayloadRequest.isJSON = function (json) {
        return ["type", "code", "type_arguments", "arguments"].every(function (name) { return json[name] !== undefined; });
    };
    AptosScriptPayloadRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            code: this.code,
            type_arguments: this.typeArguments,
            arguments: this.arguments,
        };
    };
    return AptosScriptPayloadRequest;
}());

// $ref: #/components/schemas/ModuleBundlePayloadRequest
// type: ModuleBundlePayloadRequest
// properties:
// - type ($ref: #/components/schemas/ModuleBundlePayloadRequest/properties/type)
// - modules ($ref: #/components/schemas/ModuleBundlePayloadRequest/properties/modules)
var AptosModuleBundlePayloadRequest = /** @class */ (function () {
    function AptosModuleBundlePayloadRequest(input) {
        this.type = input.type;
        this.modules = input.modules;
    }
    AptosModuleBundlePayloadRequest.create = function (input) {
        if (input instanceof AptosModuleBundlePayloadRequest) {
            return input;
        }
        return new AptosModuleBundlePayloadRequest(input);
    };
    AptosModuleBundlePayloadRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            modules: json.modules,
        };
        return AptosModuleBundlePayloadRequest.create(input);
    };
    AptosModuleBundlePayloadRequest.isInput = function (input) {
        return ["type", "modules"].every(function (name) { return input[name] !== undefined; });
    };
    AptosModuleBundlePayloadRequest.isJSON = function (json) {
        return ["type", "modules"].every(function (name) { return json[name] !== undefined; });
    };
    AptosModuleBundlePayloadRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            modules: this.modules,
        };
    };
    return AptosModuleBundlePayloadRequest;
}());

var AptosPendingTransactionPayload = /** @class */ (function () {
    function AptosPendingTransactionPayload() {
    }
    AptosPendingTransactionPayload.create = function (input) {
        if (AptosEntryFunctionPayloadRequest.isInput(input)) {
            return AptosEntryFunctionPayloadRequest.create(input);
        }
        if (AptosScriptPayloadRequest.isInput(input)) {
            return AptosScriptPayloadRequest.create(input);
        }
        if (AptosModuleBundlePayloadRequest.isInput(input)) {
            return AptosModuleBundlePayloadRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosPendingTransactionPayloadInput');
    };
    AptosPendingTransactionPayload.fromJSON = function (json) {
        if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
            return AptosEntryFunctionPayloadRequest.fromJSON(json);
        }
        if (AptosScriptPayloadRequest.isJSON(json)) {
            return AptosScriptPayloadRequest.fromJSON(json);
        }
        if (AptosModuleBundlePayloadRequest.isJSON(json)) {
            return AptosModuleBundlePayloadRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosPendingTransactionPayloadJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosPendingTransactionPayload.toJSON = function (value) {
        if (value instanceof AptosEntryFunctionPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosScriptPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosModuleBundlePayloadRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosPendingTransactionPayloadValue');
    };
    return AptosPendingTransactionPayload;
}());

// $ref: #/components/schemas/Ed25519SignatureRequest
// type: Ed25519SignatureRequest
// properties:
// - type ($ref: #/components/schemas/Ed25519SignatureRequest/properties/type)
// - signature ($ref: #/components/schemas/Ed25519SignatureRequest/properties/signature)
// - public_key ($ref: #/components/schemas/Ed25519SignatureRequest/properties/public_key)
var AptosEd25519SignatureRequest = /** @class */ (function () {
    function AptosEd25519SignatureRequest(input) {
        this.type = input.type;
        this.signature = input.signature;
        this.publicKey = input.publicKey;
    }
    AptosEd25519SignatureRequest.create = function (input) {
        if (input instanceof AptosEd25519SignatureRequest) {
            return input;
        }
        return new AptosEd25519SignatureRequest(input);
    };
    AptosEd25519SignatureRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            signature: json.signature,
            publicKey: json.public_key,
        };
        return AptosEd25519SignatureRequest.create(input);
    };
    AptosEd25519SignatureRequest.isInput = function (input) {
        return ["type", "signature", "publicKey"].every(function (name) { return input[name] !== undefined; });
    };
    AptosEd25519SignatureRequest.isJSON = function (json) {
        return ["type", "signature", "public_key"].every(function (name) { return json[name] !== undefined; });
    };
    AptosEd25519SignatureRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            signature: this.signature,
            public_key: this.publicKey,
        };
    };
    return AptosEd25519SignatureRequest;
}());

// $ref: #/components/schemas/MultiEd25519SignatureRequest
// type: MultiEd25519SignatureRequest
// properties:
// - type ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/type)
// - public_keys ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/public_keys)
// - signatures ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/signatures)
// - threshold ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/threshold)
// - bitmap ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/bitmap)
var AptosMultiEd25519SignatureRequest = /** @class */ (function () {
    function AptosMultiEd25519SignatureRequest(input) {
        this.type = input.type;
        this.publicKeys = input.publicKeys;
        this.signatures = input.signatures;
        this.threshold = input.threshold;
        this.bitmap = input.bitmap;
    }
    AptosMultiEd25519SignatureRequest.create = function (input) {
        if (input instanceof AptosMultiEd25519SignatureRequest) {
            return input;
        }
        return new AptosMultiEd25519SignatureRequest(input);
    };
    AptosMultiEd25519SignatureRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            publicKeys: json.public_keys,
            signatures: json.signatures,
            threshold: json.threshold,
            bitmap: json.bitmap,
        };
        return AptosMultiEd25519SignatureRequest.create(input);
    };
    AptosMultiEd25519SignatureRequest.isInput = function (input) {
        return ["type", "publicKeys", "signatures", "threshold", "bitmap"].every(function (name) { return input[name] !== undefined; });
    };
    AptosMultiEd25519SignatureRequest.isJSON = function (json) {
        return ["type", "public_keys", "signatures", "threshold", "bitmap"].every(function (name) { return json[name] !== undefined; });
    };
    AptosMultiEd25519SignatureRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            public_keys: this.publicKeys,
            signatures: this.signatures,
            threshold: this.threshold,
            bitmap: this.bitmap,
        };
    };
    return AptosMultiEd25519SignatureRequest;
}());

var AptosMultiAgentSignatureRequestSecondarySigners = /** @class */ (function () {
    function AptosMultiAgentSignatureRequestSecondarySigners() {
    }
    AptosMultiAgentSignatureRequestSecondarySigners.create = function (input) {
        if (AptosEd25519SignatureRequest.isInput(input)) {
            return AptosEd25519SignatureRequest.create(input);
        }
        if (AptosMultiEd25519SignatureRequest.isInput(input)) {
            return AptosMultiEd25519SignatureRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSecondarySignersInput');
    };
    AptosMultiAgentSignatureRequestSecondarySigners.fromJSON = function (json) {
        if (AptosEd25519SignatureRequest.isJSON(json)) {
            return AptosEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
            return AptosMultiEd25519SignatureRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosMultiAgentSignatureRequestSecondarySignersJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosMultiAgentSignatureRequestSecondarySigners.toJSON = function (value) {
        if (value instanceof AptosEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiEd25519SignatureRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSecondarySignersValue');
    };
    return AptosMultiAgentSignatureRequestSecondarySigners;
}());

var AptosMultiAgentSignatureRequest = /** @class */ (function () {
    function AptosMultiAgentSignatureRequest(input) {
        this.type = input.type;
        this.sender = AptosAddress.create(input.sender);
        this.secondarySignerAddresses = input.secondarySignerAddresses;
        this.secondarySigners = AptosMultiAgentSignatureRequestSecondarySigners.create(input.secondarySigners);
    }
    AptosMultiAgentSignatureRequest.create = function (input) {
        if (input instanceof AptosMultiAgentSignatureRequest) {
            return input;
        }
        return new AptosMultiAgentSignatureRequest(input);
    };
    AptosMultiAgentSignatureRequest.fromJSON = function (json) {
        var input = {
            type: json.type,
            sender: AptosAddress.fromJSON(json.sender),
            secondarySignerAddresses: json.secondary_signer_addresses,
            secondarySigners: AptosMultiAgentSignatureRequestSecondarySigners.fromJSON(json.secondary_signers),
        };
        return AptosMultiAgentSignatureRequest.create(input);
    };
    AptosMultiAgentSignatureRequest.isInput = function (input) {
        return ["type", "sender", "secondarySignerAddresses", "secondarySigners"].every(function (name) { return input[name] !== undefined; });
    };
    AptosMultiAgentSignatureRequest.isJSON = function (json) {
        return ["type", "sender", "secondary_signer_addresses", "secondary_signers"].every(function (name) { return json[name] !== undefined; });
    };
    AptosMultiAgentSignatureRequest.prototype.toJSON = function () {
        return {
            type: this.type,
            sender: this.sender.toJSON(),
            secondary_signer_addresses: this.secondarySignerAddresses,
            secondary_signers: AptosMultiAgentSignatureRequestSecondarySigners.toJSON(this.secondarySigners),
        };
    };
    return AptosMultiAgentSignatureRequest;
}());

var AptosPendingTransactionSignature = /** @class */ (function () {
    function AptosPendingTransactionSignature() {
    }
    AptosPendingTransactionSignature.create = function (input) {
        if (AptosEd25519SignatureRequest.isInput(input)) {
            return AptosEd25519SignatureRequest.create(input);
        }
        if (AptosMultiEd25519SignatureRequest.isInput(input)) {
            return AptosMultiEd25519SignatureRequest.create(input);
        }
        if (AptosMultiAgentSignatureRequest.isInput(input)) {
            return AptosMultiAgentSignatureRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosPendingTransactionSignatureInput');
    };
    AptosPendingTransactionSignature.fromJSON = function (json) {
        if (AptosEd25519SignatureRequest.isJSON(json)) {
            return AptosEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
            return AptosMultiEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiAgentSignatureRequest.isJSON(json)) {
            return AptosMultiAgentSignatureRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosPendingTransactionSignatureJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosPendingTransactionSignature.toJSON = function (value) {
        if (value instanceof AptosEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiAgentSignatureRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosPendingTransactionSignatureValue');
    };
    return AptosPendingTransactionSignature;
}());

var AptosPendingTransaction = /** @class */ (function () {
    function AptosPendingTransaction(input) {
        this.hash = input.hash;
        this.sender = AptosAddress.create(input.sender);
        this.sequenceNumber = input.sequenceNumber;
        this.maxGasAmount = input.maxGasAmount;
        this.gasUnitPrice = input.gasUnitPrice;
        this.expirationTimestampSecs = input.expirationTimestampSecs;
        this.payload = AptosPendingTransactionPayload.create(input.payload);
        this.signature = AptosPendingTransactionSignature.create(input.signature);
    }
    AptosPendingTransaction.create = function (input) {
        if (input instanceof AptosPendingTransaction) {
            return input;
        }
        return new AptosPendingTransaction(input);
    };
    AptosPendingTransaction.fromJSON = function (json) {
        var input = {
            hash: json.hash,
            sender: AptosAddress.fromJSON(json.sender),
            sequenceNumber: json.sequence_number,
            maxGasAmount: json.max_gas_amount,
            gasUnitPrice: json.gas_unit_price,
            expirationTimestampSecs: json.expiration_timestamp_secs,
            payload: AptosPendingTransactionPayload.fromJSON(json.payload),
            signature: AptosPendingTransactionSignature.fromJSON(json.signature),
        };
        return AptosPendingTransaction.create(input);
    };
    AptosPendingTransaction.isInput = function (input) {
        return input.type === 'pending_transaction';
    };
    AptosPendingTransaction.isJSON = function (json) {
        return json.type === 'pending_transaction';
    };
    AptosPendingTransaction.prototype.toJSON = function () {
        return {
            hash: this.hash,
            sender: this.sender.toJSON(),
            sequence_number: this.sequenceNumber,
            max_gas_amount: this.maxGasAmount,
            gas_unit_price: this.gasUnitPrice,
            expiration_timestamp_secs: this.expirationTimestampSecs,
            payload: AptosPendingTransactionPayload.toJSON(this.payload),
            signature: AptosPendingTransactionSignature.toJSON(this.signature),
        };
    };
    return AptosPendingTransaction;
}());

// $ref: #/components/schemas/DeleteModuleChange/properties/module
// typeName: DeleteModuleChange_module
var AptosDeleteModuleChangeModule = /** @class */ (function () {
    function AptosDeleteModuleChangeModule() {
    }
    AptosDeleteModuleChangeModule.create = function (input) {
        return input;
    };
    AptosDeleteModuleChangeModule.fromJSON = function (json) {
        return json;
    };
    return AptosDeleteModuleChangeModule;
}());

var AptosDeleteModuleChange = /** @class */ (function () {
    function AptosDeleteModuleChange(input) {
        this.type = input.type;
        this.address = AptosAddress.create(input.address);
        this.stateKeyHash = input.stateKeyHash;
        this.module = AptosDeleteModuleChangeModule.create(input.module);
    }
    AptosDeleteModuleChange.create = function (input) {
        if (input instanceof AptosDeleteModuleChange) {
            return input;
        }
        return new AptosDeleteModuleChange(input);
    };
    AptosDeleteModuleChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            address: AptosAddress.fromJSON(json.address),
            stateKeyHash: json.state_key_hash,
            module: AptosDeleteModuleChangeModule.fromJSON(json.module),
        };
        return AptosDeleteModuleChange.create(input);
    };
    AptosDeleteModuleChange.isInput = function (input) {
        return input.type === 'delete_module';
    };
    AptosDeleteModuleChange.isJSON = function (json) {
        return json.type === 'delete_module';
    };
    AptosDeleteModuleChange.prototype.toJSON = function () {
        return {
            type: this.type,
            address: this.address.toJSON(),
            state_key_hash: this.stateKeyHash,
            module: this.module,
        };
    };
    return AptosDeleteModuleChange;
}());

// $ref: #/components/schemas/DeleteResourceChange/properties/resource
// typeName: DeleteResourceChange_resource
var AptosDeleteResourceChangeResource = /** @class */ (function () {
    function AptosDeleteResourceChangeResource() {
    }
    AptosDeleteResourceChangeResource.create = function (input) {
        return input;
    };
    AptosDeleteResourceChangeResource.fromJSON = function (json) {
        return json;
    };
    return AptosDeleteResourceChangeResource;
}());

var AptosDeleteResourceChange = /** @class */ (function () {
    function AptosDeleteResourceChange(input) {
        this.type = input.type;
        this.address = AptosAddress.create(input.address);
        this.stateKeyHash = input.stateKeyHash;
        this.resource = AptosDeleteResourceChangeResource.create(input.resource);
    }
    AptosDeleteResourceChange.create = function (input) {
        if (input instanceof AptosDeleteResourceChange) {
            return input;
        }
        return new AptosDeleteResourceChange(input);
    };
    AptosDeleteResourceChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            address: AptosAddress.fromJSON(json.address),
            stateKeyHash: json.state_key_hash,
            resource: AptosDeleteResourceChangeResource.fromJSON(json.resource),
        };
        return AptosDeleteResourceChange.create(input);
    };
    AptosDeleteResourceChange.isInput = function (input) {
        return input.type === 'delete_resource';
    };
    AptosDeleteResourceChange.isJSON = function (json) {
        return json.type === 'delete_resource';
    };
    AptosDeleteResourceChange.prototype.toJSON = function () {
        return {
            type: this.type,
            address: this.address.toJSON(),
            state_key_hash: this.stateKeyHash,
            resource: this.resource,
        };
    };
    return AptosDeleteResourceChange;
}());

// $ref: #/components/schemas/DeleteTableItemChange/properties/handle
// typeName: DeleteTableItemChange_handle
var AptosDeleteTableItemChangeHandle = /** @class */ (function () {
    function AptosDeleteTableItemChangeHandle() {
    }
    AptosDeleteTableItemChangeHandle.create = function (input) {
        return input;
    };
    AptosDeleteTableItemChangeHandle.fromJSON = function (json) {
        return json;
    };
    return AptosDeleteTableItemChangeHandle;
}());

// $ref: #/components/schemas/DeleteTableItemChange/properties/key
// typeName: DeleteTableItemChange_key
var AptosDeleteTableItemChangeKey = /** @class */ (function () {
    function AptosDeleteTableItemChangeKey() {
    }
    AptosDeleteTableItemChangeKey.create = function (input) {
        return input;
    };
    AptosDeleteTableItemChangeKey.fromJSON = function (json) {
        return json;
    };
    return AptosDeleteTableItemChangeKey;
}());

// $ref: #/components/schemas/DeletedTableData
// type: DeletedTableData
// properties:
// - key ($ref: #/components/schemas/DeletedTableData/properties/key)
// - key_type ($ref: #/components/schemas/DeletedTableData/properties/key_type)
var AptosDeletedTableData = /** @class */ (function () {
    function AptosDeletedTableData(input) {
        this.key = input.key;
        this.keyType = input.keyType;
    }
    AptosDeletedTableData.create = function (input) {
        if (input instanceof AptosDeletedTableData) {
            return input;
        }
        return new AptosDeletedTableData(input);
    };
    AptosDeletedTableData.fromJSON = function (json) {
        var input = {
            key: json.key,
            keyType: json.key_type,
        };
        return AptosDeletedTableData.create(input);
    };
    AptosDeletedTableData.prototype.toJSON = function () {
        return {
            key: this.key,
            key_type: this.keyType,
        };
    };
    return AptosDeletedTableData;
}());

var AptosDeleteTableItemChange = /** @class */ (function () {
    function AptosDeleteTableItemChange(input) {
        this.type = input.type;
        this.stateKeyHash = input.stateKeyHash;
        this.handle = AptosDeleteTableItemChangeHandle.create(input.handle);
        this.key = AptosDeleteTableItemChangeKey.create(input.key);
        this.data = AptosDeletedTableData.create(input.data);
    }
    AptosDeleteTableItemChange.create = function (input) {
        if (input instanceof AptosDeleteTableItemChange) {
            return input;
        }
        return new AptosDeleteTableItemChange(input);
    };
    AptosDeleteTableItemChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            stateKeyHash: json.state_key_hash,
            handle: AptosDeleteTableItemChangeHandle.fromJSON(json.handle),
            key: AptosDeleteTableItemChangeKey.fromJSON(json.key),
            data: AptosDeletedTableData.fromJSON(json.data),
        };
        return AptosDeleteTableItemChange.create(input);
    };
    AptosDeleteTableItemChange.isInput = function (input) {
        return input.type === 'delete_table_item';
    };
    AptosDeleteTableItemChange.isJSON = function (json) {
        return json.type === 'delete_table_item';
    };
    AptosDeleteTableItemChange.prototype.toJSON = function () {
        return {
            type: this.type,
            state_key_hash: this.stateKeyHash,
            handle: this.handle,
            key: this.key,
            data: this.data.toJSON(),
        };
    };
    return AptosDeleteTableItemChange;
}());

var AptosWriteModuleData = /** @class */ (function () {
    function AptosWriteModuleData(input) {
        this.bytecode = input.bytecode;
        this.abi = AptosMoveModuleAbi.create(input.abi);
    }
    AptosWriteModuleData.create = function (input) {
        if (input instanceof AptosWriteModuleData) {
            return input;
        }
        return new AptosWriteModuleData(input);
    };
    AptosWriteModuleData.fromJSON = function (json) {
        var input = {
            bytecode: json.bytecode,
            abi: AptosMoveModuleAbi.fromJSON(json.abi),
        };
        return AptosWriteModuleData.create(input);
    };
    AptosWriteModuleData.prototype.toJSON = function () {
        return {
            bytecode: this.bytecode,
            abi: this.abi.toJSON(),
        };
    };
    return AptosWriteModuleData;
}());

var AptosWriteOrUpdateModuleChange = /** @class */ (function () {
    function AptosWriteOrUpdateModuleChange(input) {
        this.type = input.type;
        this.address = AptosAddress.create(input.address);
        this.stateKeyHash = input.stateKeyHash;
        this.data = AptosWriteModuleData.create(input.data);
    }
    AptosWriteOrUpdateModuleChange.create = function (input) {
        if (input instanceof AptosWriteOrUpdateModuleChange) {
            return input;
        }
        return new AptosWriteOrUpdateModuleChange(input);
    };
    AptosWriteOrUpdateModuleChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            address: AptosAddress.fromJSON(json.address),
            stateKeyHash: json.state_key_hash,
            data: AptosWriteModuleData.fromJSON(json.data),
        };
        return AptosWriteOrUpdateModuleChange.create(input);
    };
    AptosWriteOrUpdateModuleChange.isInput = function (input) {
        return input.type === 'write_module';
    };
    AptosWriteOrUpdateModuleChange.isJSON = function (json) {
        return json.type === 'write_module';
    };
    AptosWriteOrUpdateModuleChange.prototype.toJSON = function () {
        return {
            type: this.type,
            address: this.address.toJSON(),
            state_key_hash: this.stateKeyHash,
            data: this.data.toJSON(),
        };
    };
    return AptosWriteOrUpdateModuleChange;
}());

// $ref: #/components/schemas/WriteResourceData/properties/data
// typeName: WriteResourceData_data
var AptosWriteResourceDataData = /** @class */ (function () {
    function AptosWriteResourceDataData() {
    }
    AptosWriteResourceDataData.create = function (input) {
        return input;
    };
    AptosWriteResourceDataData.fromJSON = function (json) {
        return json;
    };
    return AptosWriteResourceDataData;
}());

var AptosWriteResourceData = /** @class */ (function () {
    function AptosWriteResourceData(input) {
        this.type = input.type;
        this.data = AptosWriteResourceDataData.create(input.data);
    }
    AptosWriteResourceData.create = function (input) {
        if (input instanceof AptosWriteResourceData) {
            return input;
        }
        return new AptosWriteResourceData(input);
    };
    AptosWriteResourceData.fromJSON = function (json) {
        var input = {
            type: json.type,
            data: AptosWriteResourceDataData.fromJSON(json.data),
        };
        return AptosWriteResourceData.create(input);
    };
    AptosWriteResourceData.prototype.toJSON = function () {
        return {
            type: this.type,
            data: this.data,
        };
    };
    return AptosWriteResourceData;
}());

var AptosWriteResourceChange = /** @class */ (function () {
    function AptosWriteResourceChange(input) {
        this.type = input.type;
        this.address = AptosAddress.create(input.address);
        this.stateKeyHash = input.stateKeyHash;
        this.data = AptosWriteResourceData.create(input.data);
    }
    AptosWriteResourceChange.create = function (input) {
        if (input instanceof AptosWriteResourceChange) {
            return input;
        }
        return new AptosWriteResourceChange(input);
    };
    AptosWriteResourceChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            address: AptosAddress.fromJSON(json.address),
            stateKeyHash: json.state_key_hash,
            data: AptosWriteResourceData.fromJSON(json.data),
        };
        return AptosWriteResourceChange.create(input);
    };
    AptosWriteResourceChange.isInput = function (input) {
        return input.type === 'write_resource';
    };
    AptosWriteResourceChange.isJSON = function (json) {
        return json.type === 'write_resource';
    };
    AptosWriteResourceChange.prototype.toJSON = function () {
        return {
            type: this.type,
            address: this.address.toJSON(),
            state_key_hash: this.stateKeyHash,
            data: this.data.toJSON(),
        };
    };
    return AptosWriteResourceChange;
}());

// $ref: #/components/schemas/DecodedTableData
// type: DecodedTableData
// properties:
// - key ($ref: #/components/schemas/DecodedTableData/properties/key)
// - key_type ($ref: #/components/schemas/DecodedTableData/properties/key_type)
// - value ($ref: #/components/schemas/DecodedTableData/properties/value)
// - value_type ($ref: #/components/schemas/DecodedTableData/properties/value_type)
var AptosDecodedTableData = /** @class */ (function () {
    function AptosDecodedTableData(input) {
        this.key = input.key;
        this.keyType = input.keyType;
        this.value = input.value;
        this.valueType = input.valueType;
    }
    AptosDecodedTableData.create = function (input) {
        if (input instanceof AptosDecodedTableData) {
            return input;
        }
        return new AptosDecodedTableData(input);
    };
    AptosDecodedTableData.fromJSON = function (json) {
        var input = {
            key: json.key,
            keyType: json.key_type,
            value: json.value,
            valueType: json.value_type,
        };
        return AptosDecodedTableData.create(input);
    };
    AptosDecodedTableData.prototype.toJSON = function () {
        return {
            key: this.key,
            key_type: this.keyType,
            value: this.value,
            value_type: this.valueType,
        };
    };
    return AptosDecodedTableData;
}());

var AptosWriteTableChangeSetChange = /** @class */ (function () {
    function AptosWriteTableChangeSetChange(input) {
        this.type = input.type;
        this.stateKeyHash = input.stateKeyHash;
        this.handle = input.handle;
        this.key = input.key;
        this.value = input.value;
        this.data = AptosDecodedTableData.create(input.data);
    }
    AptosWriteTableChangeSetChange.create = function (input) {
        if (input instanceof AptosWriteTableChangeSetChange) {
            return input;
        }
        return new AptosWriteTableChangeSetChange(input);
    };
    AptosWriteTableChangeSetChange.fromJSON = function (json) {
        var input = {
            type: json.type,
            stateKeyHash: json.state_key_hash,
            handle: json.handle,
            key: json.key,
            value: json.value,
            data: AptosDecodedTableData.fromJSON(json.data),
        };
        return AptosWriteTableChangeSetChange.create(input);
    };
    AptosWriteTableChangeSetChange.isInput = function (input) {
        return input.type === 'write_table_item';
    };
    AptosWriteTableChangeSetChange.isJSON = function (json) {
        return json.type === 'write_table_item';
    };
    AptosWriteTableChangeSetChange.prototype.toJSON = function () {
        return {
            type: this.type,
            state_key_hash: this.stateKeyHash,
            handle: this.handle,
            key: this.key,
            value: this.value,
            data: this.data.toJSON(),
        };
    };
    return AptosWriteTableChangeSetChange;
}());

var AptosUserTransactionChangesItem = /** @class */ (function () {
    function AptosUserTransactionChangesItem() {
    }
    AptosUserTransactionChangesItem.create = function (input) {
        if (AptosDeleteModuleChange.isInput(input)) {
            return AptosDeleteModuleChange.create(input);
        }
        if (AptosDeleteResourceChange.isInput(input)) {
            return AptosDeleteResourceChange.create(input);
        }
        if (AptosDeleteTableItemChange.isInput(input)) {
            return AptosDeleteTableItemChange.create(input);
        }
        if (AptosWriteOrUpdateModuleChange.isInput(input)) {
            return AptosWriteOrUpdateModuleChange.create(input);
        }
        if (AptosWriteResourceChange.isInput(input)) {
            return AptosWriteResourceChange.create(input);
        }
        if (AptosWriteTableChangeSetChange.isInput(input)) {
            return AptosWriteTableChangeSetChange.create(input);
        }
        throw new Error('Cannot resolve union from AptosUserTransactionChangesItemInput');
    };
    AptosUserTransactionChangesItem.fromJSON = function (json) {
        if (AptosDeleteModuleChange.isJSON(json)) {
            return AptosDeleteModuleChange.fromJSON(json);
        }
        if (AptosDeleteResourceChange.isJSON(json)) {
            return AptosDeleteResourceChange.fromJSON(json);
        }
        if (AptosDeleteTableItemChange.isJSON(json)) {
            return AptosDeleteTableItemChange.fromJSON(json);
        }
        if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
            return AptosWriteOrUpdateModuleChange.fromJSON(json);
        }
        if (AptosWriteResourceChange.isJSON(json)) {
            return AptosWriteResourceChange.fromJSON(json);
        }
        if (AptosWriteTableChangeSetChange.isJSON(json)) {
            return AptosWriteTableChangeSetChange.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosUserTransactionChangesItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosUserTransactionChangesItem.toJSON = function (value) {
        if (value instanceof AptosDeleteModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteTableItemChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteOrUpdateModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteTableChangeSetChange) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosUserTransactionChangesItemValue');
    };
    return AptosUserTransactionChangesItem;
}());

var AptosUserTransactionPayload = /** @class */ (function () {
    function AptosUserTransactionPayload() {
    }
    AptosUserTransactionPayload.create = function (input) {
        if (AptosEntryFunctionPayloadRequest.isInput(input)) {
            return AptosEntryFunctionPayloadRequest.create(input);
        }
        if (AptosScriptPayloadRequest.isInput(input)) {
            return AptosScriptPayloadRequest.create(input);
        }
        if (AptosModuleBundlePayloadRequest.isInput(input)) {
            return AptosModuleBundlePayloadRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosUserTransactionPayloadInput');
    };
    AptosUserTransactionPayload.fromJSON = function (json) {
        if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
            return AptosEntryFunctionPayloadRequest.fromJSON(json);
        }
        if (AptosScriptPayloadRequest.isJSON(json)) {
            return AptosScriptPayloadRequest.fromJSON(json);
        }
        if (AptosModuleBundlePayloadRequest.isJSON(json)) {
            return AptosModuleBundlePayloadRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosUserTransactionPayloadJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosUserTransactionPayload.toJSON = function (value) {
        if (value instanceof AptosEntryFunctionPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosScriptPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosModuleBundlePayloadRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosUserTransactionPayloadValue');
    };
    return AptosUserTransactionPayload;
}());

var AptosUserTransactionSignature = /** @class */ (function () {
    function AptosUserTransactionSignature() {
    }
    AptosUserTransactionSignature.create = function (input) {
        if (AptosEd25519SignatureRequest.isInput(input)) {
            return AptosEd25519SignatureRequest.create(input);
        }
        if (AptosMultiEd25519SignatureRequest.isInput(input)) {
            return AptosMultiEd25519SignatureRequest.create(input);
        }
        if (AptosMultiAgentSignatureRequest.isInput(input)) {
            return AptosMultiAgentSignatureRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosUserTransactionSignatureInput');
    };
    AptosUserTransactionSignature.fromJSON = function (json) {
        if (AptosEd25519SignatureRequest.isJSON(json)) {
            return AptosEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
            return AptosMultiEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiAgentSignatureRequest.isJSON(json)) {
            return AptosMultiAgentSignatureRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosUserTransactionSignatureJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosUserTransactionSignature.toJSON = function (value) {
        if (value instanceof AptosEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiAgentSignatureRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosUserTransactionSignatureValue');
    };
    return AptosUserTransactionSignature;
}());

// $ref: #/components/schemas/TransactionEvent/properties/data
// typeName: TransactionEvent_data
var AptosTransactionEventData = /** @class */ (function () {
    function AptosTransactionEventData() {
    }
    AptosTransactionEventData.create = function (input) {
        return input;
    };
    AptosTransactionEventData.fromJSON = function (json) {
        return json;
    };
    return AptosTransactionEventData;
}());

var AptosTransactionEvent = /** @class */ (function () {
    function AptosTransactionEvent(input) {
        this.guid = AptosTransactionEventGuid.create(input.guid);
        this.sequenceNumber = input.sequenceNumber;
        this.type = input.type;
        this.data = AptosTransactionEventData.create(input.data);
    }
    AptosTransactionEvent.create = function (input) {
        if (input instanceof AptosTransactionEvent) {
            return input;
        }
        return new AptosTransactionEvent(input);
    };
    AptosTransactionEvent.fromJSON = function (json) {
        var input = {
            guid: AptosTransactionEventGuid.fromJSON(json.guid),
            sequenceNumber: json.sequence_number,
            type: json.type,
            data: AptosTransactionEventData.fromJSON(json.data),
        };
        return AptosTransactionEvent.create(input);
    };
    AptosTransactionEvent.prototype.toJSON = function () {
        return {
            guid: this.guid.toJSON(),
            sequence_number: this.sequenceNumber,
            type: this.type,
            data: this.data,
        };
    };
    return AptosTransactionEvent;
}());

var AptosUserTransaction = /** @class */ (function () {
    function AptosUserTransaction(input) {
        this.type = input.type;
        this.version = input.version;
        this.hash = input.hash;
        this.stateChangeHash = input.stateChangeHash;
        this.eventRootHash = input.eventRootHash;
        this.stateCheckpointHash = input.stateCheckpointHash;
        this.gasUsed = input.gasUsed;
        this.success = input.success;
        this.vmStatus = input.vmStatus;
        this.accumulatorRootHash = input.accumulatorRootHash;
        this.changes = input.changes.map(function (item) { return AptosUserTransactionChangesItem.create(item); });
        this.sender = AptosAddress.create(input.sender);
        this.sequenceNumber = input.sequenceNumber;
        this.maxGasAmount = input.maxGasAmount;
        this.gasUnitPrice = input.gasUnitPrice;
        this.expirationTimestampSecs = input.expirationTimestampSecs;
        this.payload = AptosUserTransactionPayload.create(input.payload);
        this.signature = AptosUserTransactionSignature.create(input.signature);
        this.events = input.events.map(function (item) { return AptosTransactionEvent.create(item); });
        this.timestamp = input.timestamp;
    }
    AptosUserTransaction.create = function (input) {
        if (input instanceof AptosUserTransaction) {
            return input;
        }
        return new AptosUserTransaction(input);
    };
    AptosUserTransaction.fromJSON = function (json) {
        var input = {
            type: json.type,
            version: json.version,
            hash: json.hash,
            stateChangeHash: json.state_change_hash,
            eventRootHash: json.event_root_hash,
            stateCheckpointHash: json.state_checkpoint_hash,
            gasUsed: json.gas_used,
            success: json.success,
            vmStatus: json.vm_status,
            accumulatorRootHash: json.accumulator_root_hash,
            changes: json.changes.map(function (item) { return AptosUserTransactionChangesItem.fromJSON(item); }),
            sender: AptosAddress.fromJSON(json.sender),
            sequenceNumber: json.sequence_number,
            maxGasAmount: json.max_gas_amount,
            gasUnitPrice: json.gas_unit_price,
            expirationTimestampSecs: json.expiration_timestamp_secs,
            payload: AptosUserTransactionPayload.fromJSON(json.payload),
            signature: AptosUserTransactionSignature.fromJSON(json.signature),
            events: json.events.map(function (item) { return AptosTransactionEvent.fromJSON(item); }),
            timestamp: json.timestamp,
        };
        return AptosUserTransaction.create(input);
    };
    AptosUserTransaction.isInput = function (input) {
        return input.type === 'user_transaction';
    };
    AptosUserTransaction.isJSON = function (json) {
        return json.type === 'user_transaction';
    };
    AptosUserTransaction.prototype.toJSON = function () {
        return {
            type: this.type,
            version: this.version,
            hash: this.hash,
            state_change_hash: this.stateChangeHash,
            event_root_hash: this.eventRootHash,
            state_checkpoint_hash: this.stateCheckpointHash,
            gas_used: this.gasUsed,
            success: this.success,
            vm_status: this.vmStatus,
            accumulator_root_hash: this.accumulatorRootHash,
            changes: this.changes.map(function (item) { return AptosUserTransactionChangesItem.toJSON(item); }),
            sender: this.sender.toJSON(),
            sequence_number: this.sequenceNumber,
            max_gas_amount: this.maxGasAmount,
            gas_unit_price: this.gasUnitPrice,
            expiration_timestamp_secs: this.expirationTimestampSecs,
            payload: AptosUserTransactionPayload.toJSON(this.payload),
            signature: AptosUserTransactionSignature.toJSON(this.signature),
            events: this.events.map(function (item) { return item.toJSON(); }),
            timestamp: this.timestamp,
        };
    };
    return AptosUserTransaction;
}());

var AptosGenesisTransactionChangesItem = /** @class */ (function () {
    function AptosGenesisTransactionChangesItem() {
    }
    AptosGenesisTransactionChangesItem.create = function (input) {
        if (AptosDeleteModuleChange.isInput(input)) {
            return AptosDeleteModuleChange.create(input);
        }
        if (AptosDeleteResourceChange.isInput(input)) {
            return AptosDeleteResourceChange.create(input);
        }
        if (AptosDeleteTableItemChange.isInput(input)) {
            return AptosDeleteTableItemChange.create(input);
        }
        if (AptosWriteOrUpdateModuleChange.isInput(input)) {
            return AptosWriteOrUpdateModuleChange.create(input);
        }
        if (AptosWriteResourceChange.isInput(input)) {
            return AptosWriteResourceChange.create(input);
        }
        if (AptosWriteTableChangeSetChange.isInput(input)) {
            return AptosWriteTableChangeSetChange.create(input);
        }
        throw new Error('Cannot resolve union from AptosGenesisTransactionChangesItemInput');
    };
    AptosGenesisTransactionChangesItem.fromJSON = function (json) {
        if (AptosDeleteModuleChange.isJSON(json)) {
            return AptosDeleteModuleChange.fromJSON(json);
        }
        if (AptosDeleteResourceChange.isJSON(json)) {
            return AptosDeleteResourceChange.fromJSON(json);
        }
        if (AptosDeleteTableItemChange.isJSON(json)) {
            return AptosDeleteTableItemChange.fromJSON(json);
        }
        if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
            return AptosWriteOrUpdateModuleChange.fromJSON(json);
        }
        if (AptosWriteResourceChange.isJSON(json)) {
            return AptosWriteResourceChange.fromJSON(json);
        }
        if (AptosWriteTableChangeSetChange.isJSON(json)) {
            return AptosWriteTableChangeSetChange.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosGenesisTransactionChangesItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosGenesisTransactionChangesItem.toJSON = function (value) {
        if (value instanceof AptosDeleteModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteTableItemChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteOrUpdateModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteTableChangeSetChange) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosGenesisTransactionChangesItemValue');
    };
    return AptosGenesisTransactionChangesItem;
}());

var AptosScriptWriteSet = /** @class */ (function () {
    function AptosScriptWriteSet(input) {
        this.type = input.type;
        this.executeAs = input.executeAs;
        this.script = AptosScriptPayloadRequest.create(input.script);
    }
    AptosScriptWriteSet.create = function (input) {
        if (input instanceof AptosScriptWriteSet) {
            return input;
        }
        return new AptosScriptWriteSet(input);
    };
    AptosScriptWriteSet.fromJSON = function (json) {
        var input = {
            type: json.type,
            executeAs: json.execute_as,
            script: AptosScriptPayloadRequest.fromJSON(json.script),
        };
        return AptosScriptWriteSet.create(input);
    };
    AptosScriptWriteSet.isInput = function (input) {
        return input.type === 'script_write_set';
    };
    AptosScriptWriteSet.isJSON = function (json) {
        return json.type === 'script_write_set';
    };
    AptosScriptWriteSet.prototype.toJSON = function () {
        return {
            type: this.type,
            execute_as: this.executeAs,
            script: this.script.toJSON(),
        };
    };
    return AptosScriptWriteSet;
}());

var AptosDirectWriteSet = /** @class */ (function () {
    function AptosDirectWriteSet(input) {
        this.type = input.type;
        this.changes = input.changes;
        this.events = input.events.map(function (item) { return AptosTransactionEvent.create(item); });
    }
    AptosDirectWriteSet.create = function (input) {
        if (input instanceof AptosDirectWriteSet) {
            return input;
        }
        return new AptosDirectWriteSet(input);
    };
    AptosDirectWriteSet.fromJSON = function (json) {
        var input = {
            type: json.type,
            changes: json.changes,
            events: json.events.map(function (item) { return AptosTransactionEvent.fromJSON(item); }),
        };
        return AptosDirectWriteSet.create(input);
    };
    AptosDirectWriteSet.isInput = function (input) {
        return input.type === 'direct_write_set';
    };
    AptosDirectWriteSet.isJSON = function (json) {
        return json.type === 'direct_write_set';
    };
    AptosDirectWriteSet.prototype.toJSON = function () {
        return {
            type: this.type,
            changes: this.changes,
            events: this.events.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosDirectWriteSet;
}());

var AptosWriteSetPayloadWriteSet = /** @class */ (function () {
    function AptosWriteSetPayloadWriteSet() {
    }
    AptosWriteSetPayloadWriteSet.create = function (input) {
        if (AptosScriptWriteSet.isInput(input)) {
            return AptosScriptWriteSet.create(input);
        }
        if (AptosDirectWriteSet.isInput(input)) {
            return AptosDirectWriteSet.create(input);
        }
        throw new Error('Cannot resolve union from AptosWriteSetPayloadWriteSetInput');
    };
    AptosWriteSetPayloadWriteSet.fromJSON = function (json) {
        if (AptosScriptWriteSet.isJSON(json)) {
            return AptosScriptWriteSet.fromJSON(json);
        }
        if (AptosDirectWriteSet.isJSON(json)) {
            return AptosDirectWriteSet.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosWriteSetPayloadWriteSetJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosWriteSetPayloadWriteSet.toJSON = function (value) {
        if (value instanceof AptosScriptWriteSet) {
            return value.toJSON();
        }
        if (value instanceof AptosDirectWriteSet) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosWriteSetPayloadWriteSetValue');
    };
    return AptosWriteSetPayloadWriteSet;
}());

var AptosWriteSetPayload = /** @class */ (function () {
    function AptosWriteSetPayload(input) {
        this.type = input.type;
        this.writeSet = AptosWriteSetPayloadWriteSet.create(input.writeSet);
    }
    AptosWriteSetPayload.create = function (input) {
        if (input instanceof AptosWriteSetPayload) {
            return input;
        }
        return new AptosWriteSetPayload(input);
    };
    AptosWriteSetPayload.fromJSON = function (json) {
        var input = {
            type: json.type,
            writeSet: AptosWriteSetPayloadWriteSet.fromJSON(json.write_set),
        };
        return AptosWriteSetPayload.create(input);
    };
    AptosWriteSetPayload.prototype.toJSON = function () {
        return {
            type: this.type,
            write_set: AptosWriteSetPayloadWriteSet.toJSON(this.writeSet),
        };
    };
    return AptosWriteSetPayload;
}());

var AptosGenesisTransaction = /** @class */ (function () {
    function AptosGenesisTransaction(input) {
        this.type = input.type;
        this.version = input.version;
        this.hash = input.hash;
        this.stateChangeHash = input.stateChangeHash;
        this.eventRootHash = input.eventRootHash;
        this.stateCheckpointHash = input.stateCheckpointHash;
        this.gasUsed = input.gasUsed;
        this.success = input.success;
        this.vmStatus = input.vmStatus;
        this.accumulatorRootHash = input.accumulatorRootHash;
        this.changes = input.changes.map(function (item) { return AptosGenesisTransactionChangesItem.create(item); });
        this.payload = AptosWriteSetPayload.create(input.payload);
        this.events = input.events.map(function (item) { return AptosTransactionEvent.create(item); });
    }
    AptosGenesisTransaction.create = function (input) {
        if (input instanceof AptosGenesisTransaction) {
            return input;
        }
        return new AptosGenesisTransaction(input);
    };
    AptosGenesisTransaction.fromJSON = function (json) {
        var input = {
            type: json.type,
            version: json.version,
            hash: json.hash,
            stateChangeHash: json.state_change_hash,
            eventRootHash: json.event_root_hash,
            stateCheckpointHash: json.state_checkpoint_hash,
            gasUsed: json.gas_used,
            success: json.success,
            vmStatus: json.vm_status,
            accumulatorRootHash: json.accumulator_root_hash,
            changes: json.changes.map(function (item) { return AptosGenesisTransactionChangesItem.fromJSON(item); }),
            payload: AptosWriteSetPayload.fromJSON(json.payload),
            events: json.events.map(function (item) { return AptosTransactionEvent.fromJSON(item); }),
        };
        return AptosGenesisTransaction.create(input);
    };
    AptosGenesisTransaction.isInput = function (input) {
        return input.type === 'genesis_transaction';
    };
    AptosGenesisTransaction.isJSON = function (json) {
        return json.type === 'genesis_transaction';
    };
    AptosGenesisTransaction.prototype.toJSON = function () {
        return {
            type: this.type,
            version: this.version,
            hash: this.hash,
            state_change_hash: this.stateChangeHash,
            event_root_hash: this.eventRootHash,
            state_checkpoint_hash: this.stateCheckpointHash,
            gas_used: this.gasUsed,
            success: this.success,
            vm_status: this.vmStatus,
            accumulator_root_hash: this.accumulatorRootHash,
            changes: this.changes.map(function (item) { return AptosGenesisTransactionChangesItem.toJSON(item); }),
            payload: this.payload.toJSON(),
            events: this.events.map(function (item) { return item.toJSON(); }),
        };
    };
    return AptosGenesisTransaction;
}());

var AptosBlockMetadataTransactionChangesItem = /** @class */ (function () {
    function AptosBlockMetadataTransactionChangesItem() {
    }
    AptosBlockMetadataTransactionChangesItem.create = function (input) {
        if (AptosDeleteModuleChange.isInput(input)) {
            return AptosDeleteModuleChange.create(input);
        }
        if (AptosDeleteResourceChange.isInput(input)) {
            return AptosDeleteResourceChange.create(input);
        }
        if (AptosDeleteTableItemChange.isInput(input)) {
            return AptosDeleteTableItemChange.create(input);
        }
        if (AptosWriteOrUpdateModuleChange.isInput(input)) {
            return AptosWriteOrUpdateModuleChange.create(input);
        }
        if (AptosWriteResourceChange.isInput(input)) {
            return AptosWriteResourceChange.create(input);
        }
        if (AptosWriteTableChangeSetChange.isInput(input)) {
            return AptosWriteTableChangeSetChange.create(input);
        }
        throw new Error('Cannot resolve union from AptosBlockMetadataTransactionChangesItemInput');
    };
    AptosBlockMetadataTransactionChangesItem.fromJSON = function (json) {
        if (AptosDeleteModuleChange.isJSON(json)) {
            return AptosDeleteModuleChange.fromJSON(json);
        }
        if (AptosDeleteResourceChange.isJSON(json)) {
            return AptosDeleteResourceChange.fromJSON(json);
        }
        if (AptosDeleteTableItemChange.isJSON(json)) {
            return AptosDeleteTableItemChange.fromJSON(json);
        }
        if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
            return AptosWriteOrUpdateModuleChange.fromJSON(json);
        }
        if (AptosWriteResourceChange.isJSON(json)) {
            return AptosWriteResourceChange.fromJSON(json);
        }
        if (AptosWriteTableChangeSetChange.isJSON(json)) {
            return AptosWriteTableChangeSetChange.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosBlockMetadataTransactionChangesItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosBlockMetadataTransactionChangesItem.toJSON = function (value) {
        if (value instanceof AptosDeleteModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteTableItemChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteOrUpdateModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteTableChangeSetChange) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosBlockMetadataTransactionChangesItemValue');
    };
    return AptosBlockMetadataTransactionChangesItem;
}());

var AptosBlockMetadataTransaction = /** @class */ (function () {
    function AptosBlockMetadataTransaction(input) {
        this.type = input.type;
        this.version = input.version;
        this.hash = input.hash;
        this.stateChangeHash = input.stateChangeHash;
        this.eventRootHash = input.eventRootHash;
        this.stateCheckpointHash = input.stateCheckpointHash;
        this.gasUsed = input.gasUsed;
        this.success = input.success;
        this.vmStatus = input.vmStatus;
        this.accumulatorRootHash = input.accumulatorRootHash;
        this.changes = input.changes.map(function (item) { return AptosBlockMetadataTransactionChangesItem.create(item); });
        this.id = input.id;
        this.epoch = input.epoch;
        this.round = input.round;
        this.events = input.events.map(function (item) { return AptosTransactionEvent.create(item); });
        this.previousBlockVotesBitvec = input.previousBlockVotesBitvec;
        this.proposer = AptosAddress.create(input.proposer);
        this.failedProposerIndices = input.failedProposerIndices;
        this.timestamp = input.timestamp;
    }
    AptosBlockMetadataTransaction.create = function (input) {
        if (input instanceof AptosBlockMetadataTransaction) {
            return input;
        }
        return new AptosBlockMetadataTransaction(input);
    };
    AptosBlockMetadataTransaction.fromJSON = function (json) {
        var input = {
            type: json.type,
            version: json.version,
            hash: json.hash,
            stateChangeHash: json.state_change_hash,
            eventRootHash: json.event_root_hash,
            stateCheckpointHash: json.state_checkpoint_hash,
            gasUsed: json.gas_used,
            success: json.success,
            vmStatus: json.vm_status,
            accumulatorRootHash: json.accumulator_root_hash,
            changes: json.changes.map(function (item) { return AptosBlockMetadataTransactionChangesItem.fromJSON(item); }),
            id: json.id,
            epoch: json.epoch,
            round: json.round,
            events: json.events.map(function (item) { return AptosTransactionEvent.fromJSON(item); }),
            previousBlockVotesBitvec: json.previous_block_votes_bitvec,
            proposer: AptosAddress.fromJSON(json.proposer),
            failedProposerIndices: json.failed_proposer_indices,
            timestamp: json.timestamp,
        };
        return AptosBlockMetadataTransaction.create(input);
    };
    AptosBlockMetadataTransaction.isInput = function (input) {
        return input.type === 'block_metadata_transaction';
    };
    AptosBlockMetadataTransaction.isJSON = function (json) {
        return json.type === 'block_metadata_transaction';
    };
    AptosBlockMetadataTransaction.prototype.toJSON = function () {
        return {
            type: this.type,
            version: this.version,
            hash: this.hash,
            state_change_hash: this.stateChangeHash,
            event_root_hash: this.eventRootHash,
            state_checkpoint_hash: this.stateCheckpointHash,
            gas_used: this.gasUsed,
            success: this.success,
            vm_status: this.vmStatus,
            accumulator_root_hash: this.accumulatorRootHash,
            changes: this.changes.map(function (item) { return AptosBlockMetadataTransactionChangesItem.toJSON(item); }),
            id: this.id,
            epoch: this.epoch,
            round: this.round,
            events: this.events.map(function (item) { return item.toJSON(); }),
            previous_block_votes_bitvec: this.previousBlockVotesBitvec,
            proposer: this.proposer.toJSON(),
            failed_proposer_indices: this.failedProposerIndices,
            timestamp: this.timestamp,
        };
    };
    return AptosBlockMetadataTransaction;
}());

var AptosStateCheckpointTransactionChangesItem = /** @class */ (function () {
    function AptosStateCheckpointTransactionChangesItem() {
    }
    AptosStateCheckpointTransactionChangesItem.create = function (input) {
        if (AptosDeleteModuleChange.isInput(input)) {
            return AptosDeleteModuleChange.create(input);
        }
        if (AptosDeleteResourceChange.isInput(input)) {
            return AptosDeleteResourceChange.create(input);
        }
        if (AptosDeleteTableItemChange.isInput(input)) {
            return AptosDeleteTableItemChange.create(input);
        }
        if (AptosWriteOrUpdateModuleChange.isInput(input)) {
            return AptosWriteOrUpdateModuleChange.create(input);
        }
        if (AptosWriteResourceChange.isInput(input)) {
            return AptosWriteResourceChange.create(input);
        }
        if (AptosWriteTableChangeSetChange.isInput(input)) {
            return AptosWriteTableChangeSetChange.create(input);
        }
        throw new Error('Cannot resolve union from AptosStateCheckpointTransactionChangesItemInput');
    };
    AptosStateCheckpointTransactionChangesItem.fromJSON = function (json) {
        if (AptosDeleteModuleChange.isJSON(json)) {
            return AptosDeleteModuleChange.fromJSON(json);
        }
        if (AptosDeleteResourceChange.isJSON(json)) {
            return AptosDeleteResourceChange.fromJSON(json);
        }
        if (AptosDeleteTableItemChange.isJSON(json)) {
            return AptosDeleteTableItemChange.fromJSON(json);
        }
        if (AptosWriteOrUpdateModuleChange.isJSON(json)) {
            return AptosWriteOrUpdateModuleChange.fromJSON(json);
        }
        if (AptosWriteResourceChange.isJSON(json)) {
            return AptosWriteResourceChange.fromJSON(json);
        }
        if (AptosWriteTableChangeSetChange.isJSON(json)) {
            return AptosWriteTableChangeSetChange.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosStateCheckpointTransactionChangesItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosStateCheckpointTransactionChangesItem.toJSON = function (value) {
        if (value instanceof AptosDeleteModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosDeleteTableItemChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteOrUpdateModuleChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteResourceChange) {
            return value.toJSON();
        }
        if (value instanceof AptosWriteTableChangeSetChange) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosStateCheckpointTransactionChangesItemValue');
    };
    return AptosStateCheckpointTransactionChangesItem;
}());

var AptosStateCheckpointTransaction = /** @class */ (function () {
    function AptosStateCheckpointTransaction(input) {
        this.type = input.type;
        this.version = input.version;
        this.hash = input.hash;
        this.stateChangeHash = input.stateChangeHash;
        this.eventRootHash = input.eventRootHash;
        this.stateCheckpointHash = input.stateCheckpointHash;
        this.gasUsed = input.gasUsed;
        this.success = input.success;
        this.vmStatus = input.vmStatus;
        this.accumulatorRootHash = input.accumulatorRootHash;
        this.changes = input.changes.map(function (item) { return AptosStateCheckpointTransactionChangesItem.create(item); });
        this.timestamp = input.timestamp;
    }
    AptosStateCheckpointTransaction.create = function (input) {
        if (input instanceof AptosStateCheckpointTransaction) {
            return input;
        }
        return new AptosStateCheckpointTransaction(input);
    };
    AptosStateCheckpointTransaction.fromJSON = function (json) {
        var input = {
            type: json.type,
            version: json.version,
            hash: json.hash,
            stateChangeHash: json.state_change_hash,
            eventRootHash: json.event_root_hash,
            stateCheckpointHash: json.state_checkpoint_hash,
            gasUsed: json.gas_used,
            success: json.success,
            vmStatus: json.vm_status,
            accumulatorRootHash: json.accumulator_root_hash,
            changes: json.changes.map(function (item) { return AptosStateCheckpointTransactionChangesItem.fromJSON(item); }),
            timestamp: json.timestamp,
        };
        return AptosStateCheckpointTransaction.create(input);
    };
    AptosStateCheckpointTransaction.isInput = function (input) {
        return input.type === 'state_checkpoint_transaction';
    };
    AptosStateCheckpointTransaction.isJSON = function (json) {
        return json.type === 'state_checkpoint_transaction';
    };
    AptosStateCheckpointTransaction.prototype.toJSON = function () {
        return {
            type: this.type,
            version: this.version,
            hash: this.hash,
            state_change_hash: this.stateChangeHash,
            event_root_hash: this.eventRootHash,
            state_checkpoint_hash: this.stateCheckpointHash,
            gas_used: this.gasUsed,
            success: this.success,
            vm_status: this.vmStatus,
            accumulator_root_hash: this.accumulatorRootHash,
            changes: this.changes.map(function (item) { return AptosStateCheckpointTransactionChangesItem.toJSON(item); }),
            timestamp: this.timestamp,
        };
    };
    return AptosStateCheckpointTransaction;
}());

var AptosGetTransactionsItem = /** @class */ (function () {
    function AptosGetTransactionsItem() {
    }
    AptosGetTransactionsItem.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosGetTransactionsItemInput');
    };
    AptosGetTransactionsItem.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosGetTransactionsItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosGetTransactionsItem.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosGetTransactionsItemValue');
    };
    return AptosGetTransactionsItem;
}());

var GetTransactionsOperation = {
    operationId: "getTransactions",
    groupName: "transactions",
    httpMethod: "get",
    routePattern: "/transactions",
    parameterNames: ["limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetTransactionsItem.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosSubmitTransactionRequestPayload = /** @class */ (function () {
    function AptosSubmitTransactionRequestPayload() {
    }
    AptosSubmitTransactionRequestPayload.create = function (input) {
        if (AptosEntryFunctionPayloadRequest.isInput(input)) {
            return AptosEntryFunctionPayloadRequest.create(input);
        }
        if (AptosScriptPayloadRequest.isInput(input)) {
            return AptosScriptPayloadRequest.create(input);
        }
        if (AptosModuleBundlePayloadRequest.isInput(input)) {
            return AptosModuleBundlePayloadRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosSubmitTransactionRequestPayloadInput');
    };
    AptosSubmitTransactionRequestPayload.fromJSON = function (json) {
        if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
            return AptosEntryFunctionPayloadRequest.fromJSON(json);
        }
        if (AptosScriptPayloadRequest.isJSON(json)) {
            return AptosScriptPayloadRequest.fromJSON(json);
        }
        if (AptosModuleBundlePayloadRequest.isJSON(json)) {
            return AptosModuleBundlePayloadRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosSubmitTransactionRequestPayloadJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosSubmitTransactionRequestPayload.toJSON = function (value) {
        if (value instanceof AptosEntryFunctionPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosScriptPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosModuleBundlePayloadRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosSubmitTransactionRequestPayloadValue');
    };
    return AptosSubmitTransactionRequestPayload;
}());

var AptosSubmitTransactionRequestSignature = /** @class */ (function () {
    function AptosSubmitTransactionRequestSignature() {
    }
    AptosSubmitTransactionRequestSignature.create = function (input) {
        if (AptosEd25519SignatureRequest.isInput(input)) {
            return AptosEd25519SignatureRequest.create(input);
        }
        if (AptosMultiEd25519SignatureRequest.isInput(input)) {
            return AptosMultiEd25519SignatureRequest.create(input);
        }
        if (AptosMultiAgentSignatureRequest.isInput(input)) {
            return AptosMultiAgentSignatureRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosSubmitTransactionRequestSignatureInput');
    };
    AptosSubmitTransactionRequestSignature.fromJSON = function (json) {
        if (AptosEd25519SignatureRequest.isJSON(json)) {
            return AptosEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
            return AptosMultiEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiAgentSignatureRequest.isJSON(json)) {
            return AptosMultiAgentSignatureRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosSubmitTransactionRequestSignatureJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosSubmitTransactionRequestSignature.toJSON = function (value) {
        if (value instanceof AptosEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiAgentSignatureRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosSubmitTransactionRequestSignatureValue');
    };
    return AptosSubmitTransactionRequestSignature;
}());

var AptosSubmitTransactionRequest = /** @class */ (function () {
    function AptosSubmitTransactionRequest(input) {
        this.sender = AptosAddress.create(input.sender);
        this.sequenceNumber = input.sequenceNumber;
        this.maxGasAmount = input.maxGasAmount;
        this.gasUnitPrice = input.gasUnitPrice;
        this.expirationTimestampSecs = input.expirationTimestampSecs;
        this.payload = AptosSubmitTransactionRequestPayload.create(input.payload);
        this.signature = AptosSubmitTransactionRequestSignature.create(input.signature);
    }
    AptosSubmitTransactionRequest.create = function (input) {
        if (input instanceof AptosSubmitTransactionRequest) {
            return input;
        }
        return new AptosSubmitTransactionRequest(input);
    };
    AptosSubmitTransactionRequest.fromJSON = function (json) {
        var input = {
            sender: AptosAddress.fromJSON(json.sender),
            sequenceNumber: json.sequence_number,
            maxGasAmount: json.max_gas_amount,
            gasUnitPrice: json.gas_unit_price,
            expirationTimestampSecs: json.expiration_timestamp_secs,
            payload: AptosSubmitTransactionRequestPayload.fromJSON(json.payload),
            signature: AptosSubmitTransactionRequestSignature.fromJSON(json.signature),
        };
        return AptosSubmitTransactionRequest.create(input);
    };
    AptosSubmitTransactionRequest.prototype.toJSON = function () {
        return {
            sender: this.sender.toJSON(),
            sequence_number: this.sequenceNumber,
            max_gas_amount: this.maxGasAmount,
            gas_unit_price: this.gasUnitPrice,
            expiration_timestamp_secs: this.expirationTimestampSecs,
            payload: AptosSubmitTransactionRequestPayload.toJSON(this.payload),
            signature: AptosSubmitTransactionRequestSignature.toJSON(this.signature),
        };
    };
    return AptosSubmitTransactionRequest;
}());

var SubmitTransactionOperation = {
    operationId: "submitTransaction",
    groupName: "transactions",
    httpMethod: "post",
    routePattern: "/transactions",
    parameterNames: ["network"],
    hasResponse: true,
    hasBody: true,
    parseResponse: function (json) {
        return AptosPendingTransaction.fromJSON(json);
    },
    serializeRequest: function (request) {
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            network: network ? network.toJSON() : undefined,
        };
    },
    serializeBody: function (body) {
        var value = AptosSubmitTransactionRequest.create(body);
        return value.toJSON();
    },
};

var AptosGetTransactionByHash = /** @class */ (function () {
    function AptosGetTransactionByHash() {
    }
    AptosGetTransactionByHash.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosGetTransactionByHashInput');
    };
    AptosGetTransactionByHash.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosGetTransactionByHashJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosGetTransactionByHash.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosGetTransactionByHashValue');
    };
    return AptosGetTransactionByHash;
}());

var GetTransactionByHashOperation = {
    operationId: "getTransactionByHash",
    groupName: "transactions",
    httpMethod: "get",
    routePattern: "/transactions/by_hash/{txn_hash}",
    parameterNames: ["txn_hash", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetTransactionByHash.fromJSON(json);
    },
    serializeRequest: function (request) {
        var txnHash = request.txnHash;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            txn_hash: txnHash,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetTransactionByVersion = /** @class */ (function () {
    function AptosGetTransactionByVersion() {
    }
    AptosGetTransactionByVersion.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosGetTransactionByVersionInput');
    };
    AptosGetTransactionByVersion.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosGetTransactionByVersionJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosGetTransactionByVersion.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosGetTransactionByVersionValue');
    };
    return AptosGetTransactionByVersion;
}());

var GetTransactionByVersionOperation = {
    operationId: "getTransactionByVersion",
    groupName: "transactions",
    httpMethod: "get",
    routePattern: "/transactions/by_version/{txn_version}",
    parameterNames: ["txn_version", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosGetTransactionByVersion.fromJSON(json);
    },
    serializeRequest: function (request) {
        var txnVersion = request.txnVersion;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            txn_version: txnVersion,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosGetAccountTransactionsItem = /** @class */ (function () {
    function AptosGetAccountTransactionsItem() {
    }
    AptosGetAccountTransactionsItem.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosGetAccountTransactionsItemInput');
    };
    AptosGetAccountTransactionsItem.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosGetAccountTransactionsItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosGetAccountTransactionsItem.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosGetAccountTransactionsItemValue');
    };
    return AptosGetAccountTransactionsItem;
}());

var GetAccountTransactionsOperation = {
    operationId: "getAccountTransactions",
    groupName: "transactions",
    httpMethod: "get",
    routePattern: "/accounts/{address}/transactions",
    parameterNames: ["address", "limit", "start", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return AptosGetAccountTransactionsItem.fromJSON(item); });
    },
    serializeRequest: function (request) {
        var address = request.address;
        var limit = request.limit;
        var start = request.start;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            address: address,
            limit: limit,
            start: start,
            network: network ? network.toJSON() : undefined,
        };
    },
};

// $ref: #/components/schemas/SubmitBatchTransactionResult
// type: SubmitBatchTransactionResult
// properties:
// - transaction_failures ($ref: #/components/schemas/SubmitBatchTransactionResult/properties/transaction_failures)
var AptosSubmitBatchTransactionResult = /** @class */ (function () {
    function AptosSubmitBatchTransactionResult(input) {
        this.transactionFailures = input.transactionFailures;
    }
    AptosSubmitBatchTransactionResult.create = function (input) {
        if (input instanceof AptosSubmitBatchTransactionResult) {
            return input;
        }
        return new AptosSubmitBatchTransactionResult(input);
    };
    AptosSubmitBatchTransactionResult.fromJSON = function (json) {
        var input = {
            transactionFailures: json.transaction_failures,
        };
        return AptosSubmitBatchTransactionResult.create(input);
    };
    AptosSubmitBatchTransactionResult.prototype.toJSON = function () {
        return {
            transaction_failures: this.transactionFailures,
        };
    };
    return AptosSubmitBatchTransactionResult;
}());

var SubmitBatchTransactionsOperation = {
    operationId: "submitBatchTransactions",
    groupName: "transactions",
    httpMethod: "post",
    routePattern: "/transactions/batch",
    parameterNames: ["network"],
    hasResponse: true,
    hasBody: true,
    parseResponse: function (json) {
        return AptosSubmitBatchTransactionResult.fromJSON(json);
    },
    serializeRequest: function (request) {
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            network: network ? network.toJSON() : undefined,
        };
    },
    serializeBody: function (body) {
        var value = body.map(function (item) { return AptosSubmitTransactionRequest.create(item); });
        return value.map(function (item) { return item.toJSON(); });
    },
};

var AptosSimulateTransaction = /** @class */ (function () {
    function AptosSimulateTransaction() {
    }
    AptosSimulateTransaction.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosSimulateTransactionInput');
    };
    AptosSimulateTransaction.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosSimulateTransactionJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosSimulateTransaction.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosSimulateTransactionValue');
    };
    return AptosSimulateTransaction;
}());

var SimulateTransactionOperation = {
    operationId: "simulateTransaction",
    groupName: "transactions",
    httpMethod: "post",
    routePattern: "/transactions/simulate",
    parameterNames: ["network"],
    hasResponse: true,
    hasBody: true,
    parseResponse: function (json) {
        return AptosSimulateTransaction.fromJSON(json);
    },
    serializeRequest: function (request) {
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            network: network ? network.toJSON() : undefined,
        };
    },
    serializeBody: function (body) {
        var value = AptosSubmitTransactionRequest.create(body);
        return value.toJSON();
    },
};

var AptosEncodeSubmissionRequestPayload = /** @class */ (function () {
    function AptosEncodeSubmissionRequestPayload() {
    }
    AptosEncodeSubmissionRequestPayload.create = function (input) {
        if (AptosEntryFunctionPayloadRequest.isInput(input)) {
            return AptosEntryFunctionPayloadRequest.create(input);
        }
        if (AptosScriptPayloadRequest.isInput(input)) {
            return AptosScriptPayloadRequest.create(input);
        }
        if (AptosModuleBundlePayloadRequest.isInput(input)) {
            return AptosModuleBundlePayloadRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosEncodeSubmissionRequestPayloadInput');
    };
    AptosEncodeSubmissionRequestPayload.fromJSON = function (json) {
        if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
            return AptosEntryFunctionPayloadRequest.fromJSON(json);
        }
        if (AptosScriptPayloadRequest.isJSON(json)) {
            return AptosScriptPayloadRequest.fromJSON(json);
        }
        if (AptosModuleBundlePayloadRequest.isJSON(json)) {
            return AptosModuleBundlePayloadRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosEncodeSubmissionRequestPayloadJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosEncodeSubmissionRequestPayload.toJSON = function (value) {
        if (value instanceof AptosEntryFunctionPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosScriptPayloadRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosModuleBundlePayloadRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosEncodeSubmissionRequestPayloadValue');
    };
    return AptosEncodeSubmissionRequestPayload;
}());

var AptosEncodeSubmissionRequest = /** @class */ (function () {
    function AptosEncodeSubmissionRequest(input) {
        this.sender = AptosAddress.create(input.sender);
        this.sequenceNumber = input.sequenceNumber;
        this.maxGasAmount = input.maxGasAmount;
        this.gasUnitPrice = input.gasUnitPrice;
        this.expirationTimestampSecs = input.expirationTimestampSecs;
        this.payload = AptosEncodeSubmissionRequestPayload.create(input.payload);
        this.secondarySigners = input.secondarySigners;
    }
    AptosEncodeSubmissionRequest.create = function (input) {
        if (input instanceof AptosEncodeSubmissionRequest) {
            return input;
        }
        return new AptosEncodeSubmissionRequest(input);
    };
    AptosEncodeSubmissionRequest.fromJSON = function (json) {
        var input = {
            sender: AptosAddress.fromJSON(json.sender),
            sequenceNumber: json.sequence_number,
            maxGasAmount: json.max_gas_amount,
            gasUnitPrice: json.gas_unit_price,
            expirationTimestampSecs: json.expiration_timestamp_secs,
            payload: AptosEncodeSubmissionRequestPayload.fromJSON(json.payload),
            secondarySigners: json.secondary_signers,
        };
        return AptosEncodeSubmissionRequest.create(input);
    };
    AptosEncodeSubmissionRequest.prototype.toJSON = function () {
        return {
            sender: this.sender.toJSON(),
            sequence_number: this.sequenceNumber,
            max_gas_amount: this.maxGasAmount,
            gas_unit_price: this.gasUnitPrice,
            expiration_timestamp_secs: this.expirationTimestampSecs,
            payload: AptosEncodeSubmissionRequestPayload.toJSON(this.payload),
            secondary_signers: this.secondarySigners,
        };
    };
    return AptosEncodeSubmissionRequest;
}());

var EncodeSubmissionOperation = {
    operationId: "encodeSubmission",
    groupName: "transactions",
    httpMethod: "post",
    routePattern: "/transactions/encode_submission",
    parameterNames: ["network"],
    hasResponse: true,
    hasBody: true,
    parseResponse: function (json) {
        return json;
    },
    serializeRequest: function (request) {
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            network: network ? network.toJSON() : undefined,
        };
    },
    serializeBody: function (body) {
        var value = AptosEncodeSubmissionRequest.create(body);
        return value.toJSON();
    },
};

// $ref: #/components/schemas/EstimateGasPriceResult
// type: EstimateGasPriceResult
// properties:
// - deprioritized_gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/deprioritized_gas_estimate)
// - gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/gas_estimate)
// - prioritized_gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/prioritized_gas_estimate)
var AptosEstimateGasPriceResult = /** @class */ (function () {
    function AptosEstimateGasPriceResult(input) {
        this.deprioritizedGasEstimate = input.deprioritizedGasEstimate;
        this.gasEstimate = input.gasEstimate;
        this.prioritizedGasEstimate = input.prioritizedGasEstimate;
    }
    AptosEstimateGasPriceResult.create = function (input) {
        if (input instanceof AptosEstimateGasPriceResult) {
            return input;
        }
        return new AptosEstimateGasPriceResult(input);
    };
    AptosEstimateGasPriceResult.fromJSON = function (json) {
        var input = {
            deprioritizedGasEstimate: json.deprioritized_gas_estimate,
            gasEstimate: json.gas_estimate,
            prioritizedGasEstimate: json.prioritized_gas_estimate,
        };
        return AptosEstimateGasPriceResult.create(input);
    };
    AptosEstimateGasPriceResult.prototype.toJSON = function () {
        return {
            deprioritized_gas_estimate: this.deprioritizedGasEstimate,
            gas_estimate: this.gasEstimate,
            prioritized_gas_estimate: this.prioritizedGasEstimate,
        };
    };
    return AptosEstimateGasPriceResult;
}());

var EstimateGasPriceOperation = {
    operationId: "estimateGasPrice",
    groupName: "transactions",
    httpMethod: "get",
    routePattern: "/transactions/estimate_gas_price",
    parameterNames: ["network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosEstimateGasPriceResult.fromJSON(json);
    },
    serializeRequest: function (request) {
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AptosBlockTransactionsItem = /** @class */ (function () {
    function AptosBlockTransactionsItem() {
    }
    AptosBlockTransactionsItem.create = function (input) {
        if (AptosPendingTransaction.isInput(input)) {
            return AptosPendingTransaction.create(input);
        }
        if (AptosUserTransaction.isInput(input)) {
            return AptosUserTransaction.create(input);
        }
        if (AptosGenesisTransaction.isInput(input)) {
            return AptosGenesisTransaction.create(input);
        }
        if (AptosBlockMetadataTransaction.isInput(input)) {
            return AptosBlockMetadataTransaction.create(input);
        }
        if (AptosStateCheckpointTransaction.isInput(input)) {
            return AptosStateCheckpointTransaction.create(input);
        }
        throw new Error('Cannot resolve union from AptosBlockTransactionsItemInput');
    };
    AptosBlockTransactionsItem.fromJSON = function (json) {
        if (AptosPendingTransaction.isJSON(json)) {
            return AptosPendingTransaction.fromJSON(json);
        }
        if (AptosUserTransaction.isJSON(json)) {
            return AptosUserTransaction.fromJSON(json);
        }
        if (AptosGenesisTransaction.isJSON(json)) {
            return AptosGenesisTransaction.fromJSON(json);
        }
        if (AptosBlockMetadataTransaction.isJSON(json)) {
            return AptosBlockMetadataTransaction.fromJSON(json);
        }
        if (AptosStateCheckpointTransaction.isJSON(json)) {
            return AptosStateCheckpointTransaction.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosBlockTransactionsItemJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosBlockTransactionsItem.toJSON = function (value) {
        if (value instanceof AptosPendingTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosUserTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosGenesisTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosBlockMetadataTransaction) {
            return value.toJSON();
        }
        if (value instanceof AptosStateCheckpointTransaction) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosBlockTransactionsItemValue');
    };
    return AptosBlockTransactionsItem;
}());

var AptosBlock = /** @class */ (function () {
    function AptosBlock(input) {
        this.blockHeight = input.blockHeight;
        this.blockHash = input.blockHash;
        this.blockTimestamp = input.blockTimestamp;
        this.firstVersion = input.firstVersion;
        this.lastVersion = input.lastVersion;
        this.transactions = input.transactions ? input.transactions.map(function (item) { return AptosBlockTransactionsItem.create(item); }) : undefined;
    }
    AptosBlock.create = function (input) {
        if (input instanceof AptosBlock) {
            return input;
        }
        return new AptosBlock(input);
    };
    AptosBlock.fromJSON = function (json) {
        var input = {
            blockHeight: json.block_height,
            blockHash: json.block_hash,
            blockTimestamp: json.block_timestamp,
            firstVersion: json.first_version,
            lastVersion: json.last_version,
            transactions: json.transactions ? json.transactions.map(function (item) { return AptosBlockTransactionsItem.fromJSON(item); }) : undefined,
        };
        return AptosBlock.create(input);
    };
    AptosBlock.prototype.toJSON = function () {
        return {
            block_height: this.blockHeight,
            block_hash: this.blockHash,
            block_timestamp: this.blockTimestamp,
            first_version: this.firstVersion,
            last_version: this.lastVersion,
            transactions: this.transactions ? this.transactions.map(function (item) { return AptosBlockTransactionsItem.toJSON(item); }) : undefined,
        };
    };
    return AptosBlock;
}());

var GetBlockByHeightOperation = {
    operationId: "getBlockByHeight",
    groupName: "blocks",
    httpMethod: "get",
    routePattern: "/blocks/{block_height}",
    parameterNames: ["block_height", "with_transactions", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosBlock.fromJSON(json);
    },
    serializeRequest: function (request) {
        var blockHeight = request.blockHeight;
        var withTransactions = request.withTransactions;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            block_height: blockHeight,
            with_transactions: withTransactions,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var GetBlockByVersionOperation = {
    operationId: "getBlockByVersion",
    groupName: "blocks",
    httpMethod: "get",
    routePattern: "/blocks/by_version/{version}",
    parameterNames: ["version", "with_transactions", "network"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return AptosBlock.fromJSON(json);
    },
    serializeRequest: function (request) {
        var version = request.version;
        var withTransactions = request.withTransactions;
        var network = request.network ? AptosNetwork.create(request.network) : undefined;
        return {
            version: version,
            with_transactions: withTransactions,
            network: network ? network.toJSON() : undefined,
        };
    },
};

var AbstractClient = /** @class */ (function () {
    function AbstractClient() {
        this.accounts = {
            /**
             * @description Get account
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} [request.ledgerVersion] Ledger version to get state of account.
             * If not provided, it will be the latest version (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getAccount: this.createEndpoint(GetAccountOperation),
            /**
             * @description Get account resources
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} [request.ledgerVersion] Ledger version to get state of account.
             * If not provided, it will be the latest version (optional)
             * @param {Number} [request.limit] Max number of account resources to retrieve.
             * If not provided, defaults to default page size. (optional)
             * @param {String} [request.start] Cursor specifying where to start for pagination
             * This cursor cannot be derived manually client-side. Instead, you must call this endpoint once without this query parameter specified, and then use the cursor returned in the X-Aptos-Cursor header in the response. (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getAccountResources: this.createEndpoint(GetAccountResourcesOperation),
            /**
             * @description Get account modules
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} [request.ledgerVersion] Ledger version to get state of account.
             * If not provided, it will be the latest version (optional)
             * @param {Number} [request.limit] Max number of account resources to retrieve.
             * If not provided, defaults to default page size. (optional)
             * @param {String} [request.start] Cursor specifying where to start for pagination
             * This cursor cannot be derived manually client-side. Instead, you must call this endpoint once without this query parameter specified, and then use the cursor returned in the X-Aptos-Cursor header in the response. (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getAccountModules: this.createEndpoint(GetAccountModulesOperation),
            /**
             * @description Get account resource
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} request.resourceType Name of struct to retrieve e.g. 0x1::account::Account
             * @param {String} [request.ledgerVersion] Ledger version to get state of account.
             * If not provided, it will be the latest version (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getAccountResource: this.createEndpoint(GetAccountResourceOperation),
            /**
             * @description Get account module
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} request.moduleName Name of module to retrieve
             * @param {String} [request.ledgerVersion] Ledger version to get state of account.
             * If not provided, it will be the latest version (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getAccountModule: this.createEndpoint(GetAccountModuleOperation),
            /**
             * @description Get events by creation number
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {String} request.creationNumber Creation number corresponding to the event stream originating from the given account.
             * @param {Number} [request.limit] Max number of account resources to retrieve.
             * If not provided, defaults to default page size. (optional)
             * @param {String} [request.start] Starting sequence number of events.
             * If unspecified, by default will retrieve the most recent events (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getEventsByCreationNumber: this.createEndpoint(GetEventsByCreationNumberOperation),
            /**
             * @description Get events by event handle
             * @param request Request with parameters.
             * @param {String} request.address Hex-encoded 32 byte Aptos account, with or without a 0x prefix, for which events are queried. This refers to the account that events were emitted to, not the account hosting the move module that emits that event type.
             * @param {String} request.eventHandle Name of struct to lookup event handle.
             * @param {String} request.fieldName Name of field to lookup event handle.
             * @param {Number} [request.limit] Max number of account resources to retrieve.
             * If not provided, defaults to default page size. (optional)
             * @param {String} [request.start] Starting sequence number of events.
             * If unspecified, by default will retrieve the most recent events (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getEventsByEventHandle: this.createEndpoint(GetEventsByEventHandleOperation),
        };
        this.blocks = {
            /**
             * @description Get block by height
             * @param request Request with parameters.
             * @param {Number} request.blockHeight Block height to lookup. Starts at 0
             * @param {Boolean} [request.withTransactions] If set to true, include all transactions in the block (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getBlockByHeight: this.createEndpoint(GetBlockByHeightOperation),
            /**
             * @description Get block by version
             * @param request Request with parameters.
             * @param {Number} request.version Ledger version to lookup block information for.
             * @param {Boolean} [request.withTransactions] If set to true, include all transactions in the block (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getBlockByVersion: this.createEndpoint(GetBlockByVersionOperation),
        };
        this.coins = {
            /**
             * @description Get Coin Metadata by Coin Type Hashes
             * @param request Request with parameters.
             * @param {String[]} request.coinTypeHashes The coin type hashes to fetch info about
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getCoinInfoByCoinTypeHashes: this.createEndpoint(GetCoinInfoByCoinTypeHashesOperation),
            /**
             * @description Get latest deployed coins
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getLatestCoins: this.createEndpoint(GetLatestCoinsOperation),
            /**
             * @description Get Coin Metadata by name range
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromName] The name of the coin to start from (inclusive and case sensitive) (optional)
             * @param {String} [request.toName] The name of the coin to end at (inclusive and case sensitive) (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinsByNameRange: this.createEndpoint(GetCoinsByNameRangeOperation),
            /**
             * @description Get Coin Metadata by symbol range
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromSymbol] The name of the coin to start from (inclusive and case sensitive) (optional)
             * @param {String} [request.toSymbol] The name of the coin to end at (inclusive and case sensitive) (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinsBySymbolRange: this.createEndpoint(GetCoinsBySymbolRangeOperation),
            /**
             * @description Get Coin Metadata by creator addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.creatorAddresses The addresses of the creators
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinsByCreators: this.createEndpoint(GetCoinsByCreatorsOperation),
            /**
             * @description Get Coin Transfers by wallet addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
             * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
             * @param {String[]} [request.coinTypeBlacklist] The coin types of the coins to whitelist (optional)
             * @param {String[]} [request.coinTypeWhitelist] The coin types of the coins to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinTransfersByOwnerAddresses: this.createEndpoint(GetCoinTransfersByOwnerAddressesOperation),
            /**
             * @description Get Coin Transfers by block heights
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {String[]} request.blockHeights The coin types to fetch info about
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinTransfersByBlockHeights: this.createEndpoint(GetCoinTransfersByBlockHeightsOperation),
            /**
             * @description Get Coin Transfers by Coin Type
             * @param request Request with parameters.
             * @param {String} request.coinType The coin type to fetch info about
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
             * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinTransfersByCoinType: this.createEndpoint(GetCoinTransfersByCoinTypeOperation),
            /**
             * @description Get top Holders of Coin
             * @param request Request with parameters.
             * @param {String} request.coinTypeHash The coin type hash to fetch info about
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.minAmount] The minimum amount of coins required for a wallet to be included in the results (optional)
             * @param {Number} [request.minVersion] The minimum version on when the balance was last updated (optional)
             * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
             * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getTopHoldersByCoin: this.createEndpoint(GetTopHoldersByCoinOperation),
        };
        this.collections = {
            /**
             * @description Get NFT Collections
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromName] The name of the collection to start from (inclusive and case sensitive) (optional)
             * @param {String} [request.toName] The name of the collection to end at (inclusive and case sensitive) (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTCollections: this.createEndpoint(GetNFTCollectionsOperation),
            /**
             * @description Get NFT Collections by ids
             * @param request Request with parameters.
             * @param {String[]} request.ids The identifiers of the collections to get
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getNFTCollectionsByIds: this.createEndpoint(GetNFTCollectionsByIdsOperation),
            /**
             * @description Get NFT Collections by creator
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object} request.creatorAddress The address of the creator
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTCollectionsByCreator: this.createEndpoint(GetNFTCollectionsByCreatorOperation),
        };
        this.nfts = {
            /**
             * @description Get NFTs by ids
             * @param request Request with parameters.
             * @param {String[]} request.tokenIds The identifiers of the tokens to get
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getNFTsByIds: this.createEndpoint(GetNFTsByIdsOperation),
            /**
             * @description Get NFTs by Collection
             * @param request Request with parameters.
             * @param {String} request.collectionDataIdHash The collection data id hash of the collection
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTsByCollection: this.createEndpoint(GetNFTsByCollectionOperation),
            /**
             * @description Get NFTs by creators
             * @param request Request with parameters.
             * @param {Number} request.limit The number of tokens to return
             * @param {Object[]} request.creatorAddresses The addresses of the creators
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTsByCreators: this.createEndpoint(GetNFTsByCreatorsOperation),
            /**
             * @description Get NFT Owners by tokens
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {String[]} request.tokenIds The identifiers of the tokens to get owners for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTOwnersByTokens: this.createEndpoint(GetNFTOwnersByTokensOperation),
            /**
             * @description Get NFT Owners by Collection
             * @param request Request with parameters.
             * @param {String} request.collectionDataIdHash The id of the token
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
             * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTOwnersByCollection: this.createEndpoint(GetNFTOwnersByCollectionOperation),
            /**
             * @description Get NFT Owners of Collection
             * @param request Request with parameters.
             * @param {String} request.collectionDataIdHash The id of the token
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTOwnersOfCollection: this.createEndpoint(GetNFTOwnersOfCollectionOperation),
            /**
             * @description Get NFT Transfers by Token ids
             * @param request Request with parameters.
             * @param {Number} request.limit The number of tokens to return
             * @param {String[]} request.tokenIds The identifiers of the tokens to get
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
             * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTTransfersByIds: this.createEndpoint(GetNFTTransfersByIdsOperation),
            /**
             * @description Get NFT Transfers by Collection
             * @param request Request with parameters.
             * @param {String} request.collectionDataIdHash The collection data id hash of the token
             * @param {Number} request.limit The number of results to return
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.walletWhitelist] The addresses of the wallets to whitelist (optional)
             * @param {String[]} [request.walletBlacklist] The addresses of the wallets to blacklist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTTransfersByCollection: this.createEndpoint(GetNFTTransfersByCollectionOperation),
            /**
             * @description Get NFT Transfers by creators
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.creatorAddresses The addresses of the creators
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
             * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTTransfersByCreators: this.createEndpoint(GetNFTTransfersByCreatorsOperation),
            /**
             * @description Get NFT Transfers by wallets
             * @param request Request with parameters.
             * @param {Number} request.limit The number of tokens to return
             * @param {Object[]} request.walletAddresses The addresses of the wallets to get transfers for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
             * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTTransfersByWallets: this.createEndpoint(GetNFTTransfersByWalletsOperation),
        };
        this.transactions = {
            /**
             * @description Get transactions
             * @param request Request with parameters.
             * @param {Number} [request.limit] Max number of transactions to retrieve.
             * If not provided, defaults to default page size (optional)
             * @param {String} [request.start] Account sequence number to start list of transactions.
             * If not provided, defaults to showing the latest transactions (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getTransactions: this.createEndpoint(GetTransactionsOperation),
            /**
             * @description Submit transaction
             * @param request Request with parameters.
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @param body Request body.
             * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
             * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
             * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
             * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
             * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
             * @param {Object} body.payload An enum of the possible transaction payloads
             * @param {Object} body.signature
             * @returns {Object} Response for the request.
             */
            submitTransaction: this.createEndpointWithBody(SubmitTransactionOperation),
            /**
             * @description Get transaction by hash
             * @param request Request with parameters.
             * @param {String} request.txnHash Hash of transaction to retrieve
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getTransactionByHash: this.createEndpoint(GetTransactionByHashOperation),
            /**
             * @description Get transaction by version
             * @param request Request with parameters.
             * @param {String} request.txnVersion Version of transaction to retrieve
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getTransactionByVersion: this.createEndpoint(GetTransactionByVersionOperation),
            /**
             * @description Get account transactions
             * @param request Request with parameters.
             * @param {String} request.address Address of account with or without a 0x prefix
             * @param {Number} [request.limit] Max number of transactions to retrieve.
             * If not provided, defaults to default page size (optional)
             * @param {String} [request.start] Account sequence number to start list of transactions.
             * If not provided, defaults to showing the latest transactions (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object[]} Response for the request.
             */
            getAccountTransactions: this.createEndpoint(GetAccountTransactionsOperation),
            /**
             * @description Submit batch transactions
             * @param request Request with parameters.
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @param body Request body.
             * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
             * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
             * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
             * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
             * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
             * @param {Object} body.payload An enum of the possible transaction payloads
             * @param {Object} body.signature
             * @returns {Object} Response for the request.
             */
            submitBatchTransactions: this.createEndpointWithBody(SubmitBatchTransactionsOperation),
            /**
             * @description Simulate transaction
             * @param request Request with parameters.
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @param body Request body.
             * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
             * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
             * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
             * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
             * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
             * @param {Object} body.payload An enum of the possible transaction payloads
             * @param {Object} body.signature
             * @returns {Object} Response for the request.
             */
            simulateTransaction: this.createEndpointWithBody(SimulateTransactionOperation),
            /**
             * @description Encode submission
             * @param request Request with parameters.
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @param body Request body.
             * @param {Object} body.sender A hex encoded 32 byte Aptos account address.
             * @param {String} body.sequenceNumber A string containing a 64-bit unsigned integer.
             * @param {String} body.maxGasAmount A string containing a 64-bit unsigned integer.
             * @param {String} body.gasUnitPrice A string containing a 64-bit unsigned integer.
             * @param {String} body.expirationTimestampSecs A string containing a 64-bit unsigned integer.
             * @param {Object} body.payload An enum of the possible transaction payloads
             * @param {String[]} body.secondarySigners Secondary signer accounts of the request for Multi-agent
             * @returns {String} Response for the request.
             */
            encodeSubmission: this.createEndpointWithBody(EncodeSubmissionOperation),
            /**
             * @description Estimate gas price
             * @param request Request with parameters.
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            estimateGasPrice: this.createEndpoint(EstimateGasPriceOperation),
        };
        this.wallets = {
            /**
             * @description Get Coin Balances by wallet addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.ownerAddresses The addresses of the owners to get coin balances for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.coinTypeHashBlacklist] The coin type hashes of the coins to whitelist (optional)
             * @param {String[]} [request.coinTypeHashWhitelist] The coin type hashes of the coins to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinBalancesByWallets: this.createEndpoint(GetCoinBalancesByWalletsOperation),
            /**
             * @description Get Historical Coin Balances by wallet addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.ownerAddresses The addresses of the owner addresses to get historical balances for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.coinTypeHashBlacklist] The coin type hash of the coins to whitelist (optional)
             * @param {String[]} [request.coinTypeHashWhitelist] The coin type hash of the coins to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getHistoricalCoinBalancesByWallets: this.createEndpoint(GetHistoricalCoinBalancesByWalletsOperation),
            /**
             * @description Get Coin Transfers by wallet addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String} [request.fromDate] The date from which to fetch coin transfers (optional)
             * @param {String} [request.toDate] The date to which to fetch coin transfers (optional)
             * @param {String[]} [request.coinTypeBlacklist] The coin types of the coins to whitelist (optional)
             * @param {String[]} [request.coinTypeWhitelist] The coin types of the coins to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getCoinTransfersByWalletAddresses: this.createEndpoint(GetCoinTransfersByWalletAddressesOperation),
            /**
             * @description Get NFTs by wallet addresses
             * @param request Request with parameters.
             * @param {Number} request.limit The number of results to return
             * @param {Object[]} request.ownerAddresses The addresses of the owners to get tokens for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.collectionBlacklist] The collection data id hashes of the collections to whitelist (optional)
             * @param {String[]} [request.collectionWhitelist] The collection data id hashes of the collections to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getNFTByOwners: this.createEndpoint(GetNFTByOwnersOperation),
            /**
             * @description Get NFT Transfers by wallets
             * @param request Request with parameters.
             * @param {Number} request.limit The number of tokens to return
             * @param {Object[]} request.walletAddresses The addresses of the wallets to get transfers for
             * @param {Number} [request.offset] The number of results to skip (optional)
             * @param {String} [request.cursor] The cursor to use for getting the next page (optional)
             * @param {String[]} [request.collectionBlacklist] The ids of the collections to whitelist (optional)
             * @param {String[]} [request.collectionWhitelist] The ids of the collections to whitelist (optional)
             * @param {Object} [request.network] The network of query. Defaults to mainnet. (optional)
             * @returns {Object} Response for the request.
             */
            getWalletsNFTTransfers: this.createEndpoint(GetWalletsNFTTransfersOperation),
        };
    }
    return AbstractClient;
}());

var operations = [
    GetNFTsByIdsOperation,
    GetNFTsByCollectionOperation,
    GetNFTsByCreatorsOperation,
    GetNFTCollectionsOperation,
    GetNFTCollectionsByIdsOperation,
    GetNFTCollectionsByCreatorOperation,
    GetNFTOwnersByTokensOperation,
    GetNFTOwnersByCollectionOperation,
    GetNFTOwnersOfCollectionOperation,
    GetNFTTransfersByIdsOperation,
    GetNFTTransfersByCollectionOperation,
    GetNFTTransfersByCreatorsOperation,
    GetNFTTransfersByWalletsOperation,
    GetCoinInfoByCoinTypeHashesOperation,
    GetLatestCoinsOperation,
    GetCoinsByNameRangeOperation,
    GetCoinsBySymbolRangeOperation,
    GetCoinsByCreatorsOperation,
    GetCoinTransfersByOwnerAddressesOperation,
    GetCoinTransfersByBlockHeightsOperation,
    GetCoinTransfersByCoinTypeOperation,
    GetTopHoldersByCoinOperation,
    GetCoinBalancesByWalletsOperation,
    GetHistoricalCoinBalancesByWalletsOperation,
    GetCoinTransfersByWalletAddressesOperation,
    GetNFTByOwnersOperation,
    GetWalletsNFTTransfersOperation,
    GetAccountOperation,
    GetAccountResourcesOperation,
    GetAccountModulesOperation,
    GetAccountResourceOperation,
    GetAccountModuleOperation,
    GetEventsByCreationNumberOperation,
    GetEventsByEventHandleOperation,
    GetTransactionsOperation,
    SubmitTransactionOperation,
    GetTransactionByHashOperation,
    GetTransactionByVersionOperation,
    GetAccountTransactionsOperation,
    SubmitBatchTransactionsOperation,
    SimulateTransactionOperation,
    EncodeSubmissionOperation,
    EstimateGasPriceOperation,
    GetBlockByHeightOperation,
    GetBlockByVersionOperation,
];

var AptosMultiAgentSignatureRequestSender = /** @class */ (function () {
    function AptosMultiAgentSignatureRequestSender() {
    }
    AptosMultiAgentSignatureRequestSender.create = function (input) {
        if (AptosEd25519SignatureRequest.isInput(input)) {
            return AptosEd25519SignatureRequest.create(input);
        }
        if (AptosMultiEd25519SignatureRequest.isInput(input)) {
            return AptosMultiEd25519SignatureRequest.create(input);
        }
        throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSenderInput');
    };
    AptosMultiAgentSignatureRequestSender.fromJSON = function (json) {
        if (AptosEd25519SignatureRequest.isJSON(json)) {
            return AptosEd25519SignatureRequest.fromJSON(json);
        }
        if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
            return AptosMultiEd25519SignatureRequest.fromJSON(json);
        }
        var keys = Object.keys(json).join(', ');
        var type = json.type;
        throw new Error("Cannot resolve union from AptosMultiAgentSignatureRequestSenderJSON (keys: ".concat(keys, ", type: ").concat(type, ")"));
    };
    AptosMultiAgentSignatureRequestSender.toJSON = function (value) {
        if (value instanceof AptosEd25519SignatureRequest) {
            return value.toJSON();
        }
        if (value instanceof AptosMultiEd25519SignatureRequest) {
            return value.toJSON();
        }
        throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSenderValue');
    };
    return AptosMultiAgentSignatureRequestSender;
}());

export { AbstractClient, AptosAddress, AptosBlock, AptosBlockMetadataTransaction, AptosBlockMetadataTransactionChangesItem, AptosBlockTransactionsItem, AptosCoinInfoDto, AptosCoinTransferDto, AptosCurrentCoinBalanceDto, AptosDecodedTableData, AptosDeleteModuleChange, AptosDeleteModuleChangeModule, AptosDeleteResourceChange, AptosDeleteResourceChangeResource, AptosDeleteTableItemChange, AptosDeleteTableItemChangeHandle, AptosDeleteTableItemChangeKey, AptosDeletedTableData, AptosDirectWriteSet, AptosEd25519SignatureRequest, AptosEncodeSubmissionRequest, AptosEncodeSubmissionRequestPayload, AptosEntryFunctionPayloadRequest, AptosEstimateGasPriceResult, AptosGenericTypeParam, AptosGenesisTransaction, AptosGenesisTransactionChangesItem, AptosGetAccountModuleResponse, AptosGetAccountResourceResponse, AptosGetAccountResourceResponseData, AptosGetAccountResponse, AptosGetAccountTransactionsItem, AptosGetCoinBalancesByWalletsResponse, AptosGetCoinTransfersByBlockHeightsResponse, AptosGetCoinTransfersByCoinTypeResponse, AptosGetCoinTransfersByOwnerAddressesResponse, AptosGetCoinsByCreatorsResponse, AptosGetCoinsByNameRangeResponse, AptosGetCoinsBySymbolRangeResponse, AptosGetEventsByCreationNumberResponse, AptosGetEventsByCreationNumberResponseData, AptosGetEventsByEventHandleResponse, AptosGetEventsByEventHandleResponseData, AptosGetHistoricalCoinBalancesByWalletsResponse, AptosGetLatestCoinsResponse, AptosGetNFTTransfersByCollectionResponse, AptosGetNFTTransfersByCreatorsResponse, AptosGetTopHoldersByCoinResponse, AptosGetTransactionByHash, AptosGetTransactionByVersion, AptosGetTransactionsItem, AptosHistoricalCoinBalanceDto, AptosModuleBundlePayloadRequest, AptosModuleExposedFunction, AptosModuleStruct, AptosModuleStructField, AptosMoveModuleAbi, AptosMultiAgentSignatureRequest, AptosMultiAgentSignatureRequestSecondarySigners, AptosMultiAgentSignatureRequestSender, AptosMultiEd25519SignatureRequest, AptosNFTCollectionItemResponse, AptosNFTCollectionsByCreatorResponse, AptosNFTCollectionsByNameRangeResponse, AptosNFTOwnerResponse, AptosNFTOwnerResponseTokenProperties, AptosNFTOwnersByCollectionResponse, AptosNFTOwnersByTokensResponse, AptosNFTOwnersOfCollectionResponse, AptosNFTTokenResponse, AptosNFTTokenResponseDefaultProperties, AptosNFTTokensByCollectionResponse, AptosNFTTokensByCreatorsResponse, AptosNFTTransferResponse, AptosNFTTransfersByTokensResponse, AptosNFTTransfersByWalletsResponse, AptosNFTsByOwnersResponse, AptosNative, AptosNetwork, AptosNetworkResolver, AptosPendingTransaction, AptosPendingTransactionPayload, AptosPendingTransactionSignature, AptosScriptPayloadRequest, AptosScriptPayloadRequestCode, AptosScriptWriteSet, AptosSimulateTransaction, AptosStateCheckpointTransaction, AptosStateCheckpointTransactionChangesItem, AptosSubmitBatchTransactionResult, AptosSubmitTransactionRequest, AptosSubmitTransactionRequestPayload, AptosSubmitTransactionRequestSignature, AptosTransactionEvent, AptosTransactionEventData, AptosTransactionEventGuid, AptosUserTransaction, AptosUserTransactionChangesItem, AptosUserTransactionPayload, AptosUserTransactionSignature, AptosWriteModuleData, AptosWriteOrUpdateModuleChange, AptosWriteResourceChange, AptosWriteResourceData, AptosWriteResourceDataData, AptosWriteSetPayload, AptosWriteSetPayloadWriteSet, AptosWriteTableChangeSetChange, CommonAptosUtils, CommonAptosUtilsConfig, CommonAptosUtilsConfigSetup, EncodeSubmissionOperation, EstimateGasPriceOperation, GetAccountModuleOperation, GetAccountModulesOperation, GetAccountOperation, GetAccountResourceOperation, GetAccountResourcesOperation, GetAccountTransactionsOperation, GetBlockByHeightOperation, GetBlockByVersionOperation, GetCoinBalancesByWalletsOperation, GetCoinInfoByCoinTypeHashesOperation, GetCoinTransfersByBlockHeightsOperation, GetCoinTransfersByCoinTypeOperation, GetCoinTransfersByOwnerAddressesOperation, GetCoinTransfersByWalletAddressesOperation, GetCoinsByCreatorsOperation, GetCoinsByNameRangeOperation, GetCoinsBySymbolRangeOperation, GetEventsByCreationNumberOperation, GetEventsByEventHandleOperation, GetHistoricalCoinBalancesByWalletsOperation, GetLatestCoinsOperation, GetNFTByOwnersOperation, GetNFTCollectionsByCreatorOperation, GetNFTCollectionsByIdsOperation, GetNFTCollectionsOperation, GetNFTOwnersByCollectionOperation, GetNFTOwnersByTokensOperation, GetNFTOwnersOfCollectionOperation, GetNFTTransfersByCollectionOperation, GetNFTTransfersByCreatorsOperation, GetNFTTransfersByIdsOperation, GetNFTTransfersByWalletsOperation, GetNFTsByCollectionOperation, GetNFTsByCreatorsOperation, GetNFTsByIdsOperation, GetTopHoldersByCoinOperation, GetTransactionByHashOperation, GetTransactionByVersionOperation, GetTransactionsOperation, GetWalletsNFTTransfersOperation, SimulateTransactionOperation, SubmitBatchTransactionsOperation, SubmitTransactionOperation, operations };
