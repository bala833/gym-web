import react from "react";

export function DateFilter(d2) {
  var today = new Date();
  var d1 =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var dateFirst = d1.split("-");
  var dateSecond = d2.split("-");
  var from_to = new Date(dateFirst[0], dateFirst[1], dateFirst[2]); //Year, Month, Date
  var valid_to = new Date(dateSecond[0], dateSecond[1], dateSecond[2]);
  if (valid_to >= from_to) {
    return true;
  } else {
    return false;
  }
}
