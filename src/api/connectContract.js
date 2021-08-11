import { ContractPromise } from '@polkadot/api-contract';

import marketAbi from '../abi/services_market';
import statsAbi from '../abi/services_statistics';

const ConnectContract = async (api,type,address) =>{
    if(!api){
      return
    }
    let abi;
    abi = marketAbi;
    switch(type){

        case'stats':
            abi = statsAbi;
            break;
        default:
        case'market':
            abi = marketAbi;
            break;

    }
    const mainContract = new ContractPromise(api, abi, address);
    return mainContract;
  }

export default ConnectContract
