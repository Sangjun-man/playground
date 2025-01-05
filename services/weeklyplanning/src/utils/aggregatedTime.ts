import { WeeklyPlanModelData } from "../type";
const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const aggregatedThemeDaysTime = ({
  themes,
  title,
}: {
  themes: WeeklyPlanModelData["themes"];
  title: string;
}) => {
  const theme = themes.find((theme) => theme.title === title);
  const defaultObj = Object.fromEntries(weekDay.map((day) => [day, 0]));
  if (!theme) return defaultObj;
  return theme.categories.reduce((acc, { actions }) => {
    actions.flatMap(({ day, planned_time }) => {
      acc[day] += planned_time;
    });
    return acc;
  }, defaultObj);
};

export const aggregatedWeekPlanDaysTime = ({
  themes,
}: {
  themes: WeeklyPlanModelData["themes"];
}) => {
  return themes.reduce(
    (acc, { categories }) => {
      categories.map(({ actions }) =>
        actions.flatMap(({ day, planned_time }) => {
          acc["days"][day] += planned_time;
          acc["all"] += planned_time;
        })
      );
      return acc;
    },
    { days: Object.fromEntries(weekDay.map((day) => [day, 0])), all: 0 }
  );
};
