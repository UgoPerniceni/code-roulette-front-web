import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Exercise} from '../../model/Exercise';
import {ExerciseService} from '../../service/exercise.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

  languageSelected = 'None';
  languages: string[] = ['Java', 'Python'];

  // dataSource: Exercise[] = [];

  dataSource = new MatTableDataSource<Exercise>();

  displayedColumns: string[] = ['id', 'title', 'code', 'created_at', 'updated_at', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeLanguage(): void {}
}
