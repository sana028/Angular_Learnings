import { createAction,props } from "@ngrx/store";
import { Task_Data } from "../app/models/taskData.module";

export const fetchTaskData = createAction(`[Task_Data] Load Data`);

export const fetchTaskDataSuccess = createAction(`[Task_Data] Load Data Success`,props<{taskData:Task_Data[]}>());


