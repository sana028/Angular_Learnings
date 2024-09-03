import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "../services/pipe/filter.pipe";
import { FormsModule } from "@angular/forms";
import { getCounter } from "../../store/selector/counter.selector";
import { Store } from "@ngrx/store";
import { _counterState } from "../../store/states/counter.state";
import { customizeTheCounter, decrement, increment, reset } from "../../store/actions/counter.actions";
import { Observable } from "rxjs";
import { AppMaterialModule } from "../app-material/app-material.module";

@Component({
    standalone:true,
    selector:'app-pipes',
    templateUrl:'./pipes.component.html',
    styleUrl:'./pipes.component.css',
    imports:[CommonModule,FilterPipe,FormsModule,AppMaterialModule]
})

export class PipeComponent{
   value:number=0;
    counter$: Observable<number> | undefined;
    name:string="Sana";
    price: number = 100.25;
    date:Date=new Date('2022-01-01');
    pi: number = 3.14159265359;
    fraction: number = 0.12345;
    obj = { name: 'John', age: 30, city: 'New York' };
    searchText: string = '';
    users = [
      { name: 'John Doe', age: 25 },
      { name: 'Jane Smith', age: 30 },
      { name: 'Mike Johnson', age: 35 },
      { name: 'Alice Brown', age: 28 }
    ];

    constructor(private store:Store<_counterState>){
      
    }

    onIncrement=()=>{
      this.store.dispatch(increment())
      this.fetchCounter();
    }
    onDecrement = () =>{
      this.store.dispatch(decrement());
      this.fetchCounter();
    }
    
    Reset=()=>{
      this.store.dispatch(reset());
      this.fetchCounter();
    }

    customizeTheValue = () =>{
      this.store.dispatch(customizeTheCounter({value : this.value} ));
      this.fetchCounter();
    }

    fetchCounter =()=>{
      this.counter$ = this.store.select(getCounter);
    }
    
  
    
}