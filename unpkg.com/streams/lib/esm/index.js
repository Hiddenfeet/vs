import { OperationResolver, PaginatedOperationResolver, ApiUtilsConfig } from '@moralisweb3/api-utils';
import { StreamErrorCode, MoralisStreamError, CoreProvider, ApiModule } from '@moralisweb3/common-core';
import { createStreamAptosOperation, createStreamEvmOperation, updateStreamAptosOperation, updateStreamEvmOperation, deleteStreamAptosOperation, deleteStreamEvmOperation, getStreamsAptosOperation, getStreamsEvmOperation, addAddressAptosOperation, addAddressEvmOperation, updateStreamStatusAptosOperation, updateStreamStatusEvmOperation, getAddressesAptosOperation, getAddressesEvmOperation, deleteAddressAptosOperation, deleteAddressEvmOperation, getStreamAptosOperation, getStreamEvmOperation, getHistoryOperation, getLogsOperation, replayHistoryOperation, getStatsOperation, getStatsByIdOperation, setSettingsOperation, getSettingsOperation } from '@moralisweb3/common-streams-utils';
import { toBuffer, bufferToHex, keccak256 } from 'ethereumjs-util';
import { sha256 } from '@ethersproject/sha2';
import { toUtf8Bytes } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
import { Indexed, Interface } from '@ethersproject/abi';

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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var StreamNetwork;
(function (StreamNetwork) {
    StreamNetwork["APTOS"] = "aptos";
    StreamNetwork["EVM"] = "evm";
})(StreamNetwork || (StreamNetwork = {}));

var IncorrectNetworkError = /** @class */ (function (_super) {
    __extends(IncorrectNetworkError, _super);
    function IncorrectNetworkError(network) {
        return _super.call(this, {
            code: StreamErrorCode.INCORRECT_NETWORK,
            message: "Incorrect network provided. Got \"".concat(network, "\", Valid values are: ").concat(Object.values(StreamNetwork)
                .map(function (value) { return "\"".concat(value, "\""); })
                .join(', ')),
        }) || this;
    }
    return IncorrectNetworkError;
}(MoralisStreamError));

var makeCreateAptosStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(createStreamAptosOperation, baseUrl, core).fetch(options);
};
var makeCreateEvmStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(createStreamEvmOperation, baseUrl, core).fetch(options);
};
var makeCreateStream = function (core, baseUrl) {
    return (function (createStreamOptions) {
        switch (createStreamOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeCreateAptosStream(core, baseUrl, createStreamOptions);
            case StreamNetwork.EVM:
                return makeCreateEvmStream(core, baseUrl, createStreamOptions);
            default:
                if (createStreamOptions.networkType === undefined) {
                    return makeCreateEvmStream(core, baseUrl, createStreamOptions);
                }
                throw new IncorrectNetworkError(createStreamOptions.networkType);
        }
    });
};

var makeUpdateAptosStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(updateStreamAptosOperation, baseUrl, core).fetch(options);
};
var makeUpdateEvmStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(updateStreamEvmOperation, baseUrl, core).fetch(options);
};
var makeUpdateStream = function (core, baseUrl) {
    return (function (updateStreamOptions) {
        switch (updateStreamOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeUpdateAptosStream(core, baseUrl, updateStreamOptions);
            case StreamNetwork.EVM:
                return makeUpdateEvmStream(core, baseUrl, updateStreamOptions);
            default:
                if (updateStreamOptions.networkType === undefined) {
                    return makeUpdateEvmStream(core, baseUrl, updateStreamOptions);
                }
                throw new IncorrectNetworkError(updateStreamOptions.networkType);
        }
    });
};

var makeDeleteAptosStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(deleteStreamAptosOperation, baseUrl, core).fetch(options);
};
var makeDeleteEvmStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(deleteStreamEvmOperation, baseUrl, core).fetch(options);
};
var makeDeleteStream = function (core, baseUrl) {
    return (function (deleteStreamOptions) {
        switch (deleteStreamOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeDeleteAptosStream(core, baseUrl, deleteStreamOptions);
            case StreamNetwork.EVM:
                return makeDeleteEvmStream(core, baseUrl, deleteStreamOptions);
            default:
                if (deleteStreamOptions.networkType === undefined) {
                    return makeDeleteEvmStream(core, baseUrl, deleteStreamOptions);
                }
                throw new IncorrectNetworkError(deleteStreamOptions.networkType);
        }
    });
};

