import { AptosNetwork, AptosAddress, AptosNetworkResolver } from '@moralisweb3/common-aptos-utils';
import { maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmAddress, EvmChainResolver } from '@moralisweb3/common-evm-utils';
import { SolNetwork, SolAddress } from '@moralisweb3/common-sol-utils';

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

var verifyChallengeAptosOperation = {
    method: 'POST',
    name: 'verifyChallengeAptos',
    id: 'verifyChallengeAptos',
    groupName: 'aptos',
    urlPathPattern: '/challenge/verify/aptos',
    bodyParamNames: ['message', 'signature'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$a,
    getRequestBody: getRequestBody$9,
    serializeRequest: serializeRequest$a,
    deserializeRequest: deserializeRequest$a,
    deserializeResponse: deserializeResponse$a,
};
// Methods
function getRequestUrlParams$a() {
    return {};
}
function getRequestBody$9(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeResponse$a(_a) {
    var network = _a.network, jsonResponse = __rest(_a, ["network"]);
    return __assign(__assign({}, jsonResponse), { network: AptosNetwork.create(network), address: AptosAddress.create(jsonResponse.address), expirationTime: maybe(jsonResponse.expirationTime, function (value) { return new Date(value); }), notBefore: maybe(jsonResponse.notBefore, function (value) { return new Date(value); }) });
}
function serializeRequest$a(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeRequest$a(jsonRequest) {
    return {
        message: jsonRequest.message,
        signature: jsonRequest.signature,
    };
}

/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
var requestChallengeAptosOperation = {
    method: 'POST',
    name: 'requestChallengeAptos',
    id: 'requestChallengeAptos',
    groupName: 'aptos',
    urlPathPattern: '/challenge/request/aptos',
    bodyParamNames: [
        'domain',
        'network',
        'address',
        'statement',
        'uri',
        'expirationTime',
        'notBefore',
        'resources',
        'timeout',
        'publicKey',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$9,
    getRequestBody: getRequestBody$8,
    serializeRequest: serializeRequest$9,
    deserializeRequest: deserializeRequest$9,
    deserializeResponse: deserializeResponse$9,
};
// Methods
function getRequestUrlParams$9() {
    return {};
}
function getRequestBody$8(request) {
    return {
        domain: request.domain,
        network: AptosNetwork.create(request.network).toString(),
        address: AptosAddress.create(request.address).toString(),
        publicKey: request.publicKey,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeResponse$9(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$9(request, core) {
    return {
        domain: request.domain,
        network: AptosNetworkResolver.resolve(request.network, core),
        address: AptosAddress.create(request.address).toString(),
        publicKey: request.publicKey,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeRequest$9(jsonRequest) {
    return {
        domain: jsonRequest.domain,
        network: AptosNetwork.create(jsonRequest.network),
        address: AptosAddress.create(jsonRequest.address),
        publicKey: jsonRequest.publicKey,
        statement: jsonRequest.statement,
        uri: jsonRequest.uri,
        expirationTime: jsonRequest.expirationTime,
        notBefore: jsonRequest.notBefore,
        resources: jsonRequest.resources,
        timeout: jsonRequest.timeout,
    };
}

var verifyChallengeEvmOperation = {
    method: 'POST',
    name: 'verifyChallengeEvm',
    id: 'verifyChallengeEvm',
    groupName: 'evm',
    urlPathPattern: '/challenge/verify/evm',
    bodyParamNames: ['message', 'signature'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$8,
    getRequestBody: getRequestBody$7,
    serializeRequest: serializeRequest$8,
    deserializeRequest: deserializeRequest$8,
    deserializeResponse: deserializeResponse$8,
};
// Methods
function getRequestUrlParams$8() {
    return {};
}
function getRequestBody$7(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeResponse$8(_a) {
    var chainId = _a.chainId, jsonResponse = __rest(_a, ["chainId"]);
    return __assign(__assign({}, jsonResponse), { chain: EvmChain.create(chainId), address: EvmAddress.create(jsonResponse.address), expirationTime: maybe(jsonResponse.expirationTime, function (value) { return new Date(value); }), notBefore: maybe(jsonResponse.notBefore, function (value) { return new Date(value); }) });
}
function serializeRequest$8(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeRequest$8(jsonRequest) {
    return {
        message: jsonRequest.message,
        signature: jsonRequest.signature,
    };
}

/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
var requestChallengeEvmOperation = {
    method: 'POST',
    name: 'requestChallengeEvm',
    id: 'requestChallengeEvm',
    groupName: 'evm',
    urlPathPattern: '/challenge/request/evm',
    bodyParamNames: [
        'domain',
        'chainId',
        'address',
        'statement',
        'uri',
        'expirationTime',
        'notBefore',
        'resources',
        'timeout',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$7,
    getRequestBody: getRequestBody$6,
    serializeRequest: serializeRequest$7,
    deserializeRequest: deserializeRequest$7,
    deserializeResponse: deserializeResponse$7,
};
// Methods
function getRequestUrlParams$7() {
    return {};
}
function getRequestBody$6(request, core) {
    return {
        domain: request.domain,
        chainId: EvmChainResolver.resolve(request.chainId, core).hex,
        address: EvmAddress.create(request.address).checksum,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeResponse$7(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$7(request, core) {
    return {
        domain: request.domain,
        chainId: EvmChainResolver.resolve(request.chainId, core).decimal.toString(),
        address: EvmAddress.create(request.address).checksum,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeRequest$7(jsonRequest, core) {
    return {
        domain: jsonRequest.domain,
        chainId: EvmChainResolver.resolve(jsonRequest.chainId, core),
        address: EvmAddress.create(jsonRequest.address),
        statement: jsonRequest.statement,
        uri: jsonRequest.uri,
        expirationTime: jsonRequest.expirationTime,
        notBefore: jsonRequest.notBefore,
        resources: jsonRequest.resources,
        timeout: jsonRequest.timeout,
    };
}

var getAddressesOperation = {
    method: 'GET',
    name: 'getAddresses',
    id: 'getAddresses',
    groupName: 'evm',
    urlPathPattern: '/profile/{profileId}/addresses',
    urlPathParamNames: ['profileId'],
    getRequestUrlParams: getRequestUrlParams$6,
    serializeRequest: serializeRequest$6,
    deserializeRequest: deserializeRequest$6,
    deserializeResponse: deserializeResponse$6,
};
// Methods
function getRequestUrlParams$6(request) {
    return {
        profileId: request.profileId,
    };
}
function deserializeResponse$6(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$6(request) {
    return request;
}
function deserializeRequest$6(jsonRequest) {
    return jsonRequest;
}

var removeBindOperation = {
    method: 'POST',
    name: 'removeBind',
    id: 'removeBind',
    groupName: 'evm',
    urlPathPattern: '/bind/remove',
    bodyParamNames: ['blockchainType', 'address', 'profileId', 'publicKey'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$5,
    getRequestBody: getRequestBody$5,
    serializeRequest: serializeRequest$5,
    deserializeRequest: deserializeRequest$5,
    deserializeResponse: deserializeResponse$5,
};
// Methods
function getRequestUrlParams$5() {
    return {};
}
function getRequestBody$5(request) {
    return {
        blockchainType: request.blockchainType,
        address: EvmAddress.create(request.address).checksum,
        profileId: request.profileId,
        publicKey: request.publicKey,
    };
}
function deserializeResponse$5(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$5(request) {
    return {
        blockchainType: request.blockchainType,
        address: EvmAddress.create(request.address).checksum,
        profileId: request.profileId,
        publicKey: request.publicKey,
    };
}
function deserializeRequest$5(jsonRequest) {
    return {
        blockchainType: jsonRequest.blockchainType,
        address: EvmAddress.create(jsonRequest.address),
        profileId: jsonRequest.profileId,
        publicKey: jsonRequest.publicKey,
    };
}

var requestBindOperation = {
    method: 'POST',
    name: 'requestBind',
    id: 'requestBind',
    groupName: 'evm',
    urlPathPattern: '/bind/request',
    bodyParamNames: ['addresses'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$4,
    getRequestBody: getRequestBody$4,
    serializeRequest: serializeRequest$4,
    deserializeRequest: deserializeRequest$4,
    deserializeResponse: deserializeResponse$4,
};
// Methods
function getRequestUrlParams$4() {
    return {};
}
function getRequestBody$4(request) {
    return {
        addresses: request.addresses.map(function (address) { return ({
            blockchainType: address.blockchainType,
            address: EvmAddress.create(address.address).checksum,
        }); }),
    };
}
function deserializeResponse$4(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$4(request) {
    return {
        addresses: request.addresses.map(function (address) { return ({
            blockchainType: address.blockchainType,
            address: EvmAddress.create(address.address).checksum,
        }); }),
    };
}
function deserializeRequest$4(jsonRequest) {
    return {
        addresses: jsonRequest.addresses.map(function (address) { return ({
            blockchainType: address.blockchainType,
            address: EvmAddress.create(address.address),
        }); }),
    };
}

var verifyRemoveBindOperation = {
    method: 'POST',
    name: 'verifyRemoveBind',
    id: 'verifyRemoveBind',
    groupName: 'evm',
    urlPathPattern: '/bind/remove/verify',
    bodyParamNames: ['message', 'signature'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$3,
    getRequestBody: getRequestBody$3,
    serializeRequest: serializeRequest$3,
    deserializeRequest: deserializeRequest$3,
    deserializeResponse: deserializeResponse$3,
};
// Methods
function getRequestUrlParams$3() {
    return {};
}
function getRequestBody$3(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeResponse$3(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$3(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeRequest$3(jsonRequest) {
    return {
        message: jsonRequest.message,
        signature: jsonRequest.signature,
    };
}

var verifyRequestBindOperation = {
    method: 'POST',
    name: 'verifyRequestBind',
    id: 'verifyRequestBind',
    groupName: 'evm',
    urlPathPattern: '/bind/request/verify',
    bodyParamNames: ['verifications'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$2,
    getRequestBody: getRequestBody$2,
    serializeRequest: serializeRequest$2,
    deserializeRequest: deserializeRequest$2,
    deserializeResponse: deserializeResponse$2,
};
// Methods
function getRequestUrlParams$2() {
    return {};
}
function getRequestBody$2(request) {
    return {
        verifications: request.verifications,
    };
}
function deserializeResponse$2(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$2(request) {
    return {
        verifications: request.verifications,
    };
}
function deserializeRequest$2(jsonRequest) {
    return {
        verifications: jsonRequest.verifications,
    };
}

var verifyChallengeSolanaOperation = {
    method: 'POST',
    name: 'verifyChallengeSolana',
    id: 'verifyChallengeSolana',
    groupName: 'solana',
    urlPathPattern: '/challenge/verify/solana',
    bodyParamNames: ['message', 'signature'],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams$1,
    getRequestBody: getRequestBody$1,
    serializeRequest: serializeRequest$1,
    deserializeRequest: deserializeRequest$1,
    deserializeResponse: deserializeResponse$1,
};
// Methods
function getRequestUrlParams$1() {
    return {};
}
function getRequestBody$1(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeResponse$1(_a) {
    var network = _a.network, jsonResponse = __rest(_a, ["network"]);
    return __assign(__assign({}, jsonResponse), { solNetwork: SolNetwork.create(network), address: SolAddress.create(jsonResponse.address), expirationTime: maybe(jsonResponse.expirationTime, function (value) { return new Date(value); }), notBefore: maybe(jsonResponse.notBefore, function (value) { return new Date(value); }) });
}
function serializeRequest$1(request) {
    return {
        message: request.message,
        signature: request.signature,
    };
}
function deserializeRequest$1(jsonRequest) {
    return {
        message: jsonRequest.message,
        signature: jsonRequest.signature,
    };
}

/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
var requestChallengeSolanaOperation = {
    method: 'POST',
    name: 'requestChallengeSolana',
    id: 'requestChallengeSolana',
    groupName: 'solana',
    urlPathPattern: '/challenge/request/solana',
    bodyParamNames: [
        'domain',
        'network',
        'address',
        'statement',
        'uri',
        'expirationTime',
        'notBefore',
        'resources',
        'timeout',
    ],
    bodyType: 'properties',
    getRequestUrlParams: getRequestUrlParams,
    getRequestBody: getRequestBody,
    serializeRequest: serializeRequest,
    deserializeRequest: deserializeRequest,
    deserializeResponse: deserializeResponse,
};
// Methods
function getRequestUrlParams() {
    return {};
}
function getRequestBody(request) {
    return {
        domain: request.domain,
        network: SolNetwork.create(request.network).network,
        address: SolAddress.create(request.address).address,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeResponse(jsonResponse) {
    return jsonResponse;
}
function serializeRequest(request) {
    return {
        domain: request.domain,
        network: SolNetwork.create(request.network).network,
        address: SolAddress.create(request.address).address,
        statement: request.statement,
        uri: request.uri,
        expirationTime: request.expirationTime,
        notBefore: request.notBefore,
        resources: request.resources,
        timeout: request.timeout,
    };
}
function deserializeRequest(jsonRequest) {
    return {
        domain: jsonRequest.domain,
        network: SolNetwork.create(jsonRequest.network),
        address: SolAddress.create(jsonRequest.address),
        statement: jsonRequest.statement,
        uri: jsonRequest.uri,
        expirationTime: jsonRequest.expirationTime,
        notBefore: jsonRequest.notBefore,
        resources: jsonRequest.resources,
        timeout: jsonRequest.timeout,
    };
}

var operations = [
    requestChallengeSolanaOperation,
    requestChallengeEvmOperation,
    requestChallengeAptosOperation,
    verifyChallengeSolanaOperation,
    verifyChallengeEvmOperation,
    verifyChallengeAptosOperation,
    getAddressesOperation,
    removeBindOperation,
    requestBindOperation,
    verifyRemoveBindOperation,
    verifyRequestBindOperation,
];

export { getAddressesOperation, operations, removeBindOperation, requestBindOperation, requestChallengeAptosOperation, requestChallengeEvmOperation, requestChallengeSolanaOperation, verifyChallengeAptosOperation, verifyChallengeEvmOperation, verifyChallengeSolanaOperation, verifyRemoveBindOperation, verifyRequestBindOperation };
