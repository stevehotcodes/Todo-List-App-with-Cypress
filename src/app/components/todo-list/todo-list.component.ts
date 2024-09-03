import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from '../../interfaces/types';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgForOf,FormsModule,CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  @ViewChild('todoText') todoInputRef:ElementRef<HTMLInputElement> =null!;

  todoList:TodoItem[]=[];
  editMode: boolean = false;
  editTaskId?: number | string;
  newTaskText: string = '';
  completedList:TodoItem[]=[]
  incompleted:TodoItem[]=[]

  constructor(private cdr: ChangeDetectorRef) {}
   
  ngOnInit(): void {

   this.loadTasks();
   
  }

  loadTasks(){
    const storedTodoList=localStorage.getItem('todoList');
    storedTodoList?this.todoList= JSON.parse(storedTodoList)  : null
  }

  fetchCompletedTasks(){
    console.log("complted method")
    this.completedList = this.todoList.filter(task => task.completed)

  }

  saveTodoItem(){
    localStorage.setItem('todoList',JSON.stringify(this.todoList))
}



  addTask(text:string):void{
    console.log('add task')
    if(text.trim()!==''){
      const newTodoItem:TodoItem={
        id:Date.now(),
        task:text.trim(),
        completed:false
      }
      this.todoList.push(newTodoItem);
      this.todoInputRef.nativeElement.value = '';
      this.saveTodoItem()

    }
  }

  deleteTask(id:string|number){
    this.todoList=this.todoList.filter((item)=>item.id!==id);
    this.saveTodoItem()

  }

  editTask(id: string|number): void {
    this.editMode = true;
    this.editTaskId = id;
    const taskToEdit = this.todoList.find(task => task.id === id);
    if (taskToEdit) {
      this.newTaskText = taskToEdit.task;
    }
  }

  updateTask(): void {
    if (this.editTaskId !== undefined && this.newTaskText.trim()) {
      const taskIndex = this.todoList.findIndex(task => task.id === this.editTaskId);
      if (taskIndex !== -1) {
        this.todoList[taskIndex].task = this.newTaskText;
        this.saveTodoItem();
        this.editMode = false;
        this.newTaskText = '';
      }
    }
  }
  cancelEdit(): void {
    this.editMode = false;
    this.newTaskText = '';
  }

  toggleCompleted(id:string |number){
    const todoItem=this.todoList.find(item=>item.id===id)
    if(todoItem){
        todoItem.completed=!todoItem.completed
        this.saveTodoItem();
        this.loadTasks();
        this.fetchCompletedTasks()
        this.cdr.detectChanges()
        
    }
  }

 

}
