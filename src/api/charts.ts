import request from "../utils/request";

export const fetchtodaydeathSum = (id: number) => {
  return request({
    url: `/api/v1/todaydeath/${id}`,
    method: "get",
  });
};
