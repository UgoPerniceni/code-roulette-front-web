import { SaveNewcodeSuccessComponent } from './save-newcode-success/save-newcode-success.component';
import { ExerciseService } from 'src/app/service/exercise.service';
import { CompilationFailedDialogComponent } from './compilation-failed-dialog/compilation-failed-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { Language } from './../../../../enum/Language';
import { NewCode } from './../../../../model/NewCode';
import { Exercise } from '../../../../model/Exercise';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from '../../../../service/code.service';
import { CodeResult } from '../../../../model/CodeResult';
import { Compilation } from '../../../../model/Compilation';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  languages: string[] = ['Java', 'Python'];
  formGroup: FormGroup;
  isSubmitBtnDisabled: boolean = true;

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

  public testForm: FormGroup;
  public testList: FormArray;
  testArea: string;
  testValues: any[];
  testArray: Array<any>;

  get testFormGroup() {
    return this.testForm.get('testsArray') as FormArray;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      testArea: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  gettestFormGroup(index): FormGroup {
    const formGroup = this.testList.controls[index] as FormGroup;
    return formGroup;
  }

  addTest() {
    this.testList.push(this.createForm());
  }

  removeTest(index) {
    this.testList.removeAt(index);
  }


  constructor(private route: ActivatedRoute, private formBuild: FormBuilder, private codeService: CodeService, private formBuilder: FormBuilder, public dialog: MatDialog, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.newCode = new NewCode("", "", "", Language.Java, [""], "", 0, "");
    this.formGroup = this.formBuild.group({
      title: [this.newCode.title, Validators.required],
      description: [this.newCode.description, Validators.required],
      language: Language
    });
    this.testForm = this.formBuilder.group({
      testsArray: this.formBuilder.array([this.createForm()])
    });
    // set testList to the form control containing testinfo
    this.testList = this.testForm.get('testsArray') as FormArray;
  }

  setLanguage(filterValue: any): void {
    this.newCode.language = filterValue;

    this.languageCM = this.getLanguageCM(this.newCode.language.toString());
    this.changeLanguageCM();
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

  clear(): void {
    this.content = '';
  }

  compile(): void {

    this.loading = true;

    this.newCode.code = this.content;
    this.newCode.title = this.formGroup.value.title;
    this.newCode.description = this.formGroup.value.description;
    this.newCode.language = this.selection;
    var counter = 0;
    this.testList.value.forEach(element => {
      this.newCode.tests[counter] = element['testArea'];
      counter++;
    })

    console.log('newCode' + this.newCode.code + this.newCode.description + this.newCode.language + this.newCode.tests);

    this.codeService.compileNewCode(this.newCode).subscribe((data: NewCode) => {
      console.log(data);
      this.result = data.compilationOutput;
      if (data.status != "SUCCESS") {
        this.openDialog(new CompilationFailedDialogComponent());
        this.isSubmitBtnDisabled = true;
      } else {
        this.isSubmitBtnDisabled = false;
        this.result = data.compilationOutput;
        this.loading = false;
      }
    });
  }

  openDialog(dialogType: Object) {
    if (dialogType instanceof CompilationFailedDialogComponent)
      this.dialog.open(CompilationFailedDialogComponent);
    else
      this.dialog.open(SaveNewcodeSuccessComponent);
  }
  submit(): void {
    this.exerciseService.saveNewExercise(this.newCode).subscribe((data: NewCode) => {
      this.openDialog(new SaveNewcodeSuccessComponent());
    })
  }
}