var makeGetAptosStream$1 = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new PaginatedOperationResolver(getStreamsAptosOperation, baseUrl, core).fetch(options);
};
var makeGetEvmStream$1 = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new PaginatedOperationResolver(getStreamsEvmOperation, baseUrl, core).fetch(options);
};
var makeGetStreams = function (core, baseUrl) {
    return (function (getStreamsOptions) {
        switch (getStreamsOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeGetAptosStream$1(core, baseUrl, getStreamsOptions);
            case StreamNetwork.EVM:
                return makeGetEvmStream$1(core, baseUrl, getStreamsOptions);
            default:
                if (getStreamsOptions.networkType === undefined) {
                    return makeGetEvmStream$1(core, baseUrl, getStreamsOptions);
                }
                throw new IncorrectNetworkError(getStreamsOptions.networkType);
        }
    });
};

var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
var isHexStrict = function (hex) {
    return /^(-)?0x[0-9a-f]*$/i.test(hex);
};
var sha3 = function (value) {
    var bufferValue;
    if (isHexStrict(value) && /^0x/i.test(value.toString())) {
        bufferValue = toBuffer(value);
    }
    else {
        // Assume value is an arbitrary string
        bufferValue = Buffer.from(value, 'utf-8');
    }
    var returnValue = bufferToHex(keccak256(bufferValue));
    if (returnValue === SHA3_NULL_S) {
        return null;
    }
    return returnValue;
};

var StreamsConfig = {
    streamsSecret: {
        name: 'streamsSecret',
        defaultValue: null,
    },
};

var makeVerifySignature = function (config) {
    return function (_a) {
        var body = _a.body, signature = _a.signature;
        var secret = config.get(StreamsConfig.streamsSecret);
        if (!secret) {
            secret = config.get(ApiUtilsConfig.apiKey);
        }
        if (!secret) {
            throw new MoralisStreamError({
                code: StreamErrorCode.GENERIC_STREAM_ERROR,
                message: 'Unable to verify signature without an api key or streams secret',
            });
        }
        var generatedSignature = sha3(JSON.stringify(body) + secret);
        if (signature !== generatedSignature) {
            throw new MoralisStreamError({
                code: StreamErrorCode.INVALID_SIGNATURE,
                message: 'Signature is not valid',
            });
        }
        return true;
    };
};

var makeAddAddressAptosStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(addAddressAptosOperation, baseUrl, core).fetch(options);
};
var makeAddAddressEvmStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(addAddressEvmOperation, baseUrl, core).fetch(options);
};
var makeAddAddress = function (core, baseUrl) {
    return (function (addAddressOptions) {
        switch (addAddressOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeAddAddressAptosStream(core, baseUrl, addAddressOptions);
            case StreamNetwork.EVM:
                return makeAddAddressEvmStream(core, baseUrl, addAddressOptions);
            default:
                if (addAddressOptions.networkType === undefined) {
                    return makeAddAddressEvmStream(core, baseUrl, addAddressOptions);
                }
                throw new IncorrectNetworkError(addAddressOptions.networkType);
        }
    });
};

var makeUpdateAptosStreamStatus = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(updateStreamStatusAptosOperation, baseUrl, core).fetch(options);
};
var makeUpdateEvmStreamStatus = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(updateStreamStatusEvmOperation, baseUrl, core).fetch(options);
};
var makeUpdateStreamStatus = function (core, baseUrl) {
    return (function (updateStreamOptions) {
        switch (updateStreamOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeUpdateAptosStreamStatus(core, baseUrl, updateStreamOptions);
            case StreamNetwork.EVM:
                return makeUpdateEvmStreamStatus(core, baseUrl, updateStreamOptions);
            default:
                if (updateStreamOptions.networkType === undefined) {
                    return makeUpdateEvmStreamStatus(core, baseUrl, updateStreamOptions);
                }
                throw new IncorrectNetworkError(updateStreamOptions.networkType);
        }
    });
};

