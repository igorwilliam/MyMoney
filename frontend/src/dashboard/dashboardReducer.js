const INITIAL_STATE = {summary: {credits: 0, debts: 0}}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_SUMMARY_FETCHED':
            return {...state, summary: action.payload.data}  
        default:
            return state 
    }
}