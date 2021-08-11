import ConnectContract from './connectContract';
let loadMain = false;
let maincontract;

const  {configuration} = window;
export default async function mainConnect(state, dispatch) {

    const {apiState, api, maincontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || (account && !account.length)) return;
    const asyncLoadMain = async () => {

        try {
            maincontract = await ConnectContract(api, 'market', configuration.market);
            dispatch({type: 'SET_MARKET', payload: maincontract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'MAINCONTRACT_ERROR'});
        }
    };
    if (maincontractState !== 'LOAD_MARKET') return;
    if (loadMain) return dispatch({type: 'SET_MARKET', payload: maincontract});
    loadMain = true;
    asyncLoadMain();
}
