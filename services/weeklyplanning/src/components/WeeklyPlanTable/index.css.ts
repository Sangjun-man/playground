import { css } from "@linaria/core";

const TABLE_BORDER = "#000";
const TABLE_CELL_BORDER = "#ccc";
const TEXT_COLOR = "#333";

const TABLE_HEADER = "#f5f5f5";
const TABLE_DATE_HEADER = "#f5f5f5";
const ADD_CATEGORY = "#eafbea";
const ADD_CATEGORY_HOVER = "#d8f0d8";
const ADD_THEME = "#eafbea";
const ADD_THEME_HOVER = "#d8f0d8";

const THEME_BG = "#f2f2f2";
const CATEGORY_BG = "#ffffff";
const AGGREGATED_BG = "#f9f9f9";
const THEME_DAYS_BG = "#e8f5ff";
const DELETE_BTN_BG = "#eee";

/*
 * 1. 테이블 전체 스타일
 */
export const table = css`
  border-collapse: collapse;
  width: 100%;
  font-family: sans-serif;
  border: px solid ${TABLE_BORDER};

  /* 전체 셀 스타일 추가 */
  & {
    thead,
    tbody {
      tr {
        th,
        td {
          border: 1px solid ${TABLE_CELL_BORDER};
          padding: 6px;
          vertical-align: middle;
        }
      }
    }
  }
`;

/*
 * 2. 상단 헤더 스타일
 */
export const tableHeader = css`
  & th {
    background-color: ${TABLE_HEADER};
    color: ${TEXT_COLOR};
    font-weight: bold;
    text-align: center;
  }
`;

export const tableDateHeader = css`
  & th {
    background-color: ${TABLE_DATE_HEADER};
    color: ${TEXT_COLOR};
    font-weight: bold;
    text-align: center;
  }
`;

/*
 * 3. 세로 헤더(테마) 스타일
 */

export const themeTitleCell = css`
  background-color: ${THEME_BG};
  font-weight: bold;
  text-align: center;
  min-width: 100px;
  height: 100%;
  position: relative;
`;

/* 테마 안의 삭제 버튼 */
export const deleteTheme = css`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 2px 5px;
  cursor: pointer;
`;

/*
 * 4. 카테고리 스타일
 */
export const categoryWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${CATEGORY_BG};
  padding: 2px 4px;
`;

/* 카테고리 삭제 버튼 */
export const deleteCategory = css`
  margin-left: 4px;
  background-color: ${DELETE_BTN_BG};
  border: 1px solid ${TABLE_CELL_BORDER};
  cursor: pointer;
`;

/*
 * 5. content/time 묶음
 */
export const contentTimeWrapper = css`
  display: flex;
  gap: 2px;
  justify-content: center;
  overflow: hidden;
  word-break: break-all;
`;

export const content = css`
  flex-grow: 1;
  text-align: center;
`;

export const time = css`
  width: 30px;
  text-align: center;
`;

/*
 * 6. 합계(가로/세로) 셀/행 스타일
 */
export const aggregatedCategoryTime = css`
  background-color: ${AGGREGATED_BG};
  font-weight: bold;
  text-align: center;
  color: ${TEXT_COLOR};
`;

export const themeDaysAggregatedRow = css`
  background-color: ${THEME_DAYS_BG};
  font-weight: bold;
  text-align: center;
`;

export const aggregatedTimeRow = css`
  background-color: ${THEME_DAYS_BG};
  font-weight: bold;
  text-align: center;
`;

/*
 * 7. 새 테마/카테고리 추가 버튼 행
 */
export const addThemeRow = css`
  background-color: ${ADD_THEME};
  text-align: center;
  cursor: pointer;
  color: ${TEXT_COLOR};
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: ${ADD_THEME_HOVER};
  }
`;

export const addCategoryRow = css`
  background-color: ${ADD_CATEGORY};
  text-align: center;
  cursor: pointer;
  color: ${TEXT_COLOR};
  font-weight: bold;

  &:hover {
    background-color: ${ADD_CATEGORY_HOVER};
  }
`;

/*
 * 8. 기타 셀/래퍼 스타일
 */
export const cellContainer = css`
  position: relative;
  min-width: 120px;
  max-width: 160px;
  width: 100%;
`;

export const wrapper = css`
  width: 100%;
  display: flex;
  gap: 12px;
`;

export const cellStyle = css`
  display: flex;
  justify-content: center;
  overflow: hidden;
  word-break: break-all;
`;
