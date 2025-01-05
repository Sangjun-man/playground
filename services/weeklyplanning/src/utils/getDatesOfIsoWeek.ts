import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

/**
 * 주어진 연도(year), 주차(week)에 해당하는 ISO 주의
 * 월요일부터 일요일까지 7일 간 날짜(YYYY-MM-DD)를 배열로 리턴
 */
export function getDatesOfIsoWeek(year: number, week: number): string[] {
  // 1) "연도-year"의 '1월 4일'을 기준으로 dayjs 객체 생성
  //    ISO 규칙상 1월 4일은 항상 '해당 연도의 1주차'에 해당
  const january4th = dayjs(`${year}-01-04`);

  // 2) january4th가 속한 주차 = 1주차가 됨
  //    여기에 .isoWeek(week)를 통해 원하는 주차로 이동
  const startOfTargetWeek = january4th.isoWeek(week).startOf("isoWeek");
  // 3) startOf('isoWeek') -> ISO 기준으로 '월요일' 날짜가 됨

  // 4) 월~일(7일) 날짜를 순회하며 배열로 반환
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfTargetWeek.add(i, "day").format("YYYY-MM-DD"));
  }
  return days;
}
