import { Theme, Plan } from "../type";
const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const aggregatedThemeDaysTime = ({
  themes,
  id,
}: {
  themes: Plan["themes"];
  id: Theme["id"];
}) => {
  const theme = themes.find((theme) => theme.id === id);
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
  themes: Plan["themes"];
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
