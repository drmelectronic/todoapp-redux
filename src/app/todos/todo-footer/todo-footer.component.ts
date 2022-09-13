import { Component, OnInit } from '@angular/core';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import * as filtroActions from "../../filtro/filtro.actions";
import {limpiarCompletados} from "../todo.actions";

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtroActions.filtrosValidos = 'todos';
  filtros: filtroActions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(({todos, filtro}) => {
      this.filtroActual = filtro;
      this.pendientes = todos.filter(todo => !todo.completado).length;
    })
  }

  cambiarFiltro(filtro: filtroActions.filtrosValidos) {
    this.store.dispatch(filtroActions.setFiltro({filtro}));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarCompletados());
  }
}
