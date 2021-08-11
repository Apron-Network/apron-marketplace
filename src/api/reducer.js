const reducer = (state, action) => {
    switch (action.type) {
        //api
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, api: action.payload, apiState: 'CONNECTING' };

        case 'CONNECT_SUCCESS':
            return { ...state, apiState: 'READY' };

        case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

        //main contract
        case 'LOAD_MARKET':
            return { ...state, maincontractState: 'LOAD_MARKET' };

        case 'SET_MARKET':
            return { ...state, marketcontract: action.payload, maincontractState: 'READY' };

        case 'MAINCONTRACT_ERROR':
            return { ...state, marketcontract: null, maincontractState: 'ERROR' };

        //accounts
        case 'LOAD_ALLACCOUNTS':
            return { ...state, allaccountsState: 'LOAD_ALLACCOUNTS' };

        case 'SET_ALLACCOUNTS':
            return { ...state, allAccounts: action.payload, allaccountsState: 'READY' };

        case 'ALLACCOUNTS_ERROR':
            return { ...state, allAccounts: null, allaccountsState: 'ERROR' };

        //base
        case 'LOAD_STATS':
            return { ...state, basecontractState: 'LOAD_STATS' };

        case 'SET_STATS':
            return { ...state, statscontract: action.payload, basecontractState: 'READY' };

        case 'BASE_ERROR':
            return { ...state, statscontract: null, basecontractState: 'ERROR' };

        case 'SET_MSG':
            return { ...state, message: action.payload };


        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
