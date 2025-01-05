import { WeeklyPlanModelData } from "../../type";
import { aggregatedWeekPlanDaysTime } from "../../utils/aggregatedTime";

const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function TimeSumRow({
  themes,
}: {
  themes: WeeklyPlanModelData["themes"];
}) {
  const { days: daysPlannedTime, all: allPlannedTime } =
    aggregatedWeekPlanDaysTime({ themes });

  return (
    <tr>
      <td colSpan={2}></td>
      {weekDay.map((day) => (
        <td>{daysPlannedTime[day]}</td>
      ))}
      <td>{allPlannedTime}</td>
    </tr>
  );
}
