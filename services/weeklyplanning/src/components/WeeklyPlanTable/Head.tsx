import useHandleWeeklyPlanTable from "../../hooks/useWeeklyPlanTable";
import { getDatesOfIsoWeek } from "../../utils/getDatesOfIsoWeek";
import * as style from "./index.css";

export default function WeeklyPlanTableHead() {
  const { planState, editPlan } = useHandleWeeklyPlanTable();
  const weekDates = getDatesOfIsoWeek(planState.year, planState.week);

  const handlePlanWeek = (type: "next" | "prev") => {
    if (type === "prev") {
      editPlan({
        id: planState.id,
        week: planState.week > 1 ? planState.week - 1 : 12,
        year: planState.week > 1 ? planState.year : planState.year - 1,
      });
    }
    if (type === "next") {
      editPlan({
        id: planState.id,
        week: planState.week < 12 ? planState.week + 1 : 1,
        year: planState.week < 12 ? planState.year : planState.year + 1,
      });
    }
  };

  return (
    <>
      <tr className={style.tableHeader}>
        <th rowSpan={4} colSpan={2}>
          <button
            style={{
              padding: 2,
              margin: 10,
            }}
            onClick={() => handlePlanWeek("prev")}
          >
            &lt;
          </button>
          {`${planState.year}-${planState.week}번째 주 계획`}
          <button
            style={{
              padding: 2,
              margin: 10,
            }}
            onClick={() => handlePlanWeek("next")}
          >
            &gt;
          </button>
        </th>
        {weekDates.map((date) => (
          <th key={date}>{date}</th>
        ))}
        <th rowSpan={2}>합계</th>
      </tr>
      <tr className={style.tableDateHeader}>
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
