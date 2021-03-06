export const APP_ROUTE_CHANGING = 'APP_ROUTE_CHANGING';
export const APP_ROUTE_CHANGED = 'APP_ROUTE_CHANGED';

export const SET_ROUTE_DATA = 'SET_ROUTE_DATA';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const NAVIGATE = 'NAVIGATE';


export const setRouteData = (page, data) => ({
  type: SET_ROUTE_DATA,
  payload: {
    page,
    data,
  },
});

export const changeRoute = (location) => ({
  type: CHANGE_ROUTE,
  payload: {location},
});

export const navigate = (title, path) => ({
  type: NAVIGATE,
  payload: {title, path},
});

