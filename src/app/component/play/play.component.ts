import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Exercise} from '../../model/Exercise';
import {ExerciseService} from '../../service/exercise.service';
import {MatSort} from '@angular/material/sort';
import {QueueService} from '../../service/queue.service';
import {Queue} from '../../model/Queue';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

  languages: string[] = ['All', 'Java', 'Python'];

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['id', 'title', 'description', 'language', 'best_score', 'created_at', 'action'];

  search: any;
  selection: any;

  isLookingForGame = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exerciseService: ExerciseService, private queueService: QueueService, private authService: AuthService) {}

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

  onSlideChange(event: Event): void {
    this.isLookingForGame = !this.isLookingForGame;

    if (this.isLookingForGame) {
      this.queueService.joinQueue().subscribe((data: User[]) => {
        console.log(data);

        if (data.length > 0){
          alert('Matched');

          console.log('Matched ' + data[0].userName + ' vs ' +  data[1].userName);

          this.isLookingForGame = false;

          // TODO create game
        } else {
          alert('Enter in Queue');
        }
      });
    } else {
      this.queueService.leaveQueue().subscribe(data => {
        console.log(data);
      });
    }
  }

}
