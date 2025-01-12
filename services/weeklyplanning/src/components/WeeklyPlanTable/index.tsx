import { Plan } from "../../type";
import WeeklyPlanTableHead from "./Head";
import WeeklyPlanTableTheme from "./Theme";
import WeeklyPlanTableTimeSumRow from "./TimeSumRow";

export default function WeeklyPlannerTable({ data }: { data: Plan }) {
  return (
    <table border={1}>
      <thead>
        <WeeklyPlanTableHead />
      </thead>
      <tbody>
        <WeeklyPlanTableTheme themes={data.themes} />
        <WeeklyPlanTableTimeSumRow themes={data.themes} />
      </tbody>
    </table>
  );
}
