import { Theme, Plan, Category, Action } from "../type";
import { useAtom } from "jotai";
import { planAtom } from "../atom";
import { initAction, initCategory, initTheme } from "../utils/init";

const targetTheme = (_plan: Plan, themeId: Theme["id"]) =>
  _plan.themes[_plan.themes.findIndex(({ id }) => id === themeId)];

export default function useHandleWeeklyPlanTable() {
  const [planState, setPlanState] = useAtom<Plan>(planAtom);

  const createTheme = () => {
    setPlanState((prevPlanState) => {
      prevPlanState.themes.push(initTheme(prevPlanState.id));
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const createCategory = (themeId: Theme["id"]) => {
    setPlanState((prevPlanState) => {
      const theme = targetTheme(prevPlanState, themeId);
      theme.categories.push(initCategory(themeId));
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const deleteTheme = (themeId: Theme["id"]) => {
    setPlanState((prevPlanState) => {
      const themeIndex = prevPlanState.themes.findIndex(
        ({ id }) => id === themeId
      );
      prevPlanState.themes.splice(themeIndex, 1);
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const deleteCategory = (categoryId: Category["id"]) => {
    setPlanState((prevPlanState) => {
      planState.themes.forEach((theme, themeIndex) => {
        const categoryIndex = theme.categories.findIndex(
          ({ id }) => id === categoryId
        );
        if (categoryIndex >= 0) {
          prevPlanState.themes[themeIndex]["categories"].splice(
            categoryIndex,
            1
          );
        }
      });
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const editPlan = (
    options: { id: Plan["id"] } & Partial<Omit<Plan, "id" | "theme">>
  ) => {
    setPlanState((prevPlanState) => {
      prevPlanState.week = options.week ?? prevPlanState.week;
      prevPlanState.year = options.year ?? prevPlanState.year;
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const editTheme = (
    options: { id: Theme["id"] } & Partial<Omit<Theme, "id" | "categories">>
  ) => {
    setPlanState((prevPlanState) => {
      const themeIndex = prevPlanState.themes.findIndex(
        ({ id }) => id === options.id
      );
      prevPlanState.themes[themeIndex] = {
        ...prevPlanState.themes[themeIndex],
        ...options,
      };
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const editCategory = (
    options: { id: Category["id"] } & Partial<
      Omit<Category, "theme_id" | "actions">
    >
  ) => {
    setPlanState((prevPlanState) => {
      let themeIndex = -1,
        categoryIndex = -1;

      planState.themes.forEach((theme, _themeIndex) => {
        themeIndex = _themeIndex;
        categoryIndex = theme.categories.findIndex(
          ({ id }) => id === options.id
        );
      });

      if (categoryIndex >= 0) {
        const targetTheme = prevPlanState.themes[themeIndex];
        targetTheme.categories[categoryIndex] = {
          ...targetTheme.categories[categoryIndex],
          ...options,
        };
      }
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  const editAction = ({
    themeIndex,
    categoryIndex,
    ...action
  }: { themeIndex: number; categoryIndex: number } & Omit<
    Action,
    "id" | "title" | "planned_time"
  > &
    Partial<Pick<Action, "title" | "planned_time">>) => {
    setPlanState((prevPlanState) => {
      const targetCategory =
        prevPlanState.themes[themeIndex].categories[categoryIndex];
      const targetActionIndex = targetCategory.actions.findIndex(
        ({ day }) => day === action.day
      );
      if (targetActionIndex >= 0) {
        targetCategory.actions[targetActionIndex] = {
          ...targetCategory.actions[targetActionIndex],
          ...action,
        };
      } else {
        targetCategory.actions.push({
          ...initAction({
            categoryId: targetCategory.id,
            day: action.day,
            title: action.title ?? "",
            planned_time: action.planned_time ?? 0,
          }),
        });
      }
      return JSON.parse(JSON.stringify(prevPlanState));
    });
  };

  return {
    planState,
    createCategory,
    createTheme,
    deleteTheme,
    deleteCategory,
    editPlan,
    editTheme,
    editCategory,
    editAction,
  };
}
