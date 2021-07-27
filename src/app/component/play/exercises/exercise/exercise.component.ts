import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/service/exercise.service';
import { NewCode } from '../../../../model/NewCode';
import {Exercise} from '../../../../model/Exercise';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  languages: string[] = ['Java', 'Python', 'C'];
  formGroup: FormGroup;
  isSubmitBtnDisabled = true;
  isLanguageSet = false;
  isTitleSet = false;
  isTestSet = false;

  newCode: NewCode;
  selection: any;

  languageCM = 'markdown';
  theme = 'default';

  themes: Theme[] = [
    { value: 'default', viewValue: 'Default' },
    { value: 'darcula', viewValue: 'Darcula' },
    { value: 'eclipse', viewValue: 'Eclipse' },
    { value: 'material', viewValue: 'Material' },
    { value: 'monokai', viewValue: 'Monokai' },
  ];

  options = {
    theme: this.theme,
    mode: this.languageCM,
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' }
  };
  readOnly = false;

  loading = false;
  content = '';
  result = '';

  exercise: Exercise;
  constructor(private route: ActivatedRoute, private formBuild: FormBuilder, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.exerciseService.getExercise(id).subscribe(exercise => {
      console.log(exercise);

      this.exercise = exercise;
      this.languageCM = this.getLanguageCM(exercise.language.toString());
      this.changeLanguageCM();
      this.content = exercise.code;
    });

  }

  setLanguage(filterValue: any): void {
    this.newCode.language = filterValue;

    this.languageCM = this.getLanguageCM(this.newCode.language.toString());
    this.changeLanguageCM();
    this.isLanguageSet = true;
  }

  private getLanguageCM(language: string): string {
    const languagesCM = new Map();

    languagesCM.set('Markdown', 'markdown');
    languagesCM.set('C', 'text/x-csrc');
    languagesCM.set('Python', 'text/x-python');
    languagesCM.set('javascript', 'text/javascript');
    languagesCM.set('TypeScript', 'text/typescript');
    languagesCM.set('Java', 'text/x-java');

    return languagesCM.get(language);
  }

  changeLanguageCM(): void {
    this.options = {
      ...this.options,
      mode: this.languageCM,
    };
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }

  handleChange($event: Event): void {
    this.content = $event as unknown as string;
  }
}
