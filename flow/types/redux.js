export type ActionType = {
  type: string,
  payload?: any,
  meta?: Object,
}

export type ReducerType<S> = (state : S, action : ActionType) => S

type GenericThunkType<D> = (dispatch: D, getState: () => Object) => (Promise | void)

export type DispatchType =
  (actionOrThunk: (ActionType|GenericThunkType<DispatchType>)) =>
    (ActionType|GenericThunkType<DispatchType>)


export type ThunkType = GenericThunkType<DispatchType>

export type StoreType<S> = {
  dispatch: DispatchType,
  subscribe : (listener : () => void) => (() => void),
  getState : () => S,
  getReducer : () => ReducerType<S>,
}
