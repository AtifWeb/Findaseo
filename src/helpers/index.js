export const getUserEmailFromEmailTicket = (ticket) => {
  let email = "";
  let name = "";
  if (ticket?.emailData?.to?.value[0].address?.indexOf("pavelify.com") === -1) {
    email = ticket?.emailData?.to?.value[0].address;
    name = ticket?.emailData?.to?.value[0].name;
  } else {
    email = ticket?.emailData?.from?.value[0].address;
    name = ticket?.emailData?.from?.value[0].name;
  }
  return { email, name };
};
