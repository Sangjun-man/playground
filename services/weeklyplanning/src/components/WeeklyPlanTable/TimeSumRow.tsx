import { Theme } from "../../type";
import { aggregatedWeekPlanDaysTime } from "../../utils/aggregatedTime";

const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export default function TimeSumRow({ themes }: { themes: Theme[] }) {
  const { days: daysPlannedTime, all: allPlannedTime } =
    aggregatedWeekPlanDaysTime({ themes });

  return (
    <tr>
      <td colSpan={2}></td>
      {weekDay.map((day) => (
        <td key={day}>{daysPlannedTime[day]}</td>
      ))}
      <td>{allPlannedTime}</td>
    </tr>
  );
}
