import { CoreProvider } from '@moralisweb3/common-core';
import { AptosNetworkResolver, AbstractClient } from '@moralisweb3/common-aptos-utils';
import { OperationV3Resolver } from '@moralisweb3/api-utils';

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

var MAINNET_BASE_URL = 'https://aptos-mainnet.aws-prod-api-1.moralis.io';
var TESTNET_BASE_URL = 'https://aptos-testnet.aws-prod-api-1.moralis.io';
var AptosApi = /** @class */ (function (_super) {
    __extends(AptosApi, _super);
    function AptosApi(core) {
        var _this = _super.call(this) || this;
        _this.core = core;
        return _this;
    }
    AptosApi.create = function (core) {
        if (!core) {
            core = CoreProvider.getDefault();
        }
        return new AptosApi(core);
    };
    AptosApi.prototype.createEndpoint = function (operation) {
        var _this = this;
        return function (request) {
            var resolver = new OperationV3Resolver(operation, createBaseUrlResolver(_this.core), _this.core);
            return resolver.resolve(request, null);
        };
    };
    AptosApi.prototype.createEndpointWithBody = function (operation) {
        var _this = this;
        return function (request, body) {
            var resolver = new OperationV3Resolver(operation, createBaseUrlResolver(_this.core), _this.core);
            return resolver.resolve(request, body);
        };
    };
    AptosApi.moduleName = 'aptApi';
    return AptosApi;
}(AbstractClient));
function createBaseUrlResolver(core) {
    return function (request) {
        var network = request.network;
        if (network) {
            var finalNetwork = AptosNetworkResolver.resolve(network, core);
            switch (finalNetwork) {
                case 'mainnet':
                    return MAINNET_BASE_URL;
                case 'testnet':
                    return TESTNET_BASE_URL;
                default:
                    throw new Error('Not supported network');
            }
        }
        return MAINNET_BASE_URL;
    };
}

export { AptosApi };
