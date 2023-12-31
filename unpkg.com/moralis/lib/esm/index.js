import { Streams } from '@moralisweb3/streams';
import { ApiUtils } from '@moralisweb3/api-utils';
import { Auth } from '@moralisweb3/auth';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '@moralisweb3/evm-api';
import { AptosApi } from '@moralisweb3/aptos-api';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { SolApi } from '@moralisweb3/sol-api';
import { Core, CoreProvider } from '@moralisweb3/common-core';

// Core
var core = Core.create();
// Utility modules
var commonEvmUtils = CommonEvmUtils.create(core);
var commonSolUtils = CommonSolUtils.create(core);
var apiUtils = ApiUtils.create(core);
// Feature modules
var auth = Auth.create(core);
var streams = Streams.create(core);
var evmApi = EvmApi.create(core);
var solApi = SolApi.create(core);
var aptosApi = AptosApi.create(core);
// Register all Moralis modules to Core
core.registerModules([commonEvmUtils, commonSolUtils, auth, apiUtils, evmApi, solApi, streams]);
CoreProvider.setDefault(core);
var Moralis = {
    Core: core,
    Auth: auth,
    Streams: streams,
    EvmApi: evmApi,
    SolApi: solApi,
    AptosApi: aptosApi,
    EvmUtils: commonEvmUtils,
    SolUtils: commonSolUtils,
    start: function (config) {
        return core.start(config);
    },
};

export { Moralis as default };