var hasAbis = function (webhookData) {
    if (!webhookData.abi || webhookData.abi.length < 1) {
        return false;
    }
    return true;
};
var isWebhook = function (webhookData) {
    if (typeof webhookData !== 'object' || webhookData === null || !('logs' in webhookData)) {
        return false;
    }
    return true;
};

var CollectionNameBuilder = /** @class */ (function () {
    function CollectionNameBuilder() {
        this.cache = {};
        this.cacheLimit = 256;
    }
    CollectionNameBuilder.prototype.build = function (tag) {
        var result = this.cache[tag];
        if (!result) {
            result = this.process(tag);
            if (this.cacheLimit > 0) {
                // Simple anti DDOS protection.
                this.cache[tag] = result;
                this.cacheLimit--;
            }
        }
        return result;
    };
    CollectionNameBuilder.prototype.process = function (tag) {
        var parts = tag
            .split(/[^a-zA-Z0-9_]/)
            .filter(function (p) { return !!p; })
            .map(function (p) {
            return p.substring(0, 1).toUpperCase() + p.substring(1).toLowerCase();
        });
        if (parts.length < 1) {
            throw new Error("Cannot build table name from value \"".concat(tag, "\""));
        }
        return parts.join('');
    };
    return CollectionNameBuilder;
}());

var SimpleProcessor = /** @class */ (function () {
    function SimpleProcessor(collectionNameBuilder, documentBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.documentBuilder = documentBuilder;
    }
    SimpleProcessor.prototype.process = function (items, batch) {
        var updates = [];
        if (items) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var document_1 = this.documentBuilder(item, batch.block, batch.confirmed, batch.chainId);
                updates.push({
                    collectionName: this.collectionNameBuilder.build(batch.tag),
                    document: document_1,
                });
            }
        }
        return updates;
    };
    return SimpleProcessor;
}());

var Sha256 = /** @class */ (function () {
    function Sha256() {
    }
    Sha256.hash = function (value) {
        var bytes = toUtf8Bytes(value);
        return sha256(bytes);
    };
    return Sha256;
}());

var LogRelatedId = /** @class */ (function () {
    function LogRelatedId() {
    }
    LogRelatedId.create = function (chainId, transactionHash, logIndex) {
        var safeTransactionHash = transactionHash.toLowerCase();
        return Sha256.hash("".concat(chainId, ";").concat(safeTransactionHash, ";").concat(logIndex));
    };
    return LogRelatedId;
}());

var TriggerItemsBuilder = /** @class */ (function () {
    function TriggerItemsBuilder() {
    }
    TriggerItemsBuilder.build = function (triggers) {
        if (!triggers || triggers.length === 0) {
            return undefined;
        }
        return triggers.map(function (trigger) { return ({
            name: String(trigger.name),
            value: convertValue(trigger.value),
        }); });
    };
    return TriggerItemsBuilder;
}());
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertValue(value) {
    var type = typeof value;
    if (type === 'string' || type === 'number' || type === 'boolean') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(convertValue);
    }
    return String(value);
}

var Erc20TransferDocumentBuilder = /** @class */ (function () {
    function Erc20TransferDocumentBuilder() {
    }
    Erc20TransferDocumentBuilder.build = function (transfer, block, confirmed, chainId) {
        var chain = Number(chainId);
        var document = {
            id: LogRelatedId.create(chain, transfer.transactionHash, transfer.logIndex),
            transactionHash: transfer.transactionHash,
            contract: transfer.contract,
            logIndex: transfer.logIndex,
            from: transfer.from,
            to: transfer.to,
            value: transfer.value,
            tokenDecimals: parseInt(transfer.tokenDecimals, 10),
            tokenName: transfer.tokenName,
            tokenSymbol: transfer.tokenSymbol,
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            chainId: chain,
            triggers: TriggerItemsBuilder.build(transfer.triggers),
        };
        return document;
    };
    return Erc20TransferDocumentBuilder;
}());

