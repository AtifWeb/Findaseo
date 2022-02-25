import {
  ADD_VISITORS,
  ADD_UNREAD_TICKETS,
  ADD_UNREAD_CHATS,
  ADD_UPCOMING_BOOKINGS,
} from "./constants";

const initialState = {
  onlineVisitors: [],
  unreadTickets: 0,
  unreadChats: [],
  upcomingBookings: 0,
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_VISITORS) {
    return { ...state, onlineVisitors: action.payload };
  } else if (action.type === ADD_UNREAD_TICKETS) {
    return { ...state, unreadTickets: action.payload };
  } else if (action.type === ADD_UPCOMING_BOOKINGS) {
    return { ...state, upcomingBookings: action.payload };
  } else if (action.type === ADD_UNREAD_CHATS) {
    return { ...state, unreadChats: action.payload };
  }
  return state;
}

export default rootReducer;
