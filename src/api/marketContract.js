import ConnectContract from './connectContract';
let loadMain = false;
let marketcontract;

const  {configuration} = window;
export default async function marketConnect(state, dispatch) {

    const {apiState, api, marketcontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || (account && !account.length)) return;
    const asyncLoadMain = async () => {

        try {
            marketcontract = await ConnectContract(api, 'market', configuration.market);
            dispatch({type: 'SET_MARKET', payload: marketcontract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'MARKET_ERROR'});
        }
    };
    if (marketcontractState !== 'LOAD_MARKET') return;
    if (loadMain) return dispatch({type: 'SET_MARKET', payload: marketcontract});
    loadMain = true;
    asyncLoadMain();
}
