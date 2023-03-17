import React from 'react'
import AddItem from './components/AddItem'
import Cards from './components/Cards'
import List from './components/List'
import Layout from './layout/Layout'

import Expense from './models/Expense'

import { useContext } from 'react'
import { ExpensesContext } from './store/expenses-context'

function App() {
  const expensesCtx = useContext(ExpensesContext)

  const addHandler = (expense: Expense) => {
    expensesCtx.addExpense(expense)
  }

  const removeHandler = (id: number) => {
    expensesCtx.removeExpense(id)
  }

  return (
    <div className="App">
      <Layout>
        <Cards />
        <AddItem onAdd={addHandler} />
        <List expenses={expensesCtx.items} onRemove={removeHandler} />
      </Layout>
    </div>
  )
}

export default App