var Erc20TransfersProcessor = /** @class */ (function () {
    function Erc20TransfersProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, Erc20TransferDocumentBuilder.build);
    }
    Erc20TransfersProcessor.prototype.process = function (batch) {
        return this.simpleProcessor.process(batch.erc20Transfers, batch);
    };
    return Erc20TransfersProcessor;
}());

var Erc20ApprovalDocumentBuilder = /** @class */ (function () {
    function Erc20ApprovalDocumentBuilder() {
    }
    Erc20ApprovalDocumentBuilder.build = function (approval, block, confirmed, chainId) {
        var chain = Number(chainId);
        var document = {
            id: LogRelatedId.create(chain, approval.transactionHash, approval.logIndex),
            transactionHash: approval.transactionHash,
            contract: approval.contract,
            logIndex: approval.logIndex,
            owner: approval.owner,
            spender: approval.spender,
            value: approval.value,
            tokenDecimals: parseInt(approval.tokenDecimals, 10),
            tokenName: approval.tokenName,
            tokenSymbol: approval.tokenSymbol,
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            chainId: chain,
            triggers: TriggerItemsBuilder.build(approval.triggers),
        };
        return document;
    };
    return Erc20ApprovalDocumentBuilder;
}());

var Erc20ApprovalsProcessor = /** @class */ (function () {
    function Erc20ApprovalsProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.processor = new SimpleProcessor(this.collectionNameBuilder, Erc20ApprovalDocumentBuilder.build);
    }
    Erc20ApprovalsProcessor.prototype.process = function (batch) {
        return this.processor.process(batch.erc20Approvals, batch);
    };
    return Erc20ApprovalsProcessor;
}());

var TxRelatedId = /** @class */ (function () {
    function TxRelatedId() {
    }
    TxRelatedId.create = function (chainId, transactionHash) {
        var safeTransactionHash = transactionHash.toLowerCase();
        return Sha256.hash("".concat(chainId, ";").concat(safeTransactionHash));
    };
    return TxRelatedId;
}());

var InternalTxDocumentBuilder = /** @class */ (function () {
    function InternalTxDocumentBuilder() {
    }
    InternalTxDocumentBuilder.build = function (tx, block, confirmed, chainId) {
        var chain = Number(chainId);
        return {
            id: TxRelatedId.create(chain, tx.transactionHash),
            hash: tx.transactionHash,
            chainId: chain,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            gas: parseInt(tx.gas || '0', 10),
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
        };
    };
    return InternalTxDocumentBuilder;
}());

var InternalTxsProcessor = /** @class */ (function () {
    function InternalTxsProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, InternalTxDocumentBuilder.build);
    }
    InternalTxsProcessor.prototype.process = function (batch) {
        return this.simpleProcessor.process(batch.txsInternal, batch);
    };
    return InternalTxsProcessor;
}());

var LogDocumentValueFormatter = /** @class */ (function () {
    function LogDocumentValueFormatter() {
    }
    LogDocumentValueFormatter.format = function (param) {
        switch (param.type) {
            case 'string':
                return param.value;
            case 'address':
                return param.value.toLowerCase();
            default:
                if (BigNumber.isBigNumber(param.value)) {
                    return param.value.toString();
                }
                return param.value.toString();
        }
    };
    return LogDocumentValueFormatter;
}());

var ParamNameResolver = /** @class */ (function () {
    function ParamNameResolver(restrictedNames) {
        this.restrictedNames = restrictedNames;
        this.usedNames = [];
    }
    ParamNameResolver.prototype.iterate = function (object, callback) {
        var _this = this;
        // We need to always keep parameters in the same order
        // because the RowParamNameResolver is order-sensitive.
        var sortedNames = Object.keys(object).sort(function (a, b) { return a.localeCompare(b); });
        sortedNames.forEach(function (name) {
            var safeName = _this.resolve(name);
            callback(safeName, object[name]);
        });
    };
    ParamNameResolver.prototype.resolve = function (name) {
        if (this.isUsed(name)) {
            do {
                name = "_".concat(name);
            } while (this.isUsed(name));
        }
        this.usedNames.push(name);
        return name;
    };
    ParamNameResolver.prototype.isUsed = function (name) {
        return this.restrictedNames.includes(name) || this.usedNames.includes(name);
    };
    return ParamNameResolver;
}());

