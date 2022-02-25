import {
  ADD_VISITORS,
  ADD_UNREAD_TICKETS,
  ADD_UNREAD_CHATS,
  ADD_UPCOMING_BOOKINGS,
} from "./constants";

export function addVisitors(payload) {
  return { type: ADD_VISITORS, payload };
}
export function addUnreadTickets(payload) {
  return { type: ADD_UNREAD_TICKETS, payload };
}
export function addUpcomingBookings(payload) {
  return { type: ADD_UPCOMING_BOOKINGS, payload };
}

export function addUnreadChats(payload) {
  return { type: ADD_UNREAD_CHATS, payload };
}
