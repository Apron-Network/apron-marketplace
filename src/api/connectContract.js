import { ContractPromise } from '@polkadot/api-contract';

import mainAbi from '../abi/services_market';
import baseAbi from '../abi/services_statistics';

const ConnectContract = async (api,type,address) =>{
    if(!api){
      return
    }
    let abi;
    abi = mainAbi;
    switch(type){

        case'base':
            abi = baseAbi;
            break;
        default:
        case'main':
            abi = mainAbi;
            break;

    }
    const mainContract = new ContractPromise(api, abi, address);
    return mainContract;
  }

export default ConnectContract
