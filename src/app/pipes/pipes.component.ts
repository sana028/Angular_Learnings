import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "../services/pipe/filter.pipe";
import { FormsModule } from "@angular/forms";

@Component({
    standalone:true,
    selector:'app-pipes',
    templateUrl:'./pipes.component.html',
    imports:[CommonModule,FilterPipe,FormsModule]
})

export class PipeComponent{
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
  
    
}