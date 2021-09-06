import {
  ADD_VISITORS,
  ADD_UNREAD_TICKETS,
  ADD_UNREAD_CHATS,
} from "./constants";

const initialState = {
  onlineVisitors: [],
  unreadTickets: 0,
  unreadChats: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_VISITORS) {
    return { ...state, onlineVisitors: action.payload };
  } else if (action.type === ADD_UNREAD_TICKETS) {
    return { ...state, unreadTickets: action.payload };
  } else if (action.type === ADD_UNREAD_CHATS) {
    return { ...state, unreadChats: action.payload };
  }
  return state;
}

export default rootReducer;
