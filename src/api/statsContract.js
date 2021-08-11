import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";
let loadMain = false;
const { configuration } = window;
let statscontract;

export default async function statsConnect(state, dispatch) {

    const { apiState, api, statscontractState } = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account) return;
    const asyncLoadMain = async () => {
        try {
            statscontract = await ConnectContract(api, 'stats', configuration.statistics);
            dispatch({ type: 'SET_STATS', payload: statscontract });

        } catch (e) {
            console.error(e);
            dispatch({ type: 'STATS_ERROR' });
        }
    };
    if (statscontractState !== 'LOAD_STATS') return;
    if (loadMain) return dispatch({ type: 'SET_STATS', payload: statscontract });
    loadMain = true;
    asyncLoadMain();
}
