import { renderHook, act } from "@testing-library/react-hooks";
import { createStore, Provider } from "jotai";
import { planAtom } from "../atom";
import { initTheme, initCategory, initAction, initPlan } from "../utils/init";
import useHandleWeeklyPlanTable from "./useWeeklyPlanTable";
import { describe, expect, it, test } from "vitest";
import { Plan } from "../type";

function setupTestHook(_plan?: Plan) {
  const store = createStore();
  store.set(planAtom, _plan ?? initPlan());

  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return renderHook(() => useHandleWeeklyPlanTable(), { wrapper });
}
function getInitTable() {
  const plan = initPlan();
  const theme = initTheme(plan.id);
  const category = initCategory(theme.id);
  const action = initAction({
    categoryId: category.id,
    title: "hello",
    day: "mon",
    planned_time: 0,
  });

  category.actions.push(action);
  theme.categories.push(category);
  plan.themes.push(theme);
  const table: Plan = { ...plan };
  return { plan, theme, category, action, table };
}

describe("useHandleWeeklyPlanTable Hook", () => {
  describe("theme관련 테스트", () => {
    test("createTheme 함수를 호출하면 themes 배열에 새 테마가 추가된다", () => {
      const { result } = setupTestHook();
      expect(result.current.planState.themes).toHaveLength(0);

      act(() => {
        result.current.createTheme();
      });

      expect(result.current.planState.themes).toHaveLength(1);
      expect(result.current.planState.themes[0]).toMatchObject({
        id: expect.any(String),
        categories: [],
      });
    });

    describe("deleteTheme 함수를 호출하면 해당 테마가 삭제된다", () => {
      it("하나만 있었을때", () => {
        const { theme, table } = getInitTable();
        const { result } = setupTestHook(table);

        act(() => {
          result.current.deleteTheme(theme.id);
        });

        expect(result.current.planState.themes).toHaveLength(0);
      });

      it("여러개 있었을 떄", () => {
        const { plan, theme, table } = getInitTable();
        const addTheme = initTheme(plan.id);
        const { result } = setupTestHook({
          ...table,
          themes: [...table.themes, addTheme],
        });

        act(() => {
          result.current.deleteTheme(addTheme.id);
        });

        expect(
          result.current.planState.themes.find(({ id }) => id === theme.id)
        ).toStrictEqual({ ...theme });
        expect(
          result.current.planState.themes.find(({ id }) => id === addTheme.id)
        ).toBeUndefined();
      });
    });

    test("editTheme 함수를 호출하면 해당 테마의 속성이 변경된다", () => {
      const { theme, table } = getInitTable();
      const { result } = setupTestHook(table);

      act(() => {
        result.current.editTheme({
          id: theme.id,
          title: "New Title",
        });
      });
      expect(result.current.planState.themes[0].title).toBe("New Title");

      act(() => {
        result.current.editTheme({
          id: theme.id,
          title: "New Title222",
        });
      });
      expect(result.current.planState.themes[0].title).toBe("New Title222");
    });
  });

  describe("category 관련 테스트", () => {
    test("createCategory 함수를 호출하면 해당 theme에 새로운 category가 추가된다", () => {
      const { table, theme } = getInitTable();
      const { result } = setupTestHook(table);

      // 초기 상태에서 theme[0] 안에 category가 1개 있다고 가정
      expect(result.current.planState.themes[0].categories).toHaveLength(1);

      // createCategory 실행
      act(() => {
        result.current.createCategory(theme.id);
      });

      // categories 배열이 2개가 되었는지 확인
      expect(result.current.planState.themes[0].categories).toHaveLength(2);

      // 새로 추가된 category가 올바른 구조인지 확인
      const newCategory = result.current.planState.themes[0].categories[1];
      expect(newCategory).toMatchObject({
        id: expect.any(String),
        theme_id: theme.id,
        actions: [],
      });
    });

    test("editCategory 함수를 호출하면 해당 카테고리의 속성이 변경된다 (테스트용 로직 수정 필요)", () => {
      const { theme, category, table } = getInitTable();
      const { result } = setupTestHook(table);

      act(() => {
        result.current.editCategory({
          id: category.id,
          title: "Edited Category",
        });
      });

      expect(
        result.current.planState.themes.find(({ id }) => id === theme.id)
      ).toMatchObject(theme);

      expect(result.current.planState.themes[0].categories[0].id).toBe(
        category.id
      );
      expect(result.current.planState.themes[0].categories[0].title).toBe(
        "Edited Category"
      );
    });

    test("deleteCategory 함수를 호출하면 해당 카테고리가 삭제된다", () => {
      const { category, table } = getInitTable();
      const { result } = setupTestHook(table);

      act(() => {
        result.current.deleteCategory(category.id);
      });

      expect(result.current.planState.themes[0].categories).toHaveLength(0);
    });
  });

  describe("action 관련 테스트", () => {
    test("editAction 함수를 호출하면 해당 action이 수정되거나 없으면 새로 추가된다", () => {
      const { category, table } = getInitTable();

      const { result } = setupTestHook(table);

      // action 수정
      act(() => {
        result.current.editAction({
          themeIndex: 0,
          categoryIndex: 0,
          category_id: category.id,
          day: "mon",
          title: "Updated Action",
          planned_time: 4,
        });
      });

      const updatedAction =
        result.current.planState.themes[0].categories[0].actions[0];
      expect(updatedAction.title).toBe("Updated Action");
      expect(updatedAction.planned_time).toBe(4);

      act(() => {
        result.current.editAction({
          themeIndex: 0,
          categoryIndex: 0,
          day: "tue",
          category_id: category.id,
          title: "New Action",
          planned_time: 4,
        });
      });

      const addedAction =
        result.current.planState.themes[0].categories[0].actions[1];
      expect(addedAction.day).toBe("tue");
      expect(addedAction.title).toBe("New Action");
      expect(addedAction.planned_time).toBe(4);
    });
  });
});
