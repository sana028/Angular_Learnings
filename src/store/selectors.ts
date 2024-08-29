import { createSelector,createFeatureSelector } from "@ngrx/store";
import { TaskDataState } from "./reducers";

export const selectTaskData = createFeatureSelector<TaskDataState>('taskData');

