import { CoreError, CoreErrorCode, maybe, dateInputToDate, BigNumber, CoreProvider, Module, toCamelCase } from '@moralisweb3/common-core';
import { isAddress, getAddress } from '@ethersproject/address';
import { joinSignature, splitSignature, hexlify } from '@ethersproject/bytes';

// $ref: #/components/schemas/chainList
// typeName: chainList
var EvmChainList = /** @class */ (function () {
    function EvmChainList() {
    }
    EvmChainList.create = function (input) {
        return input;
    };
    EvmChainList.fromJSON = function (json) {
        return json;
    };
    return EvmChainList;
}());

// $ref: #/paths/~1nft~1{address}~1trades/get/parameters/5/schema
// typeName: getNFTTrades_marketplace_Enum
var EvmGetNFTTradesMarketplaceEnum = /** @class */ (function () {
    function EvmGetNFTTradesMarketplaceEnum() {
    }
    EvmGetNFTTradesMarketplaceEnum.create = function (input) {
        return input;
    };
    EvmGetNFTTradesMarketplaceEnum.fromJSON = function (json) {
        return json;
    };
    return EvmGetNFTTradesMarketplaceEnum;
}());

// $ref: #/components/schemas/contractsReviewItem/properties/report_type
// typeName: contractsReviewItem_report_type_Enum
var EvmContractsReviewItemReportTypeEnum = /** @class */ (function () {
    function EvmContractsReviewItemReportTypeEnum() {
    }
    EvmContractsReviewItemReportTypeEnum.create = function (input) {
        return input;
    };
    EvmContractsReviewItemReportTypeEnum.fromJSON = function (json) {
        return json;
    };
    return EvmContractsReviewItemReportTypeEnum;
}());

