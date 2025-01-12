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
  const { createTheme } = useHandleWeeklyPlanTable();

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
              <td colSpan={2}></td>
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
  const {
    createCategory,
    editTheme,
    editAction,
    editCategory,
    deleteTheme,
    deleteCategory,
  } = useHandleWeeklyPlanTable();

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
                  height: "100%",
                  position: "relative",
                }}
                rowSpan={categories.length + 1}
              >
                <div
                  suppressContentEditableWarning={true}
                  contentEditable
                  onBlur={handleTheme(themeId)}
                >
                  {themeTitle}
                </div>

                <button
                  className="deleteTheme"
                  onClick={() => deleteTheme(themeId)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: 2,
                  }}
                >
                  x
                </button>
              </td>
            )}
            <td className={cellContainer}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <Cell
                  handleEditTitle={handleCategory(categoryId, "title")}
                  handleEditTime={handleCategory(categoryId, "planned_time")}
                  time={planned_time}
                >
                  {title}
                </Cell>
                <button
                  className="deleteCategory"
                  onClick={() => deleteCategory(categoryId)}
                  style={{
                    padding: 2,
                  }}
                >
                  x
                </button>
              </div>
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
                    time={thisDayAction?.planned_time}
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
      <tr className="addCategory">
        <td
          colSpan={9}
          onClick={() => {
            createCategory(themeId);
          }}
        ></td>
      </tr>
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
    width: 100%;
    display: flex;
    gap: 12;
  `;
  const cellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    wordBreak: "break-all",
  };

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
        {Number(time) > 0 ? time : ""}
      </div>
    </div>
  );
}
