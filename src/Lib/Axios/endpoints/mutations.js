import { getUser } from "App/helpers/auth";
import handleError from "App/helpers/handleError";
import Axios from "../axios";

const user = getUser();

export const manageOperator = async ({
  operator,
  action,
  department,
  name,
  email,
}) => {
  let operatorID = operator?._id;
  if (action === "department") {
    if (!operatorID || !department) return;
  } else {
    if (!name || !email) return;
  }
  console.log("here");
  return Axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/operators`,
    data: {
      cID: user?.cID,
      name: action === "department" ? " " : name,
      email: action === "department" ? " " : email,
      action,
      department,
      operatorID,
    },
  })
    .then((result) => {
      if (result.data.success) {
        console.log(result.data);
        return result.data;
      } else {
        return {};
      }
    })
    .catch((e) => {
      throw new Error(handleError(e));
    });
};
