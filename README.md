# evmos-hardhat-rpc-issue

This repo is to test the issue with the evmos hardhat rpc provider.

## Steps to reproduce

1. Clone the repo
2. Run `npm install`
3. Run `npm run build`
5. Run `cp .env.example .env`
6. Fill in the private key in the .env file

## Expected behavior

The test should pass, meaning the contract deployment should revert, for both networks.

## Actual behavior

After running:
```
npx hardhat test --network fantom
```
and
```
npx hardhat test --network evmos
```

The test will pass for the fantom network, and fail for the evmos network.
When running the test with the evmos network, the test will fail with the following error:

```
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="rpc error: code = Unknown desc = execution reverted", method="estimateGas", transaction={"from":"0x9159C650e1D7E10a17c450eb3D50778aBA593D61","data":"0x6080604052348015600f57600080fd5b50604051631ce5e8d560e11b815260040160405180910390fdfe","accessList":null}, error={"name":"ProviderError","_stack":"ProviderError: rpc error: code = Unknown desc = execution reverted\n    at HttpProvider.request (/Users/guillem/Desktop/Peersyst/axelar-shit/evmos-hardhat-rpc-issue/node_modules/hardhat/src/internal/core/providers/http.ts:107:21)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at EthersProviderWrapper.send (/Users/guillem/Desktop/Peersyst/axelar-shit/evmos-hardhat-rpc-issue/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)","code":-32000,"_isProviderError":true}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)
```

The reason why this is happening is because the evmos rpc provider does not return a `data` field in the error response, while the fantom one does. `@nomicfoundation/hardhat-chai-matchers` uses this field to try to obtain the return data from a transaction [getReturnDataFromError](https://github.com/NomicFoundation/hardhat/blob/%40nomicfoundation/hardhat-chai-matchers%402.0.2/packages/hardhat-chai-matchers/src/internal/reverted/utils.ts). Fantom rpc returns the error data, but evmos doesn't, so the test fails.
