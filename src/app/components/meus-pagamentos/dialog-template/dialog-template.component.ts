import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { NotificationService } from './../../../services/notification.service';

@Component({
  selector: 'dialog-template',
  templateUrl: 'dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

  maxDatepickerFilter: Date
  dialogTitle: string = 'Adicionar'
  buttonText: string = 'Salvar'

  pagamentoForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    value: ['', Validators.required],
    date: ['', Validators.required],
    title: [''],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private taskService: TaskService,
    private toastr: ToastrService, private notificationService: NotificationService) {

    this.maxDatepickerFilter = new Date()

  }
  ngOnInit(): void {
    if (this.data.operation === 'edit') {
      this.dialogTitle = 'Editar'
      this.pagamentoForm.patchValue(this.data.task)
    }
    if (this.data.operation === 'delete') {
      this.dialogTitle = 'Deletar'
      this.buttonText = 'Deletar'
    }
  }

  get name() { return this.pagamentoForm.get('name'); }
  get value() { return this.pagamentoForm.get('value'); }
  get date() { return this.pagamentoForm.get('date'); }
  get title() { return this.pagamentoForm.get('title'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTask = (task: Task) => {
    this.taskService.add(task).subscribe(
      response => {
        this.dialogRef.close()
        this.toastr.success('Salvo com sucesso')
        this.notificationService.loadData(true)
      },
      error => { this.toastr.error('Falha ao salvar') }
    )
  }

  editTask = (task: Task) => {
    this.taskService.update(task).subscribe(
      response => {
        this.dialogRef.close()
        this.toastr.success('Editado com sucesso')
        this.notificationService.loadData(true)
      },
      error => { this.toastr.error('Falha ao editar') }
    )
  }

  deleteTask = () => {
    this.taskService.delete(this.data.task).subscribe(
      response => {
        this.dialogRef.close()
        this.toastr.success('Deletado com sucesso')
        this.notificationService.loadData(true)
      },
      error => { this.toastr.error('Falha ao deletar') }
    )
  }

  generateNewTask = () => {
    const newTask = new Task()
    newTask.name = this.name.value
    newTask.title = this.title.value
    newTask.value = this.value.value
    newTask.date = this.formatDate(this.date.value)
    return newTask
  }

  generateUpdatedTask = () => {
    return {
      ...this.data.task,
      name: this.name.value,
      value: this.value.value,
      date: this.formatDate(this.date.value),
      title: this.title.value,
    }
  }

  formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('.')[0] + 'Z'
  }

  isOperationCreate = () => this.data.operation === 'create'
  isOperationEdit = () => this.data.operation === 'edit'
  isOperationDelete = () => this.data.operation === 'delete'
  isNotOperationDelete = () => !this.isOperationDelete()

  onSubmit = () => {

    if (this.isOperationCreate()) {
      this.addTask(this.generateNewTask())
    }
    if (this.isOperationEdit()) {
      this.editTask(this.generateUpdatedTask())
    }

    if (this.isOperationDelete()) {
      this.deleteTask()
    }

  }

}