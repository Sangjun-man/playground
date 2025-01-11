import {
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  PropsWithChildren,
} from "react";
import { aggregatedThemeDaysTime } from "../../utils/aggregatedTime";
import { Action, Category, DayString, Theme } from "../../type";
import useHandleWeeklyPlanTable from "../../hooks/useWeeklyPlanTable";
import { css } from "@emotion/css";

const weekDay = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as DayString[];

export default function WeeklyPlanTableTheme({ themes }: { themes: Theme[] }) {
  const { createTheme, createCategory } = useHandleWeeklyPlanTable();

  return (
    <>
      {themes.map(
        ({ title: themeTitle, categories, id: themeId }, themeIndex) => (
          <>
            <CategoryRow
              key={themeId}
              themeId={themeId}
              categories={categories}
              themeTitle={themeTitle}
              themeIndex={themeIndex}
            />
            <tr>
              <td onClick={() => createCategory(themeId)} colSpan={2}>
                +
              </td>
              {weekDay.map((day) => (
                <td key={day}>
                  {aggregatedThemeDaysTime({ themes, id: themeId })[day]}
                </td>
              ))}
              <td></td>
            </tr>
          </>
        )
      )}
      <tr>
        <td
          className="addTheme"
          style={{
            height: 4,
            fontSize: 1,
          }}
          colSpan={10}
          onClick={createTheme}
        >
          +
        </td>
      </tr>
    </>
  );
}

function CategoryRow({
  themeId,
  themeTitle,
  themeIndex,
  categories,
}: {
  themeId: Theme["id"];
  themeTitle: string;
  themeIndex: number;
  categories: Category[];
}) {
  const { editTheme, editAction, editCategory } = useHandleWeeklyPlanTable();

  const handleTheme: (themeId: Theme["id"]) => FormEventHandler<HTMLElement> =
    (themeId) => (e) => {
      const { innerText } = e.target as HTMLElement;
      editTheme({
        id: themeId,
        title: innerText,
      });
    };

  const handleCategory: (
    categoryId: Category["id"],
    type: keyof Pick<Category, "planned_time" | "title">
  ) => FormEventHandler<HTMLElement> = (categoryId, type) => (e) => {
    const { innerText } = e.target as HTMLElement;
    editCategory({
      id: categoryId,
      title: innerText,
      [type]: innerText,
    });
  };

  const handleAction: (
    categoryIndex: number,
    categoryId: Category["id"],
    day: DayString,
    type: keyof Pick<Action, "planned_time" | "title">
  ) => FormEventHandler<HTMLElement> =
    (categoryIndex, categoryId, day, type) => (e) => {
      const { innerText } = e.target as HTMLElement;
      editAction({
        themeIndex,
        categoryIndex,
        category_id: categoryId,
        day: day,
        [type]: type === "title" ? innerText : Number(innerText),
      });
    };

  const cellContainer = css`
    position: relative;
    min-width: 120px;
    max-width: 160px;
    width: 100%;
  `;
  return (
    <>
      {categories.map(
        ({ id: categoryId, title, actions, planned_time }, categoryIndex) => (
          <tr key={categoryId}>
            {categoryIndex === 0 && (
              <td
                style={{
                  minWidth: 100,
                }}
                rowSpan={categories.length}
              >
                <div
                  suppressContentEditableWarning={true}
                  contentEditable
                  onInput={handleTheme(themeId)}
                >
                  {themeTitle}
                </div>
              </td>
            )}
            <td className={cellContainer}>
              <Cell
                handleEditTitle={handleCategory(categoryId, "title")}
                handleEditTime={handleCategory(categoryId, "planned_time")}
                time={planned_time || 0}
              >
                {title}
              </Cell>
            </td>
            {weekDay.map((day) => {
              const thisDayAction = actions.find(
                (action) => action.day === day
              );
              return (
                <td className={cellContainer}>
                  <Cell
                    key={day}
                    handleEditTitle={handleAction(
                      categoryIndex,
                      categoryId,
                      day,
                      "title"
                    )}
                    handleEditTime={handleAction(
                      categoryIndex,
                      categoryId,
                      day,
                      "planned_time"
                    )}
                    time={thisDayAction?.planned_time || 0}
                  >
                    {thisDayAction?.title}
                  </Cell>
                </td>
              );
            })}
            <td>{actions.reduce((acc, cur) => acc + cur.planned_time, 0)}</td>
          </tr>
        )
      )}
    </>
  );
}

function Cell({
  children,
  time,
  handleEditTitle = () => {},
  handleEditTime = () => {},
}: PropsWithChildren<{
  time?: number;
  handleEditTitle?: FocusEventHandler<HTMLDivElement>;
  handleEditTime?: FocusEventHandler<HTMLDivElement>;
}>) {
  const wrapper = css`
    display: flex;
    gap: 12;
  `;
  const cellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    wordBreak: "break-all",
  };

  if (time !== undefined && time >= 0) {
    return (
      <div className={wrapper}>
        <div
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleEditTitle}
          style={{
            ...cellStyle,
            flexGrow: 1,
          }}
        >
          {children}
        </div>

        <div
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleEditTime}
          style={{
            ...cellStyle,
            width: 30,
          }}
        >
          {time}
        </div>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
}
