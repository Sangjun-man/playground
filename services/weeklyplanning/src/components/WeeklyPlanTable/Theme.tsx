import { PropsWithChildren } from "react";
import { WeeklyPlanModelData } from "../../type";
import { aggregatedThemeDaysTime } from "../../utils/aggregatedTime";

const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function WeeklyPlanTableTheme({
  themes,
}: {
  themes: WeeklyPlanModelData["themes"];
}) {
  return (
    <>
      {themes.map(({ title: themeTitle, categories }) => (
        <>
          <tr key={themeTitle}>
            <CategoryRow categories={categories} themeTitle={themeTitle} />
          </tr>
          <tr>
            <td></td>
            {weekDay.map((day) => (
              <td>
                {aggregatedThemeDaysTime({ themes, title: themeTitle })[day]}
              </td>
            ))}
            <td></td>
          </tr>
        </>
      ))}
    </>
  );
}

function CategoryRow({
  themeTitle,
  categories,
}: {
  themeTitle: string;
  categories: WeeklyPlanModelData["themes"][0]["categories"];
}) {
  return (
    <>
      {categories.map(({ title, actions, planned_time }, index) => (
        <>
          {index === 0 && <td rowSpan={categories.length + 1}>{themeTitle}</td>}
          <Cell time={planned_time || 0}>{title}</Cell>
          {weekDay.map((day) => {
            const thisDayAction = actions.find((action) => action.day === day);
            return (
              <Cell key={day} time={thisDayAction?.planned_time}>
                {thisDayAction?.title}
              </Cell>
            );
          })}
          <td>{actions.reduce((acc, cur) => acc + cur.planned_time, 0)}</td>
        </>
      ))}
    </>
  );
}

function Cell({ children, time }: PropsWithChildren<{ time?: number }>) {
  if (time !== undefined && time >= 0) {
    return (
      <td>
        <div>{children}</div>
        <div>{time}</div>
      </td>
    );
  } else {
    return <td>{children}</td>;
  }
}