var paramNames = [
    'id',
    'name',
    'logIndex',
    'transactionHash',
    'address',
    'blockHash',
    'blockTimestamp',
    'blockNumber',
    'confirmed',
    'chainId',
    'triggers',
];
var restrictedParamNames = __spreadArray(__spreadArray([], paramNames, true), [
    // Some extra names
    '_id',
    'uniqueId',
    'updatedAt',
    'createdAt',
    'user',
    'userId',
], false);
var LogDocumentBuilder = /** @class */ (function () {
    function LogDocumentBuilder() {
    }
    LogDocumentBuilder.build = function (log, parsedLog, block, confirmed, chainId) {
        var nameResolver = new ParamNameResolver(restrictedParamNames);
        var chain = Number(chainId);
        var document = {
            id: LogRelatedId.create(chain, log.transactionHash, log.logIndex),
            name: parsedLog.name,
            logIndex: parseInt(log.logIndex, 10),
            transactionHash: log.transactionHash,
            address: log.address,
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            chainId: chain,
            triggers: TriggerItemsBuilder.build(log.triggers),
        };
        nameResolver.iterate(parsedLog.params, function (safeParamName, paramValue) {
            document[safeParamName] = LogDocumentValueFormatter.format(paramValue);
        });
        return document;
    };
    return LogDocumentBuilder;
}());

var LogParser = /** @class */ (function () {
    function LogParser(abiItems) {
        this.abiInterface = new Interface(abiItems);
    }
    LogParser.prototype.read = function (log) {
        // Solidity supports max 3 topics. https://docs.soliditylang.org/en/latest/contracts.html#events
        var topics = [log.topic0, log.topic1, log.topic2, log.topic3].filter(function (t) { return t !== null; });
        // Do not call the `this.abiInterface.parseLog()` method here! The @ethersproject/abi package (5.7.0) has a bug,
        // that doesn't return `args` with named keys in a specific case. That problem doesn't occur when we call directly the decodeEventLog() method.
        var eventFragment = this.abiInterface.getEvent(topics[0]);
        var args = this.abiInterface.decodeEventLog(eventFragment, log.data, topics);
        var params = {};
        eventFragment.inputs.forEach(function (input, index) {
            var type = input.type, name = input.name;
            var value = args[index];
            if (value instanceof Indexed) {
                value = value.hash;
            }
            params[name] = {
                type: type,
                value: value,
            };
        });
        return {
            name: eventFragment.name,
            params: params,
        };
    };
    return LogParser;
}());

var LogsProcessor = /** @class */ (function () {
    function LogsProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
    }
    LogsProcessor.prototype.process = function (batch) {
        var updates = [];
        if (batch.abi.length < 1) {
            return updates;
        }
        var logParser = new LogParser(batch.abi);
        for (var _i = 0, _a = batch.logs; _i < _a.length; _i++) {
            var log = _a[_i];
            var logParams = logParser.read(log);
            var document_1 = LogDocumentBuilder.build(log, logParams, batch.block, batch.confirmed, batch.chainId);
            updates.push({
                collectionName: this.collectionNameBuilder.build(batch.tag),
                document: document_1,
            });
        }
        return updates;
    };
    return LogsProcessor;
}());

var NftTransferDocumentBuilder = /** @class */ (function () {
    function NftTransferDocumentBuilder() {
    }
    NftTransferDocumentBuilder.build = function (transfer, block, confirmed, chainId) {
        var chain = Number(chainId);
        var document = {
            id: LogRelatedId.create(chain, transfer.transactionHash, transfer.logIndex),
            transactionHash: transfer.transactionHash,
            contract: transfer.contract,
            logIndex: transfer.logIndex,
            operator: transfer.operator,
            from: transfer.from,
            to: transfer.to,
            tokenId: transfer.tokenId,
            amount: transfer.amount,
            tokenContractType: transfer.tokenContractType,
            tokenName: transfer.tokenName,
            tokenSymbol: transfer.tokenSymbol,
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            chainId: chain,
            triggers: TriggerItemsBuilder.build(transfer.triggers),
        };
        return document;
    };
    return NftTransferDocumentBuilder;
}());

