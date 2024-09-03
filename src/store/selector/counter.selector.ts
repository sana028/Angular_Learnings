import { createFeatureSelector, createSelector } from "@ngrx/store";
import { _counterState } from "../states/counter.state";


const counterFeature = createFeatureSelector<_counterState>('counter');

export const getCounter = createSelector(counterFeature,(state)=>{
    return state.counter;
});
