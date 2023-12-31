import { AptosNetwork, AptosAddress } from '@moralisweb3/common-aptos-utils';
import { CoreError, CoreErrorCode, maybe, BigNumber, toCamelCase } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmSignature, EvmNative, EvmSimpleBlock } from '@moralisweb3/common-evm-utils';
import { Interface } from '@ethersproject/abi';

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

/**
 * The AptosStream class is a representation of an Aptos Stream that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var AptosStream = /** @class */ (function () {
    function AptosStream(data) {
        this._data = AptosStream.parse(data);
    }
    /**
     * Create a new instance of AptosStream
     *
     * @param data - the AptosStreamish type
     * @example
     * ```ts
     * const aptosStream = AptosStream.create(data);
     * ```
     * @returns an instance of AptosStream
     */
    AptosStream.create = function (data) {
        if (data instanceof AptosStream) {
            return data;
        }
        return new AptosStream(data);
    };
    /**
     * Compares two AptosStream data. It checks a deep equality check of both values.
     * @param valueA - the first AptosStreamish data to compare
     * @param valueB - the second AptosStreamish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  AptosStream.equals(valueA, valueB);
     * ```
     */
    AptosStream.equals = function (valueA, valueB) {
        var aptosStreamA = AptosStream.create(valueA);
        var aptosStreamB = AptosStream.create(valueB);
        if (aptosStreamA.id !== aptosStreamB.id) {
            return false;
        }
        return true;
    };
    /**
     * Compares an AptosStreamish data to this AptosStream instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * aptosStream.equals(value);
     * ```
     */
    AptosStream.prototype.equals = function (value) {
        return AptosStream.equals(this, value);
    };
    /**
     * Converts the AptosStream instance to a JSON object.
     * @returns JSON object of the AptosStream instance
     * @example `aptosStream.toJSON()`
     */
    AptosStream.prototype.toJSON = function () {
        return __assign(__assign({}, this._data), { network: this.network.map(function (network) { return network.toJSON(); }) });
    };
    /**
     * Converts the AptosStream instance to a JSON object.
     * @returns JSON object of the AptosStream instance
     * @example `aptosStream.format()`
     */
    AptosStream.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(AptosStream.prototype, "network", {
        get: function () {
            return this._data.network;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "webhookUrl", {
        get: function () {
            return this._data.webhookUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "description", {
        get: function () {
            return this._data.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "tag", {
        get: function () {
            return this._data.tag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "allAddresses", {
        get: function () {
            return this._data.allAddresses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "id", {
        get: function () {
            return this._data.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "status", {
        get: function () {
            return this._data.status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "statusMessage", {
        get: function () {
            return this._data.statusMessage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "demo", {
        get: function () {
            return this._data.demo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "includeChanges", {
        get: function () {
            return this._data.includeChanges;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "includeEvents", {
        get: function () {
            return this._data.includeEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "includePayload", {
        get: function () {
            return this._data.includePayload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "isErrorSince", {
        get: function () {
            return this._data.isErrorSince;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "events", {
        get: function () {
            return this._data.events;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "functions", {
        get: function () {
            return this._data.functions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AptosStream.prototype, "amountOfAddresses", {
        get: function () {
            return this._data.amountOfAddresses;
        },
        enumerable: false,
        configurable: true
    });
    AptosStream.parse = function (data) {
        return __assign(__assign({}, data), { network: data.network.map(function (network) { return AptosNetwork.create(network); }) });
    };
    return AptosStream;
}());

/**
 * The StreamSelector class is a representation of a stream selector
 *
 * Use this class any time you want to use a value in your stream trigger data that is not a static value
 *
 * @category DataType
 */
var StreamSelector = /** @class */ (function () {
    /**
     * Create a new instance of StreamSelector from any valid stream data field
     *
     * @example
     * ```
     * const receiverSelector = StreamSelector.create('$to')
     * const selector = StreamSelector.create('$contract')
     * ```
     */
    function StreamSelector(data) {
        this._value = StreamSelector.parse(data);
    }
    StreamSelector.isSelectorString = function (selector) {
        if (selector instanceof StreamSelector) {
            return true;
        }
        return selector.startsWith('$');
    };
    StreamSelector.create = function (streamSelector) {
        if (streamSelector instanceof StreamSelector) {
            return streamSelector;
        }
        return new StreamSelector(streamSelector);
    };
    StreamSelector.parse = function (streamSelector) {
        if (!StreamSelector.isSelectorString(streamSelector)) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: 'Invalid selector string provided',
            });
        }
        return streamSelector;
    };
    /**
     * Compares two StreamSelector data. It checks a deep equality check of both values.
     * @param valueA - the first StreamSelectorish data to compare
     * @param valueB - the second StreamSelectorish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamSelector.equals(valueA, valueB);
     * ```
     */
    StreamSelector.equals = function (valueA, valueB) {
        var streamSelectorA = StreamSelector.create(valueA);
        var streamSelectorB = StreamSelector.create(valueB);
        return streamSelectorA.value === streamSelectorB.value;
    };
    /**
     * Compares an StreamSelectorish data to this StreamSelector instance.
     * @param streamSelector - the streamSelector to compare
     * @returns true if the streamSelector is equal to the current instance, false otherwise
     * @example
     * ```ts
     * streamSelector.equals(streamSelector);
     * ```
     */
    StreamSelector.prototype.equals = function (streamSelector) {
        return StreamSelector.equals(this, streamSelector);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamSelector.prototype.format = function () {
        return this.value;
    };
    Object.defineProperty(StreamSelector.prototype, "value", {
        /**
         * @returns the selector path
         * @example '$from'
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    StreamSelector.prototype.toJSON = function () {
        return this.value;
    };
    return StreamSelector;
}());

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
var StreamTrigger = /** @class */ (function () {
    function StreamTrigger(data) {
        this._data = StreamTrigger.parse(data);
    }
    StreamTrigger.create = function (data) {
        if (data instanceof StreamTrigger) {
            return data;
        }
        return new StreamTrigger(data);
    };
    StreamTrigger.parseSelectorOrAddress = function (input) {
        var result;
        // If it is not an EvmAddress, it can be a string, but only the ones that are selectors should be treated that way
        if (!(input instanceof EvmAddress) && StreamSelector.isSelectorString(input)) {
            result = StreamSelector.create(input);
        }
        else {
            result = EvmAddress.create(input);
        }
        return result;
    };
    // eslint-disable-next-line complexity
    StreamTrigger.equals = function (valueA, valueB) {
        var _a, _b;
        var streamTriggerA = StreamTrigger.create(valueA);
        var streamTriggerB = StreamTrigger.create(valueB);
        if (streamTriggerA.type !== streamTriggerB.type) {
            return false;
        }
        // contractAddress can be a StreamSelector or an EvmAddress. It is easier to compare them as strings
        if (streamTriggerA.contractAddress.toJSON() !== streamTriggerB.contractAddress.toJSON()) {
            return false;
        }
        if (streamTriggerA.functionAbi !== streamTriggerB.functionAbi) {
            return false;
        }
        if (((_a = streamTriggerA.inputs) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = streamTriggerB.inputs) === null || _b === void 0 ? void 0 : _b.length)) {
            return false;
        }
        var triggerInputsA = streamTriggerA.inputs || [];
        var triggerInputsB = streamTriggerB.inputs || [];
        for (var i = 0; i < (triggerInputsA === null || triggerInputsA === void 0 ? void 0 : triggerInputsA.length); i++) {
            if (triggerInputsA[i] !== triggerInputsB[i]) {
                return false;
            }
        }
        if (streamTriggerA.topic0 !== streamTriggerB.topic0) {
            return false;
        }
        if (streamTriggerA.callFrom !== streamTriggerB.callFrom) {
            return false;
        }
        return true;
    };
    /**
     * Compares two StreamTrigger arrays. It checks a deep equality check of both values, meaning that all the values have to be on both arrays.
     * @param valueA - the first StreamTriggerish[] data to compare
     * @param valueB - the second StreamTriggerish[] data to compare
     * @returns true if all values are equal, false otherwise
     * @example
     * ```ts
     *  StreamTrigger.arrayEquals(valueA, valueB);
     * ```
     */
    StreamTrigger.arrayEquals = function (valueA, valueB) {
        if (valueA.length !== valueB.length) {
            return false;
        }
        var triggersA = valueA.map(function (trigger) { return StreamTrigger.create(trigger); });
        var triggersB = valueB.map(function (trigger) { return StreamTrigger.create(trigger); });
        var seenTriggersB = Array(triggersB.length).fill(false);
        var _loop_1 = function (i) {
            var indexB = triggersB.findIndex(function (triggerB) { return triggerB.equals(triggersA[i]); });
            if (indexB < 0) {
                return { value: false };
            }
            seenTriggersB[indexB] = true;
        };
        for (var i = 0; i < triggersA.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (seenTriggersB.some(function (seen) { return !seen; })) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamTrigger data to this StreamTrigger instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * streamTrigger.equals(value);
     * ```
     */
    StreamTrigger.prototype.equals = function (value) {
        return StreamTrigger.equals(this, value);
    };
    /**
     * Converts the StreamTrigger instance to a JSON object.
     * @returns JSON object of the StreamTrigger instance
     * @example `streamTrigger.toJSON()`
     */
    StreamTrigger.prototype.toJSON = function () {
        var _a = this._data, contractAddress = _a.contractAddress, callFrom = _a.callFrom, data = __rest(_a, ["contractAddress", "callFrom"]);
        return __assign(__assign({}, data), { contractAddress: contractAddress.toJSON(), callFrom: callFrom === null || callFrom === void 0 ? void 0 : callFrom.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamTrigger.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamTrigger.prototype, "type", {
        get: function () {
            return this._data.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTrigger.prototype, "contractAddress", {
        get: function () {
            return this._data.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTrigger.prototype, "functionAbi", {
        get: function () {
            return this._data.functionAbi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTrigger.prototype, "inputs", {
        get: function () {
            return this._data.inputs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTrigger.prototype, "topic0", {
        get: function () {
            return this._data.topic0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTrigger.prototype, "callFrom", {
        get: function () {
            return this._data.callFrom;
        },
        enumerable: false,
        configurable: true
    });
    StreamTrigger.parse = function (data) {
        var contractAddressInput = data.contractAddress, callFromInput = data.callFrom, input = __rest(data, ["contractAddress", "callFrom"]);
        var contractAddress = StreamTrigger.parseSelectorOrAddress(contractAddressInput);
        var callFrom = maybe(callFromInput, function (value) { return StreamTrigger.parseSelectorOrAddress(value); });
        return __assign(__assign({}, input), { contractAddress: contractAddress, callFrom: callFrom });
    };
    return StreamTrigger;
}());

/**
 * The EvmStream class is a representation of Moralis Stream that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var EvmStream = /** @class */ (function () {
    function EvmStream(data) {
        this._data = EvmStream.parse(data);
    }
    /**
     * Create a new instance of EvmStream
     *
     * @param data - the EvmStreamish type
     * @example
     * ```ts
     * const evmStream = EvmStream.create(data);
     * ```
     * @returns an instance of EvmStream
     */
    EvmStream.create = function (data) {
        if (data instanceof EvmStream) {
            return data;
        }
        return new EvmStream(data);
    };
    /**
     * Compares two EvmStream data. It checks a deep equality check of both values.
     * @param valueA - the first EvmStreamish data to compare
     * @param valueB - the second EvmStreamish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  EvmStream.equals(valueA, valueB);
     * ```
     */
    EvmStream.equals = function (valueA, valueB) {
        var _a, _b;
        var evmStreamA = EvmStream.create(valueA);
        var evmStreamB = EvmStream.create(valueB);
        if (evmStreamA.id !== evmStreamB.id) {
            return false;
        }
        if (((_a = evmStreamA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = evmStreamB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTrigger.arrayEquals(evmStreamA.triggers || [], evmStreamB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an EvmStreamish data to this EvmStream instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * evmStream.equals(value);
     * ```
     */
    EvmStream.prototype.equals = function (value) {
        return EvmStream.equals(this, value);
    };
    /**
     * Converts the EvmStream instance to a JSON object.
     * @returns JSON object of the EvmStream instance
     * @example `evmStream.toJSON()`
     */
    EvmStream.prototype.toJSON = function () {
        var _a = this._data, chains = _a.chains, triggers = _a.triggers, data = __rest(_a, ["chains", "triggers"]);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return __assign(__assign({}, data), { chainIds: chains.map(function (chain) { return chain.toJSON(); }), triggers: triggers === null || triggers === void 0 ? void 0 : triggers.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmStream.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmStream.prototype, "chains", {
        get: function () {
            return this._data.chains;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "chainIds", {
        get: function () {
            return this._data.chains.map(function (chain) { return chain.hex; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "webhookUrl", {
        get: function () {
            return this._data.webhookUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "description", {
        get: function () {
            return this._data.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "tag", {
        get: function () {
            return this._data.tag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "topic0", {
        get: function () {
            return this._data.topic0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "allAddresses", {
        get: function () {
            return this._data.allAddresses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "includeNativeTxs", {
        get: function () {
            return this._data.includeNativeTxs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "includeContractLogs", {
        get: function () {
            return this._data.includeContractLogs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "includeInternalTxs", {
        get: function () {
            return this._data.includeInternalTxs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "includeAllTxLogs", {
        get: function () {
            return this._data.includeAllTxLogs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "abi", {
        get: function () {
            return this._data.abi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "advancedOptions", {
        get: function () {
            return this._data.advancedOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "id", {
        get: function () {
            return this._data.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "status", {
        get: function () {
            return this._data.status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "statusMessage", {
        get: function () {
            return this._data.statusMessage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStream.prototype, "getNativeBalances", {
        get: function () {
            return this._data.getNativeBalances;
        },
        enumerable: false,
        configurable: true
    });
    EvmStream.parse = function (data) {
        var _a, _b, _c, _d, _e;
        return __assign(__assign({}, data), { chains: data.chainIds.map(function (chainId) { return EvmChain.create(chainId); }), topic0: maybe(data.topic0), allAddresses: (_a = data.allAddresses) !== null && _a !== void 0 ? _a : false, includeContractLogs: (_b = data.includeContractLogs) !== null && _b !== void 0 ? _b : false, includeInternalTxs: (_c = data.includeInternalTxs) !== null && _c !== void 0 ? _c : false, includeAllTxLogs: (_d = data.includeAllTxLogs) !== null && _d !== void 0 ? _d : false, includeNativeTxs: (_e = data.includeNativeTxs) !== null && _e !== void 0 ? _e : false, advancedOptions: maybe(data.advancedOptions), abi: maybe(data.abi), triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTrigger.create(trigger); }); }), getNativeBalances: maybe(data.getNativeBalances) });
    };
    return EvmStream;
}());

var EvmStreamResultFormatter = /** @class */ (function () {
    function EvmStreamResultFormatter() {
    }
    EvmStreamResultFormatter.toJSON = function (data) {
        return __assign(__assign({}, data), { erc20Transfers: data.erc20Transfers.map(function (value) { return value.toJSON(); }), erc20Approvals: data.erc20Approvals.map(function (value) { return value.toJSON(); }), nftTransfers: data.nftTransfers.map(function (value) { return value.toJSON(); }), nftApprovals: {
                ERC721: data.nftApprovals.ERC721.map(function (value) { return value.toJSON(); }),
                ERC1155: data.nftApprovals.ERC1155.map(function (value) { return value.toJSON(); }),
            }, ntfTokenApprovals: data.ntfTokenApprovals.map(function (value) { return value.toJSON(); }), chain: data.chain.toJSON(), block: data.block.toJSON(), logs: data.logs.map(function (value) { return value.toJSON(); }), txs: data.txs.map(function (value) { return value.toJSON(); }), txsInternal: data.txsInternal.map(function (value) { return value.toJSON(); }), abi: data.abi, nativeBalances: data.nativeBalances.map(function (nativeBalance) { return nativeBalance.toJSON(); }) });
    };
    return EvmStreamResultFormatter;
}());

/**
 * The StreamTrigger class is a representation of a stream trigger that is used by the Moralis Stream API
 *
 * @category DataType
 */
var StreamTriggerOutput = /** @class */ (function () {
    function StreamTriggerOutput(data) {
        this._data = StreamTriggerOutput.parse(data);
    }
    StreamTriggerOutput.create = function (data) {
        if (data instanceof StreamTriggerOutput) {
            return data;
        }
        return new StreamTriggerOutput(data);
    };
    /**
     * Compares two StreamTriggerOutput data. It checks a deep equality check of both values.
     * @param valueA - the first StreamTriggerOutputish data to compare
     * @param valueB - the second StreamTriggerOutputish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamTriggerOutput.equals(valueA, valueB);
     * ```
     */
    StreamTriggerOutput.equals = function (valueA, valueB) {
        var streamTriggerOutputA = StreamTriggerOutput.create(valueA);
        var streamTriggerOutputB = StreamTriggerOutput.create(valueB);
        return (streamTriggerOutputA.name === streamTriggerOutputB.name &&
            streamTriggerOutputA.value === streamTriggerOutputB.value);
    };
    /**
     * Compares two StreamTriggerOutput arrays. It checks a deep equality check of both values, meaning that all the values have to be on both arrays.
     * @param valueA - the first StreamTriggerOutputish[] data to compare
     * @param valueB - the second StreamTriggerOutputish[] data to compare
     * @returns true if all values are equal, false otherwise
     * @example
     * ```ts
     *  StreamTriggerOutput.arrayEquals(valueA, valueB);
     * ```
     */
    StreamTriggerOutput.arrayEquals = function (valueA, valueB) {
        if (valueA.length !== valueB.length) {
            return false;
        }
        var triggerOutputsA = valueA.map(function (triggerOutput) { return StreamTriggerOutput.create(triggerOutput); });
        var triggerOutputsB = valueB.map(function (triggerOutput) { return StreamTriggerOutput.create(triggerOutput); });
        triggerOutputsA.sort(function (a, b) { return (b.name > a.name ? 1 : -1); });
        triggerOutputsB.sort(function (a, b) { return (b.name > a.name ? 1 : -1); });
        for (var i = 0; i < (triggerOutputsA === null || triggerOutputsA === void 0 ? void 0 : triggerOutputsA.length); i++) {
            if (!triggerOutputsA[i].equals(triggerOutputsB[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Compares an StreamTriggerOutputish data to this StreamTriggerOutput instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * streamTriggerOutput.equals(value);
     * ```
     */
    StreamTriggerOutput.prototype.equals = function (value) {
        return StreamTriggerOutput.equals(this, value);
    };
    /**
     * Converts the StreamTriggerOutput instance to a JSON object.
     * @returns JSON object of the StreamTriggerOutput instance
     * @example `streamTriggerOutput.toJSON()`
     */
    StreamTriggerOutput.prototype.toJSON = function () {
        var data = __rest(this._data, []);
        return __assign({}, data);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamTriggerOutput.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamTriggerOutput.prototype, "name", {
        get: function () {
            return this._data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamTriggerOutput.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    StreamTriggerOutput.parse = function (data) {
        return __assign({}, data);
    };
    return StreamTriggerOutput;
}());

/**
 * The StreamErc1155Approval class is a representation of a nft approval (ERC1155) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamErc1155Approval = /** @class */ (function () {
    function StreamErc1155Approval(data) {
        this._data = StreamErc1155Approval.parse(data);
    }
    /**
     * Create a new instance of StreamErc1155Approval
     *
     * @param data - the StreamErc1155Approvalish type
     * @example
     * ```ts
     * const evmNftApproval = StreamErc1155Approval.create(data);
     * ```
     * @returns an instance of StreamErc1155Approval
     */
    StreamErc1155Approval.create = function (data) {
        if (data instanceof StreamErc1155Approval) {
            return data;
        }
        return new StreamErc1155Approval(data);
    };
    /**
     * Compares two StreamErc1155Approval data. It checks a deep equality check of both values.
     * @param valueA - the first StreamErc1155Approvalish data to compare
     * @param valueB - the second StreamErc1155Approvalish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamErc1155Approval.equals(valueA, valueB);
     * ```
     */
    // eslint-disable-next-line complexity
    StreamErc1155Approval.equals = function (valueA, valueB) {
        var _a, _b;
        var evmNftApprovalA = StreamErc1155Approval.create(valueA);
        var evmNftApprovalB = StreamErc1155Approval.create(valueB);
        if (!evmNftApprovalA.chain.equals(evmNftApprovalB.chain)) {
            return false;
        }
        if (evmNftApprovalA.transactionHash !== evmNftApprovalB.transactionHash) {
            return false;
        }
        if (!evmNftApprovalA.account.equals(evmNftApprovalB.account)) {
            return false;
        }
        if (!evmNftApprovalA.contract.equals(evmNftApprovalB.contract)) {
            return false;
        }
        if (!evmNftApprovalA.operator.equals(evmNftApprovalB.operator)) {
            return false;
        }
        if (evmNftApprovalA.approved !== evmNftApprovalB.approved) {
            return false;
        }
        if (((_a = evmNftApprovalA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = evmNftApprovalB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(evmNftApprovalA.triggers || [], evmNftApprovalB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamErc1155Approvalish data to this StreamErc1155Approval instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * evmNftApproval.equals(value);
     * ```
     */
    StreamErc1155Approval.prototype.equals = function (value) {
        return StreamErc1155Approval.equals(this, value);
    };
    /**
     * Converts the StreamErc1155Approval instance to a JSON object.
     * @returns JSON object of the StreamErc1155Approval instance
     * @example `evmNftApproval.toJSON()`
     */
    StreamErc1155Approval.prototype.toJSON = function () {
        var _a;
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), contract: data.contract.toJSON(), account: data.account.toJSON(), operator: data.operator.toJSON(), triggers: (_a = data.triggers) === null || _a === void 0 ? void 0 : _a.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * Converts the StreamErc1155Approval instance to a JSON object.
     * @returns JSON object of the StreamErc1155Approval instance
     * @example `evmNftApproval.format()`
     */
    StreamErc1155Approval.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamErc1155Approval.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "approved", {
        get: function () {
            return this._data.approved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "contract", {
        get: function () {
            return this._data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "account", {
        get: function () {
            return this._data.account;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "operator", {
        get: function () {
            return this._data.operator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "tokenContractType", {
        get: function () {
            return this._data.tokenContractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "tokenName", {
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "tokenSymbol", {
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc1155Approval.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    StreamErc1155Approval.parse = function (data) {
        var chain = EvmChain.create(data.chain);
        return __assign(__assign({}, data), { chain: chain, logIndex: +data.logIndex, account: EvmAddress.create(data.account), operator: EvmAddress.create(data.operator), contract: EvmAddress.create(data.contract), tokenContractType: data.tokenContractType, triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    return StreamErc1155Approval;
}());

/**
 * The StreamErc20Transfer class is a representation of a erc20 approval that is returned by the Moralis Stream API
 *
 * @category DataTypexw
 */
var StreamErc20Approval = /** @class */ (function () {
    function StreamErc20Approval(data) {
        this._data = StreamErc20Approval.parse(data);
    }
    /**
     * Create a new instance of StreamErc20Approval
     *
     * @param data - the StreamErc20Approvalish type
     * @example
     * ```ts
     * const erc20Approval = StreamErc20Approval.create(data);
     * ```
     * @returns an instance of StreamErc20Approval
     */
    StreamErc20Approval.create = function (data) {
        if (data instanceof StreamErc20Approval) {
            return data;
        }
        return new StreamErc20Approval(data);
    };
    /**
     * Compares two StreamErc20Approval data. It checks a deep equality check of both values.
     * @param valueA - the first StreamErc20Approvalish data to compare
     * @param valueB - the second StreamErc20Approvalish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamErc20Approval.equals(valueA, valueB);
     * ```
     */
    StreamErc20Approval.equals = function (valueA, valueB) {
        var _a, _b;
        var erc20ApprovalA = StreamErc20Approval.create(valueA);
        var erc20ApprovalB = StreamErc20Approval.create(valueB);
        if (!erc20ApprovalA.chain.equals(erc20ApprovalB.chain)) {
            return false;
        }
        if (erc20ApprovalA.transactionHash !== erc20ApprovalB.transactionHash) {
            return false;
        }
        if (erc20ApprovalA.logIndex !== erc20ApprovalB.logIndex) {
            return false;
        }
        if (((_a = erc20ApprovalA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = erc20ApprovalB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(erc20ApprovalA.triggers || [], erc20ApprovalB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamErc20Approvalish data to this StreamErc20Approval instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * erc20Approval.equals(value);
     * ```
     */
    StreamErc20Approval.prototype.equals = function (value) {
        return StreamErc20Approval.equals(this, value);
    };
    /**
     * Converts the StreamErc20Approval instance to a JSON object.
     * @returns JSON object of the StreamErc20Approval instance
     * @example `erc20Approval.toJSON()`
     */
    StreamErc20Approval.prototype.toJSON = function () {
        var _a = this._data, chain = _a.chain, owner = _a.owner, spender = _a.spender, contract = _a.contract, value = _a.value, triggers = _a.triggers, data = __rest(_a, ["chain", "owner", "spender", "contract", "value", "triggers"]);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return __assign(__assign({}, data), { chain: chain.toJSON(), owner: owner.toJSON(), spender: spender.toJSON(), contract: contract.toJSON(), value: value.toString(), triggers: triggers === null || triggers === void 0 ? void 0 : triggers.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamErc20Approval.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamErc20Approval.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "owner", {
        get: function () {
            return this._data.owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "spender", {
        get: function () {
            return this._data.spender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "contract", {
        get: function () {
            return this._data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "tokenName", {
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "tokenSymbol", {
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "tokenDecimals", {
        get: function () {
            return this._data.tokenDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "valueWithDecimals", {
        get: function () {
            return this._data.valueWithDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Approval.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    StreamErc20Approval.parse = function (data) {
        var chain = EvmChain.create(data.chain);
        return __assign(__assign({}, data), { chain: chain, spender: EvmAddress.create(data.spender), owner: EvmAddress.create(data.owner), logIndex: +data.logIndex, contract: EvmAddress.create(data.contract), value: BigNumber.create(data.value), valueWithDecimals: maybe(data.valueWithDecimals), tokenDecimals: data.tokenDecimals === '' ? undefined : +data.tokenDecimals, triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    return StreamErc20Approval;
}());

/**
 * The StreamErc20Transfer class is a representation of a erc20 transfer that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamErc20Transfer = /** @class */ (function () {
    function StreamErc20Transfer(data) {
        this._data = StreamErc20Transfer.parse(data);
    }
    /**
     * Create a new instance of StreamErc20Transfer
     *
     * @param data - the StreamErc20Transferish type
     * @example
     * ```ts
     * const erc20Transfer = StreamErc20Transfer.create(data);
     * ```
     * @returns an instance of StreamErc20Transfer
     */
    StreamErc20Transfer.create = function (data) {
        if (data instanceof StreamErc20Transfer) {
            return data;
        }
        return new StreamErc20Transfer(data);
    };
    /**
     * Compares two StreamErc20Transfer data. It checks a deep equality check of both values.
     * @param valueA - the first StreamErc20Transferish data to compare
     * @param valueB - the second StreamErc20Transferish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamErc20Transfer.equals(valueA, valueB);
     * ```
     */
    StreamErc20Transfer.equals = function (valueA, valueB) {
        var _a, _b;
        var erc20TransferA = StreamErc20Transfer.create(valueA);
        var erc20TransferB = StreamErc20Transfer.create(valueB);
        if (!erc20TransferA.chain.equals(erc20TransferB.chain)) {
            return false;
        }
        if (erc20TransferA.transactionHash !== erc20TransferB.transactionHash) {
            return false;
        }
        if (erc20TransferA.logIndex !== erc20TransferB.logIndex) {
            return false;
        }
        if (((_a = erc20TransferA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = erc20TransferB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(erc20TransferA.triggers || [], erc20TransferB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamErc20Transferish data to this StreamErc20Transfer instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * erc20Transfer.equals(value);
     * ```
     */
    StreamErc20Transfer.prototype.equals = function (value) {
        return StreamErc20Transfer.equals(this, value);
    };
    /**
     * Converts the StreamErc20Transfer instance to a JSON object.
     * @returns JSON object of the StreamErc20Transfer instance
     * @example `erc20Transfer.toJSON()`
     */
    StreamErc20Transfer.prototype.toJSON = function () {
        var _a = this._data, chain = _a.chain, from = _a.from, to = _a.to, contract = _a.contract, value = _a.value, triggers = _a.triggers, data = __rest(_a, ["chain", "from", "to", "contract", "value", "triggers"]);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return __assign(__assign({}, data), { chain: chain.toJSON(), from: from.toJSON(), to: to.toJSON(), contract: contract.toJSON(), value: value.toString(), triggers: triggers === null || triggers === void 0 ? void 0 : triggers.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamErc20Transfer.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamErc20Transfer.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "from", {
        get: function () {
            return this._data.from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "to", {
        get: function () {
            return this._data.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "contract", {
        get: function () {
            return this._data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "tokenName", {
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "tokenSymbol", {
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "tokenDecimals", {
        get: function () {
            return this._data.tokenDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "valueWithDecimals", {
        get: function () {
            return this._data.valueWithDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc20Transfer.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    StreamErc20Transfer.parse = function (data) {
        var chain = EvmChain.create(data.chain);
        return __assign(__assign({}, data), { chain: chain, from: EvmAddress.create(data.from), to: EvmAddress.create(data.to), logIndex: +data.logIndex, contract: EvmAddress.create(data.contract), value: BigNumber.create(data.value), valueWithDecimals: maybe(data.valueWithDecimals), tokenDecimals: data.tokenDecimals === '' ? undefined : +data.tokenDecimals, triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    return StreamErc20Transfer;
}());

/**
 * The StreamErc1155Approval class is a representation of a nft approval (ERC721) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamErc721Approval = /** @class */ (function () {
    function StreamErc721Approval(data) {
        this._data = StreamErc721Approval.parse(data);
    }
    /**
     * Create a new instance of StreamErc721Approval
     *
     * @param data - the StreamErc721Approvalish type
     * @example
     * ```ts
     * const evmNftApproval = StreamErc721Approval.create(data);
     * ```
     * @returns an instance of StreamErc721Approval
     */
    StreamErc721Approval.create = function (data) {
        if (data instanceof StreamErc721Approval) {
            return data;
        }
        return new StreamErc721Approval(data);
    };
    /**
     * Compares two StreamErc721Approval data. It checks a deep equality check of both values.
     * @param valueA - the first StreamErc721Approvalish data to compare
     * @param valueB - the second StreamErc721Approvalish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamErc721Approval.equals(valueA, valueB);
     * ```
     */
    // eslint-disable-next-line complexity
    StreamErc721Approval.equals = function (valueA, valueB) {
        var _a, _b;
        var evmNftApprovalA = StreamErc721Approval.create(valueA);
        var evmNftApprovalB = StreamErc721Approval.create(valueB);
        if (!evmNftApprovalA.chain.equals(evmNftApprovalB.chain)) {
            return false;
        }
        if (evmNftApprovalA.transactionHash !== evmNftApprovalB.transactionHash) {
            return false;
        }
        if (!evmNftApprovalA.owner.equals(evmNftApprovalB.owner)) {
            return false;
        }
        if (!evmNftApprovalA.contract.equals(evmNftApprovalB.contract)) {
            return false;
        }
        if (evmNftApprovalA.tokenId !== evmNftApprovalB.tokenId) {
            return false;
        }
        if (!evmNftApprovalA.approved.equals(evmNftApprovalB.approved)) {
            return false;
        }
        if (((_a = evmNftApprovalA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = evmNftApprovalB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(evmNftApprovalA.triggers || [], evmNftApprovalB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamErc721Approvalish data to this StreamErc721Approval instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * evmNftApproval.equals(value);
     * ```
     */
    StreamErc721Approval.prototype.equals = function (value) {
        return StreamErc721Approval.equals(this, value);
    };
    /**
     * Converts the StreamErc721Approval instance to a JSON object.
     * @returns JSON object of the StreamErc721Approval instance
     * @example `evmNftApproval.toJSON()`
     */
    StreamErc721Approval.prototype.toJSON = function () {
        var _a;
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), contract: data.contract.toJSON(), owner: data.owner.toJSON(), approved: data.approved.toJSON(), triggers: (_a = data.triggers) === null || _a === void 0 ? void 0 : _a.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamErc721Approval.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamErc721Approval.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "approved", {
        get: function () {
            return this._data.approved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "owner", {
        get: function () {
            return this._data.owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "contract", {
        get: function () {
            return this._data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "tokenId", {
        get: function () {
            return this._data.tokenId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "tokenContractType", {
        get: function () {
            return this._data.tokenContractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "tokenName", {
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "tokenSymbol", {
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamErc721Approval.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    StreamErc721Approval.parse = function (data) {
        var chain = EvmChain.create(data.chain);
        return __assign(__assign({}, data), { chain: chain, logIndex: +data.logIndex, owner: EvmAddress.create(data.owner), contract: EvmAddress.create(data.contract), tokenContractType: data.tokenContractType, approved: EvmAddress.create(data.approved), triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    return StreamErc721Approval;
}());

/**
 * The StreamEvmInternalTransaction class is a representation of an internal transaction that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamEvmInternalTransaction = /** @class */ (function () {
    function StreamEvmInternalTransaction(data) {
        this._data = StreamEvmInternalTransaction.parse(data);
    }
    /**
     * Create a new instance of StreamEvmInternalTransactionish
     *
     * @param data - the StreamEvmInternalTransactionishish type
     * @example
     * ```ts
     * const transaction = StreamEvmTransactionish.create(data);
     * ```
     * @returns an instance of StreamEvmInternalTransaction
     */
    StreamEvmInternalTransaction.create = function (data) {
        if (data instanceof StreamEvmInternalTransaction) {
            return data;
        }
        return new StreamEvmInternalTransaction(data);
    };
    /**
     * Compares two StreamEvmInternalTransaction data. It checks a deep equality check of both values.
     * @param valueA - the first StreamEvmInternalTransactionish data to compare
     * @param valueB - the second StreamEvmInternalTransactionish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamEvmInternalTransaction.equals(valueA, valueB);
     * ```
     */
    StreamEvmInternalTransaction.equals = function (valueA, valueB) {
        var _a, _b;
        var evmInternalTransactionA = StreamEvmInternalTransaction.create(valueA);
        var evmInternalTransactionB = StreamEvmInternalTransaction.create(valueB);
        if (!evmInternalTransactionA.chain.equals(evmInternalTransactionB.chain)) {
            return false;
        }
        if (evmInternalTransactionA.transactionHash !== evmInternalTransactionB.transactionHash) {
            return false;
        }
        if (((_a = evmInternalTransactionA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = evmInternalTransactionB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(evmInternalTransactionA.triggers || [], evmInternalTransactionB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamEvmInternalTransactionish data to this StreamEvmInternalTransaction instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * evmInternalTransaction.equals(value);
     * ```
     */
    StreamEvmInternalTransaction.prototype.equals = function (value) {
        return StreamEvmInternalTransaction.equals(this, value);
    };
    /**
     * Converts the StreamEvmInternalTransaction instance to a JSON object.
     * @returns JSON object of the StreamEvmInternalTransaction instance
     * @example `evmInternalTransaction.toJSON()`
     */
    StreamEvmInternalTransaction.prototype.toJSON = function () {
        var _a, _b, _c, _d, _e;
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), from: (_a = data.from) === null || _a === void 0 ? void 0 : _a.toJSON(), to: (_b = data.to) === null || _b === void 0 ? void 0 : _b.toJSON(), value: (_c = data.value) === null || _c === void 0 ? void 0 : _c.toString(), gas: (_d = data.gas) === null || _d === void 0 ? void 0 : _d.toString(), triggers: (_e = data.triggers) === null || _e === void 0 ? void 0 : _e.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamEvmInternalTransaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "from", {
        get: function () {
            return this._data.from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "to", {
        get: function () {
            return this._data.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "gas", {
        get: function () {
            return this._data.gas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmInternalTransaction.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    StreamEvmInternalTransaction.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), from: maybe(data.from, function (value) { return EvmAddress.create(value); }), to: maybe(data.to, function (value) { return EvmAddress.create(value); }), value: maybe(data.value, function (value) { return BigNumber.create(value); }), gas: maybe(data.gas, function (value) { return BigNumber.create(value); }), triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) })); };
    return StreamEvmInternalTransaction;
}());

/**
 * The StreamEvmNftTransfer class is a representation of a nft transfer (EREC721 or ERC1155) that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamEvmNftTransfer = /** @class */ (function () {
    function StreamEvmNftTransfer(data) {
        this._data = StreamEvmNftTransfer.parse(data);
    }
    /**
     * Create a new instance of StreamEvmNftTransferish
     *
     * @param data - the StreamEvmNftTransferishish type
     * @example
     * ```ts
     * const transfer = StreamEvmTransactionish.create(data);
     * ```
     * @returns an instance of StreamEvmNftTransfer
     */
    StreamEvmNftTransfer.create = function (data) {
        if (data instanceof StreamEvmNftTransfer) {
            return data;
        }
        return new StreamEvmNftTransfer(data);
    };
    StreamEvmNftTransfer.parse = function (data) {
        return __assign(__assign({}, data), { chain: EvmChain.create(data.chain), to: EvmAddress.create(data.to), contract: EvmAddress.create(data.contract), from: EvmAddress.create(data.from), logIndex: +data.logIndex, operator: maybe(data.operator, function (operator) { return EvmAddress.create(operator); }), tokenId: data.tokenId, transactionHash: data.transactionHash, amount: +data.amount, tokenName: data.tokenName, triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    /**
     * Compares two StreamEvmNftTransfer data. It checks a deep equality check of both values.
     * @param valueA - the first StreamEvmNftTransferish data to compare
     * @param valueB - the second StreamEvmNftTransferish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamEvmNftTransfer.equals(valueA, valueB);
     * ```
     */
    // eslint-disable-next-line complexity
    StreamEvmNftTransfer.equals = function (valueA, valueB) {
        var _a, _b;
        var transferA = StreamEvmNftTransfer.create(valueA);
        var transferB = StreamEvmNftTransfer.create(valueB);
        if (!transferA.chain.equals(transferB.chain)) {
            return false;
        }
        if (transferA.transactionHash !== transferB.transactionHash) {
            return false;
        }
        if (transferA.logIndex !== transferB.logIndex) {
            return false;
        }
        if (!transferA.contract.equals(transferB.contract)) {
            return false;
        }
        if (transferA.tokenId !== transferB.tokenId) {
            return false;
        }
        if (((_a = transferA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = transferB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(transferA.triggers || [], transferB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamEvmNftTransferish data to this StreamEvmNftTransfer instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * transfer.equals(value);
     * ```
     */
    StreamEvmNftTransfer.prototype.equals = function (value) {
        return StreamEvmNftTransfer.equals(this, value);
    };
    /**
     * Converts the StreamEvmNftTransfer instance to a JSON object.
     * @returns JSON object of the StreamEvmNftTransfer instance
     * @example `transfer.toJSON()`
     */
    StreamEvmNftTransfer.prototype.toJSON = function () {
        var _a, _b;
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), from: data.from.toJSON(), to: data.to.toJSON(), contract: data.contract.toJSON(), operator: (_a = data.operator) === null || _a === void 0 ? void 0 : _a.toJSON(), triggers: (_b = data.triggers) === null || _b === void 0 ? void 0 : _b.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamEvmNftTransfer.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamEvmNftTransfer.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "from", {
        get: function () {
            return this._data.from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "to", {
        get: function () {
            return this._data.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "contract", {
        get: function () {
            return this._data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "tokenId", {
        get: function () {
            return this._data.tokenId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "amount", {
        get: function () {
            return this._data.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "tokenContractType", {
        get: function () {
            return this._data.tokenContractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "tokenName", {
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "tokenSymbol", {
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "operator", {
        get: function () {
            return this._data.operator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTransfer.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    return StreamEvmNftTransfer;
}());

/**
 * The StreamEvmTransaction class is a representation of a transaction that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamEvmTransaction = /** @class */ (function () {
    function StreamEvmTransaction(_a) {
        var data = __rest(_a, []);
        this._data = StreamEvmTransaction.parse(data);
    }
    /**
     * Create a new instance of StreamEvmTransactionish
     *
     * @param data - the StreamEvmTransactionishish type
     * @example
     * ```ts
     * const transaction = StreamEvmTransactionish.create(data);
     * ```
     * @returns an instance of StreamEvmTransaction
     */
    StreamEvmTransaction.create = function (data) {
        if (data instanceof StreamEvmTransaction) {
            return data;
        }
        return new StreamEvmTransaction(data);
    };
    StreamEvmTransaction.parse = function (data) {
        var signature = data.r != null && data.s != null && data.v != null
            ? EvmSignature.create({ r: data.r, s: data.s, v: data.v })
            : undefined;
        return __assign(__assign({}, data), { chain: EvmChain.create(data.chain), gas: maybe(data.gas, BigNumber.create), gasPrice: maybe(data.gasPrice, BigNumber.create), nonce: maybe(data.nonce, BigNumber.create), input: maybe(data.input), fromAddress: EvmAddress.create(data.fromAddress), toAddress: maybe(data.toAddress, function (address) { return EvmAddress.create(address); }), value: maybe(data.value, BigNumber.create), type: maybe(data.type, function (type) { return +type; }), receiptCumulativeGasUsed: maybe(data.receiptCumulativeGasUsed, BigNumber.create), receiptGasUsed: maybe(data.receiptGasUsed, BigNumber.create), receiptContractAddress: maybe(data.receiptContractAddress, function (address) { return EvmAddress.create(address); }), receiptRoot: maybe(data.receiptRoot), receiptStatus: maybe(data.receiptStatus, function (status) { return +status; }), signature: signature, transactionIndex: +data.transactionIndex, triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    /**
     * Compares two StreamEvmTransaction data. It checks a deep equality check of both values.
     * @param valueA - the first StreamEvmTransactionish data to compare
     * @param valueB - the second StreamEvmTransactionish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamEvmTransaction.equals(valueA, valueB);
     * ```
     */
    StreamEvmTransaction.equals = function (valueA, valueB) {
        var _a, _b;
        var transactionA = StreamEvmTransaction.create(valueA);
        var transactionB = StreamEvmTransaction.create(valueB);
        if (!transactionA.chain.equals(transactionB.chain)) {
            return false;
        }
        if (transactionA.hash !== transactionB.hash) {
            return false;
        }
        if (((_a = transactionA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = transactionB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(transactionA.triggers || [], transactionB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamEvmTransactionish data to this StreamEvmTransaction instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * transaction.equals(value);
     * ```
     */
    StreamEvmTransaction.prototype.equals = function (value) {
        return StreamEvmTransaction.equals(this, value);
    };
    /**
     * Converts the StreamEvmTransaction instance to a JSON object.
     * @returns JSON object of the StreamEvmTransaction instance
     * @example `transaction.toJSON()`
     */
    StreamEvmTransaction.prototype.toJSON = function () {
        var _a = this._data, chain = _a.chain, gas = _a.gas, gasPrice = _a.gasPrice, nonce = _a.nonce, fromAddress = _a.fromAddress, toAddress = _a.toAddress, value = _a.value, receiptContractAddress = _a.receiptContractAddress, receiptCumulativeGasUsed = _a.receiptCumulativeGasUsed, receiptGasUsed = _a.receiptGasUsed, signature = _a.signature, triggers = _a.triggers, data = __rest(_a, ["chain", "gas", "gasPrice", "nonce", "fromAddress", "toAddress", "value", "receiptContractAddress", "receiptCumulativeGasUsed", "receiptGasUsed", "signature", "triggers"]);
        return __assign(__assign({}, data), { chain: chain.toJSON(), gas: gas === null || gas === void 0 ? void 0 : gas.toString(), gasPrice: gasPrice === null || gasPrice === void 0 ? void 0 : gasPrice.toString(), nonce: nonce === null || nonce === void 0 ? void 0 : nonce.toString(), fromAddress: fromAddress.toJSON(), toAddress: toAddress === null || toAddress === void 0 ? void 0 : toAddress.toJSON(), value: value === null || value === void 0 ? void 0 : value.toString(), receiptCumulativeGasUsed: receiptCumulativeGasUsed === null || receiptCumulativeGasUsed === void 0 ? void 0 : receiptCumulativeGasUsed.toString(), receiptGasUsed: receiptGasUsed === null || receiptGasUsed === void 0 ? void 0 : receiptGasUsed.toString(), receiptContractAddress: receiptContractAddress === null || receiptContractAddress === void 0 ? void 0 : receiptContractAddress.toJSON(), r: signature === null || signature === void 0 ? void 0 : signature.r, s: signature === null || signature === void 0 ? void 0 : signature.s, v: signature === null || signature === void 0 ? void 0 : signature.v, triggers: triggers === null || triggers === void 0 ? void 0 : triggers.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamEvmTransaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamEvmTransaction.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "input", {
        get: function () {
            return this._data.input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "transactionIndex", {
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "fromAddress", {
        get: function () {
            return this._data.fromAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "toAddress", {
        get: function () {
            return this._data.toAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "receiptGasUsed", {
        get: function () {
            return this._data.receiptGasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "receiptCumulativeGasUsed", {
        get: function () {
            return this._data.receiptCumulativeGasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "receiptContractAddress", {
        get: function () {
            return this._data.receiptContractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "signature", {
        get: function () {
            return this._data.signature;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "r", {
        get: function () {
            var _a;
            return (_a = this.signature) === null || _a === void 0 ? void 0 : _a.r;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "s", {
        get: function () {
            var _a;
            return (_a = this.signature) === null || _a === void 0 ? void 0 : _a.s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "v", {
        get: function () {
            var _a;
            return (_a = this.signature) === null || _a === void 0 ? void 0 : _a.v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "hash", {
        get: function () {
            return this._data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "gas", {
        get: function () {
            return this._data.gas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "gasPrice", {
        get: function () {
            return this._data.gasPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "nonce", {
        get: function () {
            return this._data.nonce;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "type", {
        get: function () {
            return this._data.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "receiptRoot", {
        get: function () {
            return this._data.receiptRoot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "receiptStatus", {
        get: function () {
            return this._data.receiptStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransaction.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    return StreamEvmTransaction;
}());

/**
 * The StreamEvmTransactionLog class is a representation of a transaction log that is returned by the Moralis Stream API
 *
 * @category DataType
 */
var StreamEvmTransactionLog = /** @class */ (function () {
    function StreamEvmTransactionLog(_a) {
        var data = __rest(_a, []);
        this._data = StreamEvmTransactionLog.parse(data);
    }
    /**
     * Create a new instance of StreamEvmTransactionLog
     *
     * @param data - the StreamEvmTransactionLogish type
     * @example
     * ```ts
     * const transactionLog = StreamEvmTransactionLog.create(data);
     * ```
     * @returns an instance of StreamEvmTransactionLog
     */
    StreamEvmTransactionLog.create = function (data) {
        if (data instanceof StreamEvmTransactionLog) {
            return data;
        }
        return new StreamEvmTransactionLog(data);
    };
    StreamEvmTransactionLog.parse = function (data) {
        return __assign(__assign({}, data), { chain: EvmChain.create(data.chain), logIndex: +data.logIndex, address: EvmAddress.create(data.address), topic0: maybe(data.topic0), topic1: maybe(data.topic1), topic2: maybe(data.topic2), topic3: maybe(data.topic3), triggers: maybe(data.triggers, function (triggers) { return triggers.map(function (trigger) { return StreamTriggerOutput.create(trigger); }); }) });
    };
    /**
     * Compares two StreamEvmTransactionLog data. It checks a deep equality check of both values.
     * @param valueA - the first StreamEvmTransactionLogish data to compare
     * @param valueB - the second StreamEvmTransactionLogish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  StreamEvmTransactionLog.equals(valueA, valueB);
     * ```
     */
    StreamEvmTransactionLog.equals = function (valueA, valueB) {
        var _a, _b;
        var transactionLogA = StreamEvmTransactionLog.create(valueA);
        var transactionLogB = StreamEvmTransactionLog.create(valueB);
        if (!transactionLogA.chain.equals(transactionLogB.chain)) {
            return false;
        }
        if (transactionLogA.transactionHash !== transactionLogB.transactionHash) {
            return false;
        }
        if (transactionLogA.logIndex !== transactionLogB.logIndex) {
            return false;
        }
        if (((_a = transactionLogA.triggers) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = transactionLogB.triggers) === null || _b === void 0 ? void 0 : _b.length) ||
            !StreamTriggerOutput.arrayEquals(transactionLogA.triggers || [], transactionLogB.triggers || [])) {
            return false;
        }
        return true;
    };
    /**
     * Compares an StreamEvmTransactionLogish data to this StreamEvmTransactionLog instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * transactionLog.equals(value);
     * ```
     */
    StreamEvmTransactionLog.prototype.equals = function (value) {
        return StreamEvmTransactionLog.equals(this, value);
    };
    /**
     * Converts the StreamEvmTransactionLog instance to a JSON object.
     * @returns JSON object of the StreamEvmTransactionLog instance
     * @example `transactionLog.toJSON()`
     */
    StreamEvmTransactionLog.prototype.toJSON = function () {
        var _a = this._data, chain = _a.chain, address = _a.address, triggers = _a.triggers, data = __rest(_a, ["chain", "address", "triggers"]);
        return __assign(__assign({}, data), { chain: chain.toJSON(), address: address.toJSON(), triggers: triggers === null || triggers === void 0 ? void 0 : triggers.map(function (trigger) { return trigger.format(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamEvmTransactionLog.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamEvmTransactionLog.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "logIndex", {
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "address", {
        get: function () {
            return this._data.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "data", {
        get: function () {
            return this._data.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "topic0", {
        get: function () {
            return this._data.topic0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "topic1", {
        get: function () {
            return this._data.topic1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "topic2", {
        get: function () {
            return this._data.topic2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "topic3", {
        get: function () {
            return this._data.topic3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmTransactionLog.prototype, "triggers", {
        get: function () {
            return this._data.triggers;
        },
        enumerable: false,
        configurable: true
    });
    return StreamEvmTransactionLog;
}());

/**
 * The NativeBalance class is a representation of a nativeBalance-address pair
 *
 * @category DataType
 */
var StreamNativeBalance = /** @class */ (function () {
    function StreamNativeBalance(data) {
        this._data = StreamNativeBalance.parse(data);
    }
    StreamNativeBalance.create = function (data) {
        if (data instanceof StreamNativeBalance) {
            return data;
        }
        return new StreamNativeBalance(data);
    };
    StreamNativeBalance.parse = function (input) {
        return {
            address: EvmAddress.create(input.address),
            balance: EvmNative.create(input.balance, 'wei'),
        };
    };
    StreamNativeBalance.equals = function (valueA, valueB) {
        var nativeBalanceTriggerA = StreamNativeBalance.create(valueA);
        var nativeBalanceTriggerB = StreamNativeBalance.create(valueB);
        return (nativeBalanceTriggerA.address.equals(nativeBalanceTriggerB.address) &&
            nativeBalanceTriggerA.balance.equals(nativeBalanceTriggerB.balance));
    };
    /**
     * Compares an NativeBalance data to this NativeBalance instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * nativeBalanceTrigger.equals(value);
     * ```
     */
    StreamNativeBalance.prototype.equals = function (value) {
        return StreamNativeBalance.equals(this, value);
    };
    /**
     * Converts the NativeBalance instance to a JSON object.
     * @returns JSON object of the NativeBalance instance
     * @example `nativeBalanceTrigger.toJSON()`
     */
    StreamNativeBalance.prototype.toJSON = function () {
        var _a = this._data, address = _a.address, balance = _a.balance;
        return {
            address: address.toJSON(),
            balance: balance.format(),
        };
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    StreamNativeBalance.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(StreamNativeBalance.prototype, "address", {
        get: function () {
            return this._data.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamNativeBalance.prototype, "balance", {
        get: function () {
            return this._data.balance;
        },
        enumerable: false,
        configurable: true
    });
    return StreamNativeBalance;
}());

/**
 * The `StreamEvmNftTokenApproval` class is a representation of the NFT approval data.
 *
 * @category DataType
 */
var StreamEvmNftTokenApproval = /** @class */ (function () {
    function StreamEvmNftTokenApproval(data) {
        this.data = data;
    }
    StreamEvmNftTokenApproval.create = function (data) {
        var chain = EvmChain.create(data.chain);
        return new StreamEvmNftTokenApproval(__assign(__assign({}, data), { chain: chain }));
    };
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "chain", {
        get: function () {
            return this.data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "contract", {
        get: function () {
            return this.data.contract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "account", {
        get: function () {
            return this.data.account;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "operator", {
        get: function () {
            return this.data.operator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "approvedAll", {
        get: function () {
            return this.data.approvedAll;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "tokenId", {
        get: function () {
            return this.data.tokenId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "transactionHash", {
        get: function () {
            return this.data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "logIndex", {
        get: function () {
            return this.data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "tokenContractType", {
        get: function () {
            return this.data.tokenContractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "tokenName", {
        get: function () {
            return this.data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamEvmNftTokenApproval.prototype, "tokenSymbol", {
        get: function () {
            return this.data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    StreamEvmNftTokenApproval.prototype.toJSON = function () {
        return {
            chain: this.chain.toJSON(),
            contract: this.contract,
            account: this.account,
            operator: this.operator,
            approvedAll: this.approvedAll,
            tokenId: this.tokenId,
            transactionHash: this.transactionHash,
            logIndex: this.logIndex,
            tokenContractType: this.tokenContractType,
            tokenName: this.tokenName,
            tokenSymbol: this.tokenSymbol,
        };
    };
    StreamEvmNftTokenApproval.prototype.format = function () {
        return this.toJSON();
    };
    // eslint-disable-next-line complexity
    StreamEvmNftTokenApproval.prototype.equals = function (value) {
        return (this.contract === value.contract &&
            this.account === value.account &&
            this.operator === value.operator &&
            this.approvedAll === value.approvedAll &&
            this.tokenId === value.tokenId &&
            this.transactionHash === value.transactionHash &&
            this.logIndex === value.logIndex &&
            this.tokenContractType === value.tokenContractType &&
            this.tokenName === value.tokenName &&
            this.tokenSymbol === value.tokenSymbol);
    };
    return StreamEvmNftTokenApproval;
}());

var EvmStreamResultParser = /** @class */ (function () {
    function EvmStreamResultParser() {
    }
    EvmStreamResultParser.parseChainId = function (value) {
        // Only needed for the initial test-response where we get an empty string as chain
        return value === '' ? EvmChain.ETHEREUM : EvmChain.create(value);
    };
    EvmStreamResultParser.parseErc20Transfers = function (value, chain) {
        return value.map(function (transfer) {
            return StreamErc20Transfer.create(__assign({ chain: chain }, transfer));
        });
    };
    EvmStreamResultParser.parseErc20Approvals = function (value, chain) {
        return value.map(function (approval) {
            return StreamErc20Approval.create(__assign({ chain: chain }, approval));
        });
    };
    EvmStreamResultParser.parseNftTransfers = function (value, chain) {
        return value.map(function (transfer) {
            return StreamEvmNftTransfer.create(__assign({ chain: chain }, transfer));
        });
    };
    EvmStreamResultParser.parseNftApprovals = function (value, chain) {
        return {
            ERC721: value.ERC721.map(function (approval) {
                return StreamErc721Approval.create(__assign({ chain: chain }, approval));
            }),
            ERC1155: value.ERC1155.map(function (approval) {
                return StreamErc1155Approval.create(__assign({ chain: chain }, approval));
            }),
        };
    };
    EvmStreamResultParser.parseNftTokenApprovals = function (values, chain) {
        return values.map(function (value) {
            return StreamEvmNftTokenApproval.create(__assign({ chain: chain }, value));
        });
    };
    EvmStreamResultParser.parseBlock = function (value, chain) {
        if (value.number === '') {
            return EvmSimpleBlock.create({
                chain: chain,
                number: 0,
                hash: '',
                timestamp: '0',
            });
        }
        return EvmSimpleBlock.create(__assign({ chain: chain }, value));
    };
    EvmStreamResultParser.parseLogs = function (value, chain) {
        return value.map(function (log) {
            return StreamEvmTransactionLog.create(__assign({ chain: chain }, log));
        });
    };
    EvmStreamResultParser.parseTransactions = function (value, chain) {
        return value.map(function (transaction) {
            return StreamEvmTransaction.create(__assign({ chain: chain }, transaction));
        });
    };
    EvmStreamResultParser.parseInternalTransactions = function (value, chain) {
        return value.map(function (transaction) {
            return StreamEvmInternalTransaction.create(__assign({ chain: chain }, transaction));
        });
    };
    EvmStreamResultParser.parseNativeBalances = function (value) {
        return value.map(function (nativeBalance) { return StreamNativeBalance.create(nativeBalance); });
    };
    var _a;
    _a = EvmStreamResultParser;
    EvmStreamResultParser.parse = function (value) {
        var chain = _a.parseChainId(value.chainId);
        return {
            chain: chain,
            erc20Transfers: _a.parseErc20Transfers(value.erc20Transfers, chain),
            erc20Approvals: _a.parseErc20Approvals(value.erc20Approvals, chain),
            nftTransfers: _a.parseNftTransfers(value.nftTransfers, chain),
            nftApprovals: _a.parseNftApprovals(value.nftApprovals, chain),
            ntfTokenApprovals: _a.parseNftTokenApprovals(value.nftTokenApprovals, chain),
            block: _a.parseBlock(value.block, chain),
            logs: _a.parseLogs(value.logs, chain),
            txs: _a.parseTransactions(value.txs, chain),
            txsInternal: _a.parseInternalTransactions(value.txsInternal, chain),
            abi: value.abi,
            retries: value.retries,
            confirmed: value.confirmed,
            streamId: value.streamId,
            tag: value.tag,
            nativeBalances: _a.parseNativeBalances(value.nativeBalances),
        };
    };
    return EvmStreamResultParser;
}());

/**
 * The EvmStreamResult class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
var EvmStreamResult = /** @class */ (function () {
    function EvmStreamResult(data) {
        this._data = EvmStreamResult.parse(data);
    }
    /**
     * Create a new instance of EvmStreamResult
     *
     * @param data - the EvmStreamResultish type
     * @param core - the Core instance
     * @example
     * ```ts
     * const evmStreamResult = EvmStreamResult.create(data);
     * ```
     * @returns an instance of EvmStreamResult
     */
    EvmStreamResult.create = function (data) {
        if (data instanceof EvmStreamResult) {
            return data;
        }
        return new EvmStreamResult(data);
    };
    /**
     * Compares two EvmStreamResult data. It checks a deep equality check of both values.
     * @param valueA - the first EvmStreamResultish data to compare
     * @param valueB - the second EvmStreamResultish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  EvmStreamResult.equals(valueA, valueB);
     * ```
     */
    EvmStreamResult.equals = function (valueA, valueB) {
        var evmStreamResultA = EvmStreamResult.create(valueA);
        var evmStreamResultB = EvmStreamResult.create(valueB);
        if (!evmStreamResultA.chain.equals(evmStreamResultB.chain)) {
            return false;
        }
        if (!evmStreamResultA.block.equals(evmStreamResultB.block)) {
            return false;
        }
        if (evmStreamResultA.streamId !== evmStreamResultB.streamId) {
            return false;
        }
        if (evmStreamResultA.tag !== evmStreamResultB.tag) {
            return false;
        }
        if (evmStreamResultA.confirmed !== evmStreamResultB.confirmed) {
            return false;
        }
        return true;
    };
    /**
     * Compares an EvmStreamResultish data to this EvmStreamResult instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * evmStreamResult.equals(value);
     * ```
     */
    EvmStreamResult.prototype.equals = function (value) {
        return EvmStreamResult.equals(this, value);
    };
    /**
     * Converts the EvmStreamResult instance to a JSON object.
     * @returns JSON object of the EvmStreamResult instance
     * @example `evmStreamResult.toJSON()`
     */
    EvmStreamResult.prototype.toJSON = function () {
        return EvmStreamResultFormatter.toJSON(this._data);
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmStreamResult.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmStreamResult.prototype, "abiInterface", {
        get: function () {
            if (!this.abi || !this.abi.length) {
                return null;
            }
            return new Interface(this.abi);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "decodedLogs", {
        get: function () {
            var abiInterface = this.abiInterface;
            if (!abiInterface) {
                return [];
            }
            return this.logs.map(function (log) {
                return abiInterface.parseLog({
                    data: log.data,
                    topics: [log.topic0, log.topic1, log.topic2, log.topic3].filter(isNotEmpty),
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "streamId", {
        get: function () {
            return this._data.streamId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "tag", {
        get: function () {
            return this._data.tag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "block", {
        get: function () {
            return this._data.block;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "retries", {
        get: function () {
            return this._data.retries;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "confirmed", {
        get: function () {
            return this._data.confirmed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "erc20Approvals", {
        get: function () {
            return this._data.erc20Approvals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "erc20Transfers", {
        get: function () {
            return this._data.erc20Transfers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "logs", {
        get: function () {
            return this._data.logs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "nftApprovals", {
        /**
         * @deprecated Use `ntfTokenApprovals` instead. This property will be removed in the future.
         */
        get: function () {
            return this._data.nftApprovals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "ntfTokenApprovals", {
        get: function () {
            return this._data.ntfTokenApprovals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "nftTransfers", {
        get: function () {
            return this._data.nftTransfers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "txs", {
        get: function () {
            return this._data.txs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "txsInternal", {
        get: function () {
            return this._data.txsInternal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "abi", {
        get: function () {
            return this._data.abi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmStreamResult.prototype, "nativeBalances", {
        get: function () {
            return this._data.nativeBalances;
        },
        enumerable: false,
        configurable: true
    });
    EvmStreamResult.parse = function (data) { return EvmStreamResultParser.parse(data); };
    return EvmStreamResult;
}());
var isNotEmpty = function (value) { return value != null; };

var addAddressAptosOperation = {
    method: 'POST',
    name: 'addAddressAptos',
    id: 'aptosStreamsAddAddresses',
    groupName: 'aptosStreams',
    urlPathPattern: '/streams/aptos/{id}/address',
    bodyParamNames: ['address'],
    urlPathParamNames: ['id'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$o,
    getRequestBody: getRequestBody$d,
    deserializeResponse: deserializeResponse$o,
    serializeRequest: serializeRequest$o,
    deserializeRequest: deserializeRequest$o,
};
// Methods
function getRequestUrlParams$o(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$d(request) {
    return {
        address: Array.isArray(request.address)
            ? request.address.map(function (a) { return AptosAddress.create(a).address; })
            : AptosAddress.create(request.address).address,
    };
}
function deserializeResponse$o(jsonResponse) {
    var data = toCamelCase(jsonResponse);
    return __assign(__assign({}, data), { address: data.address
            ? typeof data.address === 'string'
                ? AptosAddress.create(data.address)
                : data.address.map(function (address) { return AptosAddress.create(address); })
            : undefined });
}
function serializeRequest$o(request) {
    return {
        id: request.id,
        address: Array.isArray(request.address)
            ? request.address.map(function (a) { return AptosAddress.create(a).address; })
            : AptosAddress.create(request.address).address,
    };
}
function deserializeRequest$o(jsonRequest) {
    return {
        id: jsonRequest.id,
        address: Array.isArray(jsonRequest.address)
            ? jsonRequest.address.map(function (a) { return AptosAddress.create(a); })
            : AptosAddress.create(jsonRequest.address),
    };
}

var getStreamsAptosOperation = {
    method: 'GET',
    name: 'getStreamsAptos',
    id: 'aptosStreamsGetAll',
    groupName: 'aptosStreams',
    urlSearchParamNames: ['cursor', 'limit'],
    urlPathPattern: '/streams/aptos',
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$n,
    deserializeResponse: deserializeResponse$n,
    serializeRequest: serializeRequest$n,
    deserializeRequest: deserializeRequest$n,
};
// Methods
function getRequestUrlParams$n(request) {
    return {
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$n(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (stream) { return AptosStream.create(stream); });
}
function serializeRequest$n(request) {
    return {
        cursor: request.cursor,
        limit: request.limit,
    };
}
function deserializeRequest$n(jsonRequest) {
    return {
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
    };
}

var getStreamAptosOperation = {
    method: 'GET',
    name: 'getStreamAptos',
    id: 'aptosStreamsGet',
    groupName: 'aptosStreams',
    urlPathPattern: '/streams/aptos/{id}',
    urlPathParamNames: ['id'],
    getRequestUrlParams: getRequestUrlParams$m,
    deserializeResponse: deserializeResponse$m,
    serializeRequest: serializeRequest$m,
    deserializeRequest: deserializeRequest$m,
};
// Methods
function getRequestUrlParams$m(request) {
    return {
        id: request.id,
    };
}
function deserializeResponse$m(jsonResponse) {
    return AptosStream.create(jsonResponse);
}
function serializeRequest$m(request) {
    return {
        id: request.id,
    };
}
function deserializeRequest$m(jsonRequest) {
    return {
        id: jsonRequest.id,
    };
}

var createStreamAptosOperation = {
    method: 'PUT',
    name: 'createStreamAptos',
    id: 'aptosStreamsCreate',
    groupName: 'aptosStreams',
    urlPathPattern: '/streams/aptos',
    bodyParamNames: [
        'webhookUrl',
        'tag',
        'functions',
        'events',
        'network',
        'includePayload',
        'includeEvents',
        'includeChanges',
        'description',
        'demo',
        'allAddresses',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$l,
    getRequestBody: getRequestBody$c,
    deserializeResponse: deserializeResponse$l,
    serializeRequest: serializeRequest$l,
    deserializeRequest: deserializeRequest$l,
};
// Methods
function getRequestUrlParams$l() {
    return {};
}
function getRequestBody$c(request) {
    return {
        allAddresses: request.allAddresses,
        demo: request.demo,
        description: request.description,
        includeChanges: request.includeChanges,
        includeEvents: request.includeEvents,
        includePayload: request.includePayload,
        network: request.network.map(function (network) { return AptosNetwork.create(network); }),
        events: request.events,
        functions: request.functions,
        tag: request.tag,
        webhookUrl: request.webhookUrl,
    };
}
function deserializeResponse$l(jsonResponse) {
    return AptosStream.create(jsonResponse);
}
function serializeRequest$l(request) {
    return {
        allAddresses: request.allAddresses,
        demo: request.demo,
        description: request.description,
        includeChanges: request.includeChanges,
        includeEvents: request.includeEvents,
        includePayload: request.includePayload,
        network: request.network.map(function (network) { return AptosNetwork.create(network).network; }),
        events: request.events,
        functions: request.functions,
        tag: request.tag,
        webhookUrl: request.webhookUrl,
    };
}
function deserializeRequest$l(jsonRequest) {
    return {
        allAddresses: jsonRequest.allAddresses,
        demo: jsonRequest.demo,
        description: jsonRequest.description,
        includeChanges: jsonRequest.includeChanges,
        includeEvents: jsonRequest.includeEvents,
        includePayload: jsonRequest.includePayload,
        network: jsonRequest.network.map(function (network) { return AptosNetwork.create(network); }),
        events: jsonRequest.events,
        functions: jsonRequest.functions,
        tag: jsonRequest.tag,
        webhookUrl: jsonRequest.webhookUrl,
    };
}

var deleteAddressAptosOperation = {
    method: 'DELETE',
    name: 'deleteAddressAptos',
    id: 'aptosStreamsDeleteAddresses',
    groupName: 'aptosStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: "/streams/aptos/{id}/address",
    bodyParamNames: ['address'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$k,
    getRequestBody: getRequestBody$b,
    deserializeResponse: deserializeResponse$k,
    serializeRequest: serializeRequest$k,
    deserializeRequest: deserializeRequest$k,
};
// Methods
function getRequestUrlParams$k(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$b(request) {
    return {
        address: Array.isArray(request.address)
            ? request.address.map(function (address) { return AptosAddress.create(address).address; })
            : AptosAddress.create(request.address).address,
    };
}
function deserializeResponse$k(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$k(request) {
    return {
        id: request.id,
        address: Array.isArray(request.address)
            ? request.address.map(function (address) { return AptosAddress.create(address).address; })
            : AptosAddress.create(request.address).address,
    };
}
function deserializeRequest$k(jsonRequest) {
    return {
        id: jsonRequest.id,
        address: Array.isArray(jsonRequest.address)
            ? jsonRequest.address.map(function (address) { return AptosAddress.create(address); })
            : AptosAddress.create(jsonRequest.address),
    };
}

var deleteStreamAptosOperation = {
    method: 'DELETE',
    name: 'deleteStreamAptos',
    id: 'aptosStreamsDelete',
    groupName: 'aptosStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: "/streams/aptos/{id}",
    bodyParamNames: [],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$j,
    getRequestBody: getRequestBody$a,
    deserializeResponse: deserializeResponse$j,
    serializeRequest: serializeRequest$j,
    deserializeRequest: deserializeRequest$j,
};
// Methods
function getRequestUrlParams$j(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$a() {
    return {};
}
function deserializeResponse$j(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$j(request) {
    return {
        id: request.id,
    };
}
function deserializeRequest$j(jsonRequest) {
    return {
        id: jsonRequest.id,
    };
}

var getAddressesAptosOperation = {
    method: 'GET',
    name: 'getAddressesAptos',
    id: 'aptosStreamsGetAddresses',
    groupName: 'aptosStreams',
    urlPathParamNames: ['id'],
    urlSearchParamNames: ['cursor', 'limit'],
    urlPathPattern: '/streams/aptos/{id}/address',
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$i,
    deserializeResponse: deserializeResponse$i,
    serializeRequest: serializeRequest$i,
    deserializeRequest: deserializeRequest$i,
};
// Methods
function getRequestUrlParams$i(request) {
    return {
        id: request.id,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$i(jsonResponse) {
    var _a;
    return {
        result: ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (address) { return AptosAddress.create(address.address); }),
        total: jsonResponse.total,
    };
}
function serializeRequest$i(request) {
    return {
        id: request.id,
        limit: request.limit,
        cursor: request.cursor,
    };
}
function deserializeRequest$i(jsonRequest) {
    return {
        id: jsonRequest.id,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
    };
}

var updateStreamAptosOperation = {
    method: 'POST',
    name: 'updateStreamAptos',
    id: 'aptosStreamsUpdate',
    groupName: 'aptosStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: '/streams/aptos/{id}',
    bodyParamNames: [
        'allAddresses',
        'demo',
        'description',
        'includeChanges',
        'includeEvents',
        'includePayload',
        'network',
        'events',
        'functions',
        'tag',
        'webhookUrl',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$h,
    getRequestBody: getRequestBody$9,
    deserializeResponse: deserializeResponse$h,
    serializeRequest: serializeRequest$h,
    deserializeRequest: deserializeRequest$h,
};
// Methods
function getRequestUrlParams$h(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$9(request) {
    return {
        allAddresses: request.allAddresses,
        demo: request.demo,
        description: request.description,
        includeChanges: request.includeChanges,
        includeEvents: request.includeEvents,
        includePayload: request.includePayload,
        network: request.network.map(function (network) { return AptosNetwork.create(network); }),
        events: request.events,
        functions: request.functions,
        tag: request.tag,
        webhookUrl: request.webhookUrl,
    };
}
function deserializeResponse$h(jsonResponse) {
    return AptosStream.create(jsonResponse);
}
function serializeRequest$h(request) {
    return {
        id: request.id,
        allAddresses: request.allAddresses,
        demo: request.demo,
        description: request.description,
        includeChanges: request.includeChanges,
        includeEvents: request.includeEvents,
        includePayload: request.includePayload,
        network: request.network.map(function (network) { return AptosNetwork.create(network).network; }),
        events: request.events,
        functions: request.functions,
        tag: request.tag,
        webhookUrl: request.webhookUrl,
    };
}
function deserializeRequest$h(jsonRequest) {
    return {
        id: jsonRequest.id,
        allAddresses: jsonRequest.allAddresses,
        demo: jsonRequest.demo,
        description: jsonRequest.description,
        includeChanges: jsonRequest.includeChanges,
        includeEvents: jsonRequest.includeEvents,
        includePayload: jsonRequest.includePayload,
        network: jsonRequest.network.map(function (network) { return AptosNetwork.create(network); }),
        events: jsonRequest.events,
        functions: jsonRequest.functions,
        tag: jsonRequest.tag,
        webhookUrl: jsonRequest.webhookUrl,
    };
}

var updateStreamStatusAptosOperation = {
    method: 'POST',
    name: 'updateStreamStatusAptos',
    id: 'aptosStreamsUpdateStatus',
    groupName: 'aptosStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: '/streams/aptos/{id}/status',
    bodyParamNames: ['status'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$g,
    getRequestBody: getRequestBody$8,
    deserializeResponse: deserializeResponse$g,
    serializeRequest: serializeRequest$g,
    deserializeRequest: deserializeRequest$g,
};
// Methods
function getRequestUrlParams$g(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$8(request) {
    return {
        status: request.status,
    };
}
function deserializeResponse$g(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$g(request) {
    return {
        id: request.id,
        status: request.status,
    };
}
function deserializeRequest$g(jsonRequest) {
    return {
        id: jsonRequest.id,
        status: jsonRequest.status,
    };
}

var addAddressEvmOperation = {
    method: 'POST',
    name: 'addAddressEvm',
    id: 'AddAddressToStream',
    groupName: 'evmStreams',
    urlPathPattern: '/streams/evm/{id}/address',
    bodyParamNames: ['address'],
    urlPathParamNames: ['id'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$f,
    getRequestBody: getRequestBody$7,
    deserializeResponse: deserializeResponse$f,
    serializeRequest: serializeRequest$f,
    deserializeRequest: deserializeRequest$f,
};
// Methods
function getRequestUrlParams$f(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$7(request) {
    return {
        address: Array.isArray(request.address)
            ? request.address.map(function (a) { return EvmAddress.create(a).checksum; })
            : EvmAddress.create(request.address).checksum,
    };
}
function deserializeResponse$f(jsonResponse) {
    var data = toCamelCase(jsonResponse);
    return __assign(__assign({}, data), { address: data.address
            ? typeof data.address === 'string'
                ? EvmAddress.create(data.address)
                : data.address.map(function (address) { return EvmAddress.create(address); })
            : undefined });
}
function serializeRequest$f(request) {
    return {
        id: request.id,
        address: Array.isArray(request.address)
            ? request.address.map(function (a) { return EvmAddress.create(a).checksum; })
            : EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$f(jsonRequest) {
    return {
        id: jsonRequest.id,
        address: Array.isArray(jsonRequest.address)
            ? jsonRequest.address.map(function (a) { return EvmAddress.create(a); })
            : EvmAddress.create(jsonRequest.address),
    };
}

var getStreamsEvmOperation = {
    method: 'GET',
    name: 'getStreamsEvm',
    id: 'GetStreams',
    groupName: 'evmStreams',
    urlSearchParamNames: ['cursor', 'limit'],
    urlPathPattern: '/streams/evm',
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$e,
    deserializeResponse: deserializeResponse$e,
    serializeRequest: serializeRequest$e,
    deserializeRequest: deserializeRequest$e,
};
// Methods
function getRequestUrlParams$e(request) {
    return {
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$e(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (stream) { return EvmStream.create(stream); });
}
function serializeRequest$e(request) {
    return {
        cursor: request.cursor,
        limit: request.limit,
    };
}
function deserializeRequest$e(jsonRequest) {
    return {
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
    };
}

var getStreamEvmOperation = {
    method: 'GET',
    name: 'getStreamEvm',
    id: 'GetStream',
    groupName: 'evmStreams',
    urlPathPattern: '/streams/evm/{id}',
    urlPathParamNames: ['id'],
    getRequestUrlParams: getRequestUrlParams$d,
    deserializeResponse: deserializeResponse$d,
    serializeRequest: serializeRequest$d,
    deserializeRequest: deserializeRequest$d,
};
// Methods
function getRequestUrlParams$d(request) {
    return {
        id: request.id,
    };
}
function deserializeResponse$d(jsonResponse) {
    return EvmStream.create(jsonResponse);
}
function serializeRequest$d(request) {
    return {
        id: request.id,
    };
}
function deserializeRequest$d(jsonRequest) {
    return {
        id: jsonRequest.id,
    };
}

var createStreamEvmOperation = {
    method: 'PUT',
    name: 'createStreamEvm',
    id: 'CreateStream',
    groupName: 'evmStreams',
    urlPathPattern: '/streams/evm',
    bodyParamNames: [
        'webhookUrl',
        'description',
        'tag',
        'topic0',
        'allAddresses',
        'includeNativeTxs',
        'includeContractLogs',
        'includeInternalTxs',
        'includeAllTxLogs',
        'getNativeBalances',
        'chains',
        'abi',
        'advancedOptions',
        'demo',
        'triggers',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$c,
    getRequestBody: getRequestBody$6,
    deserializeResponse: deserializeResponse$c,
    serializeRequest: serializeRequest$c,
    deserializeRequest: deserializeRequest$c,
};
// Methods
function getRequestUrlParams$c() {
    return {};
}
function getRequestBody$6(request) {
    var _a;
    return {
        webhookUrl: request.webhookUrl,
        description: request.description,
        tag: request.tag,
        topic0: request.topic0,
        allAddresses: request.allAddresses,
        includeNativeTxs: request.includeNativeTxs,
        includeContractLogs: request.includeContractLogs,
        includeInternalTxs: request.includeInternalTxs,
        includeAllTxLogs: request.includeAllTxLogs,
        getNativeBalances: request.getNativeBalances,
        chainIds: request.chains.map(function (chain) { return EvmChain.create(chain).apiHex; }),
        abi: request.abi,
        advancedOptions: request.advancedOptions,
        demo: request.demo,
        triggers: (_a = request.triggers) === null || _a === void 0 ? void 0 : _a.map(function (trigger) { return StreamTrigger.create(trigger).format(); }),
    };
}
function deserializeResponse$c(jsonResponse) {
    return EvmStream.create(jsonResponse);
}
function serializeRequest$c(request) {
    var _a;
    return {
        webhookUrl: request.webhookUrl,
        description: request.description,
        tag: request.tag,
        topic0: request.topic0,
        allAddresses: request.allAddresses,
        includeNativeTxs: request.includeNativeTxs,
        includeContractLogs: request.includeContractLogs,
        includeInternalTxs: request.includeInternalTxs,
        includeAllTxLogs: request.includeAllTxLogs,
        chainIds: request.chains.map(function (chain) { return EvmChain.create(chain).apiHex; }),
        abi: request.abi,
        advancedOptions: request.advancedOptions,
        demo: request.demo,
        triggers: (_a = request.triggers) === null || _a === void 0 ? void 0 : _a.map(function (trigger) { return StreamTrigger.create(trigger).format(); }),
    };
}
function deserializeRequest$c(jsonRequest) {
    var _a;
    return {
        webhookUrl: jsonRequest.webhookUrl,
        description: jsonRequest.description,
        tag: jsonRequest.tag,
        topic0: jsonRequest.topic0,
        allAddresses: jsonRequest.allAddresses,
        includeNativeTxs: jsonRequest.includeNativeTxs,
        includeContractLogs: jsonRequest.includeContractLogs,
        includeInternalTxs: jsonRequest.includeInternalTxs,
        includeAllTxLogs: jsonRequest.includeAllTxLogs,
        chains: jsonRequest.chainIds.map(function (chainId) { return EvmChain.create(chainId); }),
        abi: jsonRequest.abi,
        advancedOptions: jsonRequest.advancedOptions,
        demo: jsonRequest.demo,
        triggers: (_a = jsonRequest.triggers) === null || _a === void 0 ? void 0 : _a.map(function (trigger) { return StreamTrigger.create(trigger); }),
    };
}

var deleteAddressEvmOperation = {
    method: 'DELETE',
    name: 'deleteAddressEvm',
    id: 'DeleteAddressFromStream',
    groupName: 'evmStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: "/streams/evm/{id}/address",
    bodyParamNames: ['address'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$b,
    getRequestBody: getRequestBody$5,
    deserializeResponse: deserializeResponse$b,
    serializeRequest: serializeRequest$b,
    deserializeRequest: deserializeRequest$b,
};
// Methods
function getRequestUrlParams$b(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$5(request) {
    return {
        address: Array.isArray(request.address)
            ? request.address.map(function (address) { return EvmAddress.create(address).lowercase; })
            : EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$b(jsonResponse) {
    var data = toCamelCase(jsonResponse);
    return {
        streamId: jsonResponse.streamId,
        address: data.address
            ? typeof data.address === 'string'
                ? EvmAddress.create(data.address)
                : data.address.map(function (address) { return EvmAddress.create(address); })
            : undefined,
    };
}
function serializeRequest$b(request) {
    return {
        id: request.id,
        address: Array.isArray(request.address)
            ? request.address.map(function (address) { return EvmAddress.create(address).lowercase; })
            : EvmAddress.create(request.address).lowercase,
    };
}
function deserializeRequest$b(jsonRequest) {
    return {
        id: jsonRequest.id,
        address: Array.isArray(jsonRequest.address)
            ? jsonRequest.address.map(function (address) { return EvmAddress.create(address); })
            : EvmAddress.create(jsonRequest.address),
    };
}

var deleteStreamEvmOperation = {
    method: 'DELETE',
    name: 'deleteStreamEvm',
    id: 'DeleteStream',
    groupName: 'evmStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: "/streams/evm/{id}",
    bodyParamNames: [],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$a,
    getRequestBody: getRequestBody$4,
    deserializeResponse: deserializeResponse$a,
    serializeRequest: serializeRequest$a,
    deserializeRequest: deserializeRequest$a,
};
// Methods
function getRequestUrlParams$a(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$4() {
    return {};
}
function deserializeResponse$a(jsonResponse) {
    return EvmStream.create(jsonResponse);
}
function serializeRequest$a(request) {
    return {
        id: request.id,
    };
}
function deserializeRequest$a(jsonRequest) {
    return {
        id: jsonRequest.id,
    };
}

var getAddressesEvmOperation = {
    method: 'GET',
    name: 'getAddressesEvm',
    id: 'GetAddresses',
    groupName: 'evmStreams',
    urlPathParamNames: ['id'],
    urlSearchParamNames: ['cursor', 'limit'],
    urlPathPattern: '/streams/evm/{id}/address',
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$9,
    deserializeResponse: deserializeResponse$9,
    serializeRequest: serializeRequest$9,
    deserializeRequest: deserializeRequest$9,
};
// Methods
function getRequestUrlParams$9(request) {
    return {
        id: request.id,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$9(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (stream) { return (__assign(__assign({}, stream), { address: stream.address ? EvmAddress.create(stream.address) : undefined })); });
}
function serializeRequest$9(request) {
    return {
        id: request.id,
        limit: request.limit,
        cursor: request.cursor,
    };
}
function deserializeRequest$9(jsonRequest) {
    return {
        id: jsonRequest.id,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
    };
}

var updateStreamEvmOperation = {
    method: 'POST',
    name: 'updateStreamEvm',
    id: 'UpdateStream',
    groupName: 'evmStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: '/streams/evm/{id}',
    bodyParamNames: [
        'webhookUrl',
        'description',
        'tag',
        'topic0',
        'allAddresses',
        'includeNativeTxs',
        'includeContractLogs',
        'includeInternalTxs',
        'includeAllTxLogs',
        'getNativeBalances',
        'chains',
        'abi',
        'advancedOptions',
        'demo',
        'triggers',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$8,
    getRequestBody: getRequestBody$3,
    deserializeResponse: deserializeResponse$8,
    serializeRequest: serializeRequest$8,
    deserializeRequest: deserializeRequest$8,
};
// Methods
function getRequestUrlParams$8(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$3(request) {
    var _a, _b;
    return {
        webhookUrl: request.webhookUrl,
        description: request.description,
        tag: request.tag,
        topic0: request.topic0,
        allAddresses: request.allAddresses,
        includeNativeTxs: request.includeNativeTxs,
        includeContractLogs: request.includeContractLogs,
        includeInternalTxs: request.includeInternalTxs,
        includeAllTxLogs: request.includeAllTxLogs,
        getNativeBalances: request.getNativeBalances,
        chainIds: (_a = request.chains) === null || _a === void 0 ? void 0 : _a.map(function (chain) { return EvmChain.create(chain).apiHex; }),
        abi: request.abi,
        advancedOptions: request.advancedOptions,
        demo: request.demo,
        triggers: (_b = request.triggers) === null || _b === void 0 ? void 0 : _b.map(function (trigger) { return StreamTrigger.create(trigger); }),
    };
}
function deserializeResponse$8(jsonResponse) {
    return EvmStream.create(jsonResponse);
}
function serializeRequest$8(request) {
    var _a, _b;
    return {
        id: request.id,
        webhookUrl: request.webhookUrl,
        description: request.description,
        tag: request.tag,
        topic0: request.topic0,
        allAddresses: request.allAddresses,
        includeNativeTxs: request.includeNativeTxs,
        includeContractLogs: request.includeContractLogs,
        includeInternalTxs: request.includeInternalTxs,
        includeAllTxLogs: request.includeAllTxLogs,
        chainIds: (_a = request.chains) === null || _a === void 0 ? void 0 : _a.map(function (chain) { return EvmChain.create(chain).apiHex; }),
        abi: request.abi,
        advancedOptions: request.advancedOptions,
        demo: request.demo,
        triggers: (_b = request.triggers) === null || _b === void 0 ? void 0 : _b.map(function (trigger) { return StreamTrigger.create(trigger).format(); }),
    };
}
function deserializeRequest$8(jsonRequest) {
    var _a, _b;
    return {
        id: jsonRequest.id,
        webhookUrl: jsonRequest.webhookUrl,
        description: jsonRequest.description,
        tag: jsonRequest.tag,
        topic0: jsonRequest.topic0,
        allAddresses: jsonRequest.allAddresses,
        includeNativeTxs: jsonRequest.includeNativeTxs,
        includeContractLogs: jsonRequest.includeContractLogs,
        includeInternalTxs: jsonRequest.includeInternalTxs,
        includeAllTxLogs: jsonRequest.includeAllTxLogs,
        chains: (_a = jsonRequest.chainIds) === null || _a === void 0 ? void 0 : _a.map(function (chainId) { return EvmChain.create(chainId); }),
        abi: jsonRequest.abi,
        advancedOptions: jsonRequest.advancedOptions,
        demo: jsonRequest.demo,
        triggers: (_b = jsonRequest.triggers) === null || _b === void 0 ? void 0 : _b.map(function (trigger) { return StreamTrigger.create(trigger); }),
    };
}

var updateStreamStatusEvmOperation = {
    method: 'POST',
    name: 'updateStreamStatusEvm',
    id: 'UpdateStreamStatus',
    groupName: 'evmStreams',
    urlPathParamNames: ['id'],
    urlPathPattern: '/streams/evm/{id}/status',
    bodyParamNames: ['status'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$7,
    getRequestBody: getRequestBody$2,
    deserializeResponse: deserializeResponse$7,
    serializeRequest: serializeRequest$7,
    deserializeRequest: deserializeRequest$7,
};
// Methods
function getRequestUrlParams$7(request) {
    return {
        id: request.id,
    };
}
function getRequestBody$2(request) {
    return {
        status: request.status,
    };
}
function deserializeResponse$7(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$7(request) {
    return {
        id: request.id,
        status: request.status,
    };
}
function deserializeRequest$7(jsonRequest) {
    return {
        id: jsonRequest.id,
        status: jsonRequest.status,
    };
}

var getHistoryOperation = {
    method: 'GET',
    name: 'getHistory',
    id: 'GetHistory',
    groupName: 'history',
    urlPathPattern: '/history',
    urlSearchParamNames: ['excludePayload', 'limit', 'cursor'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$6,
    deserializeResponse: deserializeResponse$6,
    serializeRequest: serializeRequest$6,
    deserializeRequest: deserializeRequest$6,
};
// Methods
function getRequestUrlParams$6(request) {
    return {
        excludePayload: maybe(request.excludePayload, String),
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$6(jsonResponse) {
    var _a;
    return (_a = jsonResponse.result) !== null && _a !== void 0 ? _a : [];
}
function serializeRequest$6(request) {
    return request;
}
function deserializeRequest$6(jsonRequest) {
    return jsonRequest;
}

var replayHistoryOperation = {
    method: 'POST',
    name: 'replayHistory',
    id: 'ReplayHistory',
    groupName: 'history',
    urlPathPattern: '/history/replay/{streamId}/{id}',
    urlPathParamNames: ['streamId', 'id'],
    bodyParamNames: [],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$5,
    getRequestBody: getRequestBody$1,
    deserializeResponse: deserializeResponse$5,
    serializeRequest: serializeRequest$5,
    deserializeRequest: deserializeRequest$5,
};
// Methods
function getRequestUrlParams$5(request) {
    return {
        streamId: request.streamId,
        id: request.id,
    };
}
function getRequestBody$1() {
    return {};
}
function deserializeResponse$5(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$5(request) {
    return {
        streamId: request.streamId,
        id: request.id,
    };
}
function deserializeRequest$5(jsonRequest) {
    return {
        streamId: jsonRequest.streamId,
        id: jsonRequest.id,
    };
}

var getLogsOperation = {
    method: 'GET',
    name: 'getLogs',
    id: 'GetLogs',
    groupName: 'history',
    urlPathPattern: '/history/logs',
    urlSearchParamNames: ['limit', 'cursor'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$4,
    deserializeResponse: deserializeResponse$4,
    serializeRequest: serializeRequest$4,
    deserializeRequest: deserializeRequest$4,
};
// Methods
function getRequestUrlParams$4(request) {
    return {
        limit: maybe(request.limit, String),
        cursor: request.cursor,
    };
}
function deserializeResponse$4(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (result) { return (__assign(__assign({}, result), { chain: EvmChain.create(result.chain) })); });
}
function serializeRequest$4(request) {
    return request;
}
function deserializeRequest$4(jsonRequest) {
    return jsonRequest;
}

var getSettingsOperation = {
    method: 'GET',
    name: 'getSettings',
    id: 'GetSettings',
    groupName: 'project',
    urlPathPattern: '/settings',
    getRequestUrlParams: getRequestUrlParams$3,
    deserializeResponse: deserializeResponse$3,
    serializeRequest: serializeRequest$3,
    deserializeRequest: deserializeRequest$3,
};
// Methods
function getRequestUrlParams$3() {
    return {};
}
function deserializeResponse$3(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$3() {
    return undefined;
}
function deserializeRequest$3() {
    return {};
}

var setSettingsOperation = {
    method: 'POST',
    name: 'setSettings',
    id: 'SetSettings',
    groupName: 'project',
    urlPathPattern: '/settings',
    bodyParamNames: ['region'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$2,
    getRequestBody: getRequestBody,
    deserializeResponse: deserializeResponse$2,
    serializeRequest: serializeRequest$2,
    deserializeRequest: deserializeRequest$2,
};
// Methods
function getRequestUrlParams$2() {
    return {};
}
function getRequestBody(request) {
    return {
        region: request.region,
    };
}
function deserializeResponse$2(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$2(request) {
    return {
        region: request.region,
    };
}
function deserializeRequest$2(jsonRequest) {
    return {
        region: jsonRequest.region,
    };
}

var getStatsOperation = {
    method: 'GET',
    name: 'getStats',
    id: 'getStats',
    groupName: 'streams',
    urlPathPattern: '/stats',
    getRequestUrlParams: getRequestUrlParams$1,
    deserializeResponse: deserializeResponse$1,
    serializeRequest: serializeRequest$1,
    deserializeRequest: deserializeRequest$1,
};
// Methods
function getRequestUrlParams$1() {
    return {};
}
function deserializeResponse$1(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$1() {
    return undefined;
}
function deserializeRequest$1() {
    return {};
}

var getStatsByIdOperation = {
    method: 'GET',
    name: 'getStatsById',
    id: 'GetStatsByStreamId',
    groupName: 'stats',
    urlPathPattern: '/stats/{streamId}',
    urlPathParamNames: ['streamId'],
    getRequestUrlParams: getRequestUrlParams,
    deserializeResponse: deserializeResponse,
    serializeRequest: serializeRequest,
    deserializeRequest: deserializeRequest,
};
// Methods
function getRequestUrlParams(request) {
    return {
        streamId: request.streamId,
    };
}
function deserializeResponse(jsonResponse) {
    return jsonResponse;
}
function serializeRequest(request) {
    return request;
}
function deserializeRequest(jsonRequest) {
    return jsonRequest;
}

export { AptosStream, EvmStream, EvmStreamResult, StreamErc1155Approval, StreamErc20Approval, StreamErc20Transfer, StreamErc721Approval, StreamEvmInternalTransaction, StreamEvmNftTokenApproval, StreamEvmNftTransfer, StreamEvmTransaction, StreamEvmTransactionLog, StreamTrigger, StreamTriggerOutput, addAddressAptosOperation, addAddressEvmOperation, createStreamAptosOperation, createStreamEvmOperation, deleteAddressAptosOperation, deleteAddressEvmOperation, deleteStreamAptosOperation, deleteStreamEvmOperation, getAddressesAptosOperation, getAddressesEvmOperation, getHistoryOperation, getLogsOperation, getSettingsOperation, getStatsByIdOperation, getStatsOperation, getStreamAptosOperation, getStreamEvmOperation, getStreamsAptosOperation, getStreamsEvmOperation, replayHistoryOperation, setSettingsOperation, updateStreamAptosOperation, updateStreamEvmOperation, updateStreamStatusAptosOperation, updateStreamStatusEvmOperation };
