import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from "../models/todo.model";
import {FormControl, Validators} from "@angular/forms";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import * as actions from "../todo.actions";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  @Input() todo = new Todo('');
  chkCompletado = new FormControl(false);
  txtInput = new FormControl('', Validators.required);

  editando: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.chkCompletado.setValue(this.todo.completado);
    this.txtInput.setValue(this.todo.texto);
    this.chkCompletado.valueChanges.subscribe(() => {
      if (this.todo) {
        this.store.dispatch(actions.toggle({id: this.todo.id}));
      }
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1)
  }

  terminarEdicion() {
    this.editando = false;
    console.log(this.txtInput.value, this.todo.texto, this.txtInput.invalid);
    if (this.txtInput.invalid) { return;}
    if (this.txtInput.value === this.todo.texto) { return;}
    if (this.txtInput.value === null) { return;}
    console.log('editar')
    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));
  }

  borrar() {
    this.store.dispatch(actions.borrar({id: this.todo.id}));
  }
}
