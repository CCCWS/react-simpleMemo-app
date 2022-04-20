export const scoreList = [
  {
    score_id: 1,
    score_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    score_descript: "완벽",
  },
  {
    score_id: 2,
    score_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    score_descript: "만족",
  },
  {
    score_id: 3,
    score_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    score_descript: "보통",
  },
  {
    score_id: 4,
    score_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    score_descript: "별로",
  },
  {
    score_id: 5,
    score_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    score_descript: "망함",
  },
];

export const sortType = [
  { value: "new", name: "최신순" },
  { value: "old", name: "오래된순" },
];
export const filterType = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋음" },
  { value: "normal", name: "보통" },
  { value: "bad", name: "나쁨" },
];
//select의 option을 정의
