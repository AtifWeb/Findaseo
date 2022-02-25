const SEPERATOR = "@";
export const generateRoomID = (cID, uuid) => {
  if (!cID || !uuid) return false;
  return cID + SEPERATOR + uuid;
};

export const seperateRoomID = (roomID) => {
  if (!roomID) return false;
  let [cID, uuid] = roomID.split(SEPERATOR);
  return { cID, uuid };
};
