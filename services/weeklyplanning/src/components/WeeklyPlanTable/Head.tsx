import { getDatesOfIsoWeek } from "../../utils/getDatesOfIsoWeek";

interface WeeklyPlanTableHeadProps {
  year: number;
  week: number;
}
export default function WeeklyPlanTableHead({
  year,
  week,
}: WeeklyPlanTableHeadProps) {
  const weekDates = getDatesOfIsoWeek(year, week);

  return (
    <>
      <tr>
        <th rowSpan={4} colSpan={2}>
          {`${year}-${week}번째 주 계획`}
        </th>
        {weekDates.map((date) => (
          <th>{date}</th>
        ))}
        <th rowSpan={2}>합계</th>
      </tr>
      <tr>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th>토</th>
        <th>일</th>
      </tr>
    </>
  );
}
