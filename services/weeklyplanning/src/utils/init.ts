import { Category, Theme, Plan, Action } from "../type";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const initPlan = () => {
  const plan: Plan = {
    id: uuidv4(),
    year: dayjs().isoWeekYear(),
    week: dayjs().isoWeek(),
    themes: [],
  };
  return plan;
};

export const initTheme = (planId: Plan["id"]) => {
  const theme: Theme = {
    id: uuidv4(),
    plan_id: planId,
    title: "",
    categories: [],
  };
  return theme;
};

export const initCategory = (themeId: Theme["id"]) => {
  const catecory: Category = {
    id: uuidv4(),
    theme_id: themeId,
    title: "",
    actions: [],
  };
  return catecory;
};

export const initAction = ({
  categoryId,
  ...actions
}: Omit<Action, "id" | "category_id"> & {
  categoryId: Category["id"];
}) => {
  const action: Action = {
    id: uuidv4(),
    category_id: categoryId,
    ...actions,
  };
  return action;
};
