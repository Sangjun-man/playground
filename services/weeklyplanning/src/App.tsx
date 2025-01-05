import "./App.css";
import WeeklyPlannerTable from "./components/WeeklyPlanTable";
import { WeeklyPlanModelData } from "./type";

function App() {
  const weeklyData: WeeklyPlanModelData = {
    year: 2025,
    week: 2,
    themes: [
      {
        title: "사이드프로젝트",
        categories: [
          {
            title: "자기관리시스템",
            actions: [
              {
                title: "기능정리해보기",
                day: "mon" as const,
                planned_time: 10,
              },
              {
                title: "하위하위",
                day: "tue" as const,
                planned_time: 2,
              },
            ],
          },
        ],
      },
      {
        title: "계획짜기",
        categories: [
          {
            title: "후에에엥",
            actions: [
              {
                title: "이거 쉽지않ㄴ은데",
                day: "fri" as const,
                planned_time: 10,
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <WeeklyPlannerTable data={weeklyData} />
    </>
  );
}

export default App;
