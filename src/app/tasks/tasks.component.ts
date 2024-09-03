import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../services/apiService/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { HightlighttextDirective } from '../directives/high-light-text/hightlighttext.directive';
import { DropdownDirective } from '../directives/drop-down/dropdown.directive';
import { LoaderComponent } from '../components/loader/loader.component';
import { IfdirectiveDirective } from '../directives/StructuralDirectives/ifdirective.directive';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AppMaterialModule,
    MatPaginator,
    HightlighttextDirective,
    DropdownDirective,
    LoaderComponent,
    IfdirectiveDirective,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [];
  dataSource: any = [];
  isLoading: boolean = false;
  sortDirection: string = '';
  sortActiveColumn: string = '';

  @ViewChild('testSort') sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.api.getAllTasksList().subscribe(
      (response: any) => {
        let tasksArray = Object.values(response);
        this.dataSource = new MatTableDataSource(tasksArray);
        this.displayedColumns = Object.keys(response[0]).filter(
          (key) => key !== 'Id' && key !== 'Description'
        );
        this.displayedColumns.push('actions');
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData = (sortState: any) => {
    this.sortDirection = sortState.direction || 'asc';
    this.sortActiveColumn = sortState.active ? sortState.active : 'Task_Id';
    this.getSortedTasks();
  };

  getSortedTasks() {
    // this.isLoading = true;
    this.api
      .filterTaskData(this.sortActiveColumn, this.sortDirection)
      .subscribe(
        (response) => {
          if (response[0]) {
            if (response[0] !== null && typeof response[0] === 'object') {
              let tasksArray = Object.values(response);
              this.dataSource = new MatTableDataSource(tasksArray);
              this.displayedColumns = Object.keys(response[0]).filter(
                (key) => key !== 'Id' && key !== 'Description'
              );
              this.displayedColumns.push('actions');
              //  this.isLoading = false;
            } else {
              console.error('Response format is not as expected');
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
