import { Plan } from "../../type";
import WeeklyPlanTableHead from "./Head";
import WeeklyPlanTableTheme from "./Theme";
import WeeklyPlanTableTimeSumRow from "./TimeSumRow";
import * as styles from "./index.css";

export default function WeeklyPlannerTable({ data }: { data: Plan }) {
  return (
    <table className={styles.table}>
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
