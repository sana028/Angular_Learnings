import { createReducer,on,props, State } from "@ngrx/store";
import { fetchTaskData,fetchTaskDataSuccess } from "./actions";
import { Task_Data } from "../app/models/taskData.module";

export interface TaskDataState{
  Task_Data:Task_Data[],
  error:any
}

export const intialState:TaskDataState = {
  Task_Data:[],
 error:null
}

export const reducers = createReducer(
  intialState,
  on(fetchTaskDataSuccess, (state, { taskData }) => ({
    ...state,
    taskData,
    error: null
  })),
)