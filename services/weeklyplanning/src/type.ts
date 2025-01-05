/**
 * 플랜(Plan)
 * - 주차(또는 특정 기간) 전체를 아우르는 최상위 레벨 모델
 *   (주차별로 테마가 있고, 각 테마 아래 카테고리/액션이 존재)
 */
export type Plan = {
  id: number; // 플랜(주차 등)을 구분하기 위한 고유 ID
  year: number; // 몇년도인지 나타내는 숫자
  week: number; // 몇번째 주차인지 나타내는 숫자
  themes: Theme[]; // 해당 기간(주차)에 포함된 테마들
};

/**
 * 테마(Theme)
 * - 한 주(또는 특정 기간)에 대해 큰 줄기를 잡아놓은 주제
 *   예: "사이드프로젝트", "자기관리" 등
 */
export type Theme = {
  id: number; // 테마를 구분하기 위한 고유 ID
  plan_id: number; // 플랜 id
  title: string; // 테마의 이름
  categories: Category[]; // 테마에 포함된 카테고리 목록
};

/**
 * 카테고리(Category)
 * - 테마 안에서 특정 영역(분야)을 구분하기 위한 모델
 */
export type Category = {
  id: number; // 카테고리를 구분하기 위한 고유 ID
  theme_id: number;
  title: string; // 카테고리 이름
  planned_time?: number; // 카테고리에 계획된 총 시간
  actions: Action[]; // 해당 카테고리에 속한 액션(할 일) 목록
};

/**
 * 액션(Action)
 * - 가장 구체적인 할 일(투두) 혹은 액션 아이템을 나타냄
 */
export type Action = {
  id: number; // 액션을 구분하기 위한 고유 ID
  title: string; // 액션의 제목
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"; // 해당 액션을 진행할 날짜 (YYYY-MM-DD 등)
  planned_time: number; // 카테고리에 계획된 총 시간
};

export type WeeklyPlanModelData = {
  year: number;
  week: number;
  themes: {
    title: string;
    categories: {
      title: string;
      planned_time?: number;
      actions: {
        title: string;
        planned_time: number;
        day: Action["day"];
      }[];
    }[];
  }[];
};