var NftTransfersProcessor = /** @class */ (function () {
    function NftTransfersProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, NftTransferDocumentBuilder.build);
    }
    NftTransfersProcessor.prototype.process = function (batch) {
        return this.simpleProcessor.process(batch.nftTransfers, batch);
    };
    return NftTransfersProcessor;
}());

var NftApprovalDocumentBuilder = /** @class */ (function () {
    function NftApprovalDocumentBuilder() {
    }
    NftApprovalDocumentBuilder.build = function (approval, block, confirmed, chainId) {
        var chain = Number(chainId);
        var document = {
            id: LogRelatedId.create(chain, approval.transactionHash, approval.logIndex),
            transactionHash: approval.transactionHash,
            contract: approval.contract,
            logIndex: approval.logIndex,
            operator: approval.operator,
            account: approval.account,
            approvedAll: approval.approvedAll,
            tokenId: approval.tokenId,
            tokenContractType: approval.tokenContractType,
            tokenName: approval.tokenName,
            tokenSymbol: approval.tokenSymbol,
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            chainId: chain,
        };
        return document;
    };
    return NftApprovalDocumentBuilder;
}());

var NftApprovalsProcessor = /** @class */ (function () {
    function NftApprovalsProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, NftApprovalDocumentBuilder.build);
    }
    NftApprovalsProcessor.prototype.process = function (batch) {
        return this.simpleProcessor.process(batch.nftTokenApprovals, batch);
    };
    return NftApprovalsProcessor;
}());

var TxDocumentBuilder = /** @class */ (function () {
    function TxDocumentBuilder() {
    }
    TxDocumentBuilder.build = function (tx, block, confirmed, chainId) {
        var chain = Number(chainId);
        return {
            id: TxRelatedId.create(chain, tx.hash),
            hash: tx.hash,
            chainId: chain,
            transactionIndex: parseInt(tx.transactionIndex, 10),
            gas: parseInt(tx.gas, 10),
            gasPrice: parseInt(tx.gasPrice, 10),
            nonce: parseInt(tx.nonce, 10),
            fromAddress: tx.fromAddress,
            toAddress: tx.toAddress,
            value: tx.value || '0',
            input: tx.input,
            type: parseInt(tx.type, 10),
            receiptStatus: parseInt(tx.receiptStatus, 10),
            receiptGasUsed: parseInt(tx.receiptGasUsed, 10),
            receiptCumulativeGasUsed: parseInt(tx.receiptCumulativeGasUsed, 10),
            blockHash: block.hash,
            blockTimestamp: parseInt(block.timestamp, 10),
            blockNumber: parseInt(block.number, 10),
            confirmed: confirmed,
            triggers: TriggerItemsBuilder.build(tx.triggers),
        };
    };
    return TxDocumentBuilder;
}());

var TxsProcessor = /** @class */ (function () {
    function TxsProcessor(collectionNameBuilder) {
        this.collectionNameBuilder = collectionNameBuilder;
        this.processor = new SimpleProcessor(this.collectionNameBuilder, TxDocumentBuilder.build);
    }
    TxsProcessor.prototype.process = function (batch) {
        return this.processor.process(batch.txs, batch);
    };
    return TxsProcessor;
}());

