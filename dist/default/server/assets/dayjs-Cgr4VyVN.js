import dayjs from "dayjs";
const getDurationUnix = (timeType) => {
  let startAt, endAt;
  const now = dayjs();
  if (["day", "week", "month", "year"].includes(timeType)) {
    startAt = now.startOf(timeType).valueOf();
    endAt = now.endOf(timeType).valueOf();
  } else if (["yesterday", "lastweek", "lastmonth"].includes(timeType)) {
    const type = timeType.replace(/^(last|yester)/, "");
    startAt = now.subtract(1, type).startOf(type).valueOf();
    endAt = now.subtract(1, type).endOf(type).valueOf();
  } else if (timeType === "beforeyesterday") {
    startAt = now.subtract(2, "day").startOf("day").valueOf();
    endAt = now.subtract(2, "day").endOf("day").valueOf();
  } else if (timeType.endsWith("h")) {
    endAt = now.endOf("hour").valueOf();
    startAt = now.subtract(parseInt(timeType), "h").startOf("hour").valueOf();
  } else if (timeType.endsWith("d")) {
    endAt = now.endOf("day").valueOf();
    startAt = now.subtract(parseInt(timeType), "d").startOf("day").valueOf();
  }
  return {
    startAt,
    endAt
  };
};
export {
  getDurationUnix as g
};
