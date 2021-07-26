import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../../../model/Exercise';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ExerciseService} from '../../../service/exercise.service';
import {Utilities} from '../../../utils/Utilities';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, AfterViewInit {

  languages: string[] = ['All', 'Java', 'Python'];
  exercises: Exercise[];

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['id', 'title', 'description', 'language', 'created_at', 'action'];

  search: any;
  selection: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercises = exercises;
      console.log(exercises);
      this.dataSource.data = exercises;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any): void {
    if (this.selection){
      if (this.selection === 'All') {
        this.dataSource.filter = '';
        if (this.search) {
          this.dataSource.filter = this.search.trim().toLowerCase();
        }
      } else {
        // deactivate search or multiple conditions search
        this.dataSource.filter = this.selection.trim().toLowerCase() || this.search.trim().toLowerCase();
      }
    }
    else {
      this.dataSource.filter = this.search.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(date: Date): string {
    return Utilities.formatDate(date);
  }
}
