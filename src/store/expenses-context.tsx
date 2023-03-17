import Expense from '../models/Expense'

import React, { useEffect, useReducer } from 'react'

type ContextObj = {
  items: Expense[]
  total: number
  entradas: number
  saidas: number
  addExpense: (expense: Expense) => void
  removeExpense: (id: number) => void
}

export const ExpensesContext = React.createContext<ContextObj>({
  items: [],
  total: 0,
  entradas: 0,
  saidas: 0,
  addExpense: expense => {},
  removeExpense: id => {}
})

type Props = {
  children?: React.ReactNode
}

const initialState: {
  items: Expense[]
  total: number
  entradas: number
  saidas: number
} = {
  items: [],
  total: 0,
  entradas: 0,
  saidas: 0
}

type ExpensesState = {
  items: Expense[]
  total: number
  entradas: number
  saidas: number
}

type ExpensesAction = {
  type: 'FETCH' | 'ADD' | 'REMOVE'
  payload: any
}

const reducer = (state: ExpensesState, action: ExpensesAction) => {
  if (action.type === 'FETCH') {
    const updatedItems = action.payload
    let updatedTotal = 0
    let updatedEntradas = 0
    let updatedSaidas = 0
    for (const item of updatedItems) {
      if (item.tipo === 'entrada') {
        updatedTotal = updatedTotal + item.valor
        updatedEntradas = updatedEntradas + item.valor
      } else {
        updatedTotal = updatedTotal - item.valor
        updatedSaidas = updatedSaidas + item.valor
      }
    }
    return {
      items: updatedItems,
      total: updatedTotal,
      entradas: updatedEntradas,
      saidas: updatedSaidas
    }
  }
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.payload)
    let updatedTotal
    if (action.payload.tipo === 'entrada') {
      updatedTotal = state.total + action.payload.valor
    } else {
      updatedTotal = state.total - action.payload.valor
    }
    let updatedEntradas = state.entradas
    let updatedSaidas = state.saidas
    for (const item of updatedItems) {
      if (item.tipo === 'entrada') {
        updatedEntradas = state.entradas + item.valor
        updatedSaidas = state.saidas
      } else {
        updatedSaidas = state.saidas + item.valor
        updatedEntradas = state.entradas
      }
    }
    return {
      items: updatedItems,
      total: updatedTotal,
      entradas: updatedEntradas,
      saidas: updatedSaidas
    }
  }
  if (action.type === 'REMOVE') {
    const updatedItems = state.items.filter(item => item.id !== action.payload)
    const itemToRemove = state.items.find(item => item.id === action.payload)
    const updatedTotal =
      itemToRemove!.tipo === 'entrada'
        ? state.total - itemToRemove!.valor
        : state.total + itemToRemove!.valor
    let updatedEntradas
    let updatedSaidas
    if (itemToRemove!.tipo === 'entrada') {
      updatedEntradas = state.entradas - itemToRemove!.valor
      updatedSaidas = state.saidas
    } else {
      updatedSaidas = state.saidas - itemToRemove!.valor
      updatedEntradas = state.entradas
    }
    return {
      items: updatedItems,
      total: updatedTotal,
      entradas: updatedEntradas,
      saidas: updatedSaidas
    }
  }
  return state
}

const ExpensesContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getExpenses = async () => {
      const response = await fetch(
        'https://react-http-77849-default-rtdb.firebaseio.com/finanças.json'
      )

      const data = await response.json()

      const loadedExpenses = []
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          descricao: data[key].descricao,
          valor: data[key].valor,
          tipo: data[key].tipo
        })
      }
      dispatch({ type: 'FETCH', payload: loadedExpenses })
    }
    getExpenses()
  }, [])

  const addExpenseHandler = (expense: Expense) => {
    dispatch({ type: 'ADD', payload: expense })
  }

  const removeExpenseHandler = (id: number) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  return (
    <ExpensesContext.Provider
      value={{
        items: state.items,
        total: state.total,
        entradas: state.entradas,
        saidas: state.saidas,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
