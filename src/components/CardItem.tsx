import React from 'react'
import Card from '../ui/Card'

import styles from './CardItem.module.css'

import { useContext } from 'react'
import { ExpensesContext } from '../store/expenses-context'

type Props = {
  type: string
}

const CardItem: React.FC<Props> = ({ type }) => {
  const expensesCtx = useContext(ExpensesContext)

  return (
    <Card className={styles.card}>
      <div className={styles.info}>
        {type === 'entrada' && <span>Entradas</span>}
        {type === 'saida' && <span>Saídas</span>}
        {type === 'total' && <span>Total</span>}
        {type === 'entrada' && <i className="fa-regular fa-circle-up"></i>}
        {type === 'saida' && <i className="fa-regular fa-circle-down"></i>}
        {type === 'total' && <i className="fa-solid fa-dollar-sign"></i>}
      </div>
      <span className={styles.value}>
        {type === 'entrada' && `R$ ${expensesCtx.entradas}`}
        {type === 'saida' && `R$ ${expensesCtx.saidas}`}
        {type === 'total' && `R$ ${expensesCtx.total}`}
      </span>
    </Card>
  )
}

export default CardItem