var BatchProcessor = /** @class */ (function () {
    function BatchProcessor(erc20ApprovalsProcessor, erc20TransfersProcessor, internalTxsProcessor, logsProcessor, nftApprovalsProcessor, nftTransfersProcessor, txsProcessor) {
        this.erc20ApprovalsProcessor = erc20ApprovalsProcessor;
        this.erc20TransfersProcessor = erc20TransfersProcessor;
        this.internalTxsProcessor = internalTxsProcessor;
        this.logsProcessor = logsProcessor;
        this.nftApprovalsProcessor = nftApprovalsProcessor;
        this.nftTransfersProcessor = nftTransfersProcessor;
        this.txsProcessor = txsProcessor;
    }
    BatchProcessor.create = function () {
        var nameBuilder = new CollectionNameBuilder();
        return new BatchProcessor(new Erc20ApprovalsProcessor(nameBuilder), new Erc20TransfersProcessor(nameBuilder), new InternalTxsProcessor(nameBuilder), new LogsProcessor(nameBuilder), new NftApprovalsProcessor(nameBuilder), new NftTransfersProcessor(nameBuilder), new TxsProcessor(nameBuilder));
    };
    BatchProcessor.prototype.process = function (batch) {
        var _this = this;
        return {
            erc20Approvals: function () { return _this.erc20ApprovalsProcessor.process(batch); },
            erc20Transfers: function () { return _this.erc20TransfersProcessor.process(batch); },
            internalTxs: function () { return _this.internalTxsProcessor.process(batch); },
            logs: function () { return _this.logsProcessor.process(batch); },
            nftApprovals: function () { return _this.nftApprovalsProcessor.process(batch); },
            nftTransfers: function () { return _this.nftTransfersProcessor.process(batch); },
            txs: function () { return _this.txsProcessor.process(batch); },
        };
    };
    return BatchProcessor;
}());

var parseLog = function (webhookData) {
    if (!isWebhook(webhookData)) {
        throw new MoralisStreamError({
            code: StreamErrorCode.GENERIC_STREAM_ERROR,
            message: 'Cannot decode the logs. No logs found in the webhook, or invalid webhook provided.',
        });
    }
    if (!hasAbis(webhookData)) {
        throw new MoralisStreamError({
            code: StreamErrorCode.GENERIC_STREAM_ERROR,
            message: 'Cannot decode the logs. No abis found in the provided webhook.',
        });
    }
    var logs = webhookData.logs, abi = webhookData.abi;
    var decodedLogs = [];
    logs.forEach(function (currentLog) {
        var params = new LogParser(abi).read(currentLog).params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var decodedLog = {};
        for (var key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                var element = params[key];
                decodedLog[key] = element.value;
            }
        }
        decodedLogs.push(decodedLog);
    });
    return decodedLogs;
};

var makeGetAptosAddresses = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new PaginatedOperationResolver(getAddressesAptosOperation, baseUrl, core).fetch(options);
};
var makeGetEvmAddresses = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new PaginatedOperationResolver(getAddressesEvmOperation, baseUrl, core).fetch(options);
};
var makeGetAddresses = function (core, baseUrl) {
    return (function (getAddressesOptions) {
        switch (getAddressesOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeGetAptosAddresses(core, baseUrl, getAddressesOptions);
            case StreamNetwork.EVM:
                return makeGetEvmAddresses(core, baseUrl, getAddressesOptions);
            default:
                if (getAddressesOptions.networkType === undefined) {
                    return makeGetEvmAddresses(core, baseUrl, getAddressesOptions);
                }
                throw new IncorrectNetworkError(getAddressesOptions.networkType);
        }
    });
};

var makeDeleteAddressAptosStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(deleteAddressAptosOperation, baseUrl, core).fetch(options);
};
var makeDeleteAddressEvmStream = function (core, baseUrl, _a) {
    _a.networkType; var options = __rest(_a, ["networkType"]);
    return new OperationResolver(deleteAddressEvmOperation, baseUrl, core).fetch(options);
};
var makeDeleteAddress = function (core, baseUrl) {
    return (function (deleteAddressOptions) {
        switch (deleteAddressOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeDeleteAddressAptosStream(core, baseUrl, deleteAddressOptions);
            case StreamNetwork.EVM:
                return makeDeleteAddressEvmStream(core, baseUrl, deleteAddressOptions);
            default:
                if (deleteAddressOptions.networkType === undefined) {
                    return makeDeleteAddressEvmStream(core, baseUrl, deleteAddressOptions);
                }
                throw new IncorrectNetworkError(deleteAddressOptions.networkType);
        }
    });
};

