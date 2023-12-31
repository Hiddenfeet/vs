import { ApiModule, CoreProvider } from '@moralisweb3/common-core';
import { getBalanceOperation, getNFTsOperation, getPortfolioOperation, getSPLOperation, getNFTMetadataOperation, GetTokenPriceOperation } from '@moralisweb3/common-sol-utils';
import { OperationResolver, OperationV3Resolver } from '@moralisweb3/api-utils';

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

var ClientSolApi = /** @class */ (function (_super) {
    __extends(ClientSolApi, _super);
    function ClientSolApi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.account = {
            getBalance: function (request) {
                return new OperationResolver(getBalanceOperation, _this.baseUrl, _this.core).fetch(request);
            },
            getNFTs: function (request) {
                return new OperationResolver(getNFTsOperation, _this.baseUrl, _this.core).fetch(request);
            },
            getPortfolio: function (request) {
                return new OperationResolver(getPortfolioOperation, _this.baseUrl, _this.core).fetch(request);
            },
            getSPL: function (request) {
                return new OperationResolver(getSPLOperation, _this.baseUrl, _this.core).fetch(request);
            },
        };
        _this.nft = {
            getNFTMetadata: function (request) {
                return new OperationResolver(getNFTMetadataOperation, _this.baseUrl, _this.core).fetch(request);
            },
        };
        _this.token = {
            getTokenPrice: function (request) {
                return new OperationV3Resolver(GetTokenPriceOperation, _this.baseUrl, _this.core).fetch(request, null);
            },
        };
        return _this;
    }
    return ClientSolApi;
}(ApiModule));

var SolApiConfig = {
    solApiBaseUrl: {
        name: 'solApiBaseUrl',
        defaultValue: 'https://solana-gateway.moralis.io',
    },
};

var EvmSolApiConfigSetup = /** @class */ (function () {
    function EvmSolApiConfigSetup() {
    }
    EvmSolApiConfigSetup.register = function (config) {
        config.registerKey(SolApiConfig.solApiBaseUrl);
    };
    return EvmSolApiConfigSetup;
}());

var SolApi = /** @class */ (function (_super) {
    __extends(SolApi, _super);
    function SolApi(core) {
        return _super.call(this, SolApi.moduleName, core, function () { return core.config.get(SolApiConfig.solApiBaseUrl); }) || this;
    }
    SolApi.create = function (core) {
        return new SolApi(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    SolApi.prototype.setup = function () {
        EvmSolApiConfigSetup.register(this.core.config);
    };
    SolApi.prototype.start = function () {
        // Nothing
    };
    SolApi.moduleName = 'solApi';
    return SolApi;
}(ClientSolApi));

export { SolApi };
