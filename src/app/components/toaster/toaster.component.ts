import { Component,Input ,OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit,OnChanges {
  icon:string='';
  isStatusMessageEnabled:boolean=true;

  @Input() status:string | undefined;

  constructor(library:FaIconLibrary){
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    console.log(this.status);
    this.statusType(this.status || '')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['status']){
      this.statusType(changes['status'].currentValue || '')
    }
  }

  statusType = (status:string)=>{
    if(status === 'success'){
       this.icon='circle-check'
    }else if(status === 'error'){
      this.icon = 'circle-x';
    }else if( status === 'info'){
      this.icon = 'circle-info'
    }
  }

  closeTheMessage = () =>{
    this.isStatusMessageEnabled = !this.isStatusMessageEnabled;
  }
}
