import {createAction, props} from "@ngrx/store";

export type filtrosValidos = 'completados' | 'pendientes' | 'todos';

export const setFiltro = createAction(
    '[Filtro] Set Filtro',
    props<{filtro: filtrosValidos}>()
    )
