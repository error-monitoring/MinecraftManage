

import { format } from "date-fns";

// 时间格式化 filter
const date = value => {
  return format(value, "YYYY-MM-DD hh:mm:ss");
};

export default {
  date
};