// $ref: #/components/schemas/contractsReviewItem/properties/contract_type
// typeName: contractsReviewItem_contract_type_Enum
var EvmContractsReviewItemContractTypeEnum = /** @class */ (function () {
    function EvmContractsReviewItemContractTypeEnum() {
    }
    EvmContractsReviewItemContractTypeEnum.create = function (input) {
        return input;
    };
    EvmContractsReviewItemContractTypeEnum.fromJSON = function (json) {
        return json;
    };
    return EvmContractsReviewItemContractTypeEnum;
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * A representation of an address on the EVM network.
 *
 * Use this class any time you work with an address, as it will provide utilities to validate the address,
 * and format it to lowercase and checksum format.
 *
 * @category DataType
 */
var EvmAddress = /** @class */ (function () {
    function EvmAddress(address) {
        this._value = EvmAddress.parse(address);
    }
    Object.defineProperty(EvmAddress, "ZERO_ADDRESS", {
        /**
         * @returns EvmAddress instance of the zero address: "0x0000000000000000000000000000000000000000"
         * @example `EvmAddress.ZERO_ADDRESS`
         */
        get: function () {
            return EvmAddress.create('0x0000000000000000000000000000000000000000');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new instance of EvmAddress from any valid address input
     *
     * @example
     * ```
     * const address = EvmAddress.create("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")
     * const address = EvmAddress.create("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359")
     * const address = EvmAddress.ZERO_ADDRESS
     * ```
     */
    EvmAddress.create = function (address) {
        if (address instanceof EvmAddress) {
            return address;
        }
        return new EvmAddress(address);
    };
    EvmAddress.fromJSON = function (address) {
        return new EvmAddress(address);
    };
    EvmAddress.parse = function (address) {
        if (!isAddress(address)) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid address provided: ".concat(address),
            });
        }
        return getAddress(address);
    };
    /**
     * Check the equality between two Evm addresses
     * @example `EvmAddress.equals("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")`
     */
    EvmAddress.equals = function (addressA, addressB) {
        return EvmAddress.create(addressA)._value === EvmAddress.create(addressB)._value;
    };
    /**
     * Checks the equality of the current address with another evm address
     * @example `address.equals("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359")`
     */
    EvmAddress.prototype.equals = function (address) {
        return EvmAddress.equals(this, address);
    };
    Object.defineProperty(EvmAddress.prototype, "checksum", {
        /**
         * @returns the address value in checksum (EIP-55) format (see https://eips.ethereum.org/EIPS/eip-55)
         * @example `address.checksum // "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"`
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmAddress.prototype, "lowercase", {
        /**
         * @returns the address value in lowercase format
         * @example `address.lowercase // "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"`
         */
        get: function () {
            return this._value.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a JSON representation of the address.
     * @returns an address.
     */
    EvmAddress.prototype.toJSON = function () {
        // We convert to lowercase because we want to keep backwards compatibility.
        return this.lowercase;
    };
    return EvmAddress;
}());

// source: https://chainid.network/chains.json
var chainList = [
    {
        name: 'Ethereum Mainnet',
        chain: 'ETH',
        icon: 'ethereum',
        rpc: [
            'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
            'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
            'https://api.mycryptoapi.com/eth',
            'https://cloudflare-eth.com',
            'https://ethereum.publicnode.com',
        ],
        features: [
            {
                name: 'EIP155',
            },
            {
                name: 'EIP1559',
            },
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://ethereum.org',
        shortName: 'eth',
        chainId: 1,
        networkId: 1,
        slip44: 60,
        ens: {
            registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
        explorers: [
            {
                name: 'etherscan',
                url: 'https://etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Goerli',
        title: 'Ethereum Testnet Goerli',
        chain: 'ETH',
        rpc: [
            'https://goerli.infura.io/v3/${INFURA_API_KEY}',
            'wss://goerli.infura.io/v3/${INFURA_API_KEY}',
            'https://rpc.goerli.mudit.blog/',
            'https://ethereum-goerli.publicnode.com',
        ],
        faucets: [
            'http://fauceth.komputing.org?chain=5&address=${ADDRESS}',
            'https://goerli-faucet.slock.it?address=${ADDRESS}',
            'https://faucet.goerli.mudit.blog',
        ],
        nativeCurrency: {
            name: 'Goerli Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://goerli.net/#about',
        shortName: 'gor',
        chainId: 5,
        networkId: 5,
        ens: {
            registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
        },
        explorers: [
            {
                name: 'etherscan-goerli',
                url: 'https://goerli.etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Optimism',
        chain: 'ETH',
        rpc: ['https://mainnet.optimism.io/'],
        faucets: [],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://optimism.io',
        shortName: 'oeth',
        chainId: 10,
        networkId: 10,
        explorers: [
            {
                name: 'etherscan',
                url: 'https://optimistic.etherscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Cronos Mainnet Beta',
        chain: 'CRO',
        rpc: ['https://evm.cronos.org', 'https://cronos-evm.publicnode.com'],
        features: [
            {
                name: 'EIP1559',
            },
        ],
        faucets: [],
        nativeCurrency: {
            name: 'Cronos',
            symbol: 'CRO',
            decimals: 18,
        },
        infoURL: 'https://cronos.org/',
        shortName: 'cro',
        chainId: 25,
        networkId: 25,
        explorers: [
            {
                name: 'Cronos Explorer',
                url: 'https://cronoscan.com',
                standard: 'none',
            },
        ],
    },
    {
        name: 'Binance Smart Chain Mainnet',
        chain: 'BSC',
        rpc: [
            'https://bsc-dataseed1.binance.org',
            'https://bsc-dataseed2.binance.org',
            'https://bsc-dataseed3.binance.org',
            'https://bsc-dataseed4.binance.org',
            'https://bsc-dataseed1.defibit.io',
            'https://bsc-dataseed2.defibit.io',
            'https://bsc-dataseed3.defibit.io',
            'https://bsc-dataseed4.defibit.io',
            'https://bsc-dataseed1.ninicoin.io',
            'https://bsc-dataseed2.ninicoin.io',
            'https://bsc-dataseed3.ninicoin.io',
            'https://bsc-dataseed4.ninicoin.io',
            'https://bsc.publicnode.com',
            'wss://bsc-ws-node.nariox.org',
        ],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'BNB',
            decimals: 18,
        },
        infoURL: 'https://www.binance.org',
        shortName: 'bnb',
        chainId: 56,
        networkId: 56,
        slip44: 714,
        explorers: [
            {
                name: 'bscscan',
                url: 'https://bscscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Binance Smart Chain Testnet',
        chain: 'BSC',
        rpc: [
            'https://data-seed-prebsc-1-s1.binance.org:8545',
            'https://data-seed-prebsc-2-s1.binance.org:8545',
            'https://data-seed-prebsc-1-s2.binance.org:8545',
            'https://data-seed-prebsc-2-s2.binance.org:8545',
            'https://data-seed-prebsc-1-s3.binance.org:8545',
            'https://data-seed-prebsc-2-s3.binance.org:8545',
            'https://bsc-testnet.publicnode.com',
        ],
        faucets: ['https://testnet.binance.org/faucet-smart'],
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'tBNB',
            decimals: 18,
        },
        infoURL: 'https://testnet.binance.org/',
        shortName: 'bnbt',
        chainId: 97,
        networkId: 97,
        explorers: [
            {
                name: 'bscscan-testnet',
                url: 'https://testnet.bscscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Polygon Mainnet',
        chain: 'Polygon',
        icon: 'polygon',
        rpc: [
            'https://polygon-rpc.com/',
            'https://rpc-mainnet.matic.network',
            'https://matic-mainnet.chainstacklabs.com',
            'https://rpc-mainnet.maticvigil.com',
            'https://rpc-mainnet.matic.quiknode.pro',
            'https://matic-mainnet-full-rpc.bwarelabs.com',
            'https://polygon-bor.publicnode.com',
        ],
        faucets: [],
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        infoURL: 'https://polygon.technology/',
        shortName: 'matic',
        chainId: 137,
        networkId: 137,
        slip44: 966,
        explorers: [
            {
                name: 'polygonscan',
                url: 'https://polygonscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Fantom Opera',
        chain: 'FTM',
        rpc: ['https://rpc.ftm.tools', 'https://fantom.publicnode.com'],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18,
        },
        infoURL: 'https://fantom.foundation',
        shortName: 'ftm',
        chainId: 250,
        networkId: 250,
        icon: 'fantom',
        explorers: [
            {
                name: 'ftmscan',
                url: 'https://ftmscan.com',
                icon: 'ftmscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Fantom Testnet',
        chain: 'FTM',
        rpc: ['https://rpc.testnet.fantom.network', 'https://fantom-testnet.publicnode.com'],
        faucets: ['https://faucet.fantom.network'],
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18,
        },
        infoURL: 'https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet',
        shortName: 'tftm',
        chainId: 4002,
        networkId: 4002,
        icon: 'fantom',
        explorers: [
            {
                name: 'ftmscan',
                url: 'https://testnet.ftmscan.com',
                icon: 'ftmscan',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Arbitrum One',
        chainId: 42161,
        shortName: 'arb1',
        chain: 'ETH',
        networkId: 42161,
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpc: [
            'https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}',
            'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
            'https://arb1.arbitrum.io/rpc',
        ],
        faucets: [],
        explorers: [
            {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
                standard: 'EIP3091',
            },
            {
                name: 'Arbitrum Explorer',
                url: 'https://explorer.arbitrum.io',
                standard: 'EIP3091',
            },
        ],
        infoURL: 'https://arbitrum.io',
        parent: {
            type: 'L2',
            chain: 'eip155-1',
            bridges: [
                {
                    url: 'https://bridge.arbitrum.io',
                },
            ],
        },
    },
    {
        name: 'Avalanche Fuji Testnet',
        chain: 'AVAX',
        icon: 'avax',
        rpc: ['https://api.avax-test.network/ext/bc/C/rpc', 'https://avalanche-fuji-c-chain.publicnode.com'],
        faucets: ['https://faucet.avax-test.network/'],
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
        },
        infoURL: 'https://cchain.explorer.avax-test.network',
        shortName: 'Fuji',
        chainId: 43113,
        networkId: 1,
        explorers: [
            {
                name: 'snowtrace',
                url: 'https://testnet.snowtrace.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Avalanche C-Chain',
        chain: 'AVAX',
        icon: 'avax',
        rpc: ['https://api.avax.network/ext/bc/C/rpc', 'https://avalanche-c-chain.publicnode.com'],
        features: [
            {
                name: 'EIP1559',
            },
        ],
        faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
        },
        infoURL: 'https://www.avax.network/',
        shortName: 'avax',
        chainId: 43114,
        networkId: 43114,
        slip44: 9005,
        explorers: [
            {
                name: 'snowtrace',
                url: 'https://snowtrace.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Mumbai',
        title: 'Polygon Testnet Mumbai',
        chain: 'Polygon',
        icon: 'polygon',
        rpc: [
            'https://matic-mumbai.chainstacklabs.com',
            'https://rpc-mumbai.maticvigil.com',
            'https://matic-testnet-archive-rpc.bwarelabs.com',
            'https://polygon-mumbai-bor.publicnode.com',
        ],
        faucets: ['https://faucet.polygon.technology/'],
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        infoURL: 'https://polygon.technology/',
        shortName: 'maticmum',
        chainId: 80001,
        networkId: 80001,
        explorers: [
            {
                name: 'polygonscan',
                url: 'https://mumbai.polygonscan.com',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Arbitrum Goerli',
        title: 'Arbitrum Goerli Rollup Testnet',
        chainId: 421613,
        shortName: 'arb-goerli',
        chain: 'ETH',
        networkId: 421613,
        nativeCurrency: {
            name: 'Arbitrum Goerli Ether',
            symbol: 'AGOR',
            decimals: 18,
        },
        rpc: ['https://goerli-rollup.arbitrum.io/rpc/'],
        faucets: [],
        infoURL: 'https://arbitrum.io/',
        explorers: [
            {
                name: 'Arbitrum Goerli Rollup Explorer',
                url: 'https://goerli-rollup-explorer.arbitrum.io',
                standard: 'EIP3091',
            },
        ],
        parent: {
            type: 'L2',
            chain: 'eip155-5',
            bridges: [
                {
                    url: 'https://bridge.arbitrum.io/',
                },
            ],
        },
    },
    {
        name: 'Sepolia',
        title: 'Ethereum Testnet Sepolia',
        chain: 'ETH',
        rpc: ['https://rpc.sepolia.org', 'https://rpc2.sepolia.org', 'https://rpc-sepolia.rockx.com'],
        faucets: ['http://fauceth.komputing.org?chain=11155111&address=${ADDRESS}'],
        nativeCurrency: {
            name: 'Sepolia Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        infoURL: 'https://sepolia.otterscan.io',
        shortName: 'sep',
        chainId: 11155111,
        networkId: 11155111,
        explorers: [
            {
                name: 'etherscan-sepolia',
                url: 'https://sepolia.etherscan.io',
                standard: 'EIP3091',
            },
            {
                name: 'otterscan-sepolia',
                url: 'https://sepolia.otterscan.io',
                standard: 'EIP3091',
            },
        ],
    },
    {
        name: 'Palm',
        chain: 'Palm',
        icon: 'palm',
        rpc: ['https://palm-mainnet.infura.io/v3/${INFURA_API_KEY}'],
        faucets: [],
        nativeCurrency: {
            name: 'PALM',
            symbol: 'PALM',
            decimals: 18,
        },
        infoURL: 'https://palm.io',
        shortName: 'palm',
        chainId: 11297108109,
        networkId: 11297108109,
        explorers: [
            {
                name: 'Palm Explorer',
                url: 'https://explorer.palm.io',
                standard: 'EIP3091',
            },
        ],
    },
];

var INVALID_VALUES = ['0x', '0x0', '0', 0];
var EvmChainParser = /** @class */ (function () {
    function EvmChainParser() {
    }
    EvmChainParser.parse = function (chain) {
        if (INVALID_VALUES.includes(chain)) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
            });
        }
        if (typeof chain === 'string') {
            if (chain.startsWith('0x')) {
                return chain;
            }
            try {
                var parsed = parseInt(chain, 10);
                if (Number.isNaN(parsed)) {
                    throw new Error('Cannot parse the provided string value to a valid chain number');
                }
                return "0x".concat(parsed.toString(16));
            }
            catch (error) {
                throw new CoreError({
                    code: CoreErrorCode.INVALID_ARGUMENT,
                    message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
                });
            }
        }
        if (chain <= 0) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: "Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'",
            });
        }
        return "0x".concat(chain.toString(16));
    };
    return EvmChainParser;
}());

/**
 * The EvmChain class is a MoralisData that references to a EVM chain
 * @category DataType
 */
var EvmChain = /** @class */ (function () {
    function EvmChain(value) {
        var _this = this;
        var _a;
        this._value = EvmChainParser.parse(value);
        this._chainlistData = (_a = chainList.find(function (chainData) { return chainData.chainId === _this.decimal; })) !== null && _a !== void 0 ? _a : null;
    }
    Object.defineProperty(EvmChain, "ETHEREUM", {
        /**
         * Returns ETHEREUM chain
         *
         * @example EvmChain.ETHEREUM
         */
        get: function () {
            return EvmChain.create(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "GOERLI", {
        /**
         * Returns GOERLI chain
         *
         * @example EvmChain.GOERLI
         */
        get: function () {
            return EvmChain.create(5);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "SEPOLIA", {
        /**
         * Returns SEPOLIA chain
         *
         * @example EvmChain.SEPOLIA
         */
        get: function () {
            return EvmChain.create(11155111);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "POLYGON", {
        /**
         * Returns POLYGON chain
         *
         * @example EvmChain.POLYGON
         */
        get: function () {
            return EvmChain.create(137);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "MUMBAI", {
        /**
         * Returns MUMBAI chain
         *
         * @example EvmChain.MUMBAI
         */
        get: function () {
            return EvmChain.create(80001);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "BSC", {
        /**
         * Returns BSC chain
         *
         * @example EvmChain.BSC
         */
        get: function () {
            return EvmChain.create(56);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "BSC_TESTNET", {
        /**
         * Returns BSC_TESTNET chain
         *
         * @example EvmChain.BSC_TESTNET
         */
        get: function () {
            return EvmChain.create(97);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "AVALANCHE", {
        /**
         * Returns AVALANCHE chain
         *
         * @example EvmChain.AVALANCHE
         */
        get: function () {
            return EvmChain.create(43114);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "AVALANCHE_TESTNET", {
        /**
         * Returns AVALANCHE_TESTNET chain
         *
         * @example EvmChain.AVALANCHE_TESTNET
         */
        get: function () {
            return EvmChain.create(0xa869);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "FANTOM", {
        /**
         * Returns FANTOM chain
         *
         * @example EvmChain.FANTOM
         */
        get: function () {
            return EvmChain.create(250);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "FANTOM_TESTNET", {
        /**
         * Returns FANTOM_TESTNET chain
         *
         * @example EvmChain.FANTOM_TESTNET
         */
        get: function () {
            return EvmChain.create(4002);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "CRONOS", {
        /**
         * Returns CRONOS chain
         *
         * @example EvmChain.CRONOS
         */
        get: function () {
            return EvmChain.create(25);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "PALM", {
        /**
         * Returns PALM chain
         *
         * @example EvmChain.PALM
         */
        get: function () {
            return EvmChain.create(11297108109);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "ARBITRUM", {
        /**
         * Returns ARBITRUM chain
         *
         * @example EvmChain.ARBITRUM
         */
        get: function () {
            return EvmChain.create(42161);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "ARBITRUM_TESTNET", {
        /**
         * Returns ARBITRUM_TESTNET chain
         *
         * @example EvmChain.ARBITRUM_TESTNET
         */
        get: function () {
            return EvmChain.create(421613);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "RONIN", {
        /**
         * Returns RONIN chain
         *
         * @example EvmChain.RONIN
         */
        get: function () {
            return EvmChain.create(2020);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain, "OPTIMISM", {
        /**
         * Returns OPTIMISM chain
         *
         * @example EvmChain.OPTIMISM
         */
        get: function () {
            return EvmChain.create(10);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new instance of EvmChain from any valid address input.
     *
     * @example
     * ```ts
     * const chain = EvmChain.create(1)
     * const chain = EvmChain.create("0x3")
     * ```
     */
    EvmChain.create = function (chain) {
        if (chain instanceof EvmChain) {
            return chain;
        }
        return new EvmChain(chain);
    };
    // Getter to return _chainlistData and throws an error if it is not defined
    EvmChain.prototype._getChainlistData = function () {
        if (!this._chainlistData) {
            return null;
        }
        return this._chainlistData;
    };
    /**
     * Compares if 2 chains are equal, based on the chainId
     *
     * @param chainA - The first chain to compare
     * @param chainB - The second chain to compare
     *
     * @returns true if the chains are equal, false otherwise
     * @example
     * ```ts
     * EvmChain.equals("1", "0x1")
     * ```
     */
    EvmChain.equals = function (chainA, chainB) {
        return EvmChain.create(chainA)._value === EvmChain.create(chainB)._value;
    };
    /**
     * @returns all the available chains
     */
    EvmChain.values = function () {
        return [
            EvmChain.ETHEREUM,
            EvmChain.GOERLI,
            EvmChain.SEPOLIA,
            EvmChain.POLYGON,
            EvmChain.MUMBAI,
            EvmChain.BSC,
            EvmChain.BSC_TESTNET,
            EvmChain.AVALANCHE,
            EvmChain.AVALANCHE_TESTNET,
            EvmChain.FANTOM,
            EvmChain.FANTOM_TESTNET,
            EvmChain.CRONOS,
            EvmChain.PALM,
            EvmChain.ARBITRUM,
            EvmChain.ARBITRUM_TESTNET,
            EvmChain.RONIN,
            EvmChain.OPTIMISM,
        ];
    };
    /**
     * Compares if the current chain is equal to the provided chain, based on the chainId
     * @param chain - The chain to compare to
     * @returns true if the chains are equal, false otherwise
     * @example
     * ```ts
     * chain.equals(EvmChain.ETHEREUM)
     * ```
     */
    EvmChain.prototype.equals = function (chain) {
        return EvmChain.equals(this, chain);
    };
    /**
     * Displays the chain hex-string representation of the chain and also the chain name if not null
     *
     * @example chain.display() // "Ethereum (0x1)" | "0x1"
     */
    EvmChain.prototype.display = function () {
        return this.name ? "".concat(this.name, " (").concat(this.hex, ")") : this.hex;
    };
    /**
     * This function returns the explorer url of a block, transaction, account or token.
     *
     * @param value - An object containing the `block`, `transaction`, `account` or `erc20` to get the explorer url for.
     *
     * @example chain.getExplorerUrl({ block: 'block_here' }) // "https://etherscan.io/block/block_here"
     * @example chain.getExplorerUrl({ transaction: 'some_transaction' }) // "https://etherscan.io/tx/some_transaction"
     * @example chain.getExplorerUrl({ account: 'accoun_here' }) // "https://etherscan.io/address/accoun_here"
     * @example chain.getExplorerUrl({ erc20: 'token_here' }) // "https://etherscan.io/token/token_here"
     */
    EvmChain.prototype.getExplorerPath = function (value) {
        var explorer = this.explorer;
        if (!explorer || explorer.standard !== 'EIP3091') {
            return null;
        }
        var url = explorer.url;
        // See https://eips.ethereum.org/EIPS/eip-3091 for paths
        if ('block' in value) {
            return "".concat(url, "/block/").concat(value.block);
        }
        if ('transaction' in value) {
            return "".concat(url, "/tx/").concat(value.transaction);
        }
        if ('account' in value) {
            return "".concat(url, "/address/").concat(value.account);
        }
        if ('erc20' in value) {
            return "".concat(url, "/token/").concat(value.erc20);
        }
        return null;
    };
    Object.defineProperty(EvmChain.prototype, "decimal", {
        /**
         * Returns the decimal representation of the chain
         * @example chain.decimal // 1
         */
        get: function () {
            return parseInt(this._value, 16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "hex", {
        /**
         * Returns the hex-string representation of the chain
         * @example chain.hex // "0x1"
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "apiHex", {
        /**
         * Validate and cast to api compatible hex
         *
         * @example chain.apiHex // "0x1"
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "name", {
        /**
         * Returns the name of the chain
         * @example chain.name // "Ethereum"
         */
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "currency", {
        /**
         * Returns the currency of the chain
         * @returns The cuurrency of the chain or undefined if not found
         *
         * @example chain.currency // EvmNativeCurrency
         */
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.nativeCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "rpcUrls", {
        /**
         * Returns the rpc Urls of the chain
         *
         * @example chain.rpcUrls // ["https://mainnet.infura.io/v3/<infura-key>"]
         */
        get: function () {
            var _a;
            return (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.rpc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmChain.prototype, "explorer", {
        /**
         * Returns the explorer Urls of the chain
         *
         * @example chain.explorerUrls // ["https://etherscan.io/"]
         */
        get: function () {
            var _a;
            var explorers = (_a = this._getChainlistData()) === null || _a === void 0 ? void 0 : _a.explorers;
            if (!explorers || explorers.length === 0) {
                return null;
            }
            return explorers[0];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the chain as a string.
     * @returns The chain.
     */
    EvmChain.prototype.toJSON = function () {
        return this.hex;
    };
    return EvmChain;
}());

/**
 * The Erc20Token class is a MoralisData that references to a Erc20 Token
 * It holds data about the data and metadata of an Erc20 token
 *
 * @category DataType
 */
var Erc20Token = /** @class */ (function () {
    function Erc20Token(value) {
        this._value = Erc20Token.parse(value);
    }
    /**
     *  Create a new instance of Erc20Token from any valid Erc20Token input
     *
     * @param value - the Erc20Tokenish type
     * @example
     * ```ts
     * const token = Erc20Token.create(value);
     * ```
     */
    Erc20Token.create = function (value) {
        if (value instanceof Erc20Token) {
            return value;
        }
        return new Erc20Token(value);
    };
    /**
     * Compares two Erc20Token instances. This checks if the chain and contractAddress of both tokens are equal.
     *
     * @param valueA - the first Erc20Token to compare
     * @param valueB - the second Erc20Token to compare
     * @returns true if the two Erc20Tokens are equal
     * @example
     * ```ts
     * Erc20Token.equals(valueA, valueB);
     * ```
     */
    Erc20Token.equals = function (valueA, valueB) {
        var erc20A = Erc20Token.create(valueA);
        var erc20B = Erc20Token.create(valueB);
        if (!erc20A._value.chain.equals(erc20B._value.chain)) {
            return false;
        }
        if (!erc20A._value.contractAddress.equals(erc20B._value.contractAddress)) {
            return false;
        }
        return true;
    };
    /**
     * Compares Erc20Token instance to current instance
     *
     * @param value - the Erc20Tokenish to compare
     * @returns true if the Erc20Token is equals given token
     * @example
     * ```ts
     * token.equals(value);
     * ```
     */
    Erc20Token.prototype.equals = function (value) {
        return Erc20Token.equals(this, value);
    };
    /**
     * Returns the token as JSON
     *
     * @returns the Erc20Token as a JSON object
     * @example
     * ```ts
     * token.toJSON();
     * ```
     */
    Erc20Token.prototype.toJSON = function () {
        var value = this._value;
        return __assign(__assign({}, value), { contractAddress: value.contractAddress.toJSON(), chain: value.chain.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Token.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Token.prototype, "result", {
        /**
         * Returns the processed Erc20Token.
         *
         * @returns the Erc20Token value
         * @example
         * ```ts
         * token.result;
         *  ```
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "decimals", {
        /**
         * @returns the decimals of the token.
         *
         * @example
         * ```ts
         * token.decimals;
         * ```
         */
        get: function () {
            return this._value.decimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "name", {
        /**
         * @returns The name of the token.
         *
         * @example
         * ```ts
         * token.name;
         * ```
         */
        get: function () {
            return this._value.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "symbol", {
        /**
         * @returns The symbol of the token.
         *
         * @example
         * ```ts
         * token.symbol;
         * ```
         */
        get: function () {
            return this._value.symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "contractAddress", {
        /**
         * @returns The contract address of the token.
         *
         * @example
         * ```ts
         * token.contractAddress;
         * ```
         */
        get: function () {
            return this._value.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "chain", {
        /**
         * @returns The chain of the token.
         *
         * @example
         * ```ts
         * token.chain;
         * ```
         */
        get: function () {
            return this._value.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "logo", {
        /**
         * @returns The logo of the token.
         *
         * @example
         * ```ts
         * token.logo;
         * ```
         */
        get: function () {
            return this._value.logo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "logoHash", {
        /**
         * @returns The logo hash of the token.
         *
         * @example
         * ```ts
         * token.logoHash;
         * ```
         */
        get: function () {
            return this._value.logoHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "thumbnail", {
        /**
         * @returns The thumbnail of the token.
         *
         * @example
         * ```ts
         * token.thumbnail;
         * ```
         */
        get: function () {
            return this._value.thumbnail;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Token.prototype, "possibleSpam", {
        /**
         * @returns possibility of the token being a spam token
         * @example transfer.possibleSpam // true
         */
        get: function () {
            return this._value.possibleSpam;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Token.parse = function (value) { return ({
        decimals: +value.decimals,
        name: value.name,
        symbol: value.symbol,
        contractAddress: EvmAddress.create(value.contractAddress),
        logo: maybe(value.logo),
        logoHash: maybe(value.logoHash),
        thumbnail: maybe(value.thumbnail),
        chain: EvmChain.create(value.chain),
        possibleSpam: value.possibleSpam,
    }); };
    return Erc20Token;
}());

/**
 * The Erc20Approval is a representation of an Erc20 token approval.
 *
 * @category DataType
 */
var Erc20Approval = /** @class */ (function () {
    function Erc20Approval(data) {
        this._data = Erc20Approval.parse(data);
    }
    /**
     * Create a new instance of Erc20Approval from any valid input
     * @param data -  Erc20Approval instance or valid Erc20ApprovalInput
     * @example
     * ```
     * const approval = Erc20Approval.create(data);
     *```
     */
    Erc20Approval.create = function (data) {
        if (data instanceof Erc20Approval) {
            return data;
        }
        return new Erc20Approval(data);
    };
    /**
     * Check the equality between two Erc20 approvals
     * @param dataA - The first approval to compare
     * @param dataB - The second approval to compare
     * @example Erc20Approval.equals(dataA, dataB)
     * @returns true if the approvals are equal, false otherwise
     */
    Erc20Approval.equals = function (dataA, dataB) {
        var approvalA = Erc20Approval.create(dataA);
        var approvalB = Erc20Approval.create(dataB);
        return JSON.stringify(approvalA.toJSON()) === JSON.stringify(approvalB.toJSON());
    };
    /**
     * Checks the equality of the current approval with another erc20 approval
     * @param data - the approval to compare with
     * @example approval.equals(data)
     * @returns true if the approvals are equal, false otherwise
     */
    Erc20Approval.prototype.equals = function (data) {
        return Erc20Approval.equals(this, data);
    };
    /**
     * @returns a JSON representation of the approval.
     * @example approval.toJSON()
     */
    Erc20Approval.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), contractAddress: data.contractAddress.toJSON(), blockNumber: data.blockNumber.toString(), toWallet: data.toWallet.toJSON(), fromWallet: data.fromWallet.toJSON(), value: data.value.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Approval.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Approval.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example approval.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "toWallet", {
        /**
         * @returns the toWallet of the approval
         * @example approval.toWallet // EvmAddress
         */
        get: function () {
            return this._data.toWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "fromWallet", {
        /**
         * @returns the fromWallet of the approval
         * @example approval.fromWallet // EvmAddress
         */
        get: function () {
            return this._data.fromWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "contractAddress", {
        /**
         * @returns the contractAddress of the approval
         * @example approval.contractAddress // EvmAddress
         */
        get: function () {
            return this._data.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "blockHash", {
        /**
         * @returns the block hash of the approval
         * @example approval.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "blockNumber", {
        /**
         * @returns the block number of the approval
         * @example approval.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the approval
         * @example approval.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "chain", {
        /**
         * @returns the chain of the approval
         * @example approval.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the approval
         * @example approval.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "value", {
        /**
         * @returns the value of the approval
         * @example approval.value // BigNumber
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "transactionIndex", {
        /**
         * @returns the transactionIndex of the approval
         * @example approval.transactionIndex // 3
         */
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "logIndex", {
        /**
         * @returns the logIndex of the approval
         * @example approval.logIndex // 2
         */
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "possibleSpam", {
        /**
         * @returns possibility of the token being a spam token
         * @example transfer.possibleSpam // true
         */
        get: function () {
            return this._data.possibleSpam;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "tokenName", {
        /**
         * @returns The name of the token.
         * @example burn.tokenName // "Kylin Network"
         */
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "tokenLogo", {
        /**
         * @returns The logo of the token
         * @example burn.tokenLogo // "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png"
         */
        get: function () {
            return this._data.tokenLogo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "tokenSymbol", {
        /**
         * @returns The symbol of the token.
         * @example burn.tokenSymbol // "KYL"
         */
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Approval.prototype, "tokenDecimals", {
        /**
         * @returns The decimals of the token.
         * @example burn.tokenDecimals // 18
         */
        get: function () {
            return this._data.tokenDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Approval.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), contractAddress: EvmAddress.create(data.contractAddress), fromWallet: EvmAddress.create(data.fromWallet), toWallet: EvmAddress.create(data.toWallet), blockTimestamp: dateInputToDate(data.blockTimestamp), blockNumber: BigNumber.create(data.blockNumber), value: BigNumber.create(data.value), transactionIndex: Number(data.transactionIndex), logIndex: Number(data.logIndex), tokenDecimals: Number(data.tokenDecimals) })); };
    return Erc20Approval;
}());

/**
 * The Erc20Burn is a representation of an Erc20 token burn.
 *
 * @category DataType
 */
var Erc20Burn = /** @class */ (function () {
    function Erc20Burn(data) {
        this._data = Erc20Burn.parse(data);
    }
    /**
     * Create a new instance of Erc20Burn from any valid input
     * @param data -  Erc20Burn instance or valid Erc20BurnInput
     * @example
     * ```
     * const burn = Erc20Burn.create(data);
     *```
     */
    Erc20Burn.create = function (data) {
        if (data instanceof Erc20Burn) {
            return data;
        }
        return new Erc20Burn(data);
    };
    /**
     * Check the equality between two Erc20 burns
     * @param dataA - The first burn to compare
     * @param dataB - The second burn to compare
     * @example Erc20Burn.equals(dataA, dataB)
     * @returns true if the burns are equal, false otherwise
     */
    Erc20Burn.equals = function (dataA, dataB) {
        var burnA = Erc20Burn.create(dataA);
        var burnB = Erc20Burn.create(dataB);
        return JSON.stringify(burnA.toJSON()) === JSON.stringify(burnB.toJSON());
    };
    /**
     * Checks the equality of the current burn with another erc20 burn
     * @param data - the burn to compare with
     * @example burn.equals(data)
     * @returns true if the burns are equal, false otherwise
     */
    Erc20Burn.prototype.equals = function (data) {
        return Erc20Burn.equals(this, data);
    };
    /**
     * @returns a JSON representation of the burn.
     * @example burn.toJSON()
     */
    Erc20Burn.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), contractAddress: data.contractAddress.toJSON(), blockNumber: data.blockNumber.toString(), fromWallet: data.fromWallet.toJSON(), value: data.value.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Burn.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Burn.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example burn.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "fromWallet", {
        /**
         * @returns the fromWallet of the burn
         * @example burn.fromWallet // EvmAddress
         */
        get: function () {
            return this._data.fromWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "contractAddress", {
        /**
         * @returns the contractAddress of the burn
         * @example burn.contractAddress // EvmAddress
         */
        get: function () {
            return this._data.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "blockHash", {
        /**
         * @returns the block hash of the burn
         * @example burn.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "blockNumber", {
        /**
         * @returns the block number of the burn
         * @example burn.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the burn
         * @example burn.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "chain", {
        /**
         * @returns the chain of the burn
         * @example burn.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the burn
         * @example burn.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "value", {
        /**
         * @returns the value of the burn
         * @example burn.value // BigNumber
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "transactionIndex", {
        /**
         * @returns the transactionIndex of the burn
         * @example burn.transactionIndex // 3
         */
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "logIndex", {
        /**
         * @returns the logIndex of the burn
         * @example burn.logIndex // 2
         */
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "tokenName", {
        /**
         * @returns The name of the token.
         * @example burn.tokenName // "Kylin Network"
         */
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "tokenLogo", {
        /**
         * @returns The logo of the token
         * @example burn.tokenLogo // "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png"
         */
        get: function () {
            return this._data.tokenLogo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "tokenSymbol", {
        /**
         * @returns The symbol of the token.
         * @example burn.tokenSymbol // "KYL"
         */
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Burn.prototype, "tokenDecimals", {
        /**
         * @returns The decimals of the token.
         * @example burn.tokenDecimals // 18
         */
        get: function () {
            return this._data.tokenDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Burn.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), contractAddress: EvmAddress.create(data.contractAddress), fromWallet: EvmAddress.create(data.fromWallet), blockTimestamp: dateInputToDate(data.blockTimestamp), blockNumber: BigNumber.create(data.blockNumber), value: BigNumber.create(data.value), transactionIndex: Number(data.transactionIndex), logIndex: Number(data.logIndex), tokenDecimals: Number(data.tokenDecimals) })); };
    return Erc20Burn;
}());

/**
 * The Erc20Mint is a representation of an Erc20 token mint.
 *
 * @category DataType
 */
var Erc20Mint = /** @class */ (function () {
    function Erc20Mint(data) {
        this._data = Erc20Mint.parse(data);
    }
    /**
     * Create a new instance of Erc20Mint from any valid input
     * @param data -  Erc20Mint instance or valid Erc20MintInput
     * @example
     * ```
     * const mint = Erc20Mint.create(data);
     *```
     */
    Erc20Mint.create = function (data) {
        if (data instanceof Erc20Mint) {
            return data;
        }
        return new Erc20Mint(data);
    };
    /**
     * Check the equality between two Erc20 mints
     * @param dataA - The first mint to compare
     * @param dataB - The second mint to compare
     * @example Erc20Mint.equals(dataA, dataB)
     * @returns true if the mints are equal, false otherwise
     */
    Erc20Mint.equals = function (dataA, dataB) {
        var mintA = Erc20Mint.create(dataA);
        var mintB = Erc20Mint.create(dataB);
        return JSON.stringify(mintA.toJSON()) === JSON.stringify(mintB.toJSON());
    };
    /**
     * Checks the equality of the current mint with another erc20 mint
     * @param data - the mint to compare with
     * @example mint.equals(data)
     * @returns true if the mints are equal, false otherwise
     */
    Erc20Mint.prototype.equals = function (data) {
        return Erc20Mint.equals(this, data);
    };
    /**
     * @returns a JSON representation of the mint.
     * @example mint.toJSON()
     */
    Erc20Mint.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), contractAddress: data.contractAddress.toJSON(), blockNumber: data.blockNumber.toString(), toWallet: data.toWallet.toJSON(), value: data.value.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Mint.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Mint.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example mint.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "toWallet", {
        /**
         * @returns the toWallet of the mint
         * @example mint.toWallet // EvmAddress
         */
        get: function () {
            return this._data.toWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "contractAddress", {
        /**
         * @returns the contractAddress of the mint
         * @example mint.contractAddress // EvmAddress
         */
        get: function () {
            return this._data.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "blockHash", {
        /**
         * @returns the block hash of the mint
         * @example mint.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "blockNumber", {
        /**
         * @returns the block number of the mint
         * @example mint.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the mint
         * @example mint.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "chain", {
        /**
         * @returns the chain of the mint
         * @example mint.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the mint
         * @example mint.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "value", {
        /**
         * @returns the value of the mint
         * @example mint.value // BigNumber
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "transactionIndex", {
        /**
         * @returns the transactionIndex of the mint
         * @example mint.transactionIndex // 3
         */
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "logIndex", {
        /**
         * @returns the logIndex of the mint
         * @example mint.logIndex // 2
         */
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "tokenName", {
        /**
         * @returns The name of the token.
         * @example burn.tokenName // "Kylin Network"
         */
        get: function () {
            return this._data.tokenName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "tokenLogo", {
        /**
         * @returns The logo of the token
         * @example burn.tokenLogo // "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png"
         */
        get: function () {
            return this._data.tokenLogo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "tokenSymbol", {
        /**
         * @returns The symbol of the token.
         * @example burn.tokenSymbol // "KYL"
         */
        get: function () {
            return this._data.tokenSymbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Mint.prototype, "tokenDecimals", {
        /**
         * @returns The decimals of the token.
         * @example burn.tokenDecimals // 18
         */
        get: function () {
            return this._data.tokenDecimals;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Mint.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), contractAddress: EvmAddress.create(data.contractAddress), toWallet: EvmAddress.create(data.toWallet), blockTimestamp: dateInputToDate(data.blockTimestamp), blockNumber: BigNumber.create(data.blockNumber), value: BigNumber.create(data.value), transactionIndex: Number(data.transactionIndex), logIndex: Number(data.logIndex), tokenDecimals: Number(data.tokenDecimals) })); };
    return Erc20Mint;
}());

/**
 * The Erc20Transaction is a representation of an Erc20 token transaction.
 *
 * @category DataType
 */
var Erc20Transaction = /** @class */ (function () {
    function Erc20Transaction(data) {
        this._data = Erc20Transaction.parse(data);
    }
    /**
     * Create a new instance of Erc20Transaction from any valid input
     * @param data - the Erc20Transactionish type
     * @example
     * ```
     * const transfer = Erc20Transaction.create(data);
     *```
     */
    Erc20Transaction.create = function (data) {
        if (data instanceof Erc20Transaction) {
            return data;
        }
        return new Erc20Transaction(data);
    };
    /**
     * Check the equality between two Erc20 transfers
     * @param dataA - The first transfer to compare
     * @param dataB - The second transfer to compare
     * @example Erc20Transaction.equals(dataA, dataB)
     * @returns true if the transfers are equal, false otherwise
     */
    Erc20Transaction.equals = function (dataA, dataB) {
        var tokenA = Erc20Transaction.create(dataA);
        var tokenB = Erc20Transaction.create(dataB);
        return JSON.stringify(tokenA.toJSON()) === JSON.stringify(tokenB.toJSON());
    };
    /**
     * Checks the equality of the current trnasfer with another erc20 trnasfer
     * @param data - the transfer to compare with
     * @example transfer.equals(data)
     * @returns true if the transfers are equal, false otherwise
     */
    Erc20Transaction.prototype.equals = function (data) {
        return Erc20Transaction.equals(this, data);
    };
    /**
     * @returns a JSON represention of the transfer.
     * @example transfer.toJSON()
     */
    Erc20Transaction.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), address: data.address.toJSON(), blockNumber: data.blockNumber.toString(), toAddress: data.toAddress.toJSON(), fromAddress: data.fromAddress.toJSON(), value: data.value.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Transaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(Erc20Transaction.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example transfer.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "address", {
        /**
         * @returns the contract address of the transfer
         * @example transfer.address // EvmAddress
         */
        get: function () {
            return this._data.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "contractAddress", {
        /**
         * @returns the contract address of the transfer
         * @example transfer.contractAddress // EvmAddress
         */
        // Used since /erc20/transfers endpoints that return toAddress under a different name
        get: function () {
            return this._data.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "blockHash", {
        /**
         * @returns the block hash of the transfer
         * @example transfer.blockHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "blockNumber", {
        /**
         * @returns the block number of the transfer
         * @example transfer.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the transfer
         * @example transfer.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "chain", {
        /**
         * @returns the chain of the transfer
         * @example transfer.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "fromAddress", {
        /**
         * @returns the from address of the transfer
         * @example transfer.fromAddress // EvmAddress
         */
        get: function () {
            return this._data.fromAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "fromWallet", {
        /**
         * @returns the from address of the transfer
         * @example transfer.fromWallet // EvmAddress
         */
        // Used since /erc20/transfers endpoints that return toAddress under a different name
        get: function () {
            return this._data.fromAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "toAddress", {
        /**
         * @returns the to address of the transfer
         * @example transfer.toAddress // EvmAddress
         */
        get: function () {
            return this._data.toAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "toWallet", {
        /**
         * @returns the to address of the transfer
         * @example transfer.toWallet // EvmAddress
         */
        // Used since /erc20/transfers endpoints that return toAddress under a different name
        get: function () {
            return this._data.toAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the transfer
         * @example transfer.transactionHash // "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "value", {
        /**
         * @returns the value of the transfer
         * @example transfer.value // BigNumber
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "transactionIndex", {
        /**
         * @returns the transactionIndex of the transfer
         * @example transfer.transactionIndex // 3
         */
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "logIndex", {
        /**
         * @returns the logIndex of the transfer
         * @example transfer.logIndex // 2
         */
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Transaction.prototype, "possibleSpam", {
        /**
         * @returns possibility of the token being a spam token
         * @example transfer.possibleSpam // true
         */
        get: function () {
            return this._data.possibleSpam;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Transaction.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), address: EvmAddress.create(data.address), blockTimestamp: dateInputToDate(data.blockTimestamp), blockNumber: BigNumber.create(data.blockNumber), toAddress: EvmAddress.create(data.toAddress), fromAddress: EvmAddress.create(data.fromAddress), value: BigNumber.create(data.value), transactionIndex: Number(data.transactionIndex), logIndex: Number(data.logIndex) })); };
    return Erc20Transaction;
}());

var EVM_ERC20_DEFAULT_DECIMALS = 18;
/**
 * The Erc20Value class is a MoralisData that references to a the value of an Erc20Token
 * It holds data about the data about the amount of tokens and the number of decimals.
 *
 * @category DataType
 */
var Erc20Value = /** @class */ (function () {
    function Erc20Value(amount, options) {
        var _this = this;
        var _a, _b, _c;
        /**
         * Displays the token in text format
         * @returns the value and also the token symbol if available
         * @example value.display();
         */
        this.display = function () {
            if (!_this._token) {
                return "".concat(_this.value);
            }
            return "".concat(_this.value, " ").concat(_this._token.symbol);
        };
        this._value = Erc20Value.parse({
            amount: amount,
            decimals: (_c = (_a = options === null || options === void 0 ? void 0 : options.decimals) !== null && _a !== void 0 ? _a : (_b = options === null || options === void 0 ? void 0 : options.token) === null || _b === void 0 ? void 0 : _b.decimals) !== null && _c !== void 0 ? _c : EVM_ERC20_DEFAULT_DECIMALS,
            token: options === null || options === void 0 ? void 0 : options.token,
        });
        if (options === null || options === void 0 ? void 0 : options.token) {
            this._token = Erc20Token.create(options.token);
        }
    }
    /**
     * Create a new instance of Erc20Value from any valid input
     * @param value - The value to create
     * @param options - The options for the token
     * @example Erc20Value.create(1000, { decimals: 3 });
     * @returns The created value
     * @throws CoreError if the value is invalid
     */
    Erc20Value.create = function (value, options) {
        if (value instanceof Erc20Value) {
            return value;
        }
        return new Erc20Value(value, options);
    };
    /**
     * Compares two Erc20Valueish instances.
     * @param valueA - The first value to compare
     * @param valueB - The second value to compare
     * @returns True if the values are equal
     * @example
     * ```ts
     * const valueA = Erc20Value.create(1000, { decimals: 3 });
     * const valueB = Erc20Value.create(10000, { decimals: 4 });
     * Erc20Value.equals(valueA, valueB); // true
     * ```
     */
    Erc20Value.equals = function (valueA, valueB) {
        var erc20ValueA = Erc20Value.create(valueA);
        var erc20ValueB = Erc20Value.create(valueB);
        return erc20ValueA.value === erc20ValueB.value;
    };
    /**
     * Compares Erc20Value with current instance.
     * @param value - The value to compare
     * @returns True if the values are equal
     * @example value.equals(valueA);
     */
    Erc20Value.prototype.equals = function (value) {
        return Erc20Value.equals(this, value);
    };
    /**
     * Convert the value to a number
     * @returns the value in number format
     * @example value.toNumber();
     */
    Erc20Value.prototype.toNumber = function () {
        return +this.value;
    };
    /**
     * Convert the value to a string
     * @returns the value in string format
     * @example value.toString();
     */
    Erc20Value.prototype.toString = function () {
        return this.value;
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    Erc20Value.prototype.format = function () {
        return this.toString();
    };
    /**
     * Displays the token in JSON format
     * @returns the value and also the token if available
     * @example value.toJSON();
     */
    Erc20Value.prototype.toJSON = function () {
        if (this.token) {
            return { value: this.value, token: this.token.toJSON() };
        }
        return { value: this.value };
    };
    Object.defineProperty(Erc20Value.prototype, "decimals", {
        /**
         * @returns the token decimals
         * @example value.decimals; // 15
         */
        get: function () {
            return this._value.decimals;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Value.prototype, "amount", {
        /**
         * @returns the token amount
         * @example value.amount; // BigNumber
         */
        get: function () {
            return this._value.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Value.prototype, "value", {
        /**
         * @returns the token value
         * @example value.value; // "1000"
         */
        get: function () {
            return this._value.amount.toDecimal(this.decimals);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Erc20Value.prototype, "token", {
        /**
         * @returns the token
         * @example value.token; // Erc20Token
         */
        get: function () {
            var _a;
            return (_a = this._token) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Erc20Value.parse = function (_a) {
        var amount = _a.amount, decimals = _a.decimals, token = _a.token;
        if (token && token.decimals && +token.decimals !== +decimals) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_DATA,
                message: 'Decimals do not match',
            });
        }
        return {
            amount: BigNumber.create(amount),
            decimals: +decimals,
        };
    };
    return Erc20Value;
}());

var unitToDecimals = {
    ether: 18,
    finney: 15,
    szabo: 12,
    gwei: 9,
    mwei: 6,
    kwei: 3,
    wei: 0,
};
/**
 * The EvmNative class is a MoralisData that references to the value of an EVM native currency (like ETH, BNB etc.)
 *
 * @category DataType
 */
var EvmNative = /** @class */ (function () {
    function EvmNative(native, unit) {
        if (unit === void 0) { unit = 'ether'; }
        this.rawValue = EvmNative.parse(native, unit);
    }
    Object.defineProperty(EvmNative, "ONE_ETH", {
        /**
         * Returns value of one ether.
         *
         * @example EvmNative.ONE_ETH
         */
        get: function () {
            return EvmNative.create(1, 'ether');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative, "ONE_GWEI", {
        /**
         * Returns value of one gwei.
         *
         * @example EvmNative.ONE_GWEI
         */
        get: function () {
            return EvmNative.create(1, 'gwei');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative, "ONE_WEI", {
        /**
         * Returns value of one wei.
         *
         * @example EvmNative.ONE_WEI
         */
        get: function () {
            return EvmNative.create(1, 'wei');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new instance of EvmNative from any valid {@link EvmNativeish} value.
     * @param native - the value to create the EvmNative from
     * @param unit - the unit of the value (optional), defaults to `ether`
     * @returns a new instance of EvmNative
     * @example
     * ```ts
     * const native = EvmNative.create(2, 'gwei');
     * const native = EvmNative.create(2);
     * const native = EvmNative.create(2, 'wei');
     *```
     */
    EvmNative.create = function (native, unit) {
        if (native instanceof EvmNative) {
            return native;
        }
        return new EvmNative(native, unit);
    };
    EvmNative.fromJSON = function (json) {
        return EvmNative.create(json, 'wei');
    };
    EvmNative.parse = function (native, unit) {
        var decimals;
        if (typeof unit === 'number') {
            decimals = unit;
        }
        else {
            if (unitToDecimals[unit] == null) {
                throw new CoreError({
                    code: CoreErrorCode.INVALID_ARGUMENT,
                    message: 'Unit should be a decimal number or valid EvmNativeUnit string',
                });
            }
            decimals = unitToDecimals[unit];
        }
        return BigNumber.fromDecimal(native.toString(), decimals);
    };
    /**
     * Compares two EvmNative values.
     * @param valueA - the first value to compare
     * @param valueB - the second value to compare
     * @returns true if the values are equal
     * @example
     * ```ts
     * EvmNative.equals(EvmNative.create(1, 'ether'), EvmNative.create(1, 'ether')); // true
     * ```
     */
    EvmNative.equals = function (valueA, valueB) {
        var evmNativeA = EvmNative.create(valueA);
        var evmNativeB = EvmNative.create(valueB);
        return evmNativeA.rawValue.equals(evmNativeB.rawValue);
    };
    /**
     * Compares EvmNative with current instance.
     * @param value - the value to compare with
     * @returns true if the values are equal
     * @example
     * ```ts
     * const native = EvmNative.create(1, 'gwei');
     * native.equals(EvmNative.create(1, 'ether')); // false
     * ```
     */
    EvmNative.prototype.equals = function (value) {
        return EvmNative.equals(this, value);
    };
    /**
     * Converts the EvmNative to a string.
     * @returns the value of the EvmNative as a string
     * @example `native.toString()`
     */
    EvmNative.prototype.toString = function () {
        return this.wei;
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmNative.prototype.format = function () {
        return this.toString();
    };
    Object.defineProperty(EvmNative.prototype, "value", {
        /**
         * @returns the value of the EvmNative as a BigNumber
         * @example `native.value`
         */
        get: function () {
            return this.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "wei", {
        /**
         * Converts the EvmNative to a string representation of the value in wei.
         * @returns the value of the EvmNative as a string
         * @example `native.wei`
         */
        get: function () {
            return this.value.toString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "gwei", {
        /**
         * Converts the EvmNative to a string representation of the value in gwei.
         * @returns the value of the EvmNative as a string
         * @example `native.gwei`
         */
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['gwei']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNative.prototype, "ether", {
        /**
         * Converts the EvmNative to a string representation of the value in ether.
         * @returns the value of the EvmNative as a string
         * @example `native.ether`
         */
        get: function () {
            return this.rawValue.toDecimal(unitToDecimals['ether']);
        },
        enumerable: false,
        configurable: true
    });
    EvmNative.prototype.toJSON = function () {
        return this.toString();
    };
    return EvmNative;
}());

/**
 * The EvmTransactionLog class is a MoralisData that references an EVM transaction log.
 *
 * @category DataType
 */
var EvmTransactionLog = /** @class */ (function () {
    function EvmTransactionLog(value) {
        this._value = EvmTransactionLog.parse(value);
    }
    /**
     * Create a new instance of EvmTransactionLog from any valid address input
     *
     * @example
     * ```
     * const log = EvmTransactionLog.create(value, core);
     * ```
     * @param value - A valid EvmTransactionLogish
     * @param core - The Core instance
     */
    EvmTransactionLog.create = function (value) {
        if (value instanceof EvmTransactionLog) {
            return value;
        }
        return new EvmTransactionLog(value);
    };
    EvmTransactionLog.parse = function (value) {
        return {
            chain: EvmChain.create(value.chain),
            logIndex: maybe(value.logIndex, function (index) { return +index; }),
            transactionHash: value.transactionHash,
            transactionIndex: maybe(value.transactionIndex),
            data: value.data,
            topics: value.topics,
            blockHash: value.blockHash,
            blockNumber: value.blockNumber,
            blockTimestamp: value.blockTimestamp,
            address: EvmAddress.create(value.address),
        };
    };
    /**
     * Compares the log to another log for equality.
     *
     * @param value - The value to compare with
     * @returns true if the logs are equal, otherwise false
     * @example
     * ```ts
     * log.equals(log);
     * ```
     */
    EvmTransactionLog.prototype.equals = function (value) {
        return (value._value.transactionHash === this._value.transactionHash &&
            value._value.address.equals(this._value.address) &&
            value._value.logIndex === this._value.logIndex &&
            value._value.chain.equals(this._value.chain));
    };
    /**
     * Converts the log to a JSON object.
     *
     * @returns the EvmTransactionLog as a JSON object
     * @example
     * ```ts
     * log.toJSON();
     * ```
     */
    EvmTransactionLog.prototype.toJSON = function () {
        var value = this._value;
        return __assign(__assign({}, value), { address: value.address.toJSON(), chain: value.chain.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmTransactionLog.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmTransactionLog.prototype, "result", {
        /**
         * Returns the processed Erc20Token.
         *
         * @returns the EvmTransactionLog value
         * @example
         * ```ts
         * log.result;
         *  ```
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the log.
         *
         * @example
         * ```ts
         * log.transactionHash; // "0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5"
         * ```
         */
        get: function () {
            return this._value.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "address", {
        /**
         * Returns the address of the log.
         *
         * @example
         * ```ts
         * log.address; // EvmAddress
         * ```
         */
        get: function () {
            return this._value.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "chain", {
        /**
         * Returns the chain of the log.
         *
         * @example
         * ```ts
         * log.chain; // EvmChain
         * ```
         */
        get: function () {
            return this._value.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "logIndex", {
        /**
         * @returns the log index of the log.
         *
         * @example
         * ```ts
         * log.logIndex; // 273
         * ```
         */
        get: function () {
            return this._value.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "data", {
        /**
         * @returns the data of the log.
         *
         * @example
         * ```ts
         * log.data; // "0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443"
         * ```
         */
        get: function () {
            return this._value.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "topics", {
        /**
         * @returns the topics of the log.
         *
         * @example
         * ```ts
         * log.topic0; // ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002"]
         * ```
         */
        get: function () {
            return this._value.topics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "blockHash", {
        /**
         * @returns the block hash of the log.
         *
         * @example
         * ```ts
         * log.blockHash; // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
         * ```
         */
        get: function () {
            return this._value.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "blockNumber", {
        /**
         * @returns the block number of the log.
         *
         * @example
         * ```ts
         * log.blockNumber; // 12386788
         * ```
         */
        get: function () {
            return this._value.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionLog.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the log.
         *
         * @example
         * ```ts
         * log.blockTimestamp; // "2021-05-07T11:08:35.000Z"
         * ```
         */
        get: function () {
            return this._value.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransactionLog;
}());

/**
 * Represents of a signed EVM signature
 * Can be created with a valid r,s,v signature or a hex string
 */
var EvmSignature = /** @class */ (function () {
    function EvmSignature(data) {
        this._data = EvmSignature.parse(data);
    }
    EvmSignature.create = function (data) {
        if (data instanceof EvmSignature) {
            return data;
        }
        return new EvmSignature(data);
    };
    EvmSignature.equals = function (dataA, dataB) {
        var signatureA = EvmSignature.create(dataA);
        var signatureB = EvmSignature.create(dataB);
        return signatureA.serialized === signatureB.serialized;
    };
    /**
     * Checks the equality of the current transfer instance with another nft transfer
     * @param data - the transfer to compare with
     * @example transaction.equals(data)
     * @returns true if the transfers are equal, false otherwise
     */
    EvmSignature.prototype.equals = function (data) {
        return EvmSignature.equals(this, data);
    };
    Object.defineProperty(EvmSignature.prototype, "r", {
        get: function () {
            return this._data.r;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSignature.prototype, "s", {
        get: function () {
            return this._data.s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSignature.prototype, "v", {
        get: function () {
            return this._data.v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSignature.prototype, "serialized", {
        get: function () {
            return joinSignature(this._data);
        },
        enumerable: false,
        configurable: true
    });
    EvmSignature.prototype.toJSON = function () {
        return {
            r: this.r,
            s: this.s,
            v: this.v.toString(),
        };
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmSignature.prototype.format = function () {
        return this.serialized;
    };
    EvmSignature.parse = function (data) {
        if (typeof data === 'string') {
            return splitSignature(data);
        }
        return splitSignature({
            r: hexlify(BigNumber.create(data.r).toBigInt()),
            s: hexlify(BigNumber.create(data.s).toBigInt()),
            v: +data.v,
        });
    };
    return EvmSignature;
}());

/**
 * The EvmTranaction is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
var EvmInternalTransaction = /** @class */ (function () {
    function EvmInternalTransaction(data) {
        this._data = EvmInternalTransaction.parse(data);
    }
    /**
     * Create a new instance of EvmInternalTransaction from any valid transaction input
     * @param data - the EvmInternalTransactionish type
     * @example
     * ```
     * const transaction = EvmInternalTransaction.create(data);
     *```
     */
    EvmInternalTransaction.create = function (data) {
        if (data instanceof EvmInternalTransaction) {
            return data;
        }
        return new EvmInternalTransaction(data);
    };
    /**
     * Check the equality between two Evm internal transactions
     * @param dataA - The first transaction
     * @param dataB - The second transaction
     * @example
     * ```ts
     * EvmInternalTransaction.equals(dataA, dataB)
     * ```
     */
    EvmInternalTransaction.equals = function (dataA, dataB) {
        var transactionA = EvmInternalTransaction.create(dataA);
        var transactionB = EvmInternalTransaction.create(dataB);
        if (!transactionA._data.chain.equals(transactionB._data.chain)) {
            return false;
        }
        if (transactionA._data.transactionHash !== transactionB._data.transactionHash) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current transaction with another evm transaction
     * @param data - the transaction to compare with
     * @example
     * ```ts
     * transaction.equals(data)
     * ```
     */
    EvmInternalTransaction.prototype.equals = function (data) {
        return EvmInternalTransaction.equals(this, data);
    };
    EvmInternalTransaction.prototype.toJSON = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var data = this._data;
        return __assign(__assign({}, data), { to: (_a = data.to) === null || _a === void 0 ? void 0 : _a.toJSON(), from: (_b = data.from) === null || _b === void 0 ? void 0 : _b.toJSON(), gas: (_c = data.gas) === null || _c === void 0 ? void 0 : _c.toString(), gasUsed: (_d = data.gasUsed) === null || _d === void 0 ? void 0 : _d.toString(), value: (_e = data.value) === null || _e === void 0 ? void 0 : _e.toString(), chain: (_f = data.chain) === null || _f === void 0 ? void 0 : _f.toJSON(), blockNumber: (_g = data.blockNumber) === null || _g === void 0 ? void 0 : _g.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmInternalTransaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmInternalTransaction.prototype, "result", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "transactionHash", {
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "blockNumber", {
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "blockHash", {
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "type", {
        get: function () {
            return this._data.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "from", {
        get: function () {
            return this._data.from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "to", {
        get: function () {
            return this._data.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "value", {
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "gas", {
        get: function () {
            return this._data.gas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "gasUsed", {
        get: function () {
            return this._data.gasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "input", {
        get: function () {
            return this._data.input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmInternalTransaction.prototype, "output", {
        get: function () {
            return this._data.output;
        },
        enumerable: false,
        configurable: true
    });
    EvmInternalTransaction.parse = function (data) { return ({
        chain: EvmChain.create(data.chain),
        from: EvmAddress.create(data.from),
        to: EvmAddress.create(data.to),
        transactionHash: data.transactionHash,
        gas: BigNumber.create(data.gas),
        gasUsed: BigNumber.create(data.gasUsed),
        blockNumber: BigNumber.create(data.blockNumber),
        blockHash: data.blockHash,
        input: data.input,
        output: data.output,
        value: BigNumber.create(data.value),
        type: data.type,
    }); };
    return EvmInternalTransaction;
}());

/**
 * The EvmTransaction is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
var EvmTransaction = /** @class */ (function () {
    function EvmTransaction(data) {
        this._data = EvmTransaction.parse(data);
    }
    /**
     * Create a new instance of EvmTransaction from any valid transaction input
     * @param data - the EvmTransactionish type
     * @example
     * ```
     * const transaction = EvmTransaction.create(data);
     *```
     */
    EvmTransaction.create = function (data) {
        if (data instanceof EvmTransaction) {
            return data;
        }
        return new EvmTransaction(data);
    };
    EvmTransaction.parse = function (data) {
        var _a, _b;
        return {
            from: EvmAddress.create(data.from),
            to: maybe(data.to, function (to) { return EvmAddress.create(to); }),
            nonce: maybe(data.nonce, BigNumber.create),
            data: maybe(data.data),
            value: maybe(data.value, function (val) { return EvmNative.create(val, 'wei'); }),
            hash: data.hash,
            chain: EvmChain.create(data.chain),
            gas: maybe(data.gas, BigNumber.create),
            gasPrice: BigNumber.create(data.gasPrice),
            index: +data.index,
            blockNumber: BigNumber.create(data.blockNumber),
            blockHash: data.blockHash,
            blockTimestamp: dateInputToDate(data.blockTimestamp),
            cumulativeGasUsed: BigNumber.create(data.cumulativeGasUsed),
            gasUsed: BigNumber.create(data.gasUsed),
            contractAddress: maybe(data.contractAddress, function (address) { return EvmAddress.create(address); }),
            receiptRoot: maybe(data.receiptRoot),
            receiptStatus: maybe(data.receiptStatus, function (status) { return +status; }),
            logs: ((_a = data.logs) !== null && _a !== void 0 ? _a : []).map(function (log) { return EvmTransactionLog.create(log); }),
            internalTransactions: ((_b = data.internalTransactions) !== null && _b !== void 0 ? _b : []).map(function (transaction) {
                return EvmInternalTransaction.create(transaction);
            }),
            signature: maybe(data.signature, EvmSignature.create),
        };
    };
    /**
     * Check the equality between two Evm transactions
     * @param dataA - The first transaction
     * @param dataB - The second transaction
     * @example
     * ```ts
     * EvmTransaction.equals(dataA, dataB)
     * ```
     */
    EvmTransaction.equals = function (dataA, dataB) {
        var transactionA = EvmTransaction.create(dataA);
        var transactionB = EvmTransaction.create(dataB);
        if (!transactionA._data.chain.equals(transactionB._data.chain)) {
            return false;
        }
        if (transactionA._data.hash !== transactionB._data.hash) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current transaction with another evm transaction
     * @param data - the transaction to compare with
     * @example
     * ```ts
     * transaction.equals(data)
     * ```
     */
    EvmTransaction.prototype.equals = function (data) {
        return EvmTransaction.equals(this, data);
    };
    EvmTransaction.prototype.toJSON = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var data = this._data;
        return __assign(__assign({}, data), { to: (_a = data.to) === null || _a === void 0 ? void 0 : _a.toJSON(), from: (_b = data.from) === null || _b === void 0 ? void 0 : _b.toJSON(), nonce: (_c = data.nonce) === null || _c === void 0 ? void 0 : _c.toString(), gas: (_d = data.gas) === null || _d === void 0 ? void 0 : _d.toString(), gasPrice: (_e = data.gasPrice) === null || _e === void 0 ? void 0 : _e.toString(), gasUsed: (_f = data.gasUsed) === null || _f === void 0 ? void 0 : _f.toString(), cumulativeGasUsed: (_g = data.cumulativeGasUsed) === null || _g === void 0 ? void 0 : _g.toString(), value: (_h = data.value) === null || _h === void 0 ? void 0 : _h.toString(), chain: (_j = data.chain) === null || _j === void 0 ? void 0 : _j.toJSON(), contractAddress: (_k = data.contractAddress) === null || _k === void 0 ? void 0 : _k.toJSON(), logs: data.logs.map(function (log) { return log.toJSON(); }), internalTransactions: data.internalTransactions.map(function (transaction) { return transaction.toJSON(); }), signature: (_l = data.signature) === null || _l === void 0 ? void 0 : _l.toJSON(), blockNumber: (_m = data.blockNumber) === null || _m === void 0 ? void 0 : _m.toString(), blockTimestamp: data.blockTimestamp.toString() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmTransaction.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmTransaction.prototype, "result", {
        /**
         * @returns the transaction
         * @example
         * ```
         * transaction.result
         * ```
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "to", {
        /**
         * @returns the transaction to address
         * @example
         * ```
         * transaction.to // EvmAddress
         * ```
         */
        get: function () {
            return this._data.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "from", {
        /**
         * @returns the transaction from address
         * @example
         * ```
         * transaction.address // EvmAddress
         * ```
         */
        get: function () {
            return this._data.from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "nonce", {
        /**
         * @returns the transaction nonce
         * @example
         * ```
         * transaction.nonce // 326595425
         * ```
         */
        get: function () {
            return this._data.nonce;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "gas", {
        /**
         * @returns the transaction gas
         * @example
         * ```
         * transaction.gas // 6721975
         * ```
         */
        get: function () {
            return this._data.gas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "gasPrice", {
        /**
         * @returns the transaction gas price
         * @example
         * ```
         * transaction.gasPrice // 20000000000
         * ```
         */
        get: function () {
            return this._data.gasPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "gasUsed", {
        /**
         * @returns the transaction gas used
         * @example
         * ```
         * transaction.gasUsed // 1340925
         * ```
         */
        get: function () {
            return this._data.gasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "cumulativeGasUsed", {
        /**
         * @returns the transaction cumulative gas used
         * @example
         * ```
         * transaction.cumulativeGasUsed // 1340925
         * ```
         */
        get: function () {
            return this._data.cumulativeGasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "blockNumber", {
        /**
         * @returns the transaction block number
         * @example
         * ```
         * transaction.blockNumber // 12526958
         * ```
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "value", {
        /**
         * @returns the transaction value
         * @example
         * ```
         * transaction.value // EvmNative
         * ```
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "chain", {
        /**
         * @returns the transaction chain
         * @example
         * ```
         * transaction.chain // EvmChain
         * ```
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "contractAddress", {
        /**
         * @returns the transaction contract address
         * @example
         * ```
         * transaction.contractAddress // EvmAddress
         * ```
         */
        get: function () {
            return this._data.contractAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "internalTransactions", {
        /**
         * @returns the internal transactions
         * @example
         * ```
         * transaction.logs // EvmInternalTransaction[]
         * ```
         */
        get: function () {
            return this._data.internalTransactions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "logs", {
        /**
         * @returns the transaction logs
         * @example
         * ```
         * transaction.logs // EvmTransactionLog[]
         * ```
         */
        get: function () {
            return this._data.logs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "receiptRoot", {
        /**
         * @returns the transaction receipt root
         * @example
         * ```
         * transaction.receiptRoot // string
         * ```
         */
        get: function () {
            return this._data.receiptRoot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "receiptStatus", {
        /**
         * @returns the transaction receipt status
         * @example
         * ```
         * transaction.receiptStatus // 1
         * ```
         */
        get: function () {
            return this._data.receiptStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "data", {
        /**
         * @returns the transaction data
         * @example
         * ```
         * transaction.data // 0x000000000000000000000000000000000000000000000000000000000000002
         * ```
         */
        get: function () {
            return this._data.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "hash", {
        /**
         * @returns the transaction hash
         * @example
         * ```
         * transaction.hash // 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
         * ```
         */
        get: function () {
            return this._data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "blockHash", {
        /**
         * @returns the transaction black hash
         * @example
         * ```
         * transaction.blockHash // 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
         * ```
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "blockTimestamp", {
        /**
         * @returns the transaction block timestamp
         * @example
         * ```
         * transaction.blockTimestamp // Date
         * ```
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "signature", {
        /**
         * @returns the signature (if available)
         * @example
         * ```
         * transaction.signature // EvmSignature
         * ```
         */
        get: function () {
            return this._data.signature;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "index", {
        /**
         * @returns the index
         * @example
         * ```
         * transaction.index // 1
         * ```
         */
        get: function () {
            return this._data.index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "v", {
        get: function () {
            var _a;
            return (_a = this._data.signature) === null || _a === void 0 ? void 0 : _a.v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "r", {
        get: function () {
            var _a;
            return (_a = this._data.signature) === null || _a === void 0 ? void 0 : _a.r;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransaction.prototype, "s", {
        get: function () {
            var _a;
            return (_a = this._data.signature) === null || _a === void 0 ? void 0 : _a.s;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransaction;
}());

/**
 * The EvmSimpleBlock is a representation of a block.
 *
 * @category DataType
 */
var EvmSimpleBlock = /** @class */ (function () {
    function EvmSimpleBlock(data) {
        this._data = EvmSimpleBlock.parse(data);
    }
    /**
     * Create a new instance of EvmSimpleBlock from any valid transaction input
     * @param data - the EvmSimpleBlockish type
     * @example const transaction = EvmSimpleBlock.create(data);
     */
    EvmSimpleBlock.create = function (data) {
        if (data instanceof EvmSimpleBlock) {
            return data;
        }
        return new EvmSimpleBlock(data);
    };
    /**
     * Check the equality between two Evm blocks. It compares their hashes and blocks.
     * @param dataA - The first block to compare
     * @param dataB - The second block to compare
     * @example EvmSimpleBlock.equals(dataA, dataB)
     */
    EvmSimpleBlock.equals = function (dataA, dataB) {
        var blockA = EvmSimpleBlock.create(dataA);
        var blockB = EvmSimpleBlock.create(dataB);
        if (!blockA.chain.equals(blockB.chain)) {
            return false;
        }
        if (blockA.hash !== blockB.hash) {
            return false;
        }
        if (!blockA.number.equals(blockB.number)) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current block with another evm block
     * @param data - the block to compare with
     * @example
     * ```ts
     * block.equals(data)
     * ```
     */
    EvmSimpleBlock.prototype.equals = function (data) {
        return EvmSimpleBlock.equals(this, data);
    };
    /**
     * @returns a JSON represention of the block.
     * @example
     * ```
     * block.toJSON()
     * ```
     */
    EvmSimpleBlock.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { number: data.number.toString(), chain: data.chain.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmSimpleBlock.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmSimpleBlock.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example block.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSimpleBlock.prototype, "number", {
        /**
         * @returns the block number.
         * @example block.number // BigNumber
         */
        get: function () {
            return this._data.number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSimpleBlock.prototype, "hash", {
        /**
         * @returns the block hash.
         * @example block.hash // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
         */
        get: function () {
            return this._data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSimpleBlock.prototype, "timestamp", {
        /**
         * @returns the block timestamp.
         * @example block.timestamp // Date
         */
        get: function () {
            return this._data.timestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmSimpleBlock.prototype, "chain", {
        /**
         * @returns the block chain.
         * @example block.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    EvmSimpleBlock.parse = function (data) { return ({
        timestamp: dateInputToDate(data.timestamp),
        number: BigNumber.create(data.number),
        chain: EvmChain.create(data.chain),
        hash: data.hash,
    }); };
    return EvmSimpleBlock;
}());

/**
 * The EvmBlock is a representation of a block.
 *
 * @category DataType
 */
var EvmBlock = /** @class */ (function () {
    function EvmBlock(data) {
        this._data = EvmBlock.parse(data);
    }
    /**
     * Create a new instance of EvmBlock from any valid transaction input
     * @param data - the EvmBlockish type
     * @example const transaction = EvmTransaction.create(data);
     */
    EvmBlock.create = function (data) {
        if (data instanceof EvmBlock) {
            return data;
        }
        return new EvmBlock(data);
    };
    /**
     * Check the equality between two Evm blocks. It compares their hashes and blocks.
     * @param dataA - The first block to compare
     * @param dataB - The second block to compare
     * @example EvmTransaction.equals(dataA, dataB)
     */
    EvmBlock.equals = function (dataA, dataB) {
        var blockA = EvmSimpleBlock.create(dataA);
        var blockB = EvmSimpleBlock.create(dataB);
        if (!blockA.chain.equals(blockB.chain)) {
            return false;
        }
        if (blockA.hash !== blockB.hash) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current block with another evm block
     * @param data - the block to compare with
     * @example
     * ```ts
     * block.equals(data)
     * ```
     */
    EvmBlock.prototype.equals = function (data) {
        return EvmBlock.equals(this, data);
    };
    /**
     * @returns a JSON represention of the block.
     * @example
     * ```
     * block.toJSON()
     * ```
     */
    EvmBlock.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { number: data.number.toString(), difficulty: data.difficulty.toString(), totalDifficulty: data.totalDifficulty.toString(), size: data.size.toString(), gasLimit: data.gasLimit.toString(), gasUsed: data.gasUsed.toString(), chain: data.chain.toJSON(), miner: data.miner.toJSON(), transactions: data.transactions.map(function (transaction) { return transaction.toJSON(); }) });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmBlock.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmBlock.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example block.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "number", {
        /**
         * @returns the block number.
         * @example block.number // BigNumber
         */
        get: function () {
            return this._data.number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "hash", {
        /**
         * @returns the block hash.
         * @example block.hash // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
         */
        get: function () {
            return this._data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "timestamp", {
        /**
         * @returns the block timestamp.
         * @example block.timestamp // Date
         */
        get: function () {
            return this._data.timestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "miner", {
        /**
         * @returns the block miner.
         * @example block.miner // EvmAddress
         */
        get: function () {
            return this._data.miner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "difficulty", {
        /**
         * @returns the block difficulty.
         * @example block.difficulty // BigNumber
         */
        get: function () {
            return this._data.difficulty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "totalDifficulty", {
        /**
         * @returns the block total difficulty.
         * @example block.totalDifficulty // BigNumber
         */
        get: function () {
            return this._data.totalDifficulty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "size", {
        /**
         * @returns the block size.
         * @example block.size // BigNumber
         */
        get: function () {
            return this._data.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "gasLimit", {
        /**
         * @returns the block gas limit.
         * @example block.gasLimit // BigNumber
         */
        get: function () {
            return this._data.gasLimit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "gasUsed", {
        /**
         * @returns the block gas used.
         * @example block.gasUsed // BigNumber
         */
        get: function () {
            return this._data.gasUsed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "transactions", {
        /**
         * @returns the block transactions.
         * @example block.transactions // EvmTransaction[]
         */
        get: function () {
            return this._data.transactions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "chain", {
        /**
         * @returns the block chain.
         * @example block.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "transactionCount", {
        /**
         * @returns the block transaction count.
         * @example block.transactionCount // 252
         */
        get: function () {
            return this._data.transactionCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "transactionsRoot", {
        /**
         * @returns the block transactions root.
         * @example block.transactionsRoot // "0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27"
         */
        get: function () {
            return this._data.transactionsRoot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "stateRoot", {
        /**
         * @returns the block state root.
         * @example block.stateRoot // "0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b"
         */
        get: function () {
            return this._data.stateRoot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "receiptsRoot", {
        /**
         * @returns the block receipts root.
         * @example block.receiptsRoot // "0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23"
         */
        get: function () {
            return this._data.receiptsRoot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "logsBloom", {
        /**
         * @returns the block logs bloom.
         * @example block.logsBloom // "0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf"
         */
        get: function () {
            return this._data.logsBloom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "extraData", {
        /**
         * @returns the block extra data.
         * @example block.extraData // "0x65746865726d696e652d6575726f70652d7765737433"
         */
        get: function () {
            return this._data.extraData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "parentHash", {
        /**
         * @returns the block parent hash.
         * @example block.parentHash // "0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045"
         */
        get: function () {
            return this._data.parentHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "sha3Uncles", {
        /**
         * @returns the block sha3Uncles.
         * @example block.sha3Uncles // "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347"
         */
        get: function () {
            return this._data.sha3Uncles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlock.prototype, "nonce", {
        /**
         * @returns the block nonce.
         * @example block.nonce // "0xedeb2d8fd2b2bdec"
         */
        get: function () {
            return this._data.nonce;
        },
        enumerable: false,
        configurable: true
    });
    EvmBlock.parse = function (data) { return (__assign(__assign({}, data), { miner: EvmAddress.create(data.miner), timestamp: dateInputToDate(data.timestamp), number: BigNumber.create(data.number), difficulty: BigNumber.create(data.difficulty), totalDifficulty: BigNumber.create(data.totalDifficulty), size: BigNumber.create(data.size), gasLimit: BigNumber.create(data.gasLimit), gasUsed: BigNumber.create(data.gasUsed), transactions: data.transactions.map(function (transaction) { return EvmTransaction.create(transaction); }), chain: EvmChain.create(data.chain), transactionCount: +data.transactionCount })); };
    return EvmBlock;
}());

var EvmBlockDate = /** @class */ (function () {
    function EvmBlockDate(data) {
        this.data = data;
    }
    /**
     * Create a new instance of EvmBlockDate.
     * @param data - the EvmBlockDateish type.
     */
    EvmBlockDate.create = function (data) {
        if (data instanceof EvmBlockDate) {
            return data;
        }
        return new EvmBlockDate(EvmBlockDate.parse(data));
    };
    EvmBlockDate.parse = function (input) {
        return {
            block: input.block,
            date: new Date(input.date),
            timestamp: input.timestamp,
            // TODO: the swagger currently has wrong type for `block_timestamp`, should be `string`.
            blockTimestamp: String(input.block_timestamp),
            hash: input.hash,
            parentHash: input.parent_hash,
        };
    };
    Object.defineProperty(EvmBlockDate.prototype, "block", {
        /**
         * @description The block number.
         * @example `9193266`
         */
        get: function () {
            return this.data.block;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "date", {
        /**
         * @description The date of the block.
         * @example `2020-01-01T00:00:00+00:00`
         */
        get: function () {
            return this.data.date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "timestamp", {
        /**
         * @description The timestamp of the block
         * @example `1577836811`
         */
        get: function () {
            return this.data.timestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "blockTimestamp", {
        /**
         * @description The timestamp of the block
         * @example `2022-01-03T22:59:39.000Z`
         */
        get: function () {
            return this.data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "block_timestamp", {
        /**
         * @deprecated Use `blockTimestamp` instead.
         */
        get: function () {
            return this.data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "hash", {
        /**
         * @description The block hash.
         * @example `0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171`
         */
        get: function () {
            return this.data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "block_hash", {
        /**
         * @deprecated Use `hash` instead.
         */
        get: function () {
            return this.data.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "parentHash", {
        /**
         * @description The block hash of the parent block.
         * @example `0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045`
         */
        get: function () {
            return this.data.parentHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmBlockDate.prototype, "parent_hash", {
        /**
         * @deprecated Use `parentHash` instead.
         */
        get: function () {
            return this.data.parentHash;
        },
        enumerable: false,
        configurable: true
    });
    return EvmBlockDate;
}());

/**
 * The EvmEvent is a representation of an event.
 *
 * Use this class any time you work with an event.
 *
 * @category DataType
 */
var EvmEvent = /** @class */ (function () {
    function EvmEvent(_data) {
        this._data = _data;
    }
    /**
     * Create a new instance of EvmEvent from any valid event input
     * @param data - the EvmEventish type
     * @example
     * ```
     * const event = EvmEventish.create(data);
     *```
     */
    EvmEvent.create = function (data) {
        if (data instanceof EvmEvent) {
            return data;
        }
        return new EvmEvent(EvmEvent.parse(data));
    };
    /**
     * Check the equality between two Evm events. It checks if the chain, block number, address and data are equal.
     * @param dataA - The first event
     * @param dataB - The second event
     * @example
     * ```ts
     * EvmEvent.equals(dataA, dataB)
     * ```
     * @returns true if the events are equal, false otherwise
     */
    EvmEvent.equals = function (dataA, dataB) {
        var eventA = EvmEvent.create(dataA);
        var eventB = EvmEvent.create(dataB);
        if (!eventA._data.chain.equals(eventB._data.chain)) {
            return false;
        }
        if (!eventA._data.blockNumber.equals(eventB._data.blockNumber)) {
            return false;
        }
        if (!eventA._data.address.equals(eventB._data.address)) {
            return false;
        }
        if (eventA._data.data !== eventB._data.data) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current event instance with another evm event
     * @param data - the event to compare with
     * @example
     * ```ts
     * event.equals(data)
     * ```
     * @returns true if the events are equal, false otherwise
     */
    EvmEvent.prototype.equals = function (data) {
        return EvmEvent.equals(this, data);
    };
    /**
     * @returns a JSON represention of the event.
     * @example
     * ```
     * event.toJSON()
     * ```
     */
    EvmEvent.prototype.toJSON = function () {
        var _a, _b, _c;
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), address: data.address.toJSON(), blockNumber: data.blockNumber.toString(), data: {
                from: (_a = data.data.from) === null || _a === void 0 ? void 0 : _a.toJSON(),
                to: (_b = data.data.to) === null || _b === void 0 ? void 0 : _b.toJSON(),
                value: (_c = data.data.value) === null || _c === void 0 ? void 0 : _c.format(),
            } });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmEvent.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmEvent.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example event.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "chain", {
        /**
         * @returns the event chain
         * @example event.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "address", {
        /**
         * @returns the event address
         * @example event.address // EvmAddress
         */
        get: function () {
            return this._data.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "blockNumber", {
        /**
         * @returns the event block number
         * @example event.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "blockTimestamp", {
        /**
         * @returns the event block timestamp
         * @example event.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "data", {
        /**
         * @returns the event data with from address, to address and value
         * @example event.data
         */
        get: function () {
            return this._data.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "transactionHash", {
        /**
         * @returns the event block trannsaciton hash
         * @example event.transactionHash // "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmEvent.prototype, "blockHash", {
        /**
         * @returns the event block hash
         * @example event.blockHash // "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    EvmEvent.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), address: EvmAddress.create(data.address), blockNumber: BigNumber.create(data.blockNumber), blockTimestamp: dateInputToDate(data.blockTimestamp), data: {
            from: maybe(data.data.from, function (from) { return EvmAddress.create(from); }),
            to: maybe(data.data.to, function (to) { return EvmAddress.create(to); }),
            value: maybe(data.data.value, EvmNative.create),
        } })); };
    return EvmEvent;
}());

/**
 * The EvmNftMedia is a representation of an processed NFT media.
 *
 * @category DataType
 */
var EvmNftMedia = /** @class */ (function () {
    function EvmNftMedia(data) {
        this._data = EvmNftMedia.parse(data);
    }
    /**
     * Create a new instance of EvmNftMedia from any valid input
     * @param data -  EvmNftMedia instance or valid EvmNftMediaInput
     * @example
     * ```
     * const media = EvmNftMedia.create(data);
     *```
     */
    EvmNftMedia.create = function (data) {
        if (data instanceof EvmNftMedia) {
            return data;
        }
        return new EvmNftMedia(data);
    };
    /**
     * Check the equality between two Erc20 medias
     * @param dataA - The first media to compare
     * @param dataB - The second media to compare
     * @example EvmNftMedia.equals(dataA, dataB)
     * @returns true if the medias are equal, false otherwise
     */
    EvmNftMedia.equals = function (dataA, dataB) {
        var mediaA = EvmNftMedia.create(dataA);
        var mediaB = EvmNftMedia.create(dataB);
        if (!mediaA.chain.equals(mediaB.chain)) {
            return false;
        }
        if (mediaA.originalMediaUrl !== mediaB.originalMediaUrl) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current media with another erc20 media
     * @param data - the media to compare with
     * @example media.equals(data)
     * @returns true if the medias are equal, false otherwise
     */
    EvmNftMedia.prototype.equals = function (data) {
        return EvmNftMedia.equals(this, data);
    };
    /**
     * @returns a JSON representation of the media.
     * @example media.toJSON()
     */
    EvmNftMedia.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmNftMedia.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNftMedia.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example media.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "chain", {
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "status", {
        get: function () {
            return this._data.status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "updatedAt", {
        get: function () {
            return this._data.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "originalMediaUrl", {
        get: function () {
            return this._data.originalMediaUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "category", {
        get: function () {
            return this._data.category;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "mimetype", {
        get: function () {
            return this._data.mimetype;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "parentHash", {
        get: function () {
            return this._data.parentHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMedia.prototype, "mediaCollection", {
        get: function () {
            return this._data.mediaCollection;
        },
        enumerable: false,
        configurable: true
    });
    EvmNftMedia.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), updatedAt: maybe(data.updatedAt, function (date) { return dateInputToDate(date); }) })); };
    return EvmNftMedia;
}());

/**
 * The EvmNft class is a MoralisData that references to a the NFT of the type; Erc721 or Erc1155
 *
 * @category DataType
 */
var EvmNft = /** @class */ (function () {
    function EvmNft(data) {
        this._data = EvmNft.parse(data);
    }
    /**
     * Create a new instance of EvmNft from any valid address input
     *
     * @param data - the EvmNftish type
     * @example
     * ```ts
     * const nft = EvmNft.create(data);
     * ```
     * @returns an instance of EvmNft
     */
    EvmNft.create = function (data) {
        if (data instanceof EvmNft) {
            return data;
        }
        return new EvmNft(data);
    };
    // TODO: refactor to reduce complexity
    /**
     * Compares two EvmNftish data. verifies that the chain, tokenAddress and owner of values are equal.
     * @param valueA - the first EvmNftish data to compare
     * @param valueB - the second EvmNftish data to compare
     * @returns true if the values are equal, false otherwise
     * @example
     * ```ts
     *  EvmNft.equals(valueA, valueB);
     * ```
     */
    // eslint-disable-next-line complexity
    EvmNft.equals = function (valueA, valueB) {
        var nftA = EvmNft.create(valueA);
        var nftB = EvmNft.create(valueB);
        if (!nftA._data.chain.equals(nftB._data.chain)) {
            return false;
        }
        if (!nftA._data.tokenAddress.equals(nftB._data.tokenAddress)) {
            return false;
        }
        // Owners are different between tokens
        if (nftA._data.ownerOf && nftB._data.ownerOf && !nftA._data.ownerOf.equals(nftB._data.ownerOf)) {
            return false;
        }
        // Owner is defined in only one token
        if ((nftA._data.ownerOf && !nftB._data.ownerOf) || (!nftA._data.ownerOf && nftB._data.ownerOf)) {
            return false;
        }
        return true;
    };
    /**
     * Compares an EvmNftish data to this EvmNft instance.
     * @param value - the value to compare
     * @returns true if the value is equal to the current instance, false otherwise
     * @example
     * ```ts
     * nft.equals(value);
     * ```
     */
    EvmNft.prototype.equals = function (value) {
        return EvmNft.equals(this, value);
    };
    /**
     * Converts the EvmNft instance to a JSON object.
     * @returns JSON object of the EvmNft instance
     * @example `nft.toJSON()`
     */
    EvmNft.prototype.toJSON = function () {
        var _b, _c, _d, _e;
        var data = this._data;
        return __assign(__assign({}, data), { tokenAddress: data.tokenAddress.toJSON(), chain: data.chain.toJSON(), ownerOf: (_b = data.ownerOf) === null || _b === void 0 ? void 0 : _b.toJSON(), blockNumberMinted: (_c = data.blockNumberMinted) === null || _c === void 0 ? void 0 : _c.toString(), blockNumber: (_d = data.blockNumber) === null || _d === void 0 ? void 0 : _d.toString(), media: (_e = data.media) === null || _e === void 0 ? void 0 : _e.format() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmNft.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNft.prototype, "result", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "chain", {
        /**
         * @returns the NFT chain
         * @example
         * ```
         * nft.chain // EvmChain
         * ```
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "contractType", {
        /**
         * @returns the NFT contract type
         * @example
         * ```
         * nft.contractType // "ERC721" | "ERC1155"
         * ```
         */
        get: function () {
            return this._data.contractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "tokenAddress", {
        /**
         * @returns the NFT token address
         * @example
         * ```
         * nft.tokenAddress // EvmAddress
         * ```
         */
        get: function () {
            return this._data.tokenAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "metadata", {
        /**
         * @returns the NFT metadata
         * @example
         * ```ts
         * nft.metadata
         * // {
         * // name: 'Pancake',
         * // description: 'The dessert series 1',
         * // image: 'ipfs://QmNQFXCZ6LGzvpMW9Q5PWbCrEnLknQrPwr2r8pbQAgzQ9A/4863BD6B-6C92-4B96-BF80-8020B2F7C3A5.jpeg',
         * // }
         * ```
         */
        get: function () {
            return this._data.metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "tokenUri", {
        /**
         * @returns the NFT token URI
         * @example
         * ```
         * nft.tokenUri // "https://gateway.moralisipfs.com/ipfs/QmajSqgxY3cWBgBeRm38vasJAcTit1kp5EwqVHxszJYgUC/728.json"
         * ```
         */
        get: function () {
            return this._data.tokenUri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "tokenHash", {
        /**
         * @returns the NFT token hash
         * @example
         * ```
         * nft.tokenHash // "QmajSqgxY3cWBgBeRm38vasJAcTit1kp5EwqVHxszJYgUC"
         * ```
         */
        get: function () {
            return this._data.tokenHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "name", {
        /**
         * @returns the NFT name
         * @example
         * ```
         * nft.name // "Tether USD"
         * ```
         */
        get: function () {
            return this._data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "symbol", {
        /**
         * @returns the NFT symbol
         * @example
         * ```
         * nft.symbol // "USDT"
         * ```
         */
        get: function () {
            return this._data.symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "ownerOf", {
        /**
         * @returns the NFT owner of address
         * @example
         * ```
         * nft.ownerOf // EvmAddress
         * ```
         */
        get: function () {
            return this._data.ownerOf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "blockNumberMinted", {
        /**
         * @returns the NFT block number minted from
         * @example
         * ```
         * nft.blockNumberMinted // BigNumber
         * ```
         */
        get: function () {
            return this._data.blockNumberMinted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "blockNumber", {
        /**
         * @returns the NFT block number
         * @example
         * ```
         * nft.blockNumber // BigNumber
         * ```
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "lastMetadataSync", {
        /**
         * @returns the NFT latest metadata sync date
         * @example
         * ```
         * nft.latestMetadataSync // Date
         * ```
         */
        get: function () {
            return this._data.lastMetadataSync;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "lastTokenUriSync", {
        /**
         * @returns the NFT latest token URI sync date
         * @example
         * ```
         * nft.latestTokenUriSync // Date
         * ```
         */
        get: function () {
            return this._data.lastTokenUriSync;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "amount", {
        /**
         * @returns the NFT amount
         * @example
         * ```
         * nft.amount // 2
         * ```
         */
        get: function () {
            return this._data.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "tokenId", {
        /**
         * @returns the token id
         * @example
         * ```
         * nft.tokenId // '1234'
         * ```
         */
        get: function () {
            return this._data.tokenId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "media", {
        /**
         * @returns the processed media of the NFT
         * @example
         * ```
         * nft.media // EvmNftMedia
         * ```
         */
        get: function () {
            return this._data.media;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNft.prototype, "possibleSpam", {
        /**
         * @returns possibility of the token being a spam token
         * @example transfer.possibleSpam // true
         */
        get: function () {
            return this._data.possibleSpam;
        },
        enumerable: false,
        configurable: true
    });
    var _a;
    _a = EvmNft;
    EvmNft.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), contractType: maybe(data.contractType), tokenAddress: EvmAddress.create(data.tokenAddress), metadata: maybe(data.metadata, _a.validateMetadata), tokenUri: maybe(data.tokenUri), tokenHash: maybe(data.tokenHash), name: maybe(data.name), symbol: maybe(data.symbol), ownerOf: maybe(data.ownerOf, function (ownerOf) { return EvmAddress.create(ownerOf); }), blockNumberMinted: maybe(data.blockNumberMinted, BigNumber.create), blockNumber: maybe(data.blockNumber, BigNumber.create), lastMetadataSync: maybe(data.lastMetadataSync, dateInputToDate), lastTokenUriSync: maybe(data.lastTokenUriSync, dateInputToDate), amount: maybe(data.amount, function (value) { return +value; }), media: maybe(data.media, function (value) { return EvmNftMedia.create(value); }) })); };
    /**
     * This function confirms that the NFT metadata is a valid JSON string.
     *
     * @param value - the new value for the NFT metadata
     * @returns the parsed value of the JSON string
     * @throws {CoreError} if the value is not a valid JSON string
     */
    EvmNft.validateMetadata = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            throw new CoreError({
                code: CoreErrorCode.INVALID_ARGUMENT,
                message: 'Invalid metadata provided, cannot parse the value to JSON',
            });
        }
    };
    return EvmNft;
}());

/**
 * The EvmNftCollection is a representation of an nft collection.
 *
 * @category DataType
 */
var EvmNftCollection = /** @class */ (function () {
    function EvmNftCollection(data) {
        this._data = EvmNftCollection.parse(data);
    }
    /**
     * Create a new instance of EvmNftCollection from any valid transaction input
     * @param data - the EvmNftCollectionish type
     * @example const collection = EvmNftCollection.create(data);
     */
    EvmNftCollection.create = function (data) {
        if (data instanceof EvmNftCollection) {
            return data;
        }
        return new EvmNftCollection(data);
    };
    /**
     * Check the equality between two Evm collections. It compares their hashes and collections.
     * @param dataA - The first collection to compare
     * @param dataB - The second collection to compare
     * @example EvmNftCollection.equals(dataA, dataB)
     */
    EvmNftCollection.equals = function (dataA, dataB) {
        var collectionA = EvmNftCollection.create(dataA);
        var collectionB = EvmNftCollection.create(dataB);
        if (!collectionA.chain.equals(collectionB.chain)) {
            return false;
        }
        if (!collectionA.tokenAddress.equals(collectionB.tokenAddress)) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current collection with another evm collection
     * @param data - the collection to compare with
     * @example
     * ```ts
     * collection.equals(data)
     * ```
     */
    EvmNftCollection.prototype.equals = function (data) {
        return EvmNftCollection.equals(this, data);
    };
    /**
     * @returns a JSON represention of the collection.
     * @example
     * ```
     * collection.toJSON()
     * ```
     */
    EvmNftCollection.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), tokenAddress: data.tokenAddress.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmNftCollection.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNftCollection.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example collection.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftCollection.prototype, "chain", {
        /**
         * @returns the chain where the collection is deployed.
         * @example collection.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftCollection.prototype, "tokenAddress", {
        /**
         * @returns the token address of collection.
         * @example collection.tokenAddress // EvmAddress
         */
        get: function () {
            return this._data.tokenAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftCollection.prototype, "contractType", {
        /**
         * @returns the token type of collection.
         * @example collection.tokenAddress // 'ERC721'
         */
        get: function () {
            return this._data.contractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftCollection.prototype, "name", {
        /**
         * @returns the token name of collection.
         * @example collection.tokenAddress // 'Test NFT'
         */
        get: function () {
            return this._data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftCollection.prototype, "symbol", {
        /**
         * @returns the token symbol of collection.
         * @example collection.symbol // 'TEST'
         */
        get: function () {
            return this._data.symbol;
        },
        enumerable: false,
        configurable: true
    });
    EvmNftCollection.parse = function (data) { return (__assign(__assign({}, data), { tokenAddress: EvmAddress.create(data.tokenAddress), chain: EvmChain.create(data.chain), contractType: maybe(data.contractType) })); };
    return EvmNftCollection;
}());

/**
 * The EvmNftMetadata contains metadata of an NFT.
 *
 * @category DataType
 */
var EvmNftMetadata = /** @class */ (function () {
    function EvmNftMetadata(data) {
        this._data = EvmNftMetadata.parse(data);
    }
    /**
     *  Create a new instance of EvmNftMetadata from any valid EvmNftMetadata input
     *
     * @param data - the EvmNftMetadataish type
     * @example
     * ```ts
     * const token = EvmNftMetadataish.create(value);
     * ```
     */
    EvmNftMetadata.create = function (data) {
        if (data instanceof EvmNftMetadata) {
            return data;
        }
        return new EvmNftMetadata(data);
    };
    /**
     * Compares two EvmNftMetadata instances. This checks if the chain and tokenAddress of both meatdatas are equal.
     *
     * @param dataA - the first EvmNftMetadataish to compare
     * @param dataB - the second EvmNftMetadataish to compare
     * @returns true if the two EvmNftMetadataData are equal
     * @example
     * ```ts
     * EvmNftMetadata.equals(dataA, dataB);
     * ```
     */
    EvmNftMetadata.equals = function (dataA, dataB) {
        var metadataA = EvmNftMetadata.create(dataA);
        var metadataB = EvmNftMetadata.create(dataB);
        if (!metadataA._data.chain.equals(metadataB._data.chain)) {
            return false;
        }
        if (!metadataA._data.tokenAddress.equals(metadataB._data.tokenAddress)) {
            return false;
        }
        return true;
    };
    /**
     * Compares EvmNftMetadata instance to current instance
     *
     * @param data - the EvmNftMetadataish to compare
     * @returns true if the EvmNftMetadataish is equals given metadata
     * @example
     * ```ts
     * metadata.equals(data);
     * ```
     */
    EvmNftMetadata.prototype.equals = function (data) {
        return EvmNftMetadata.equals(this, data);
    };
    /**
     * @returns the data as JSON.
     * @example metadata.toJSON();
     */
    EvmNftMetadata.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), tokenAddress: data.tokenAddress.toJSON() });
    };
    /**
     * @deprecated This method will be removed soon. To format the value, use one of the properties.
     */
    EvmNftMetadata.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNftMetadata.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example metadata.result;
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "name", {
        /**
         * @returns the name in the metadata.
         * @example metadata.name; // "Baby Ape Mutant Club"
         */
        get: function () {
            return this._data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "symbol", {
        /**
         * @returns the symbol in the metadata.
         * @example metadata.symbol; // "BAMC"
         */
        get: function () {
            return this._data.symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "contractType", {
        /**
         * @returns the contract type of the NFT.
         * @example metadata.contractType; // "ERC721"
         */
        get: function () {
            return this._data.contractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "chain", {
        /**
         * @returns the chain in the metadata.
         * @example metadata.chain; // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "tokenAddress", {
        /**
         * @returns the token address in the metadata.
         * @example metadata.tokenAddress; // EvmAddress
         */
        get: function () {
            return this._data.tokenAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftMetadata.prototype, "syncedAt", {
        /**
         * @returns the date the metadata was synced.
         * @example metadata.syncedAt; // Date
         */
        get: function () {
            return this._data.syncedAt;
        },
        enumerable: false,
        configurable: true
    });
    EvmNftMetadata.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), tokenAddress: EvmAddress.create(data.tokenAddress), syncedAt: maybe(data.syncedAt, dateInputToDate) })); };
    return EvmNftMetadata;
}());

/**
 * The EvmNftTransfer is a representation of a completed NFT transfer.
 *
 * @category DataType
 */
var EvmNftTransfer = /** @class */ (function () {
    function EvmNftTransfer(data) {
        this._data = EvmNftTransfer.parse(data);
    }
    /**
     * Create a new instance of EvmNftTransfer from any valid transfer input
     * @param data - the EvmNftTransferish type
     * @example
     * ```
     * const transfer = EvmNftTransfer.create(data);
     *```
     */
    EvmNftTransfer.create = function (data) {
        if (data instanceof EvmNftTransfer) {
            return data;
        }
        return new EvmNftTransfer(data);
    };
    /**
     * Check the equality between two NFT transfers. The compares the chain, blockHash, tokenId and logIndex.
     * @param dataA - The first transfer to compare
     * @param dataB - The second transfer to compare
     * @example EvmNftTransfer.equals(dataA, dataB)
     * @returns true if the transfers are equal, false otherwise
     */
    EvmNftTransfer.equals = function (dataA, dataB) {
        var transferA = EvmNftTransfer.create(dataA);
        var transferB = EvmNftTransfer.create(dataB);
        if (!transferA.chain.equals(transferB.chain)) {
            return false;
        }
        if (transferA.blockHash !== transferB.blockHash) {
            return false;
        }
        if (transferA.tokenId !== transferB.tokenId) {
            return false;
        }
        if (transferA.logIndex !== transferB.logIndex) {
            return false;
        }
        return true;
    };
    /**
     * Checks the equality of the current transfer instance with another nft transfer
     * @param data - the transfer to compare with
     * @example transaction.equals(data)
     * @returns true if the transfers are equal, false otherwise
     */
    EvmNftTransfer.prototype.equals = function (data) {
        return EvmNftTransfer.equals(this, data);
    };
    /**
     * @returns a JSON represention of the transfer.
     * @example
     * ```
     * transfer.toJSON()
     * ```
     */
    EvmNftTransfer.prototype.toJSON = function () {
        var data = this._data;
        return __assign(__assign({}, data), { chain: data.chain.toJSON(), fromAddress: data.fromAddress ? data.fromAddress.toJSON() : undefined, toAddress: data.toAddress.toJSON(), tokenAddress: data.tokenAddress.toJSON(), value: data.value ? data.value.format() : undefined, operator: data.operator ? data.operator.toJSON() : undefined, blockNumber: data.blockNumber.toString() });
    };
    /**
     * @returns a JSON represention of the transfer.
     * @example
     * ```
     * transfer.format()
     * ```
     */
    EvmNftTransfer.prototype.format = function () {
        return this.toJSON();
    };
    Object.defineProperty(EvmNftTransfer.prototype, "result", {
        /**
         * @returns all the data without casting it to JSON.
         * @example transfer.result
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "chain", {
        /**
         * @returns the chain of the transfer.
         * @example transfer.chain // EvmChain
         */
        get: function () {
            return this._data.chain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "blockHash", {
        /**
         * @returns the block hash of the transfer.
         * @example transfer.blockHash // "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e"
         */
        get: function () {
            return this._data.blockHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "blockNumber", {
        /**
         * @returns the block number of the transfer.
         * @example transfer.blockNumber // BigNumber
         */
        get: function () {
            return this._data.blockNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "blockTimestamp", {
        /**
         * @returns the block timestamp of the transfer.
         * @example transfer.blockTimestamp // Date
         */
        get: function () {
            return this._data.blockTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "fromAddress", {
        /**
         * @returns the from address of the transfer.
         * @example transfer.fromAddress // EvmAddress
         */
        get: function () {
            return this._data.fromAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "toAddress", {
        /**
         * @returns the to address of the transfer.
         * @example transfer.toAddress // EvmAddress
         */
        get: function () {
            return this._data.toAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "tokenAddress", {
        /**
         * @returns the token address of the transfer.
         * @example transfer.tokenAddress // EvmAddress
         */
        get: function () {
            return this._data.tokenAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "tokenId", {
        /**
         * @returns the token id of the transfer.
         * @example transfer.tokenId // "15"
         */
        get: function () {
            return this._data.tokenId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "amount", {
        /**
         * @returns the amount of the transfer.
         * @example transfer.amount // 1
         */
        get: function () {
            return this._data.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "value", {
        /**
         * @returns the value of the transfer.
         * @example transfer.value // EvmNative
         */
        get: function () {
            return this._data.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "logIndex", {
        /**
         * @returns the log index of the transfer.
         * @example transfer.logIndex // 0
         */
        get: function () {
            return this._data.logIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "transactionHash", {
        /**
         * @returns the transaction hash of the transfer.
         * @example transfer.transactionHash // "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e"
         */
        get: function () {
            return this._data.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "transactionIndex", {
        /**
         * @returns the transaction index of the transfer.
         * @example transfer.transactionIndex // 123
         */
        get: function () {
            return this._data.transactionIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "transactionType", {
        /**
         * @returns the transaction type of the transfer.
         * @example transfer.transactionType // "1"
         */
        get: function () {
            return this._data.transactionType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "operator", {
        /**
         * @returns the operator of the transfer.
         * @example transfer.operator // EvmAddress
         */
        get: function () {
            return this._data.operator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "contractType", {
        /**
         * @returns the contract type of the transfer.
         * @example transfer.contractType // "ERC721"
         */
        get: function () {
            return this._data.contractType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmNftTransfer.prototype, "possibleSpam", {
        /**
         * @returns possibility of the token being a spam token
         * @example transfer.possibleSpam // true
         */
        get: function () {
            return this._data.possibleSpam;
        },
        enumerable: false,
        configurable: true
    });
    EvmNftTransfer.parse = function (data) { return (__assign(__assign({}, data), { chain: EvmChain.create(data.chain), amount: maybe(data.amount, function (amount) { return +amount; }), blockNumber: BigNumber.create(data.blockNumber), blockTimestamp: dateInputToDate(data.blockTimestamp), transactionIndex: maybe(data.transactionIndex, function (index) { return +index; }), transactionType: maybe(data.transactionType), fromAddress: maybe(data.fromAddress, function (address) { return EvmAddress.create(address); }), toAddress: EvmAddress.create(data.toAddress), tokenAddress: EvmAddress.create(data.tokenAddress), value: maybe(data.value, EvmNative.create), operator: maybe(data.operator, function (operator) { return EvmAddress.create(operator); }), logIndex: +data.logIndex })); };
    return EvmNftTransfer;
}());

/**
 * The EvmTransactionLogDecoded class is a MoralisData that references an EVM decoded transaction log.
 *
 * @category DataType
 */
var EvmTransactionLogDecoded = /** @class */ (function (_super) {
    __extends(EvmTransactionLogDecoded, _super);
    function EvmTransactionLogDecoded(value) {
        var _this = _super.call(this, value) || this;
        _this._value = EvmTransactionLogDecoded.parse(value);
        return _this;
    }
    /**
     * Create a new instance of EvmTransactionLogDecoded from any valid address input
     *
     * @example
     * ```
     * const log = EvmTransactionLogDecoded.create(value, core);
     * ```
     * @param value - A valid EvmTransactionLogDecodedish
     */
    EvmTransactionLogDecoded.create = function (value) {
        if (value instanceof EvmTransactionLogDecoded) {
            return value;
        }
        return new EvmTransactionLogDecoded(value);
    };
    EvmTransactionLogDecoded.parse = function (value) {
        var data = _super.parse.call(this, value);
        return __assign(__assign({}, data), { decodedEvent: value.decodedEvent });
    };
    Object.defineProperty(EvmTransactionLogDecoded.prototype, "decodedEvent", {
        get: function () {
            return this._value.decodedEvent;
        },
        enumerable: false,
        configurable: true
    });
    return EvmTransactionLogDecoded;
}(EvmTransactionLog));

/**
 * The EvmTransactionVerbose is a representation of a published transaction.
 *
 * Use this class any time you work with a transaction.
 *
 * @category DataType
 */
var EvmTransactionVerbose = /** @class */ (function (_super) {
    __extends(EvmTransactionVerbose, _super);
    function EvmTransactionVerbose(data) {
        var _this = _super.call(this, data) || this;
        _this._data = EvmTransactionVerbose.parse(data);
        return _this;
    }
    /**
     * Create a new instance of EvmTransactionVerbose from any valid transaction input
     * @param data - the EvmTransactionVerboseish type
     * @example
     * ```
     * const transaction = EvmTransactionVerbose.create(data);
     *```
     */
    EvmTransactionVerbose.create = function (data) {
        if (data instanceof EvmTransactionVerbose) {
            return data;
        }
        return new EvmTransactionVerbose(data);
    };
    Object.defineProperty(EvmTransactionVerbose.prototype, "decodedCall", {
        get: function () {
            return this._data.decodedCall;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvmTransactionVerbose.prototype, "logs", {
        get: function () {
            return this._data.logs;
        },
        enumerable: false,
        configurable: true
    });
    var _a;
    _a = EvmTransactionVerbose;
    EvmTransactionVerbose.parse = function (data) {
        var parsed = _super.parse.call(_a, data);
        return __assign(__assign({}, parsed), { logs: data.logs.map(function (log) { return EvmTransactionLogDecoded.create(log); }), decodedCall: data.decodedCall });
    };
    return EvmTransactionVerbose;
}(EvmTransaction));

var EvmTrade = /** @class */ (function () {
    function EvmTrade(input) {
        this.transactionHash = input.transactionHash;
        this.transactionIndex = input.transactionIndex;
        this.tokenIds = input.tokenIds;
        this.sellerAddress = EvmAddress.create(input.sellerAddress);
        this.buyerAddress = EvmAddress.create(input.buyerAddress);
        this.tokenAddress = EvmAddress.create(input.tokenAddress);
        this.marketplaceAddress = EvmAddress.create(input.marketplaceAddress);
        this.priceTokenAddress = input.priceTokenAddress ? EvmAddress.create(input.priceTokenAddress) : undefined;
        this.price = EvmNative.create(input.price);
        this.blockTimestamp = input.blockTimestamp;
        this.blockNumber = BigNumber.create(input.blockNumber);
        this.blockHash = input.blockHash;
    }
    EvmTrade.create = function (input) {
        if (input instanceof EvmTrade) {
            return input;
        }
        return new EvmTrade(input);
    };
    EvmTrade.fromJSON = function (json) {
        var input = {
            transactionHash: json.transaction_hash,
            transactionIndex: Number(json.transaction_index),
            tokenIds: json.token_ids,
            sellerAddress: EvmAddress.fromJSON(json.seller_address),
            buyerAddress: EvmAddress.fromJSON(json.buyer_address),
            tokenAddress: EvmAddress.fromJSON(json.token_address),
            marketplaceAddress: EvmAddress.fromJSON(json.marketplace_address),
            priceTokenAddress: json.price_token_address ? EvmAddress.fromJSON(json.price_token_address) : undefined,
            price: EvmNative.fromJSON(json.price),
            blockTimestamp: new Date(json.block_timestamp),
            blockNumber: BigNumber.fromJSON(json.block_number),
            blockHash: json.block_hash,
        };
        return EvmTrade.create(input);
    };
    EvmTrade.prototype.toJSON = function () {
        return {
            transaction_hash: this.transactionHash,
            transaction_index: String(this.transactionIndex),
            token_ids: this.tokenIds,
            seller_address: this.sellerAddress.toJSON(),
            buyer_address: this.buyerAddress.toJSON(),
            token_address: this.tokenAddress.toJSON(),
            marketplace_address: this.marketplaceAddress.toJSON(),
            price_token_address: this.priceTokenAddress ? this.priceTokenAddress.toJSON() : undefined,
            price: this.price.toJSON(),
            block_timestamp: this.blockTimestamp.toISOString(),
            block_number: this.blockNumber.toJSON(),
            block_hash: this.blockHash,
        };
    };
    return EvmTrade;
}());

var EvmTradeCollection = /** @class */ (function () {
    function EvmTradeCollection(input) {
        this.total = input.total;
        this.page = input.page;
        this.pageSize = input.pageSize;
        this.cursor = input.cursor;
        this.result = input.result.map(function (item) { return EvmTrade.create(item); });
    }
    EvmTradeCollection.create = function (input) {
        if (input instanceof EvmTradeCollection) {
            return input;
        }
        return new EvmTradeCollection(input);
    };
    EvmTradeCollection.fromJSON = function (json) {
        var input = {
            total: json.total,
            page: json.page,
            pageSize: json.page_size,
            cursor: json.cursor,
            result: json.result.map(function (item) { return EvmTrade.fromJSON(item); }),
        };
        return EvmTradeCollection.create(input);
    };
    EvmTradeCollection.prototype.toJSON = function () {
        return {
            total: this.total,
            page: this.page,
            page_size: this.pageSize,
            cursor: this.cursor,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return EvmTradeCollection;
}());

// $ref: #/components/schemas/erc20Transfer/properties/from_wallet_label
// typeName: erc20Transfer_from_wallet_label
// unionType: oneOf
var EvmErc20TransferFromWalletLabel = /** @class */ (function () {
    function EvmErc20TransferFromWalletLabel() {
    }
    EvmErc20TransferFromWalletLabel.create = function (input) {
        return input;
    };
    EvmErc20TransferFromWalletLabel.fromJSON = function (json) {
        return json;
    };
    EvmErc20TransferFromWalletLabel.toJSON = function (value) {
        return value;
    };
    return EvmErc20TransferFromWalletLabel;
}());

// $ref: #/components/schemas/erc20Transfer/properties/to_wallet_label
// typeName: erc20Transfer_to_wallet_label
// unionType: oneOf
var EvmErc20TransferToWalletLabel = /** @class */ (function () {
    function EvmErc20TransferToWalletLabel() {
    }
    EvmErc20TransferToWalletLabel.create = function (input) {
        return input;
    };
    EvmErc20TransferToWalletLabel.fromJSON = function (json) {
        return json;
    };
    EvmErc20TransferToWalletLabel.toJSON = function (value) {
        return value;
    };
    return EvmErc20TransferToWalletLabel;
}());

var EvmErc20Transfer = /** @class */ (function () {
    function EvmErc20Transfer(input) {
        this.tokenName = input.tokenName;
        this.tokenSymbol = input.tokenSymbol;
        this.tokenLogo = input.tokenLogo;
        this.tokenDecimals = input.tokenDecimals;
        this.contractAddress = EvmAddress.create(input.contractAddress);
        this.transactionHash = input.transactionHash;
        this.transactionIndex = input.transactionIndex;
        this.logIndex = input.logIndex;
        this.blockTimestamp = input.blockTimestamp;
        this.blockNumber = BigNumber.create(input.blockNumber);
        this.blockHash = input.blockHash;
        this.fromWallet = EvmAddress.create(input.fromWallet);
        this.fromWalletLabel = input.fromWalletLabel ? EvmErc20TransferFromWalletLabel.create(input.fromWalletLabel) : undefined;
        this.toWallet = EvmAddress.create(input.toWallet);
        this.toWalletLabel = input.toWalletLabel ? EvmErc20TransferToWalletLabel.create(input.toWalletLabel) : undefined;
        this.value = input.value;
        this.valueDecimal = input.valueDecimal;
        this.possibleSpam = input.possibleSpam;
    }
    EvmErc20Transfer.create = function (input) {
        if (input instanceof EvmErc20Transfer) {
            return input;
        }
        return new EvmErc20Transfer(input);
    };
    EvmErc20Transfer.fromJSON = function (json) {
        var input = {
            tokenName: json.token_name,
            tokenSymbol: json.token_symbol,
            tokenLogo: json.token_logo,
            tokenDecimals: Number(json.token_decimals),
            contractAddress: EvmAddress.fromJSON(json.contract_address),
            transactionHash: json.transaction_hash,
            transactionIndex: Number(json.transaction_index),
            logIndex: Number(json.log_index),
            blockTimestamp: new Date(json.block_timestamp),
            blockNumber: BigNumber.fromJSON(json.block_number),
            blockHash: json.block_hash,
            fromWallet: EvmAddress.fromJSON(json.from_wallet),
            fromWalletLabel: json.from_wallet_label ? EvmErc20TransferFromWalletLabel.fromJSON(json.from_wallet_label) : undefined,
            toWallet: EvmAddress.fromJSON(json.to_wallet),
            toWalletLabel: json.to_wallet_label ? EvmErc20TransferToWalletLabel.fromJSON(json.to_wallet_label) : undefined,
            value: json.value,
            valueDecimal: json.value_decimal,
            possibleSpam: json.possible_spam,
        };
        return EvmErc20Transfer.create(input);
    };
    EvmErc20Transfer.prototype.toJSON = function () {
        return {
            token_name: this.tokenName,
            token_symbol: this.tokenSymbol,
            token_logo: this.tokenLogo,
            token_decimals: String(this.tokenDecimals),
            contract_address: this.contractAddress.toJSON(),
            transaction_hash: this.transactionHash,
            transaction_index: String(this.transactionIndex),
            log_index: String(this.logIndex),
            block_timestamp: this.blockTimestamp.toISOString(),
            block_number: this.blockNumber.toJSON(),
            block_hash: this.blockHash,
            from_wallet: this.fromWallet.toJSON(),
            from_wallet_label: this.fromWalletLabel ? EvmErc20TransferFromWalletLabel.toJSON(this.fromWalletLabel) : undefined,
            to_wallet: this.toWallet.toJSON(),
            to_wallet_label: this.toWalletLabel ? EvmErc20TransferToWalletLabel.toJSON(this.toWalletLabel) : undefined,
            value: this.value,
            value_decimal: this.valueDecimal,
            possible_spam: this.possibleSpam,
        };
    };
    return EvmErc20Transfer;
}());

var EvmErc20TransfersResponse = /** @class */ (function () {
    function EvmErc20TransfersResponse(input) {
        this.cursor = input.cursor;
        this.result = input.result.map(function (item) { return EvmErc20Transfer.create(item); });
    }
    EvmErc20TransfersResponse.create = function (input) {
        if (input instanceof EvmErc20TransfersResponse) {
            return input;
        }
        return new EvmErc20TransfersResponse(input);
    };
    EvmErc20TransfersResponse.fromJSON = function (json) {
        var input = {
            cursor: json.cursor,
            result: json.result.map(function (item) { return EvmErc20Transfer.fromJSON(item); }),
        };
        return EvmErc20TransfersResponse.create(input);
    };
    EvmErc20TransfersResponse.prototype.toJSON = function () {
        return {
            cursor: this.cursor,
            result: this.result.map(function (item) { return item.toJSON(); }),
        };
    };
    return EvmErc20TransfersResponse;
}());

// $ref: #/components/schemas/web3version
// type: web3version
// properties:
// - version ($ref: #/components/schemas/web3version/properties/version)
var EvmWeb3version = /** @class */ (function () {
    function EvmWeb3version(input) {
        this.version = input.version;
    }
    EvmWeb3version.create = function (input) {
        if (input instanceof EvmWeb3version) {
            return input;
        }
        return new EvmWeb3version(input);
    };
    EvmWeb3version.fromJSON = function (json) {
        var input = {
            version: json.version,
        };
        return EvmWeb3version.create(input);
    };
    EvmWeb3version.prototype.toJSON = function () {
        return {
            version: this.version,
        };
    };
    return EvmWeb3version;
}());

// $ref: #/components/schemas/endpointWeights
// type: endpointWeights
// properties:
// - endpoint ($ref: #/components/schemas/endpointWeights/properties/endpoint)
// - path ($ref: #/components/schemas/endpointWeights/properties/path)
// - rateLimitCost ($ref: #/components/schemas/endpointWeights/properties/rateLimitCost)
// - price ($ref: #/components/schemas/endpointWeights/properties/price)
var EvmEndpointWeights = /** @class */ (function () {
    function EvmEndpointWeights(input) {
        this.endpoint = input.endpoint;
        this.path = input.path;
        this.rateLimitCost = input.rateLimitCost;
        this.price = input.price;
    }
    EvmEndpointWeights.create = function (input) {
        if (input instanceof EvmEndpointWeights) {
            return input;
        }
        return new EvmEndpointWeights(input);
    };
    EvmEndpointWeights.fromJSON = function (json) {
        var input = {
            endpoint: json.endpoint,
            path: json.path,
            rateLimitCost: json.rateLimitCost,
            price: json.price,
        };
        return EvmEndpointWeights.create(input);
    };
    EvmEndpointWeights.prototype.toJSON = function () {
        return {
            endpoint: this.endpoint,
            path: this.path,
            rateLimitCost: this.rateLimitCost,
            price: this.price,
        };
    };
    return EvmEndpointWeights;
}());

var EvmMarketDataERC20TokenItem = /** @class */ (function () {
    function EvmMarketDataERC20TokenItem(input) {
        this.rank = input.rank;
        this.tokenName = input.tokenName;
        this.tokenSymbol = input.tokenSymbol;
        this.tokenLogo = input.tokenLogo;
        this.tokenDecimals = input.tokenDecimals;
        this.contractAddress = EvmAddress.create(input.contractAddress);
        this.priceUsd = input.priceUsd;
        this.price24hPercentChange = input.price24hPercentChange;
        this.price7dPercentChange = input.price7dPercentChange;
        this.marketCapUsd = input.marketCapUsd;
    }
    EvmMarketDataERC20TokenItem.create = function (input) {
        if (input instanceof EvmMarketDataERC20TokenItem) {
            return input;
        }
        return new EvmMarketDataERC20TokenItem(input);
    };
    EvmMarketDataERC20TokenItem.fromJSON = function (json) {
        var input = {
            rank: json.rank,
            tokenName: json.token_name,
            tokenSymbol: json.token_symbol,
            tokenLogo: json.token_logo,
            tokenDecimals: Number(json.token_decimals),
            contractAddress: EvmAddress.fromJSON(json.contract_address),
            priceUsd: json.price_usd,
            price24hPercentChange: json.price_24h_percent_change,
            price7dPercentChange: json.price_7d_percent_change,
            marketCapUsd: json.market_cap_usd,
        };
        return EvmMarketDataERC20TokenItem.create(input);
    };
    EvmMarketDataERC20TokenItem.prototype.toJSON = function () {
        return {
            rank: this.rank,
            token_name: this.tokenName,
            token_symbol: this.tokenSymbol,
            token_logo: this.tokenLogo,
            token_decimals: String(this.tokenDecimals),
            contract_address: this.contractAddress.toJSON(),
            price_usd: this.priceUsd,
            price_24h_percent_change: this.price24hPercentChange,
            price_7d_percent_change: this.price7dPercentChange,
            market_cap_usd: this.marketCapUsd,
        };
    };
    return EvmMarketDataERC20TokenItem;
}());

var EvmMarketDataERC20TokensByPriceMovers = /** @class */ (function () {
    function EvmMarketDataERC20TokensByPriceMovers(input) {
        this.gainers = input.gainers.map(function (item) { return EvmMarketDataERC20TokenItem.create(item); });
        this.losers = input.losers.map(function (item) { return EvmMarketDataERC20TokenItem.create(item); });
    }
    EvmMarketDataERC20TokensByPriceMovers.create = function (input) {
        if (input instanceof EvmMarketDataERC20TokensByPriceMovers) {
            return input;
        }
        return new EvmMarketDataERC20TokensByPriceMovers(input);
    };
    EvmMarketDataERC20TokensByPriceMovers.fromJSON = function (json) {
        var input = {
            gainers: json.gainers.map(function (item) { return EvmMarketDataERC20TokenItem.fromJSON(item); }),
            losers: json.losers.map(function (item) { return EvmMarketDataERC20TokenItem.fromJSON(item); }),
        };
        return EvmMarketDataERC20TokensByPriceMovers.create(input);
    };
    EvmMarketDataERC20TokensByPriceMovers.prototype.toJSON = function () {
        return {
            gainers: this.gainers.map(function (item) { return item.toJSON(); }),
            losers: this.losers.map(function (item) { return item.toJSON(); }),
        };
    };
    return EvmMarketDataERC20TokensByPriceMovers;
}());

// $ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items
// type: marketDataTopNFTCollectionByMarketCap_Item
// properties:
// - rank ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/rank)
// - collection_title ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/collection_title)
// - collection_image ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/collection_image)
// - floor_price_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price_usd)
// - floor_price_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/floor_price_24hr_percent_change)
// - market_cap_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/market_cap_usd)
// - market_cap_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/market_cap_24hr_percent_change)
// - volume_usd ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/volume_usd)
// - volume_24hr_percent_change ($ref: #/components/schemas/marketDataTopNFTCollectionByMarketCap/items/properties/volume_24hr_percent_change)
var EvmMarketDataTopNFTCollectionByMarketCapItem = /** @class */ (function () {
    function EvmMarketDataTopNFTCollectionByMarketCapItem(input) {
        this.rank = input.rank;
        this.collectionTitle = input.collectionTitle;
        this.collectionImage = input.collectionImage;
        this.floorPriceUsd = input.floorPriceUsd;
        this.floorPrice24hrPercentChange = input.floorPrice24hrPercentChange;
        this.marketCapUsd = input.marketCapUsd;
        this.marketCap24hrPercentChange = input.marketCap24hrPercentChange;
        this.volumeUsd = input.volumeUsd;
        this.volume24hrPercentChange = input.volume24hrPercentChange;
    }
    EvmMarketDataTopNFTCollectionByMarketCapItem.create = function (input) {
        if (input instanceof EvmMarketDataTopNFTCollectionByMarketCapItem) {
            return input;
        }
        return new EvmMarketDataTopNFTCollectionByMarketCapItem(input);
    };
    EvmMarketDataTopNFTCollectionByMarketCapItem.fromJSON = function (json) {
        var input = {
            rank: json.rank,
            collectionTitle: json.collection_title,
            collectionImage: json.collection_image,
            floorPriceUsd: json.floor_price_usd,
            floorPrice24hrPercentChange: json.floor_price_24hr_percent_change,
            marketCapUsd: json.market_cap_usd,
            marketCap24hrPercentChange: json.market_cap_24hr_percent_change,
            volumeUsd: json.volume_usd,
            volume24hrPercentChange: json.volume_24hr_percent_change,
        };
        return EvmMarketDataTopNFTCollectionByMarketCapItem.create(input);
    };
    EvmMarketDataTopNFTCollectionByMarketCapItem.prototype.toJSON = function () {
        return {
            rank: this.rank,
            collection_title: this.collectionTitle,
            collection_image: this.collectionImage,
            floor_price_usd: this.floorPriceUsd,
            floor_price_24hr_percent_change: this.floorPrice24hrPercentChange,
            market_cap_usd: this.marketCapUsd,
            market_cap_24hr_percent_change: this.marketCap24hrPercentChange,
            volume_usd: this.volumeUsd,
            volume_24hr_percent_change: this.volume24hrPercentChange,
        };
    };
    return EvmMarketDataTopNFTCollectionByMarketCapItem;
}());

// $ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items
// type: marketDataHottestNFTCollectionByTradingVolume_Item
// properties:
// - rank ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/rank)
// - collection_title ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/collection_title)
// - collection_image ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/collection_image)
// - floor_price_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/floor_price_usd)
// - floor_price_24hr_percent_change ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/floor_price_24hr_percent_change)
// - volume_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/volume_usd)
// - volume_24hr_percent_change ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/volume_24hr_percent_change)
// - average_price_usd ($ref: #/components/schemas/marketDataHottestNFTCollectionByTradingVolume/items/properties/average_price_usd)
var EvmMarketDataHottestNFTCollectionByTradingVolumeItem = /** @class */ (function () {
    function EvmMarketDataHottestNFTCollectionByTradingVolumeItem(input) {
        this.rank = input.rank;
        this.collectionTitle = input.collectionTitle;
        this.collectionImage = input.collectionImage;
        this.floorPriceUsd = input.floorPriceUsd;
        this.floorPrice24hrPercentChange = input.floorPrice24hrPercentChange;
        this.volumeUsd = input.volumeUsd;
        this.volume24hrPercentChange = input.volume24hrPercentChange;
        this.averagePriceUsd = input.averagePriceUsd;
    }
    EvmMarketDataHottestNFTCollectionByTradingVolumeItem.create = function (input) {
        if (input instanceof EvmMarketDataHottestNFTCollectionByTradingVolumeItem) {
            return input;
        }
        return new EvmMarketDataHottestNFTCollectionByTradingVolumeItem(input);
    };
    EvmMarketDataHottestNFTCollectionByTradingVolumeItem.fromJSON = function (json) {
        var input = {
            rank: json.rank,
            collectionTitle: json.collection_title,
            collectionImage: json.collection_image,
            floorPriceUsd: json.floor_price_usd,
            floorPrice24hrPercentChange: json.floor_price_24hr_percent_change,
            volumeUsd: json.volume_usd,
            volume24hrPercentChange: json.volume_24hr_percent_change,
            averagePriceUsd: json.average_price_usd,
        };
        return EvmMarketDataHottestNFTCollectionByTradingVolumeItem.create(input);
    };
    EvmMarketDataHottestNFTCollectionByTradingVolumeItem.prototype.toJSON = function () {
        return {
            rank: this.rank,
            collection_title: this.collectionTitle,
            collection_image: this.collectionImage,
            floor_price_usd: this.floorPriceUsd,
            floor_price_24hr_percent_change: this.floorPrice24hrPercentChange,
            volume_usd: this.volumeUsd,
            volume_24hr_percent_change: this.volume24hrPercentChange,
            average_price_usd: this.averagePriceUsd,
        };
    };
    return EvmMarketDataHottestNFTCollectionByTradingVolumeItem;
}());

// $ref: #/paths/~1contracts-review/post/responses/200/content/application~1json/schema
// type: reviewContracts
// properties:
// - message ($ref: #/paths/~1contracts-review/post/responses/200/content/application~1json/schema/properties/message)
var EvmReviewContracts = /** @class */ (function () {
    function EvmReviewContracts(input) {
        this.message = input.message;
    }
    EvmReviewContracts.create = function (input) {
        if (input instanceof EvmReviewContracts) {
            return input;
        }
        return new EvmReviewContracts(input);
    };
    EvmReviewContracts.fromJSON = function (json) {
        var input = {
            message: json.message,
        };
        return EvmReviewContracts.create(input);
    };
    EvmReviewContracts.prototype.toJSON = function () {
        return {
            message: this.message,
        };
    };
    return EvmReviewContracts;
}());

var EvmContractsReviewItem = /** @class */ (function () {
    function EvmContractsReviewItem(input) {
        this.contractAddress = EvmAddress.create(input.contractAddress);
        this.reason = input.reason;
        this.reportType = EvmContractsReviewItemReportTypeEnum.create(input.reportType);
        this.contractType = EvmContractsReviewItemContractTypeEnum.create(input.contractType);
    }
    EvmContractsReviewItem.create = function (input) {
        if (input instanceof EvmContractsReviewItem) {
            return input;
        }
        return new EvmContractsReviewItem(input);
    };
    EvmContractsReviewItem.fromJSON = function (json) {
        var input = {
            contractAddress: EvmAddress.fromJSON(json.contract_address),
            reason: json.reason,
            reportType: EvmContractsReviewItemReportTypeEnum.fromJSON(json.report_type),
            contractType: EvmContractsReviewItemContractTypeEnum.fromJSON(json.contract_type),
        };
        return EvmContractsReviewItem.create(input);
    };
    EvmContractsReviewItem.prototype.toJSON = function () {
        return {
            contract_address: this.contractAddress.toJSON(),
            reason: this.reason,
            report_type: this.reportType,
            contract_type: this.contractType,
        };
    };
    return EvmContractsReviewItem;
}());

var EvmContractsReviewDto = /** @class */ (function () {
    function EvmContractsReviewDto(input) {
        this.contracts = input.contracts.map(function (item) { return EvmContractsReviewItem.create(item); });
    }
    EvmContractsReviewDto.create = function (input) {
        if (input instanceof EvmContractsReviewDto) {
            return input;
        }
        return new EvmContractsReviewDto(input);
    };
    EvmContractsReviewDto.fromJSON = function (json) {
        var input = {
            contracts: json.contracts.map(function (item) { return EvmContractsReviewItem.fromJSON(item); }),
        };
        return EvmContractsReviewDto.create(input);
    };
    EvmContractsReviewDto.prototype.toJSON = function () {
        return {
            contracts: this.contracts.map(function (item) { return item.toJSON(); }),
        };
    };
    return EvmContractsReviewDto;
}());

var EvmTransactionTimestamp = /** @class */ (function () {
    function EvmTransactionTimestamp(input) {
        this.blockNumber = BigNumber.create(input.blockNumber);
        this.blockTimestamp = input.blockTimestamp;
        this.transactionHash = input.transactionHash;
    }
    EvmTransactionTimestamp.create = function (input) {
        if (input instanceof EvmTransactionTimestamp) {
            return input;
        }
        return new EvmTransactionTimestamp(input);
    };
    EvmTransactionTimestamp.fromJSON = function (json) {
        var input = {
            blockNumber: BigNumber.fromJSON(json.block_number),
            blockTimestamp: json.block_timestamp,
            transactionHash: json.transaction_hash,
        };
        return EvmTransactionTimestamp.create(input);
    };
    EvmTransactionTimestamp.prototype.toJSON = function () {
        return {
            block_number: this.blockNumber.toJSON(),
            block_timestamp: this.blockTimestamp,
            transaction_hash: this.transactionHash,
        };
    };
    return EvmTransactionTimestamp;
}());

var EvmWalletActiveChain = /** @class */ (function () {
    function EvmWalletActiveChain(input) {
        this.chain = input.chain;
        this.chainId = input.chainId;
        this.firstTransaction = input.firstTransaction ? EvmTransactionTimestamp.create(input.firstTransaction) : undefined;
        this.lastTransaction = input.lastTransaction ? EvmTransactionTimestamp.create(input.lastTransaction) : undefined;
    }
    EvmWalletActiveChain.create = function (input) {
        if (input instanceof EvmWalletActiveChain) {
            return input;
        }
        return new EvmWalletActiveChain(input);
    };
    EvmWalletActiveChain.fromJSON = function (json) {
        var input = {
            chain: json.chain,
            chainId: json.chain_id,
            firstTransaction: json.first_transaction ? EvmTransactionTimestamp.fromJSON(json.first_transaction) : undefined,
            lastTransaction: json.last_transaction ? EvmTransactionTimestamp.fromJSON(json.last_transaction) : undefined,
        };
        return EvmWalletActiveChain.create(input);
    };
    EvmWalletActiveChain.prototype.toJSON = function () {
        return {
            chain: this.chain,
            chain_id: this.chainId,
            first_transaction: this.firstTransaction ? this.firstTransaction.toJSON() : undefined,
            last_transaction: this.lastTransaction ? this.lastTransaction.toJSON() : undefined,
        };
    };
    return EvmWalletActiveChain;
}());

var EvmWalletActiveChains = /** @class */ (function () {
    function EvmWalletActiveChains(input) {
        this.address = input.address;
        this.activeChains = input.activeChains.map(function (item) { return EvmWalletActiveChain.create(item); });
    }
    EvmWalletActiveChains.create = function (input) {
        if (input instanceof EvmWalletActiveChains) {
            return input;
        }
        return new EvmWalletActiveChains(input);
    };
    EvmWalletActiveChains.fromJSON = function (json) {
        var input = {
            address: json.address,
            activeChains: json.active_chains.map(function (item) { return EvmWalletActiveChain.fromJSON(item); }),
        };
        return EvmWalletActiveChains.create(input);
    };
    EvmWalletActiveChains.prototype.toJSON = function () {
        return {
            address: this.address,
            active_chains: this.activeChains.map(function (item) { return item.toJSON(); }),
        };
    };
    return EvmWalletActiveChains;
}());

var GetNFTTradesOperation = {
    operationId: "getNFTTrades",
    groupName: "nft",
    httpMethod: "get",
    routePattern: "/nft/{address}/trades",
    parameterNames: ["chain", "from_block", "to_block", "from_date", "to_date", "marketplace", "cursor", "limit", "disable_total", "address"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return EvmTradeCollection.fromJSON(json);
    },
    serializeRequest: function (request) {
        var chain = request.chain ? EvmChain.create(request.chain) : undefined;
        var fromBlock = request.fromBlock;
        var toBlock = request.toBlock;
        var fromDate = request.fromDate;
        var toDate = request.toDate;
        var marketplace = request.marketplace ? EvmGetNFTTradesMarketplaceEnum.create(request.marketplace) : undefined;
        var cursor = request.cursor;
        var limit = request.limit;
        var disableTotal = request.disableTotal;
        var address = EvmAddress.create(request.address);
        return {
            chain: chain ? chain.toJSON() : undefined,
            from_block: fromBlock,
            to_block: toBlock,
            from_date: fromDate,
            to_date: toDate,
            marketplace: marketplace ? marketplace : undefined,
            cursor: cursor,
            limit: limit,
            disable_total: disableTotal,
            address: address.toJSON(),
        };
    },
};

var GetErc20TransfersOperation = {
    operationId: "getErc20Transfers",
    groupName: "token",
    httpMethod: "get",
    routePattern: "/erc20/transfers",
    parameterNames: ["chain", "from_block", "to_block", "limit", "contract_addresses", "exclude_contracts", "wallet_addresses", "exclude_wallets", "cursor"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return EvmErc20TransfersResponse.fromJSON(json);
    },
    serializeRequest: function (request) {
        var chain = request.chain ? EvmChain.create(request.chain) : undefined;
        var fromBlock = request.fromBlock;
        var toBlock = request.toBlock;
        var limit = request.limit;
        var contractAddresses = request.contractAddresses ? request.contractAddresses.map(function (item) { return EvmAddress.create(item); }) : undefined;
        var excludeContracts = request.excludeContracts ? request.excludeContracts.map(function (item) { return EvmAddress.create(item); }) : undefined;
        var walletAddresses = request.walletAddresses ? request.walletAddresses.map(function (item) { return EvmAddress.create(item); }) : undefined;
        var excludeWallets = request.excludeWallets ? request.excludeWallets.map(function (item) { return EvmAddress.create(item); }) : undefined;
        var cursor = request.cursor;
        return {
            chain: chain ? chain.toJSON() : undefined,
            from_block: fromBlock,
            to_block: toBlock,
            limit: limit,
            contract_addresses: contractAddresses ? contractAddresses.map(function (item) { return item.toJSON(); }) : undefined,
            exclude_contracts: excludeContracts ? excludeContracts.map(function (item) { return item.toJSON(); }) : undefined,
            wallet_addresses: walletAddresses ? walletAddresses.map(function (item) { return item.toJSON(); }) : undefined,
            exclude_wallets: excludeWallets ? excludeWallets.map(function (item) { return item.toJSON(); }) : undefined,
            cursor: cursor,
        };
    },
};

var Web3ApiVersionOperation = {
    operationId: "web3ApiVersion",
    groupName: "utils",
    httpMethod: "get",
    routePattern: "/web3/version",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return EvmWeb3version.fromJSON(json);
    },
    serializeRequest: function (request) {
        return {};
    },
};

var EndpointWeightsOperation = {
    operationId: "endpointWeights",
    groupName: "utils",
    httpMethod: "get",
    routePattern: "/info/endpointWeights",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return EvmEndpointWeights.fromJSON(item); });
    },
    serializeRequest: function (request) {
        return {};
    },
};

var GetTopERC20TokensByMarketCapOperation = {
    operationId: "getTopERC20TokensByMarketCap",
    groupName: "marketData",
    httpMethod: "get",
    routePattern: "/market-data/erc20s/top-tokens",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return EvmMarketDataERC20TokenItem.fromJSON(item); });
    },
    serializeRequest: function (request) {
        return {};
    },
};

var GetTopERC20TokensByPriceMoversOperation = {
    operationId: "getTopERC20TokensByPriceMovers",
    groupName: "marketData",
    httpMethod: "get",
    routePattern: "/market-data/erc20s/top-movers",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return EvmMarketDataERC20TokensByPriceMovers.fromJSON(json);
    },
    serializeRequest: function (request) {
        return {};
    },
};

var GetTopNFTCollectionsByMarketCapOperation = {
    operationId: "getTopNFTCollectionsByMarketCap",
    groupName: "marketData",
    httpMethod: "get",
    routePattern: "/market-data/nfts/top-collections",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return EvmMarketDataTopNFTCollectionByMarketCapItem.fromJSON(item); });
    },
    serializeRequest: function (request) {
        return {};
    },
};

var GetHottestNFTCollectionsByTradingVolumeOperation = {
    operationId: "getHottestNFTCollectionsByTradingVolume",
    groupName: "marketData",
    httpMethod: "get",
    routePattern: "/market-data/nfts/hottest-collections",
    parameterNames: [],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return json.map(function (item) { return EvmMarketDataHottestNFTCollectionByTradingVolumeItem.fromJSON(item); });
    },
    serializeRequest: function (request) {
        return {};
    },
};

var ReviewContractsOperation = {
    operationId: "reviewContracts",
    groupName: "utils",
    httpMethod: "post",
    routePattern: "/contracts-review",
    parameterNames: ["chain"],
    hasResponse: true,
    hasBody: true,
    parseResponse: function (json) {
        return EvmReviewContracts.fromJSON(json);
    },
    serializeRequest: function (request) {
        var chain = request.chain ? EvmChain.create(request.chain) : undefined;
        return {
            chain: chain ? chain.toJSON() : undefined,
        };
    },
    serializeBody: function (body) {
        var value = EvmContractsReviewDto.create(body);
        return value.toJSON();
    },
};

var GetWalletActiveChainsOperation = {
    operationId: "getWalletActiveChains",
    groupName: "wallets",
    httpMethod: "get",
    routePattern: "/wallets/{address}/chains",
    parameterNames: ["address", "chains"],
    hasResponse: true,
    hasBody: false,
    parseResponse: function (json) {
        return EvmWalletActiveChains.fromJSON(json);
    },
    serializeRequest: function (request) {
        var address = EvmAddress.create(request.address);
        var chains = request.chains ? request.chains.map(function (item) { return EvmChain.create(item); }) : undefined;
        return {
            address: address.toJSON(),
            chains: chains ? chains.map(function (item) { return item.toJSON(); }) : undefined,
        };
    },
};

var operations = [
    GetNFTTradesOperation,
    GetErc20TransfersOperation,
    Web3ApiVersionOperation,
    EndpointWeightsOperation,
    GetTopERC20TokensByMarketCapOperation,
    GetTopERC20TokensByPriceMoversOperation,
    GetTopNFTCollectionsByMarketCapOperation,
    GetHottestNFTCollectionsByTradingVolumeOperation,
    ReviewContractsOperation,
    GetWalletActiveChainsOperation,
];

var CommonEvmUtilsConfig = {
    defaultEvmApiChain: {
        name: 'defaultEvmApiChain',
        defaultValue: '0x1',
    },
};

var CommonEvmUtilsConfigSetup = /** @class */ (function () {
    function CommonEvmUtilsConfigSetup() {
    }
    CommonEvmUtilsConfigSetup.register = function (config) {
        config.registerKey(CommonEvmUtilsConfig.defaultEvmApiChain);
    };
    return CommonEvmUtilsConfigSetup;
}());

var CommonEvmUtils = /** @class */ (function (_super) {
    __extends(CommonEvmUtils, _super);
    function CommonEvmUtils(core) {
        return _super.call(this, CommonEvmUtils.moduleName, core) || this;
    }
    CommonEvmUtils.create = function (core) {
        return new CommonEvmUtils(core !== null && core !== void 0 ? core : CoreProvider.getDefault());
    };
    CommonEvmUtils.prototype.setup = function () {
        CommonEvmUtilsConfigSetup.register(this.core.config);
    };
    CommonEvmUtils.prototype.start = function () {
        // Nothing
    };
    Object.defineProperty(CommonEvmUtils.prototype, "EvmAddress", {
        get: function () {
            return EvmAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonEvmUtils.prototype, "EvmChain", {
        get: function () {
            return EvmChain;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonEvmUtils.prototype, "EvmNative", {
        get: function () {
            return EvmNative;
        },
        enumerable: false,
        configurable: true
    });
    CommonEvmUtils.moduleName = 'evmUtils';
    return CommonEvmUtils;
}(Module));

var EvmChainResolver = /** @class */ (function () {
    function EvmChainResolver() {
    }
    EvmChainResolver.resolve = function (chain, core) {
        if (chain) {
            return EvmChain.create(chain);
        }
        var defaultEvmChain = core.config.get(CommonEvmUtilsConfig.defaultEvmApiChain);
        return EvmChain.create(defaultEvmChain);
    };
    return EvmChainResolver;
}());

/** Get the native balance for a specific wallet address. */
var getNativeBalanceOperation = {
    method: 'GET',
    name: 'getNativeBalance',
    id: 'getNativeBalance',
    groupName: 'balance',
    urlPathPattern: '/{address}/balance',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'toBlock'],
    getRequestUrlParams: getRequestUrlParams$M,
    serializeRequest: serializeRequest$M,
    deserializeRequest: deserializeRequest$M,
    deserializeResponse: deserializeResponse$M,
};
// Methods
function getRequestUrlParams$M(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        to_block: maybe(request.toBlock, String),
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeResponse$M(jsonResponse) {
    return {
        balance: EvmNative.create(jsonResponse.balance, 'wei'),
    };
}
function serializeRequest$M(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        toBlock: request.toBlock,
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeRequest$M(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        toBlock: jsonRequest.toBlock,
        address: EvmAddress.create(jsonRequest.address),
    };
}

/** Get the native balances for a set of specific addresses */
var getNativeBalancesForAddressesOperation = {
    method: 'GET',
    name: 'getNativeBalancesForAddresses',
    id: 'getNativeBalancesForAddresses',
    groupName: 'balance',
    urlPathPattern: '/wallets/balances',
    urlSearchParamNames: ['chain', 'toBlock', 'walletAddresses'],
    getRequestUrlParams: getRequestUrlParams$L,
    serializeRequest: serializeRequest$L,
    deserializeRequest: deserializeRequest$L,
    deserializeResponse: deserializeResponse$L,
};
// Methods
function getRequestUrlParams$L(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        to_block: maybe(request.toBlock, String),
        wallet_addresses: (_a = request.walletAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).checksum; }),
    };
}
function deserializeResponse$L(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (chainBalances) { return ({
        chain: EvmChainResolver.resolve(request.chain, core),
        blockNumber: chainBalances.block_number,
        blockTimestamp: chainBalances.block_timestamp,
        totalBalance: EvmNative.create(chainBalances.total_balance, 'wei'),
        walletBalances: chainBalances.wallet_balances.map(function (walletBalance) { return ({
            address: EvmAddress.create(walletBalance.address),
            balance: EvmNative.create(walletBalance.balance, 'wei'),
        }); }),
    }); });
}
function serializeRequest$L(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        toBlock: request.toBlock,
        walletAddresses: (_a = request.walletAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).checksum; }),
    };
}
function deserializeRequest$L(jsonRequest, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(jsonRequest.chain, core),
        toBlock: jsonRequest.toBlock,
        walletAddresses: (_a = jsonRequest.walletAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the contents of a block given the block hash. */
var getBlockOperation = {
    method: 'GET',
    name: 'getBlock',
    id: 'getBlock',
    groupName: 'block',
    isNullable: true,
    urlPathPattern: '/block/{blockNumberOrHash}',
    urlPathParamNames: ['blockNumberOrHash'],
    urlSearchParamNames: ['chain', 'include'],
    getRequestUrlParams: getRequestUrlParams$K,
    serializeRequest: serializeRequest$K,
    deserializeRequest: deserializeRequest$K,
    deserializeResponse: deserializeResponse$K,
};
// Methods
function getRequestUrlParams$K(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        blockNumberOrHash: request.blockNumberOrHash,
        include: request.include,
    };
}
function deserializeResponse$K(jsonResponse, request, core) {
    var _a;
    var data = toCamelCase(jsonResponse);
    var chain = EvmChainResolver.resolve(request.chain, core);
    // TODO: account for changes in api, now we have unknown types for addresses
    // OR fix the types correctly in api
    // I noticed that the docs comes with a type of "string | unknown" which automatically resolves to "unknown". I think we should fix this in the api, casting for now
    return EvmBlock.create(__assign(__assign({}, data), { chain: chain, transactions: ((_a = data.transactions) !== null && _a !== void 0 ? _a : []).map(function (transaction) {
            var _a, _b;
            return EvmTransaction.create({
                cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
                gasPrice: transaction.gasPrice,
                gasUsed: transaction.receiptGasUsed,
                index: transaction.transactionIndex,
                contractAddress: transaction.receiptContractAddress,
                receiptRoot: transaction.receiptRoot,
                receiptStatus: +transaction.receiptStatus,
                chain: chain,
                data: transaction.input,
                from: transaction.fromAddress,
                hash: transaction.hash,
                nonce: transaction.nonce,
                value: transaction.value,
                blockHash: transaction.blockHash,
                blockNumber: +transaction.blockNumber,
                blockTimestamp: new Date(transaction.blockTimestamp),
                gas: transaction.gas,
                to: transaction.toAddress,
                logs: ((_a = transaction.logs) !== null && _a !== void 0 ? _a : []).map(function (jsonLog) {
                    var log = toCamelCase(jsonLog);
                    return EvmTransactionLog.create({
                        chain: chain,
                        address: log.address,
                        blockHash: log.blockHash,
                        blockNumber: +log.blockNumber,
                        data: log.data,
                        topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                        transactionHash: log.transactionHash,
                        blockTimestamp: log.blockTimestamp,
                        logIndex: +log.logIndex,
                        transactionIndex: +log.transactionIndex,
                    });
                }),
                internalTransactions: ((_b = transaction.internalTransactions) !== null && _b !== void 0 ? _b : []).map(function (jsonInternalTransaction) {
                    var internalTransaction = toCamelCase(jsonInternalTransaction);
                    return EvmInternalTransaction.create(__assign({ chain: chain }, internalTransaction));
                }),
            });
        }) }));
}
function serializeRequest$K(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        blockNumberOrHash: request.blockNumberOrHash,
        include: request.include,
    };
}
function deserializeRequest$K(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        blockNumberOrHash: jsonRequest.blockNumberOrHash,
        include: jsonRequest.include,
    };
}

/** Get the closest block given the date. */
var getDateToBlockOperation = {
    method: 'GET',
    name: 'getDateToBlock',
    id: 'getDateToBlock',
    groupName: 'block',
    urlPathPattern: '/dateToBlock',
    urlSearchParamNames: ['chain', 'date'],
    getRequestUrlParams: getRequestUrlParams$J,
    serializeRequest: serializeRequest$J,
    deserializeRequest: deserializeRequest$J,
    deserializeResponse: deserializeResponse$J,
};
// Methods
function getRequestUrlParams$J(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        date: new Date(request.date).toISOString(),
    };
}
function deserializeResponse$J(jsonResponse) {
    return EvmBlockDate.create(jsonResponse);
}
function serializeRequest$J(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        date: new Date(request.date).toISOString(),
    };
}
function deserializeRequest$J(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        date: new Date(jsonRequest.date),
    };
}

/**
 * Fetch the pair data of the provided token0+token1 combination.
 * The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
 */
var getPairAddressOperation = {
    method: 'GET',
    name: 'getPairAddress',
    id: 'getPairAddress',
    groupName: 'defi',
    urlPathPattern: '/{token0Address}/{token1Address}/pairAddress',
    urlPathParamNames: ['token0Address', 'token1Address'],
    urlSearchParamNames: ['chain', 'toBlock', 'toDate', 'exchange'],
    getRequestUrlParams: getRequestUrlParams$I,
    serializeRequest: serializeRequest$I,
    deserializeRequest: deserializeRequest$I,
    deserializeResponse: deserializeResponse$I,
};
// Methods
function getRequestUrlParams$I(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        to_block: request.toBlock,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        exchange: request.exchange,
        token0Address: EvmAddress.create(request.token0Address).lowercase,
        token1Address: EvmAddress.create(request.token1Address).lowercase,
    };
}
function createErc20Token(token, core, chain) {
    var _a, _b, _c;
    return Erc20Token.create({
        contractAddress: (token === null || token === void 0 ? void 0 : token.address) ? EvmAddress.create(token === null || token === void 0 ? void 0 : token.address) : '',
        decimals: (_a = token === null || token === void 0 ? void 0 : token.decimals) !== null && _a !== void 0 ? _a : 0,
        name: (_b = token === null || token === void 0 ? void 0 : token.name) !== null && _b !== void 0 ? _b : '',
        symbol: (_c = token === null || token === void 0 ? void 0 : token.symbol) !== null && _c !== void 0 ? _c : '',
        logo: token === null || token === void 0 ? void 0 : token.logo,
        thumbnail: token === null || token === void 0 ? void 0 : token.thumbnail,
        chain: EvmChainResolver.resolve(chain, core),
    });
}
function deserializeResponse$I(jsonResponse, request, core) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        //   ApiResult types generated all come as undefined which should not be the case TODO:
        token0: {
            token: createErc20Token(jsonResponse.token0, core, request.chain),
            blockNumber: (_a = jsonResponse.token0) === null || _a === void 0 ? void 0 : _a.block_number,
            validated: (_b = jsonResponse.token0) === null || _b === void 0 ? void 0 : _b.validated,
            createdAt: ((_c = jsonResponse.token0) === null || _c === void 0 ? void 0 : _c.created_at) ? new Date((_d = jsonResponse.token0) === null || _d === void 0 ? void 0 : _d.created_at) : undefined,
        },
        token1: {
            token: createErc20Token(jsonResponse.token1, core, request.chain),
            blockNumber: (_e = jsonResponse.token1) === null || _e === void 0 ? void 0 : _e.block_number,
            validated: (_f = jsonResponse.token1) === null || _f === void 0 ? void 0 : _f.validated,
            createdAt: ((_g = jsonResponse.token1) === null || _g === void 0 ? void 0 : _g.created_at) ? new Date((_h = jsonResponse.token1) === null || _h === void 0 ? void 0 : _h.created_at) : undefined,
        },
        pairAddress: jsonResponse.pairAddress ? EvmAddress.create(jsonResponse.pairAddress) : undefined,
    };
}
function serializeRequest$I(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        toBlock: request.toBlock,
        toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        exchange: request.exchange,
        token0Address: EvmAddress.create(request.token0Address).lowercase,
        token1Address: EvmAddress.create(request.token1Address).lowercase,
    };
}
function deserializeRequest$I(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        toBlock: jsonRequest.toBlock,
        toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
        exchange: jsonRequest.exchange,
        token0Address: EvmAddress.create(jsonRequest.token0Address),
        token1Address: EvmAddress.create(jsonRequest.token1Address),
    };
}

/** Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment. */
var getPairReservesOperation = {
    method: 'GET',
    name: 'getPairReserves',
    id: 'getPairReserves',
    groupName: 'defi',
    urlPathPattern: '/{pairAddress}/reserves',
    urlPathParamNames: ['pairAddress'],
    urlSearchParamNames: ['chain', 'toBlock', 'toDate'],
    getRequestUrlParams: getRequestUrlParams$H,
    serializeRequest: serializeRequest$H,
    deserializeRequest: deserializeRequest$H,
    deserializeResponse: deserializeResponse$H,
};
// Methods
function getRequestUrlParams$H(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        pairAddress: EvmAddress.create(request.pairAddress).lowercase,
        to_block: request.toBlock,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    };
}
function serializeRequest$H(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        toBlock: request.toBlock,
        toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        pairAddress: EvmAddress.create(request.pairAddress).lowercase,
    };
}
function deserializeRequest$H(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        toBlock: jsonRequest.toBlock,
        toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
        pairAddress: EvmAddress.create(jsonRequest.pairAddress),
    };
}
function deserializeResponse$H(jsonResponse) {
    return jsonResponse;
}

/** Get events for a contract ordered by block number in descending order. */
var getContractEventsOperation = {
    method: 'POST',
    name: 'getContractEvents',
    id: 'getContractEvents',
    groupName: 'events',
    urlPathPattern: '/{address}/events',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'topic',
        'offset',
        'limit',
        'disableTotal',
    ],
    bodyParamNames: ['abi'],
    bodyType: 'raw',
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$G,
    getRequestBody: getRequestBody$3,
    serializeRequest: serializeRequest$G,
    deserializeRequest: deserializeRequest$G,
    deserializeResponse: deserializeResponse$G,
};
// Methods
function getRequestUrlParams$G(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        topic: request.topic,
        offset: maybe(request.offset, String),
        limit: maybe(request.limit, String),
        address: EvmAddress.create(request.address).lowercase,
        disable_total: request.disableTotal,
    };
}
function getRequestBody$3(request) {
    return request.abi;
}
function deserializeResponse$G(jsonResponse, request, core) {
    var _a, _b;
    return (_b = ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : [])) === null || _b === void 0 ? void 0 : _b.map(function (event) {
        return EvmEvent.create({
            chain: EvmChainResolver.resolve(request.chain, core),
            address: request.address,
            blockHash: event.block_hash,
            blockNumber: event.block_number,
            blockTimestamp: event.block_timestamp,
            transactionHash: event.transaction_hash,
            data: {
                to: event.data.to,
                from: event.data.from,
                value: maybe(event.data.value, function (value) { return EvmNative.create(value, 'wei'); }),
            },
        });
    });
}
function serializeRequest$G(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        topic: request.topic,
        offset: request.offset,
        limit: request.limit,
        address: EvmAddress.create(request.address).lowercase,
        abi: request.abi,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$G(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate ? new Date(jsonRequest.fromDate) : undefined,
        toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
        topic: jsonRequest.topic,
        offset: jsonRequest.offset,
        limit: jsonRequest.limit,
        address: EvmAddress.create(jsonRequest.address),
        abi: jsonRequest.abi,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get the logs for a contract. */
var getContractLogsOperation = {
    method: 'GET',
    name: 'getContractLogs',
    id: 'getContractLogs',
    groupName: 'events',
    urlPathPattern: '/{address}/logs',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'blockNumber',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'topic0',
        'topic1',
        'topic2',
        'topic3',
        'limit',
        'cursor',
        'disableTotal',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$F,
    serializeRequest: serializeRequest$F,
    deserializeRequest: deserializeRequest$F,
    deserializeResponse: deserializeResponse$F,
};
// Methods
function getRequestUrlParams$F(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        block_number: request.blockNumber,
        from_block: request.fromBlock,
        to_block: request.toBlock,
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        topic0: request.topic0,
        topic1: request.topic1,
        topic2: request.topic2,
        topic3: request.topic3,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        address: EvmAddress.create(request.address).lowercase,
        disable_total: request.disableTotal,
    };
}
function serializeRequest$F(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        blockNumber: request.blockNumber,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        topic0: request.topic0,
        topic1: request.topic1,
        topic2: request.topic2,
        topic3: request.topic3,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).lowercase,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$F(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        blockNumber: jsonRequest.blockNumber,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate ? new Date(jsonRequest.fromDate) : undefined,
        toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
        topic0: jsonRequest.topic0,
        topic1: jsonRequest.topic1,
        topic2: jsonRequest.topic2,
        topic3: jsonRequest.topic3,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
    };
}
function deserializeResponse$F(jsonResponse, request, core) {
    var _a, _b;
    return (_b = ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : [])) === null || _b === void 0 ? void 0 : _b.map(function (log) {
        return EvmTransactionLog.create(__assign(__assign({}, toCamelCase(log)), { topics: [log.topic0, log.topic1, log.topic2, log.topic3], blockNumber: Number(log.block_number), chain: EvmChainResolver.resolve(request.chain, core) }));
    });
}

/** Upload multiple files to IPFS and place them in a folder directory. */
var uploadFolderOperation = {
    method: 'POST',
    name: 'uploadFolder',
    id: 'uploadFolder',
    groupName: 'ipfs',
    urlPathPattern: '/ipfs/uploadFolder',
    bodyType: 'raw',
    bodyParamNames: ['abi'],
    getRequestUrlParams: getRequestUrlParams$E,
    serializeRequest: serializeRequest$E,
    deserializeRequest: deserializeRequest$E,
    deserializeResponse: deserializeResponse$E,
    getRequestBody: getRequestBody$2,
};
// Methods
function getRequestUrlParams$E(_) {
    return {};
}
function getRequestBody$2(request) {
    return request.abi;
}
function deserializeResponse$E(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$E(request) {
    return {
        abi: JSON.stringify(request.abi),
    };
}
function deserializeRequest$E(jsonRequest) {
    return {
        abi: JSON.parse(jsonRequest.abi),
    };
}

/**
 * Get NFTs for a given contract address, including metadata for all NFTs (where available).
 * * Results are limited to 100 per page by default
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
var getContractNFTsOperation = {
    method: 'GET',
    name: 'getContractNFTs',
    id: 'getContractNFTs',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'format',
        'limit',
        'totalRanges',
        'range',
        'cursor',
        'normalizeMetadata',
        'disableTotal',
        'mediaItems',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$D,
    serializeRequest: serializeRequest$D,
    deserializeRequest: deserializeRequest$D,
    deserializeResponse: deserializeResponse$D,
};
// Methods
function getRequestUrlParams$D(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        totalRanges: maybe(request.totalRanges, String),
        range: maybe(request.range, String),
        cursor: request.cursor,
        normalizeMetadata: request.normalizeMetadata,
        disable_total: request.disableTotal,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$D(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (data) {
        var chain = EvmChainResolver.resolve(request.chain, core);
        var nft = toCamelCase(data);
        return EvmNft.create(__assign(__assign({}, toCamelCase(nft)), { chain: chain, ownerOf: nft.ownerOf ? EvmAddress.create(nft.ownerOf) : undefined, lastMetadataSync: nft.lastMetadataSync ? new Date(nft.lastMetadataSync) : undefined, lastTokenUriSync: nft.lastTokenUriSync ? new Date(nft.lastTokenUriSync) : undefined, media: maybe(nft.media, function (media) {
                return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
            }) }));
    });
}
function serializeRequest$D(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        totalRanges: request.totalRanges,
        range: request.range,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        normalizeMetadata: request.normalizeMetadata,
        disableTotal: request.disableTotal,
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$D(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        totalRanges: jsonRequest.totalRanges,
        range: jsonRequest.range,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        normalizeMetadata: jsonRequest.normalizeMetadata,
        disableTotal: jsonRequest.disableTotal,
        mediaItems: jsonRequest.mediaItems,
    };
}

/**
 * Get NFTs for a given contract address, including metadata for all NFTs (where available).
 * * Results are limited to 100 per page by default
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
var getMultipleNFTsOperation = {
    method: 'POST',
    name: 'getMultipleNFTs',
    id: 'getMultipleNFTs',
    groupName: 'nft',
    urlPathPattern: '/nft/getMultipleNFTs',
    urlSearchParamNames: ['chain'],
    bodyType: 'properties',
    bodyParamNames: ['tokens', 'normalizeMetadata', 'mediaItems'],
    getRequestUrlParams: getRequestUrlParams$C,
    getRequestBody: getRequestBody$1,
    serializeRequest: serializeRequest$C,
    deserializeRequest: deserializeRequest$C,
    deserializeResponse: deserializeResponse$C,
};
// Methods
function getRequestUrlParams$C(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    };
}
function getRequestBody$1(request) {
    return {
        tokens: request.tokens.map(function (token) { return ({
            token_address: EvmAddress.create(token.tokenAddress).lowercase,
            token_id: token.tokenId,
        }); }),
        normalizeMetadata: request.normalizeMetadata,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$C(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (data) {
        if (data === null) {
            return null;
        }
        var chain = EvmChainResolver.resolve(request.chain, core);
        var nft = toCamelCase(data);
        return EvmNft.create(__assign(__assign({}, toCamelCase(nft)), { chain: EvmChainResolver.resolve(request.chain, core), amount: nft.amount ? parseInt(nft.amount, 10) : undefined, ownerOf: EvmAddress.create(nft.ownerOf), lastMetadataSync: dateInputToDate(nft.lastMetadataSync), lastTokenUriSync: dateInputToDate(nft.lastTokenUriSync), media: maybe(nft.media, function (media) {
                return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
            }) }));
    });
}
function serializeRequest$C(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        normalizeMetadata: request.normalizeMetadata,
        tokens: request.tokens.map(function (token) { return ({
            tokenAddress: EvmAddress.create(token.tokenAddress).lowercase,
            tokenId: token.tokenId,
        }); }),
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$C(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        normalizeMetadata: jsonRequest.normalizeMetadata,
        tokens: jsonRequest.tokens.map(function (token) { return ({
            tokenAddress: EvmAddress.create(token.tokenAddress),
            tokenId: token.tokenId,
        }); }),
        mediaItems: jsonRequest.mediaItems,
    };
}

/**
 * Get the collection / contract level metadata for a given contract (name, symbol, base token uri).
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
var getNFTContractMetadataOperation = {
    method: 'GET',
    name: 'getNFTContractMetadata',
    id: 'getNFTContractMetadata',
    groupName: 'nft',
    isNullable: true,
    urlPathPattern: '/nft/{address}/metadata',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain'],
    getRequestUrlParams: getRequestUrlParams$B,
    serializeRequest: serializeRequest$B,
    deserializeRequest: deserializeRequest$B,
    deserializeResponse: deserializeResponse$B,
};
// Methods
function getRequestUrlParams$B(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$B(jsonResponse, request, core) {
    return EvmNftMetadata.create(__assign(__assign({}, toCamelCase(jsonResponse)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(jsonResponse.token_address), syncedAt: jsonResponse.synced_at ? new Date(jsonResponse.synced_at) : null, contractType: maybe(jsonResponse.contract_type) }));
}
function serializeRequest$B(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$B(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        address: EvmAddress.create(jsonRequest.address),
    };
}

/** Get transfers of NFTs for a given contract and other parameters. */
var getNFTContractTransfersOperation = {
    method: 'GET',
    name: 'getNFTContractTransfers',
    id: 'getNFTContractTransfers',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/transfers',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'format',
        'limit',
        'cursor',
        'fromBlock',
        'fromDate',
        'toBlock',
        'toDate',
        'disableTotal',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$A,
    serializeRequest: serializeRequest$A,
    deserializeRequest: deserializeRequest$A,
    deserializeResponse: deserializeResponse$A,
};
// Methods
function getRequestUrlParams$A(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        from_block: maybe(request.fromBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_block: maybe(request.toBlock, String),
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        cursor: request.cursor,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$A(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return EvmNftTransfer.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(transfer.to_address), toAddress: EvmAddress.create(transfer.to_address), operator: transfer.operator ? EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null, value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null, blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$A(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$A(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate ? new Date(jsonRequest.fromDate) : undefined,
        toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get the lowest executed price for an NFT contract for the last x days (only trades paid in ETH). */
var getNFTLowestPriceOperation = {
    method: 'GET',
    name: 'getNFTLowestPrice',
    id: 'getNFTLowestPrice',
    groupName: 'nft',
    isNullable: true,
    urlPathPattern: '/nft/{address}/lowestprice',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'days', 'marketplace'],
    getRequestUrlParams: getRequestUrlParams$z,
    serializeRequest: serializeRequest$z,
    deserializeRequest: deserializeRequest$z,
    deserializeResponse: deserializeResponse$z,
};
// Methods
function getRequestUrlParams$z(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        days: maybe(request.days, String),
        marketplace: request.marketplace,
    };
}
function deserializeResponse$z(jsonResponse) {
    return EvmTrade.fromJSON(jsonResponse);
}
function serializeRequest$z(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        days: request.days,
        marketplace: request.marketplace,
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$z(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        days: jsonRequest.days,
        marketplace: jsonRequest.marketplace,
        address: EvmAddress.create(jsonRequest.address),
    };
}

/**
 * Get NFT data, including metadata (where available), for the given NFT token ID and contract address.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
var getNFTMetadataOperation = {
    method: 'GET',
    name: 'getNFTMetadata',
    id: 'getNFTMetadata',
    groupName: 'nft',
    isNullable: true,
    urlPathPattern: '/nft/{address}/{tokenId}',
    urlPathParamNames: ['address', 'tokenId'],
    urlSearchParamNames: ['chain', 'format', 'normalizeMetadata', 'mediaItems'],
    getRequestUrlParams: getRequestUrlParams$y,
    serializeRequest: serializeRequest$y,
    deserializeRequest: deserializeRequest$y,
    deserializeResponse: deserializeResponse$y,
};
// Methods
function getRequestUrlParams$y(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        tokenId: request.tokenId,
        format: request.format,
        normalizeMetadata: request.normalizeMetadata,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$y(jsonResponse, request, core) {
    var chain = EvmChainResolver.resolve(request.chain, core);
    var nft = toCamelCase(jsonResponse);
    return EvmNft.create(__assign(__assign({}, nft), { chain: EvmChainResolver.resolve(request.chain, core), ownerOf: nft.ownerOf ? EvmAddress.create(nft.ownerOf) : undefined, lastMetadataSync: nft.lastMetadataSync ? new Date(nft.lastMetadataSync) : undefined, lastTokenUriSync: nft.lastTokenUriSync ? new Date(nft.lastTokenUriSync) : undefined, media: maybe(nft.media, function (media) {
            return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
        }) }));
}
function serializeRequest$y(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        address: EvmAddress.create(request.address).checksum,
        tokenId: request.tokenId,
        normalizeMetadata: request.normalizeMetadata,
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$y(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        address: EvmAddress.create(jsonRequest.address),
        tokenId: jsonRequest.tokenId,
        normalizeMetadata: jsonRequest.normalizeMetadata,
        mediaItems: jsonRequest.mediaItems,
    };
}

/**
 * Get owners of NFTs for a given contract.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
var getNFTOwnersOperation = {
    method: 'GET',
    name: 'getNFTOwners',
    id: 'getNFTOwners',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/owners',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata', 'disableTotal', 'mediaItems'],
    firstPageIndex: 1,
    getRequestUrlParams: getRequestUrlParams$x,
    serializeRequest: serializeRequest$x,
    deserializeRequest: deserializeRequest$x,
    deserializeResponse: deserializeResponse$x,
};
// Methods
function getRequestUrlParams$x(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        normalizeMetadata: request.normalizeMetadata,
        disable_total: request.disableTotal,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$x(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (data) {
        var chain = EvmChainResolver.resolve(request.chain, core);
        var nft = toCamelCase(data);
        return EvmNft.create(__assign(__assign({}, nft), { chain: EvmChainResolver.resolve(request.chain, core), ownerOf: EvmAddress.create(nft.ownerOf), lastMetadataSync: new Date(nft.lastMetadataSync), lastTokenUriSync: new Date(nft.lastTokenUriSync), media: maybe(nft.media, function (media) {
                return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
            }) }));
    });
}
function serializeRequest$x(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        normalizeMetadata: request.normalizeMetadata,
        disableTotal: request.disableTotal,
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$x(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        normalizeMetadata: jsonRequest.normalizeMetadata,
        disableTotal: jsonRequest.disableTotal,
        mediaItems: jsonRequest.mediaItems,
    };
}

/**
 * Get owners of a specific NFT given the contract address and token ID.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
var getNFTTokenIdOwnersOperation = {
    method: 'GET',
    name: 'getNFTTokenIdOwners',
    id: 'getNFTTokenIdOwners',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/{tokenId}/owners',
    urlPathParamNames: ['address', 'tokenId'],
    urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata', 'disableTotal', 'mediaItems'],
    firstPageIndex: 1,
    getRequestUrlParams: getRequestUrlParams$w,
    serializeRequest: serializeRequest$w,
    deserializeRequest: deserializeRequest$w,
    deserializeResponse: deserializeResponse$w,
};
// Methods
function getRequestUrlParams$w(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        tokenId: request.tokenId,
        normalizeMetadata: request.normalizeMetadata,
        disable_total: request.disableTotal,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$w(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (data) {
        var chain = EvmChainResolver.resolve(request.chain, core);
        var nft = toCamelCase(data);
        return EvmNft.create(__assign(__assign({}, toCamelCase(nft)), { chain: EvmChainResolver.resolve(request.chain, core), ownerOf: EvmAddress.create(nft.ownerOf), lastMetadataSync: new Date(nft.lastMetadataSync), lastTokenUriSync: new Date(nft.lastTokenUriSync), media: maybe(nft.media, function (media) {
                return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
            }) }));
    });
}
function serializeRequest$w(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        tokenId: request.tokenId,
        normalizeMetadata: request.normalizeMetadata,
        disableTotal: request.disableTotal,
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$w(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        tokenId: jsonRequest.tokenId,
        normalizeMetadata: jsonRequest.normalizeMetadata,
        disableTotal: jsonRequest.disableTotal,
        mediaItems: jsonRequest.mediaItems,
    };
}

/** Get trades of NFTs for a given contract and marketplace. */
var getNFTTradesOperation = {
    method: 'GET',
    name: 'getNFTTrades',
    id: 'getNFTTrades',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/trades',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'marketplace',
        'cursor',
        'limit',
        'disableTotal',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$v,
    serializeRequest: serializeRequest$v,
    deserializeRequest: deserializeRequest$v,
    deserializeResponse: deserializeResponse$v,
};
// Methods
function getRequestUrlParams$v(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        marketplace: request.marketplace,
        cursor: request.cursor,
        limit: maybe(request.limit, String),
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$v(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (trade) { return EvmTrade.fromJSON(trade); });
}
function serializeRequest$v(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        marketplace: request.marketplace,
        cursor: request.cursor,
        limit: request.limit,
        address: EvmAddress.create(request.address).checksum,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$v(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        marketplace: jsonRequest.marketplace,
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get transfers of NFTs given a block number or block hash. */
var getNFTTransfersByBlockOperation = {
    method: 'GET',
    name: 'getNFTTransfersByBlock',
    id: 'getNFTTransfersByBlock',
    groupName: 'nft',
    urlPathPattern: '/block/{blockNumberOrHash}/nft/transfers',
    urlPathParamNames: ['blockNumberOrHash'],
    urlSearchParamNames: ['chain', 'limit', 'cursor', 'disableTotal'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$u,
    serializeRequest: serializeRequest$u,
    deserializeRequest: deserializeRequest$u,
    deserializeResponse: deserializeResponse$u,
};
// Methods
function getRequestUrlParams$u(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        blockNumberOrHash: request.blockNumberOrHash,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$u(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return EvmNftTransfer.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(transfer.token_address), toAddress: EvmAddress.create(transfer.to_address), operator: transfer.operator ? EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null, value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null, blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$u(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        blockNumberOrHash: request.blockNumberOrHash,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$u(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        blockNumberOrHash: jsonRequest.blockNumberOrHash,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get transfers of NFTs from a block number to a block number. */
var getNFTTransfersFromToBlockOperation = {
    method: 'GET',
    name: 'getNFTTransfersFromToBlock',
    id: 'getNFTTransfersFromToBlock',
    groupName: 'nft',
    urlPathPattern: '/nft/transfers',
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'format',
        'limit',
        'cursor',
        'disableTotal',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$t,
    serializeRequest: serializeRequest$t,
    deserializeRequest: deserializeRequest$t,
    deserializeResponse: deserializeResponse$t,
};
// Methods
function getRequestUrlParams$t(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        format: request.format,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$t(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return EvmNftTransfer.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(transfer.to_address), toAddress: EvmAddress.create(transfer.to_address), operator: transfer.operator ? EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null, value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null, blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$t(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        format: request.format,
        limit: request.limit,
        cursor: request.cursor,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$t(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get transfers of an NFT given a contract address and token ID. */
var getNFTTransfersOperation = {
    method: 'GET',
    name: 'getNFTTransfers',
    id: 'getNFTTransfers',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/{tokenId}/transfers',
    urlPathParamNames: ['address', 'tokenId'],
    urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'disableTotal'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$s,
    serializeRequest: serializeRequest$s,
    deserializeRequest: deserializeRequest$s,
    deserializeResponse: deserializeResponse$s,
};
// Methods
function getRequestUrlParams$s(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        tokenId: request.tokenId,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$s(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return EvmNftTransfer.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(transfer.to_address), toAddress: EvmAddress.create(transfer.to_address), operator: transfer.operator ? EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null, value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null, blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$s(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        tokenId: request.tokenId,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$s(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        tokenId: jsonRequest.tokenId,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get NFT collections owned by a given wallet address. */
var getWalletNFTCollectionsOperation = {
    method: 'GET',
    name: 'getWalletNFTCollections',
    id: 'getWalletNFTCollections',
    groupName: 'nft',
    urlPathPattern: '/{address}/nft/collections',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'limit', 'cursor', 'disableTotal'],
    firstPageIndex: 1,
    getRequestUrlParams: getRequestUrlParams$r,
    serializeRequest: serializeRequest$r,
    deserializeRequest: deserializeRequest$r,
    deserializeResponse: deserializeResponse$r,
};
// Methods
function getRequestUrlParams$r(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$r(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (collection) {
        return EvmNftCollection.create(__assign(__assign({}, toCamelCase(collection)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(collection.token_address) }));
    });
}
function serializeRequest$r(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$r(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
    };
}

/**
 * Get NFTs owned by a given address.
 * * The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
 * * Use the token_address param to get results for a specific contract only
 * * Note results will include all indexed NFTs
 * * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
 */
var getWalletNFTsOperation = {
    method: 'GET',
    name: 'getWalletNFTs',
    id: 'getWalletNFTs',
    groupName: 'nft',
    firstPageIndex: 1,
    urlPathPattern: '/{address}/nft',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'format',
        'limit',
        'tokenAddresses',
        'cursor',
        'normalizeMetadata',
        'disableTotal',
        'mediaItems',
    ],
    getRequestUrlParams: getRequestUrlParams$q,
    serializeRequest: serializeRequest$q,
    deserializeRequest: deserializeRequest$q,
    deserializeResponse: deserializeResponse$q,
};
// Methods
function getRequestUrlParams$q(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        limit: maybe(request.limit, String),
        token_addresses: (_a = request.tokenAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        cursor: request.cursor,
        normalizeMetadata: request.normalizeMetadata,
        disable_total: request.disableTotal,
        media_items: request.mediaItems,
    };
}
function deserializeResponse$q(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (data) {
        var nft = toCamelCase(data);
        var chain = EvmChainResolver.resolve(request.chain, core);
        return EvmNft.create({
            chain: chain,
            contractType: nft.contractType,
            tokenAddress: nft.tokenAddress,
            tokenId: nft.tokenId,
            tokenUri: nft.tokenUri,
            metadata: nft.metadata,
            name: nft.name,
            symbol: nft.symbol,
            amount: nft.amount ? parseInt(nft.amount, 10) : undefined,
            blockNumberMinted: nft.blockNumberMinted,
            blockNumber: nft.blockNumber,
            ownerOf: EvmAddress.create(nft.ownerOf),
            tokenHash: nft.tokenHash,
            lastMetadataSync: dateInputToDate(nft.lastMetadataSync),
            lastTokenUriSync: dateInputToDate(nft.lastTokenUriSync),
            possibleSpam: nft.possibleSpam,
            media: maybe(nft.media, function (media) {
                return EvmNftMedia.create(__assign({ chain: chain }, toCamelCase(media)));
            }),
        });
    });
}
function serializeRequest$q(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        limit: request.limit,
        tokenAddresses: (_a = request.tokenAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).checksum; }),
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        normalizeMetadata: request.normalizeMetadata,
        disableTotal: request.disableTotal,
        mediaItems: request.mediaItems,
    };
}
function deserializeRequest$q(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        limit: jsonRequest.limit,
        tokenAddresses: maybe(jsonRequest.tokenAddresses, function (addresses) {
            return addresses.map(function (address) { return EvmAddress.create(address); });
        }),
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        normalizeMetadata: jsonRequest.normalizeMetadata,
        disableTotal: jsonRequest.disableTotal,
        mediaItems: jsonRequest.mediaItems,
    };
}

/** Get transfers of NFTs given the wallet and other parameters. */
var getWalletNFTTransfersOperation = {
    method: 'GET',
    name: 'getWalletNFTTransfers',
    id: 'getWalletNFTTransfers',
    groupName: 'nft',
    urlPathPattern: '/{address}/nft/transfers',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'format',
        'direction',
        'fromBlock',
        'toBlock',
        'limit',
        'cursor',
        'disableTotal',
        'fromDate',
        'toDate',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$p,
    serializeRequest: serializeRequest$p,
    deserializeRequest: deserializeRequest$p,
    deserializeResponse: deserializeResponse$p,
};
// Methods
function getRequestUrlParams$p(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        format: request.format,
        direction: request.direction,
        from_block: maybe(request.fromBlock, String),
        to_block: request.toBlock,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        disable_total: request.disableTotal,
        from_date: maybe(request.fromDate, function (date) { return new Date(date).toISOString(); }),
        to_date: maybe(request.toDate, function (date) { return new Date(date).toISOString(); }),
    };
}
function deserializeResponse$p(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return EvmNftTransfer.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), tokenAddress: EvmAddress.create(transfer.token_address), toAddress: EvmAddress.create(transfer.to_address), operator: transfer.operator ? EvmAddress.create(transfer.operator) : null, fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null, value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null, blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$p(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        direction: request.direction,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        limit: request.limit,
        cursor: request.cursor,
        address: EvmAddress.create(request.address).checksum,
        disableTotal: request.disableTotal,
        fromDate: maybe(request.fromDate, function (date) { return new Date(date).toISOString(); }),
        toDate: maybe(request.toDate, function (date) { return new Date(date).toISOString(); }),
    };
}
function deserializeRequest$p(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        direction: jsonRequest.direction,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
    };
}

/**
 * ReSync the metadata for an NFT
 * * The metadata flag will request a the NFT's metadata from the already existing token_uri
 * * The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
 * * The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
 * * The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding
 */
var reSyncMetadataOperation = {
    method: 'GET',
    name: 'reSyncMetadata',
    id: 'reSyncMetadata',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/{tokenId}/metadata/resync',
    urlPathParamNames: ['address', 'tokenId'],
    urlSearchParamNames: ['chain', 'flag', 'mode'],
    getRequestUrlParams: getRequestUrlParams$o,
    serializeRequest: serializeRequest$o,
    deserializeRequest: deserializeRequest$o,
    deserializeResponse: deserializeResponse$o,
};
// Methods
function getRequestUrlParams$o(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        flag: request.flag,
        mode: request.mode,
        tokenId: request.tokenId,
    };
}
function serializeRequest$o(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        flag: request.flag,
        mode: request.mode,
        address: EvmAddress.create(request.address).checksum,
        tokenId: request.tokenId,
    };
}
function deserializeRequest$o(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        flag: jsonRequest.flag,
        mode: jsonRequest.mode,
        address: EvmAddress.create(jsonRequest.address),
        tokenId: jsonRequest.tokenId,
    };
}
function deserializeResponse$o(jsonResponse) {
    return jsonResponse;
}

/** Get NFTs that match a given metadata search query. */
var searchNFTsOperation = {
    method: 'GET',
    name: 'searchNFTs',
    id: 'searchNFTs',
    groupName: 'nft',
    urlPathPattern: '/nft/search',
    urlSearchParamNames: [
        'chain',
        'format',
        'q',
        'filter',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'addresses',
        'cursor',
        'limit',
        'disableTotal',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$n,
    serializeRequest: serializeRequest$n,
    deserializeRequest: deserializeRequest$n,
    deserializeResponse: deserializeResponse$n,
};
// Methods
function getRequestUrlParams$n(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        q: request.q,
        filter: request.filter,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        addresses: (_a = request.addresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        cursor: request.cursor,
        limit: maybe(request.limit, String),
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$n(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (nft) { return ({
        token: EvmNft.create({
            chain: EvmChainResolver.resolve(request.chain, core),
            contractType: nft.contract_type,
            tokenAddress: nft.token_address,
            tokenId: nft.token_id,
            tokenUri: nft.token_uri,
            metadata: nft.metadata,
            tokenHash: nft.token_hash,
            possibleSpam: nft.possible_spam,
        }),
        tokenHash: nft.token_hash,
        blockNumberMinted: nft.block_number_minted,
        lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
        lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
        batchId: nft.batch_id,
        frozen: nft.frozen,
        frozenLogIndex: nft.frozen_log_index,
        imported: nft.imported,
        isValid: nft.is_valid,
        openseaLookup: nft.opensea_lookup,
        resyncing: nft.resyncing,
        syncing: nft.syncing,
        updatedAt: new Date(nft.updatedAt),
    }); });
}
function serializeRequest$n(request, core) {
    var _a;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        format: request.format,
        q: request.q,
        filter: request.filter,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        addresses: (_a = request.addresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).checksum; }),
        cursor: request.cursor,
        limit: request.limit,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$n(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        format: jsonRequest.format,
        q: jsonRequest.q,
        filter: jsonRequest.filter,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        addresses: maybe(jsonRequest.addresses, function (addresses) { return addresses.map(function (address) { return EvmAddress.create(address); }); }),
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Initiates a sync of a previously non synced Contract. */
var syncNFTContractOperation = {
    method: 'PUT',
    name: 'syncNFTContract',
    id: 'syncNFTContract',
    groupName: 'nft',
    urlPathPattern: '/nft/{address}/sync',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain'],
    getRequestUrlParams: getRequestUrlParams$m,
    serializeRequest: serializeRequest$m,
    deserializeRequest: deserializeRequest$m,
    deserializeResponse: deserializeResponse$m,
};
// Methods
function getRequestUrlParams$m(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$m() {
    return {
        success: true,
    };
}
function serializeRequest$m(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$m(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        address: EvmAddress.create(jsonRequest.address),
    };
}

/** Resolve an ETH address and find the ENS name. */
var resolveAddressOperation = {
    method: 'GET',
    name: 'resolveAddress',
    id: 'resolveAddress',
    groupName: 'resolve',
    isNullable: true,
    urlPathPattern: '/resolve/{address}/reverse',
    urlPathParamNames: ['address'],
    getRequestUrlParams: getRequestUrlParams$l,
    serializeRequest: serializeRequest$l,
    deserializeRequest: deserializeRequest$l,
    deserializeResponse: deserializeResponse$l,
};
// Methods
function getRequestUrlParams$l(request) {
    return {
        address: maybe(request.address, function (address) { return EvmAddress.create(address).checksum; }),
    };
}
function deserializeResponse$l(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$l(request) {
    return {
        address: maybe(request.address, function (address) { return EvmAddress.create(address).checksum; }),
    };
}
function deserializeRequest$l(jsonRequest) {
    return {
        address: maybe(jsonRequest.address, function (address) { return EvmAddress.create(address); }),
    };
}

/** Resolve an Unstoppable domain and get the address. */
var resolveDomainOperation = {
    method: 'GET',
    name: 'resolveDomain',
    id: 'resolveDomain',
    groupName: 'resolve',
    isNullable: true,
    urlPathPattern: '/resolve/{domain}',
    urlPathParamNames: ['domain'],
    urlSearchParamNames: ['currency'],
    getRequestUrlParams: getRequestUrlParams$k,
    serializeRequest: serializeRequest$k,
    deserializeRequest: deserializeRequest$k,
    deserializeResponse: deserializeResponse$k,
};
// Methods
function getRequestUrlParams$k(request) {
    return {
        currency: request.currency,
        domain: request.domain,
    };
}
function serializeRequest$k(request) {
    return {
        currency: request.currency,
        domain: request.domain,
    };
}
function deserializeRequest$k(jsonRequest) {
    return {
        currency: jsonRequest.currency,
        domain: jsonRequest.domain,
    };
}
function deserializeResponse$k(jsonResponse) {
    return {
        address: EvmAddress.create(jsonResponse.address),
    };
}

/** Resolve a specific ENS domain to its address. */
var resolveENSDomainOperation = {
    method: 'GET',
    name: 'resolveENSDomain',
    id: 'resolveENSDomain',
    groupName: 'resolve',
    isNullable: true,
    urlPathPattern: '/resolve/ens/{domain}',
    urlPathParamNames: ['domain'],
    getRequestUrlParams: getRequestUrlParams$j,
    serializeRequest: serializeRequest$j,
    deserializeRequest: deserializeRequest$j,
    deserializeResponse: deserializeResponse$j,
};
// Methods
function getRequestUrlParams$j(request) {
    return {
        domain: request.domain,
    };
}
function serializeRequest$j(request) {
    return {
        domain: request.domain,
    };
}
function deserializeRequest$j(jsonRequest) {
    return {
        domain: jsonRequest.domain,
    };
}
function deserializeResponse$j(jsonResponse) {
    return {
        address: EvmAddress.create(jsonResponse.address),
    };
}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
var getErc20ApprovalsOperation = {
    method: 'GET',
    name: 'getErc20Approvals',
    id: 'getErc20Approvals',
    groupName: 'token',
    urlPathPattern: '/erc20/approvals',
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'limit',
        'cursor',
        'contractAddresses',
        'excludeContracts',
        'walletAddresses',
        'excludeWallets',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$i,
    serializeRequest: serializeRequest$i,
    deserializeRequest: deserializeRequest$i,
    deserializeResponse: deserializeResponse$i,
};
// Methods
function getRequestUrlParams$i(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        contract_addresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_contracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        wallet_addresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_wallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeResponse$i(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (approval) {
        return Erc20Approval.create(__assign(__assign({}, toCamelCase(approval)), { chain: EvmChainResolver.resolve(request.chain, core), tokenDecimals: Number(approval.token_decimals) }));
    });
}
function serializeRequest$i(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        contractAddresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeContracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        walletAddresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeWallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeRequest$i(jsonRequest) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        contractAddresses: (_a = jsonRequest.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address); }),
        excludeContracts: (_b = jsonRequest.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address); }),
        walletAddresses: (_c = jsonRequest.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address); }),
        excludeWallets: (_d = jsonRequest.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
var getErc20BurnsOperation = {
    method: 'GET',
    name: 'getErc20Burns',
    id: 'getErc20Burns',
    groupName: 'token',
    urlPathPattern: '/erc20/burns',
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'limit',
        'cursor',
        'contractAddresses',
        'excludeContracts',
        'walletAddresses',
        'excludeWallets',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$h,
    serializeRequest: serializeRequest$h,
    deserializeRequest: deserializeRequest$h,
    deserializeResponse: deserializeResponse$h,
};
// Methods
function getRequestUrlParams$h(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        contract_addresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_contracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        wallet_addresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_wallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeResponse$h(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (burn) {
        return Erc20Burn.create(__assign(__assign({}, toCamelCase(burn)), { chain: EvmChainResolver.resolve(request.chain, core), tokenDecimals: Number(burn.token_decimals) }));
    });
}
function serializeRequest$h(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        contractAddresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeContracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        walletAddresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeWallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeRequest$h(jsonRequest) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        contractAddresses: (_a = jsonRequest.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address); }),
        excludeContracts: (_b = jsonRequest.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address); }),
        walletAddresses: (_c = jsonRequest.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address); }),
        excludeWallets: (_d = jsonRequest.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
var getErc20TransfersOperation = {
    method: 'GET',
    name: 'getErc20Transfers',
    id: 'getErc20Transfers',
    groupName: 'token',
    urlPathPattern: '/erc20/transfers',
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'limit',
        'cursor',
        'contractAddresses',
        'excludeContracts',
        'walletAddresses',
        'excludeWallets',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$g,
    serializeRequest: serializeRequest$g,
    deserializeRequest: deserializeRequest$g,
    deserializeResponse: deserializeResponse$g,
};
// Methods
function getRequestUrlParams$g(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        contract_addresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_contracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        wallet_addresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_wallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeResponse$g(jsonResponse) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) { return EvmErc20Transfer.fromJSON(transfer); });
}
function serializeRequest$g(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        contractAddresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeContracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        walletAddresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeWallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeRequest$g(jsonRequest) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        contractAddresses: (_a = jsonRequest.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address); }),
        excludeContracts: (_b = jsonRequest.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address); }),
        walletAddresses: (_c = jsonRequest.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address); }),
        excludeWallets: (_d = jsonRequest.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
var getErc20MintsOperation = {
    method: 'GET',
    name: 'getErc20Mints',
    id: 'getErc20Mints',
    groupName: 'token',
    urlPathPattern: '/erc20/mints',
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'limit',
        'cursor',
        'contractAddresses',
        'excludeContracts',
        'walletAddresses',
        'excludeWallets',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$f,
    serializeRequest: serializeRequest$f,
    deserializeRequest: deserializeRequest$f,
    deserializeResponse: deserializeResponse$f,
};
// Methods
function getRequestUrlParams$f(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        contract_addresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_contracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        wallet_addresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        exclude_wallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeResponse$f(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (mint) {
        return Erc20Mint.create(__assign(__assign({}, toCamelCase(mint)), { chain: EvmChainResolver.resolve(request.chain, core), tokenDecimals: Number(mint.token_decimals) }));
    });
}
function serializeRequest$f(request, core) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        limit: request.limit,
        cursor: request.cursor,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        contractAddresses: (_a = request.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeContracts: (_b = request.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address).lowercase; }),
        walletAddresses: (_c = request.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address).lowercase; }),
        excludeWallets: (_d = request.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeRequest$f(jsonRequest) {
    var _a, _b, _c, _d;
    return {
        chain: EvmChain.create(jsonRequest.chain),
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        contractAddresses: (_a = jsonRequest.contractAddresses) === null || _a === void 0 ? void 0 : _a.map(function (address) { return EvmAddress.create(address); }),
        excludeContracts: (_b = jsonRequest.excludeContracts) === null || _b === void 0 ? void 0 : _b.map(function (address) { return EvmAddress.create(address); }),
        walletAddresses: (_c = jsonRequest.walletAddresses) === null || _c === void 0 ? void 0 : _c.map(function (address) { return EvmAddress.create(address); }),
        excludeWallets: (_d = jsonRequest.excludeWallets) === null || _d === void 0 ? void 0 : _d.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
var getTokenAllowanceOperation = {
    method: 'GET',
    name: 'getTokenAllowance',
    id: 'getTokenAllowance',
    groupName: 'token',
    urlPathPattern: '/erc20/{address}/allowance',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'ownerAddress', 'spenderAddress'],
    getRequestUrlParams: getRequestUrlParams$e,
    serializeRequest: serializeRequest$e,
    deserializeRequest: deserializeRequest$e,
    deserializeResponse: deserializeResponse$e,
};
// Methods
function getRequestUrlParams$e(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        owner_address: EvmAddress.create(request.ownerAddress).lowercase,
        spender_address: EvmAddress.create(request.spenderAddress).lowercase,
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$e(jsonResponse) {
    return {
        allowance: BigNumber.create(jsonResponse.allowance),
    };
}
function serializeRequest$e(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        ownerAddress: EvmAddress.create(request.ownerAddress).checksum,
        spenderAddress: EvmAddress.create(request.spenderAddress).checksum,
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$e(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        ownerAddress: EvmAddress.create(jsonRequest.ownerAddress),
        spenderAddress: EvmAddress.create(jsonRequest.spenderAddress),
        address: EvmAddress.create(jsonRequest.address),
    };
}

/** Get metadata for a list of token symbols (name, symbol, decimals, logo). */
var getTokenMetadataBySymbolOperation = {
    method: 'GET',
    name: 'getTokenMetadataBySymbol',
    id: 'getTokenMetadataBySymbol',
    groupName: 'token',
    urlPathPattern: '/erc20/metadata/symbols',
    urlSearchParamNames: ['chain', 'symbols'],
    getRequestUrlParams: getRequestUrlParams$d,
    serializeRequest: serializeRequest$d,
    deserializeRequest: deserializeRequest$d,
    deserializeResponse: deserializeResponse$d,
};
// Methods
function getRequestUrlParams$d(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        symbols: request.symbols,
    };
}
function deserializeResponse$d(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (token) {
        return {
            token: Erc20Token.create(__assign(__assign({}, toCamelCase(token)), { contractAddress: token.address, chain: EvmChainResolver.resolve(request.chain, core) })),
            blockNumber: token.block_number,
            validated: token.validated,
        };
    });
}
function serializeRequest$d(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        symbols: request.symbols,
    };
}
function deserializeRequest$d(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        symbols: jsonRequest.symbols,
    };
}

/** Get the metadata for a given token contract address (name, symbol, decimals, logo). */
var getTokenMetadataOperation = {
    method: 'GET',
    name: 'getTokenMetadata',
    id: 'getTokenMetadata',
    groupName: 'token',
    urlPathPattern: '/erc20/metadata',
    urlSearchParamNames: ['chain', 'addresses'],
    getRequestUrlParams: getRequestUrlParams$c,
    serializeRequest: serializeRequest$c,
    deserializeRequest: deserializeRequest$c,
    deserializeResponse: deserializeResponse$c,
};
// Methods
function getRequestUrlParams$c(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        addresses: request.addresses.map(function (address) { return EvmAddress.create(address).lowercase; }),
    };
}
function deserializeResponse$c(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (token) {
        return {
            token: Erc20Token.create(__assign(__assign({}, toCamelCase(token)), { contractAddress: token.address, chain: EvmChainResolver.resolve(request.chain, core) })),
            blockNumber: token.block_number,
            validated: token.validated,
        };
    });
}
function serializeRequest$c(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        addresses: request.addresses.map(function (address) { return EvmAddress.create(address).checksum; }),
    };
}
function deserializeRequest$c(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        addresses: jsonRequest.addresses.map(function (address) { return EvmAddress.create(address); }),
    };
}

/** Get the token price denominated in the blockchains native token and USD. */
var getTokenPriceOperation = {
    method: 'GET',
    name: 'getTokenPrice',
    id: 'getTokenPrice',
    groupName: 'token',
    urlPathPattern: '/erc20/{address}/price',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'exchange', 'toBlock'],
    getRequestUrlParams: getRequestUrlParams$b,
    serializeRequest: serializeRequest$b,
    deserializeRequest: deserializeRequest$b,
    deserializeResponse: deserializeResponse$b,
};
// Methods
function getRequestUrlParams$b(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        exchange: request.exchange,
        to_block: maybe(request.toBlock, String),
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$b(jsonResponse) {
    var _a, _b, _c;
    return __assign(__assign({}, toCamelCase(jsonResponse)), { nativePrice: ((_a = jsonResponse.nativePrice) === null || _a === void 0 ? void 0 : _a.value)
            ? EvmNative.create((_b = jsonResponse.nativePrice) === null || _b === void 0 ? void 0 : _b.value, (_c = jsonResponse.nativePrice) === null || _c === void 0 ? void 0 : _c.decimals)
            : null, exchangeAddress: jsonResponse.exchangeAddress ? EvmAddress.create(jsonResponse.exchangeAddress) : null });
}
function serializeRequest$b(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        exchange: request.exchange,
        toBlock: request.toBlock,
        address: EvmAddress.create(request.address).checksum,
    };
}
function deserializeRequest$b(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        exchange: jsonRequest.exchange,
        toBlock: jsonRequest.toBlock,
        address: EvmAddress.create(jsonRequest.address),
    };
}

/** Get ERC20 token transactions from a contract ordered by block number in descending order. */
var getTokenTransfersOperation = {
    method: 'GET',
    name: 'getTokenTransfers',
    id: 'getTokenTransfers',
    groupName: 'token',
    urlPathPattern: '/erc20/{address}/transfers',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'limit', 'cursor', 'disableTotal'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$a,
    serializeRequest: serializeRequest$a,
    deserializeRequest: deserializeRequest$a,
    deserializeResponse: deserializeResponse$a,
};
// Methods
function getRequestUrlParams$a(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        limit: maybe(request.limit, String),
        address: EvmAddress.create(request.address).lowercase,
        cursor: request.cursor,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$a(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return Erc20Transaction.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), address: EvmAddress.create(transfer.address), toAddress: EvmAddress.create(transfer.to_address), fromAddress: EvmAddress.create(transfer.from_address), value: BigNumber.create(transfer.value), blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$a(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        limit: request.limit,
        address: EvmAddress.create(request.address).checksum,
        cursor: request.cursor,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$a(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        limit: jsonRequest.limit,
        address: EvmAddress.create(jsonRequest.address),
        cursor: jsonRequest.cursor,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get token balances for a specific wallet address. */
var getWalletTokenBalancesOperation = {
    method: 'GET',
    name: 'getWalletTokenBalances',
    id: 'getWalletTokenBalances',
    groupName: 'token',
    urlPathPattern: '/{address}/erc20',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'toBlock', 'tokenAddresses'],
    getRequestUrlParams: getRequestUrlParams$9,
    serializeRequest: serializeRequest$9,
    deserializeRequest: deserializeRequest$9,
    deserializeResponse: deserializeResponse$9,
};
// Methods
function getRequestUrlParams$9(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        to_block: maybe(request.toBlock, String),
        token_addresses: maybe(request.tokenAddresses, function (addresses) {
            return addresses.map(function (address) { return EvmAddress.create(address).lowercase; });
        }),
        address: EvmAddress.create(request.address).lowercase,
    };
}
function deserializeResponse$9(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (token) {
        return Erc20Value.create(token.balance, {
            decimals: token.decimals,
            token: {
                decimals: token.decimals,
                name: token.name,
                symbol: token.symbol,
                contractAddress: token.token_address,
                logo: token.logo,
                thumbnail: token.thumbnail,
                chain: EvmChainResolver.resolve(request.chain, core),
                possibleSpam: token.possible_spam,
            },
        });
    });
}
function serializeRequest$9(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        tokenAddresses: maybe(request.tokenAddresses, function (addresses) {
            return addresses.map(function (address) { return EvmAddress.create(address).checksum; });
        }),
        address: EvmAddress.create(request.address).checksum,
        toBlock: request.toBlock,
    };
}
function deserializeRequest$9(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        tokenAddresses: maybe(jsonRequest.tokenAddresses, function (addresses) {
            return addresses.map(function (address) { return EvmAddress.create(address); });
        }),
        address: EvmAddress.create(jsonRequest.address),
        toBlock: jsonRequest.toBlock,
    };
}

/** Get ERC20 token transactions ordered by block number in descending order. */
var getWalletTokenTransfersOperation = {
    method: 'GET',
    name: 'getWalletTokenTransfers',
    id: 'getWalletTokenTransfers',
    groupName: 'token',
    urlPathPattern: '/{address}/erc20/transfers',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'limit', 'cursor', 'disableTotal'],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$8,
    serializeRequest: serializeRequest$8,
    deserializeRequest: deserializeRequest$8,
    deserializeResponse: deserializeResponse$8,
};
// Methods
function getRequestUrlParams$8(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).lowercase,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        limit: maybe(request.limit, String),
        cursor: request.cursor,
        disable_total: request.disableTotal,
    };
}
function deserializeResponse$8(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        return Erc20Transaction.create(__assign(__assign({}, toCamelCase(transfer)), { chain: EvmChainResolver.resolve(request.chain, core), address: EvmAddress.create(transfer.address), toAddress: EvmAddress.create(transfer.to_address), fromAddress: EvmAddress.create(transfer.from_address), value: BigNumber.create(transfer.value), blockTimestamp: new Date(transfer.block_timestamp) }));
    });
}
function serializeRequest$8(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        address: EvmAddress.create(request.address).checksum,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        limit: request.limit,
        cursor: request.cursor,
        disableTotal: request.disableTotal,
    };
}
function deserializeRequest$8(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        address: EvmAddress.create(jsonRequest.address),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        limit: jsonRequest.limit,
        cursor: jsonRequest.cursor,
        disableTotal: jsonRequest.disableTotal,
    };
}

/** Get the contents of a transaction by the given transaction hash. */
var getTransactionOperation = {
    method: 'GET',
    name: 'getTransaction',
    id: 'getTransaction',
    groupName: 'transaction',
    isNullable: true,
    urlPathPattern: '/transaction/{transactionHash}',
    urlPathParamNames: ['transactionHash'],
    urlSearchParamNames: ['chain', 'include'],
    getRequestUrlParams: getRequestUrlParams$7,
    serializeRequest: serializeRequest$7,
    deserializeRequest: deserializeRequest$7,
    deserializeResponse: deserializeResponse$7,
};
function getRequestUrlParams$7(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
        include: request.include,
    };
}
function serializeRequest$7(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
        include: request.include,
    };
}
function deserializeRequest$7(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        transactionHash: jsonRequest.transactionHash,
        include: jsonRequest.include,
    };
}
//TODO: I noticed that the docs comes with a type of "string | unknown" which automatically resolves to "unknown". I think we should fix this in the api, casting for now
function deserializeResponse$7(jsonResponse, request, core) {
    var _a, _b;
    var chain = EvmChainResolver.resolve(request.chain, core);
    return EvmTransaction.create({
        from: jsonResponse.from_address,
        to: jsonResponse.to_address,
        value: jsonResponse.value,
        gasPrice: jsonResponse.gas_price,
        gasUsed: jsonResponse.receipt_gas_used,
        data: jsonResponse.input,
        nonce: jsonResponse.nonce,
        blockHash: jsonResponse.block_hash,
        blockNumber: jsonResponse.block_number,
        blockTimestamp: jsonResponse.block_timestamp,
        index: jsonResponse.transaction_index,
        chain: chain,
        hash: jsonResponse.hash,
        gas: jsonResponse.gas,
        cumulativeGasUsed: jsonResponse.receipt_cumulative_gas_used,
        contractAddress: jsonResponse.receipt_contract_address,
        logs: ((_a = jsonResponse.logs) !== null && _a !== void 0 ? _a : []).map(function (log) {
            return EvmTransactionLog.create({
                address: log.address,
                blockHash: log.block_hash,
                blockNumber: +log.block_number,
                data: log.data,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                transactionHash: log.transaction_hash,
                blockTimestamp: log.block_timestamp,
                logIndex: +log.log_index,
                transactionIndex: +log.transaction_index,
                chain: chain,
            });
        }),
        internalTransactions: ((_b = jsonResponse.internal_transactions) !== null && _b !== void 0 ? _b : []).map(function (jsonInternalTransaction) {
            var internalTransaction = toCamelCase(jsonInternalTransaction);
            return EvmInternalTransaction.create(__assign({ chain: chain }, internalTransaction));
        }),
        receiptRoot: jsonResponse.receipt_root,
        receiptStatus: jsonResponse.receipt_status,
    });
}

/** Get the contents of a transaction by the given transaction hash. */
var getTransactionVerboseOperation = {
    method: 'GET',
    name: 'getTransactionVerbose',
    id: 'getTransactionVerbose',
    groupName: 'transaction',
    isNullable: true,
    urlPathPattern: '/transaction/{transactionHash}/verbose',
    urlPathParamNames: ['transactionHash'],
    urlSearchParamNames: ['chain', 'include'],
    getRequestUrlParams: getRequestUrlParams$6,
    serializeRequest: serializeRequest$6,
    deserializeRequest: deserializeRequest$6,
    deserializeResponse: deserializeResponse$6,
};
function getRequestUrlParams$6(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
        include: request.include,
    };
}
function serializeRequest$6(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
        include: request.include,
    };
}
function deserializeRequest$6(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        transactionHash: jsonRequest.transactionHash,
        include: jsonRequest.include,
    };
}
function deserializeResponse$6(jsonResponse, request, core) {
    var _a;
    return EvmTransactionVerbose.create({
        from: jsonResponse.from_address,
        to: jsonResponse.to_address,
        value: jsonResponse.value,
        gasPrice: jsonResponse.gas_price,
        gasUsed: jsonResponse.receipt_gas_used,
        data: jsonResponse.input,
        nonce: jsonResponse.nonce,
        blockHash: jsonResponse.block_hash,
        blockNumber: jsonResponse.block_number,
        blockTimestamp: jsonResponse.block_timestamp,
        index: jsonResponse.transaction_index,
        chain: EvmChainResolver.resolve(request.chain, core),
        hash: jsonResponse.hash,
        gas: jsonResponse.gas,
        cumulativeGasUsed: jsonResponse.receipt_cumulative_gas_used,
        contractAddress: jsonResponse.receipt_contract_address,
        logs: ((_a = jsonResponse.logs) !== null && _a !== void 0 ? _a : []).map(function (log) {
            return EvmTransactionLogDecoded.create({
                address: log.address,
                blockHash: log.block_hash,
                blockNumber: +log.block_number,
                data: log.data,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                transactionHash: log.transaction_hash,
                blockTimestamp: log.block_timestamp,
                logIndex: +log.log_index,
                transactionIndex: +log.transaction_index,
                chain: EvmChainResolver.resolve(request.chain, core),
                decodedEvent: log.decoded_event,
            });
        }),
        decodedCall: jsonResponse.decoded_call,
        receiptRoot: jsonResponse.receipt_root,
        receiptStatus: jsonResponse.receipt_status,
    });
}

/** Get native transactions ordered by block number in descending order. */
var getWalletTransactionsOperation = {
    method: 'GET',
    name: 'getWalletTransactions',
    id: 'getWalletTransactions',
    groupName: 'transaction',
    urlPathPattern: '/{address}',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'cursor',
        'limit',
        'disableTotal',
        'include',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$5,
    serializeRequest: serializeRequest$5,
    deserializeRequest: deserializeRequest$5,
    deserializeResponse: deserializeResponse$5,
};
// Methods
function getRequestUrlParams$5(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        cursor: request.cursor,
        limit: maybe(request.limit, String),
        address: EvmAddress.create(request.address).lowercase,
        disable_total: request.disableTotal,
        include: request.include,
    };
}
function serializeRequest$5(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        cursor: request.cursor,
        limit: request.limit,
        address: EvmAddress.create(request.address).checksum,
        disableTotal: request.disableTotal,
        include: request.include,
    };
}
function deserializeRequest$5(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
        include: jsonRequest.include,
    };
}
function deserializeResponse$5(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        var _a;
        var chain = EvmChainResolver.resolve(request.chain, core);
        return EvmTransaction.create({
            cumulativeGasUsed: transfer.receipt_cumulative_gas_used,
            gasPrice: transfer.gas_price,
            gasUsed: transfer.receipt_gas_used,
            index: +transfer.transaction_index,
            contractAddress: transfer.receipt_contract_address,
            receiptRoot: transfer.receipt_root,
            receiptStatus: +transfer.receipt_status,
            chain: EvmChainResolver.resolve(request.chain, core),
            data: transfer.input,
            from: transfer.from_address,
            hash: transfer.hash,
            nonce: transfer.nonce,
            value: transfer.value,
            blockHash: transfer.block_hash,
            blockNumber: +transfer.block_number,
            blockTimestamp: new Date(transfer.block_timestamp),
            gas: transfer.gas ? BigNumber.create(transfer.gas) : null,
            to: transfer.to_address ? transfer.to_address : null,
            internalTransactions: ((_a = transfer.internal_transactions) !== null && _a !== void 0 ? _a : []).map(function (jsonInternalTransaction) {
                var internalTransaction = toCamelCase(jsonInternalTransaction);
                return EvmInternalTransaction.create(__assign({ chain: chain }, internalTransaction));
            }),
        });
    });
}

/** Get native transactions ordered by block number in descending order. */
var getWalletTransactionsVerboseOperation = {
    method: 'GET',
    name: 'getWalletTransactionsVerbose',
    id: 'getWalletTransactionsVerbose',
    groupName: 'transaction',
    urlPathPattern: '/{address}/verbose',
    urlPathParamNames: ['address'],
    urlSearchParamNames: [
        'chain',
        'fromBlock',
        'toBlock',
        'fromDate',
        'toDate',
        'cursor',
        'limit',
        'disableTotal',
        'include',
    ],
    firstPageIndex: 0,
    getRequestUrlParams: getRequestUrlParams$4,
    serializeRequest: serializeRequest$4,
    deserializeRequest: deserializeRequest$4,
    deserializeResponse: deserializeResponse$4,
};
// Methods
function getRequestUrlParams$4(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        from_block: maybe(request.fromBlock, String),
        to_block: maybe(request.toBlock, String),
        from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
        to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
        cursor: request.cursor,
        limit: maybe(request.limit, String),
        address: EvmAddress.create(request.address).lowercase,
        disable_total: request.disableTotal,
        include: request.include,
    };
}
function serializeRequest$4(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        fromBlock: request.fromBlock,
        toBlock: request.toBlock,
        fromDate: request.fromDate,
        toDate: request.toDate,
        cursor: request.cursor,
        limit: request.limit,
        address: EvmAddress.create(request.address).checksum,
        disableTotal: request.disableTotal,
        include: request.include,
    };
}
function deserializeRequest$4(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        fromBlock: jsonRequest.fromBlock,
        toBlock: jsonRequest.toBlock,
        fromDate: jsonRequest.fromDate,
        toDate: jsonRequest.toDate,
        cursor: jsonRequest.cursor,
        limit: jsonRequest.limit,
        address: EvmAddress.create(jsonRequest.address),
        disableTotal: jsonRequest.disableTotal,
        include: jsonRequest.include,
    };
}
function deserializeResponse$4(jsonResponse, request, core) {
    var _a;
    return ((_a = jsonResponse.result) !== null && _a !== void 0 ? _a : []).map(function (transfer) {
        var _a;
        return EvmTransaction.create({
            cumulativeGasUsed: transfer.receipt_cumulative_gas_used,
            gasPrice: transfer.gas_price,
            gasUsed: transfer.receipt_gas_used,
            index: +transfer.transaction_index,
            contractAddress: transfer.receipt_contract_address,
            receiptRoot: transfer.receipt_root,
            receiptStatus: +transfer.receipt_status,
            chain: EvmChainResolver.resolve(request.chain, core),
            data: transfer.input,
            from: EvmAddress.create(transfer.from_address),
            hash: transfer.hash,
            nonce: transfer.nonce,
            value: transfer.value,
            blockHash: transfer.block_hash,
            blockNumber: +transfer.block_number,
            blockTimestamp: new Date(transfer.block_timestamp),
            gas: BigNumber.create(transfer.gas),
            to: EvmAddress.create(transfer.to_address),
            logs: ((_a = transfer.logs) !== null && _a !== void 0 ? _a : []).map(function (log) {
                return EvmTransactionLog.create({
                    logIndex: +log.log_index,
                    transactionHash: log.transaction_hash,
                    transactionIndex: +log.transaction_index,
                    address: log.address,
                    data: log.data,
                    topics: [log.topic0, log.topic1, log.topic2, log.topic3],
                    blockHash: log.block_hash,
                    blockNumber: +log.block_number,
                    blockTimestamp: transfer.block_timestamp,
                    chain: EvmChainResolver.resolve(request.chain, core),
                });
            }),
        });
    });
}

/** Get native transactions ordered by block number in descending order. */
var getInternalTransactionsOperation = {
    method: 'GET',
    name: 'getInternalTransactions',
    id: 'getInternalTransactions',
    groupName: 'transaction',
    urlPathPattern: '/transaction/{transactionHash}/internal-transactions',
    urlPathParamNames: ['transactionHash'],
    urlSearchParamNames: ['chain'],
    getRequestUrlParams: getRequestUrlParams$3,
    serializeRequest: serializeRequest$3,
    deserializeRequest: deserializeRequest$3,
    deserializeResponse: deserializeResponse$3,
};
// Methods
function getRequestUrlParams$3(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
    };
}
function serializeRequest$3(request, core) {
    return {
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        transactionHash: request.transactionHash,
    };
}
function deserializeRequest$3(jsonRequest) {
    return {
        chain: EvmChain.create(jsonRequest.chain),
        transactionHash: jsonRequest.transactionHash,
    };
}
function deserializeResponse$3(jsonResponse, request, core) {
    return (jsonResponse !== null && jsonResponse !== void 0 ? jsonResponse : []).map(function (transaction) {
        var chain = EvmChainResolver.resolve(request.chain, core);
        return EvmInternalTransaction.create({
            chain: chain,
            blockHash: transaction.block_hash,
            blockNumber: transaction.block_number,
            from: transaction.from,
            gas: transaction.gas,
            gasUsed: transaction.gas_used,
            input: transaction.input,
            output: transaction.output,
            to: transaction.to,
            transactionHash: transaction.transaction_hash,
            type: transaction.type,
            value: transaction.value,
        });
    });
}

/** Run a given function of a contract ABI and retrieve readonly data. */
var runContractFunctionOperation = {
    method: 'POST',
    name: 'runContractFunction',
    id: 'runContractFunction',
    groupName: 'utils',
    urlPathParamNames: ['address'],
    urlSearchParamNames: ['chain', 'functionName'],
    urlPathPattern: '/{address}/function',
    bodyType: 'properties',
    bodyParamNames: ['abi', 'params'],
    getRequestUrlParams: getRequestUrlParams$2,
    getRequestBody: getRequestBody,
    deserializeResponse: deserializeResponse$2,
    serializeRequest: serializeRequest$2,
    deserializeRequest: deserializeRequest$2,
};
// Methods
function getRequestUrlParams$2(request, core) {
    return {
        address: EvmAddress.create(request.address).lowercase,
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        function_name: request.functionName,
    };
}
function getRequestBody(request) {
    return {
        abi: request.abi,
        params: request.params,
    };
}
function deserializeResponse$2(jsonResponse) {
    return jsonResponse;
}
function serializeRequest$2(request, core) {
    return {
        address: EvmAddress.create(request.address).checksum,
        chain: EvmChainResolver.resolve(request.chain, core).apiHex,
        functionName: request.functionName,
        abi: request.abi,
        params: request.params,
    };
}
function deserializeRequest$2(jsonRequest) {
    return {
        address: EvmAddress.create(jsonRequest.address),
        chain: EvmChain.create(jsonRequest.chain),
        functionName: jsonRequest.functionName,
        abi: jsonRequest.abi,
        params: jsonRequest.params,
    };
}

/** Get the endpoint price list for rate limits and cost. */
var endpointWeightsOperation = {
    method: 'GET',
    name: 'endpointWeights',
    id: 'endpointWeights',
    groupName: 'utils',
    urlPathPattern: '/info/endpointWeights',
    getRequestUrlParams: getRequestUrlParams$1,
    deserializeRequest: deserializeRequest$1,
    serializeRequest: serializeRequest$1,
    deserializeResponse: deserializeResponse$1,
};
// Methods
function getRequestUrlParams$1() {
    return {};
}
function serializeRequest$1() {
    return undefined;
}
function deserializeRequest$1() {
    return {};
}
function deserializeResponse$1(jsonResponse) {
    return jsonResponse;
}

/** Get the current version of the Moralis Web3 API. */
var web3ApiVersionOperation = {
    method: 'GET',
    name: 'web3ApiVersion',
    id: 'web3ApiVersion',
    groupName: 'utils',
    urlPathPattern: '/web3/version',
    deserializeRequest: deserializeRequest,
    serializeRequest: serializeRequest,
    getRequestUrlParams: getRequestUrlParams,
    deserializeResponse: deserializeResponse,
};
// Methods
function getRequestUrlParams() {
    return {};
}
function serializeRequest() {
    return undefined;
}
function deserializeRequest() {
    return {};
}
function deserializeResponse(jsonResponse) {
    return jsonResponse;
}

var operationsV2 = [
    getBlockOperation,
    getContractEventsOperation,
    getContractLogsOperation,
    getContractNFTsOperation,
    getDateToBlockOperation,
    getErc20ApprovalsOperation,
    getErc20BurnsOperation,
    getErc20MintsOperation,
    getInternalTransactionsOperation,
    getMultipleNFTsOperation,
    getNativeBalanceOperation,
    getNativeBalancesForAddressesOperation,
    getNFTContractMetadataOperation,
    getNFTContractTransfersOperation,
    getNFTLowestPriceOperation,
    getNFTMetadataOperation,
    getNFTOwnersOperation,
    getNFTTokenIdOwnersOperation,
    getNFTTransfersByBlockOperation,
    getNFTTransfersFromToBlockOperation,
    getNFTTransfersOperation,
    getPairAddressOperation,
    getPairReservesOperation,
    getTokenAllowanceOperation,
    getTokenMetadataBySymbolOperation,
    getTokenMetadataOperation,
    getTokenPriceOperation,
    getTokenTransfersOperation,
    getTransactionOperation,
    getTransactionVerboseOperation,
    getWalletNFTCollectionsOperation,
    getWalletNFTsOperation,
    getWalletNFTTransfersOperation,
    getWalletTokenBalancesOperation,
    getWalletTokenTransfersOperation,
    getWalletTransactionsOperation,
    getWalletTransactionsVerboseOperation,
    resolveAddressOperation,
    resolveDomainOperation,
    resolveENSDomainOperation,
    reSyncMetadataOperation,
    runContractFunctionOperation,
    searchNFTsOperation,
    syncNFTContractOperation,
    uploadFolderOperation,
];
/**
 * @deprecated This list includes upgraded operations to the hybrid approach in the old format.
 */
var operationsV2All = __spreadArray(__spreadArray([], operationsV2, true), [
    endpointWeightsOperation,
    web3ApiVersionOperation,
    getNFTTradesOperation,
    getErc20TransfersOperation,
], false);

export { CommonEvmUtils, CommonEvmUtilsConfig, CommonEvmUtilsConfigSetup, EndpointWeightsOperation, Erc20Approval, Erc20Burn, Erc20Mint, Erc20Token, Erc20Transaction, Erc20Value, EvmAddress, EvmBlock, EvmBlockDate, EvmChain, EvmChainList, EvmChainParser, EvmChainResolver, EvmContractsReviewDto, EvmContractsReviewItem, EvmContractsReviewItemContractTypeEnum, EvmContractsReviewItemReportTypeEnum, EvmEndpointWeights, EvmErc20Transfer, EvmErc20TransferFromWalletLabel, EvmErc20TransferToWalletLabel, EvmErc20TransfersResponse, EvmEvent, EvmGetNFTTradesMarketplaceEnum, EvmInternalTransaction, EvmMarketDataERC20TokenItem, EvmMarketDataERC20TokensByPriceMovers, EvmMarketDataHottestNFTCollectionByTradingVolumeItem, EvmMarketDataTopNFTCollectionByMarketCapItem, EvmNative, EvmNft, EvmNftCollection, EvmNftMedia, EvmNftMetadata, EvmNftTransfer, EvmReviewContracts, EvmSignature, EvmSimpleBlock, EvmTrade, EvmTradeCollection, EvmTransaction, EvmTransactionLog, EvmTransactionLogDecoded, EvmTransactionTimestamp, EvmTransactionVerbose, EvmWalletActiveChain, EvmWalletActiveChains, EvmWeb3version, GetErc20TransfersOperation, GetHottestNFTCollectionsByTradingVolumeOperation, GetNFTTradesOperation, GetTopERC20TokensByMarketCapOperation, GetTopERC20TokensByPriceMoversOperation, GetTopNFTCollectionsByMarketCapOperation, GetWalletActiveChainsOperation, ReviewContractsOperation, Web3ApiVersionOperation, endpointWeightsOperation, getBlockOperation, getContractEventsOperation, getContractLogsOperation, getContractNFTsOperation, getDateToBlockOperation, getErc20ApprovalsOperation, getErc20BurnsOperation, getErc20MintsOperation, getErc20TransfersOperation, getInternalTransactionsOperation, getMultipleNFTsOperation, getNFTContractMetadataOperation, getNFTContractTransfersOperation, getNFTLowestPriceOperation, getNFTMetadataOperation, getNFTOwnersOperation, getNFTTokenIdOwnersOperation, getNFTTradesOperation, getNFTTransfersByBlockOperation, getNFTTransfersFromToBlockOperation, getNFTTransfersOperation, getNativeBalanceOperation, getNativeBalancesForAddressesOperation, getPairAddressOperation, getPairReservesOperation, getTokenAllowanceOperation, getTokenMetadataBySymbolOperation, getTokenMetadataOperation, getTokenPriceOperation, getTokenTransfersOperation, getTransactionOperation, getTransactionVerboseOperation, getWalletNFTCollectionsOperation, getWalletNFTTransfersOperation, getWalletNFTsOperation, getWalletTokenBalancesOperation, getWalletTokenTransfersOperation, getWalletTransactionsOperation, getWalletTransactionsVerboseOperation, operations, operationsV2, operationsV2All, reSyncMetadataOperation, resolveAddressOperation, resolveDomainOperation, resolveENSDomainOperation, runContractFunctionOperation, searchNFTsOperation, syncNFTContractOperation, uploadFolderOperation, web3ApiVersionOperation };
