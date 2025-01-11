import { useAtomValue } from "jotai";
import "./App.css";
import WeeklyPlannerTable from "./components/WeeklyPlanTable";
import { planAtom } from "./atom";

function App() {
  const planState = useAtomValue(planAtom);
  return (
    <>
      <WeeklyPlannerTable data={planState} />
    </>
  );
}

export default App;
