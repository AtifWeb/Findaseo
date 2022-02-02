import { getUser } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import { data } from "App/Utils/AnalyticsChart";
import { getUserEmailFromEmailTicket } from "helpers";
import Axios from "../axios";

const user = getUser();

export const fetchTodolist = async () => {
  if (!user) throw new Error("You are unauthenticated!");
  return Axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/todolist`,
    data: {
      cID: user?.cID,
    },
  })
    .then((result) => {
      if (result.data.success) {
        return result.data.todolist;
      } else {
        return {};
      }
    })
    .catch((e) => {
      throw new Error(handleError(e));
    });
};

export const fetchStats = () => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/getStats`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          return result.data.stats;
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const fetchOperatorsAndDepartments = () => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/operators/fetch`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          return result.data;
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const fetchContacts = async ({ queryKey: [_, type] }) => {
  return Axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/contacts/${type}`,
    data: {
      cID: user?.cID,
    },
  })
    .then((result) => {
      if (result.data.success) {
        return type === "EmailTickets"
          ? [
              ...result.data.contacts
                .reduce(
                  (map, obj) =>
                    map.set(getUserEmailFromEmailTicket(obj).email, obj),
                  new Map()
                )
                .values(),
            ]
          : [
              ...result.data.contacts
                .reduce((map, obj) => map.set(obj.email, obj), new Map())
                .values(),
            ];
      } else {
        return [];
      }
    })
    .catch((e) => {
      throw new Error(handleError(e));
    });
};

const DUE_HOURS = 24;

export const fetchTickets = ({ queryKey: [_, department = ""] }) => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/email-ticket/fetch`,
      data: {
        cID: user?.cID,
        type: "all",
        department,
      },
    })
      .then((result) => {
        if (result.data.success) {
          const t = result.data.tickets;

          let tickets = {
            all: [...t],
            open: [...t.filter((ticket) => ticket.status == "Open")],
            due: [
              ...t.filter(
                (ticket) =>
                  new Date(ticket.timestamp).getTime() <
                  new Date().getTime() - 1000 * 60 * 60 * DUE_HOURS
              ),
            ],
            onhold: [...t.filter((ticket) => ticket.status == "Pending")],
            unassigned: [...t.filter((ticket) => !ticket.assignee)],
          };
          return { ...result.data, tickets };
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const fetchBookings = () => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          let ev = [];
          result.data.bookings?.forEach((boo) => {
            let month = String(
              new Date(boo?.locationData?.startTime).getMonth()
            );
            let day = String(new Date(boo?.locationData?.startTime).getDate());
            if (month.length === 1) {
              month = "0" + month;
            }
            if (day.length === 1) {
              day = "0" + day;
            }
            ev.push({
              title: boo?.locationData?.topic,
              description: boo?._id,
              start: `${new Date(
                boo?.locationData?.startTime
              ).getFullYear()}-${month}-${day}`,
              end: `${new Date(
                boo?.locationData?.startTime
              ).getFullYear()}-${month}-${day}`,
            });
          });

          return { ...result.data, events: ev };
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const fetchSettings = () => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/settings`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          return result.data;
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const getChats = ({ queryKey: [_, chatID] }) => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/live-chat${
        chatID ? "/" + chatID : ""
      }`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          const c = result.data.conversations;
          c.sort(
            (a, b) =>
              new Date(b.latestChat.timestamp).getTime() -
              new Date(a.latestChat.timestamp).getTime()
          );

          const conversations = chatID
            ? [
                c.filter((a, b) => a.uuid === chatID)[0],
                ...c.filter((a, b) => a.uuid !== chatID),
              ]
            : [...c];

          const operatorID = result.data.operatorID;

          let p = result.data?.pages;
          p?.sort((a, b) => b.timestamp - a.timestamp);

          return {
            conversations,
            operatorID,
            pages: p || [],
            chatter: result.data.user,
            visitor: result.data.visitor,
            notes: result.data?.visitor?.notes || "",
          };
        } else {
          return {};
        }
      })
      .catch((e) => {
        console.log(e);
        throw new Error(handleError(e));
      })
  );
};

export const fetchTicketConversation = ({ queryKey: [_, id] }) => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/email-ticket/get`,
      data: {
        cID: user?.cID,
        ticketID: id,
      },
    })
      .then((result) => {
        if (result.data.success) {
          return result.data;
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};

export const getCalendar = ({ queryKey: [_, companyName, slug] }) => {
  return Axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/get`,
    data: {
      companyName: companyName?.toLowerCase(),
      slug,
    },
  })
    .then((result) => {
      if (result.data.success) {
        return result.data;
      } else {
        window.location = "/";
      }
    })
    .catch((e) => {
      throw new Error(handleError(e));
    });
};

export const fetchCalendars = () => {
  return (
    user &&
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/calendar-bookings/calendars`,
      data: {
        cID: user?.cID,
      },
    })
      .then((result) => {
        if (result.data.success) {
          return result.data;
        } else {
          return {};
        }
      })
      .catch((e) => {
        throw new Error(handleError(e));
      })
  );
};
