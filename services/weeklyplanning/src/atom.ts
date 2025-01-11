import { atom } from "jotai";
import { Action, Category, Plan, Theme } from "./type";
import { initPlan } from "./utils/init";

export const planAtom = atom<Plan>(initPlan());

export const themeMapAtom = atom<Map<Theme["id"], Theme>>(new Map());

export const categoryMapAtom = atom<Map<Category["id"], Category>>(new Map());

export const actionMapAtom = atom<Map<Action["id"], Action>>(new Map());