var makeGetAptosStream = function (core, baseUrl, _a) {
    _a.networkType; _a.network; var options = __rest(_a, ["networkType", "network"]);
    return new OperationResolver(getStreamAptosOperation, baseUrl, core).fetch(options);
};
var makeGetEvmStream = function (core, baseUrl, _a) {
    _a.networkType; _a.network; var options = __rest(_a, ["networkType", "network"]);
    return new OperationResolver(getStreamEvmOperation, baseUrl, core).fetch(options);
};
var makeGetStreamById = function (core, baseUrl) {
    return (function (getStreamOptions) {
        // Backwards compatibility for the 'network' parameter
        if (!getStreamOptions.networkType && getStreamOptions.network) {
            getStreamOptions.networkType = getStreamOptions.network;
        }
        switch (getStreamOptions.networkType) {
            case StreamNetwork.APTOS:
                return makeGetAptosStream(core, baseUrl, getStreamOptions);
            case StreamNetwork.EVM:
                return makeGetEvmStream(core, baseUrl, getStreamOptions);
            default:
                if (getStreamOptions.networkType === undefined) {
                    return makeGetEvmStream(core, baseUrl, getStreamOptions);
                }
                throw new IncorrectNetworkError(getStreamOptions.networkType);
        }
    });
};

var StreamsConfigSetup = /** @class */ (function () {
    function StreamsConfigSetup() {
    }
    StreamsConfigSetup.register = function (config) {
        config.registerKey(StreamsConfig.streamsSecret);
    };
    return StreamsConfigSetup;
}());

var BASE_URL = 'https://api.moralis-streams.com';
var Streams = /** @class */ (function (_super) {
    __extends(Streams, _super);
    function Streams(core) {
        var _this = _super.call(this, Streams.moduleName, core, function () { return BASE_URL; }) || this;
        _this.add = makeCreateStream(_this.core, BASE_URL);
        _this.update = makeUpdateStream(_this.core, BASE_URL);
        _this.delete = makeDeleteStream(_this.core, BASE_URL);
        _this.getAll = makeGetStreams(_this.core, BASE_URL);
        _this.getById = makeGetStreamById(_this.core, BASE_URL);
        _this.updateStatus = makeUpdateStreamStatus(_this.core, BASE_URL);
        _this.addAddress = makeAddAddress(_this.core, BASE_URL);
        _this.getAddresses = makeGetAddresses(_this.core, BASE_URL);
        _this.deleteAddress = makeDeleteAddress(_this.core, BASE_URL);
        _this.getHistory = _this.createPaginatedFetcher(getHistoryOperation);
        _this.getLogs = _this.createPaginatedFetcher(getLogsOperation);
        _this.retry = _this.createFetcher(replayHistoryOperation);
        _this._getStats = _this.createFetcher(getStatsOperation);
        _this.getStats = function () { return _this._getStats({}); };
        _this.getStatsById = _this.createFetcher(getStatsByIdOperation);
        _this.setSettings = _this.createFetcher(setSettingsOperation);
        _this._readSettings = _this.createFetcher(getSettingsOperation);
        _this.readSettings = function () { return _this._readSettings({}); };
        _this.verifySignature = function (options) { return makeVerifySignature(_this.core.config)(options); };
        _this.parsedLogs = function (webhookData) { return parseLog(webhookData); };
        return _this;
    }
    Streams.create = function (core) {
        return new Streams(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    Streams.prototype.setup = function () {
        StreamsConfigSetup.register(this.core.config);
    };
    Streams.prototype.start = function () {
        // Nothing
    };
    Streams.prototype.createFetcher = function (operation) {
        return new OperationResolver(operation, BASE_URL, this.core).fetch;
    };
    Streams.prototype.createPaginatedFetcher = function (operation) {
        return new PaginatedOperationResolver(operation, BASE_URL, this.core).fetch;
    };
    Streams.moduleName = 'streams';
    return Streams;
}(ApiModule));

export { BatchProcessor, CollectionNameBuilder, Erc20ApprovalDocumentBuilder, Erc20ApprovalsProcessor, Erc20TransferDocumentBuilder, Erc20TransfersProcessor, InternalTxDocumentBuilder, InternalTxsProcessor, LogDocumentBuilder, LogDocumentValueFormatter, LogParser, LogsProcessor, NftApprovalDocumentBuilder, NftApprovalsProcessor, NftTransferDocumentBuilder, NftTransfersProcessor, ParamNameResolver, Streams, TxDocumentBuilder, TxsProcessor };
