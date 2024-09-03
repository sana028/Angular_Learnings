import { createReducer, on } from "@ngrx/store";
import { counterState } from "../states/counter.state";
import { increment, decrement, reset, customizeTheCounter } from "../actions/counter.actions";


// 1.at first the count reducer is calling.
//2.after in action it is sending the type to _counterReducer  based on type the function is calling.
//3.after that action method is calling and then state value increasing after selector is updating with the value.
//4.after that the state is sending to the component and then component is updating with the value.

const _counterReducer = createReducer(
 counterState,
 on(increment,(state)=>{
  return {...state, counter: state.counter+1};
 }),
 on(decrement,(state)=>{
  return {...state,  counter: state.counter-1};
  }),
  on(reset,(state)=>{
    return {...state,  counter: 0};
  }),
  on(customizeTheCounter,(state,action)=>{
    console.log(action);
    return {...state,  counter: action.value};
  })
)

export const CounterReducer = (state:any,action:any)=>{
     return _counterReducer(state,action);
}