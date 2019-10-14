import * as types from "../constants/index";

const initialState = {
    bots: [],
    error: null,
    addingBot: false,
    addingField: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_BOT_STARTED:
            return {
                ...state,
                addingBot: true,
                addingField: false,
            };
        case types.ADD_BOT_SUCCESS:
            return {
                ...state,
                addingField: false,
                addingBot: false,
                bots: [...state.bots, action.bot]
            };
        case types.ADD_BOT_ERROR:
            return {
                ...state,
                addingBot: false
            };
        case types.SHOW_ADD_FIELD:
            return {
                ...state,
                addingField: true
            }
        case types.HIDE_ADD_FIELD:
            return {
                ...state,
                addingField: false
            }

        case types.SET_BOT_SUCCESS:
            const tempBots = state.bots.map(item => {
                if (item.user === action.bot.user) {
                    return action.bot
                }
                return item;
            })
            return {
                ...state,
                bots: tempBots
            }
        case types.GET_BOT_SUCCESS:
            return {
                ...state,
                bots: action.bot
            }
        case types.STEAMGUARD_BOT_SUCCESS:

            const tempBots2 = state.bots.map(item => {
                if (item.user === action.bot.user) {
                    return action.bot
                }
                return item;
            })
            return {
                ...state,
                bots: tempBots2
            }

        case types.REMOVE_BOT_SUCCESS:

            let tempBots3 = [];
            state.bots.forEach((item, index) => {
                if (item.user !== action.bot.user) {
                    tempBots3.push(item);
                }
            })

            return {
                ...state,
                bots: tempBots3
            }

        default:
            return state;
    }
}


export default reducer;