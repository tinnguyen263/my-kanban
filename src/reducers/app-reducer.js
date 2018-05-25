import {ActionTypes} from '../action-types';
import {INITIAL_STATE} from '../initial-state';

const appReducer = (state = INITIAL_STATE.app, action) => {
    switch (action.type) {
        case ActionTypes.app.SET_APP_READY:
            return Object.assign({}, state, {
                ...state,
                ready: true,
            });

        case ActionTypes.app.SET_FETCH_START:
            return Object.assign({}, state, {
                ...state,
                fetching: true,
            });
        case ActionTypes.app.SET_FETCH_END:
            return Object.assign({}, state, {
                ...state,
                fetching: false,
            });

        case ActionTypes.app.SET_NETWORK_ONLINE:
            return Object.assign({}, state, {
                ...state,
                offline: false,
            });
        case ActionTypes.app.SET_NETWORK_OFFLINE:
            return Object.assign({}, state, {
                ...state,
                offline: true,
            });

        case ActionTypes.app.SHOW_TOAST:
            return Object.assign({}, state, {
                ...state,
                globalToast: {
                    show: true,
                    message: action.payload.message,
                },
            });
        case ActionTypes.app.HIDE_TOAST:
            return Object.assign({}, state, {
                ...state,
                globalToast: {
                    show: false,
                    message: null,
                },
            });

        case ActionTypes.app.SET_DRAWER_MINIMIZATION:
            return Object.assign({}, state, {
                ...state,
                drawer: state.smallScreen ?
                    {
                        opened: state.drawer.opened,
                        minimized: false,
                    }:
                    {
                        opened: true,
                        minimized: action.payload.minimized,
                    },
            });

        default:
            return state;
    }
};

export default appReducer;