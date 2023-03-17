import { FormEvent, useRef } from 'react'
import Card from '../ui/Card'
import styles from './AddItem.module.css'

import Expense from '../models/Expense'

type Props = {
  onAdd: (expense: Expense) => void
}

const AddItem: React.FC<Props> = ({ onAdd }) => {
  const descInputRef = useRef<HTMLInputElement>(null)
  const valorInputRef = useRef<HTMLInputElement>(null)
  const entradaInputRef = useRef<HTMLInputElement>(null)
  const saidaInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()

    const enteredDesc = descInputRef.current!.value
    const enteredValor = valorInputRef.current!.value

    if (enteredDesc.trim().length === 0 || enteredValor.trim().length === 0) {
      return
    }

    let enteredType

    if (entradaInputRef.current?.checked) {
      enteredType = entradaInputRef.current.value
    } else if (saidaInputRef.current?.checked) {
      enteredType = saidaInputRef.current.value
    } else {
      return
    }

    const newExpense = new Expense(enteredDesc, +enteredValor, enteredType)

    onAdd(newExpense)

    const sendRequest = async () => {
      await fetch(
        'https://react-http-77849-default-rtdb.firebaseio.com/finanças.json',
        {
          method: 'POST',
          body: JSON.stringify(newExpense)
        }
      )
    }

    sendRequest()

    descInputRef.current!.value = ''
    valorInputRef.current!.value = ''
    entradaInputRef.current!.checked = false
    saidaInputRef.current!.checked = false
  }

  return (
    <Card className={styles.card}>
      <form onSubmit={submitHandler}>
        <div className={styles['form-group']}>
          <label htmlFor="desc">Descrição</label>
          <input type="text" id="desc" ref={descInputRef} />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="valor">Valor</label>
          <input type="text" id="valor" ref={valorInputRef} />
        </div>
        <div className={styles['radio-group']}>
          <div>
            <input
              type="radio"
              name="tipo-valor"
              id="entrada"
              value="entrada"
              ref={entradaInputRef}
            />
            <label htmlFor="entrada">Entrada</label>
          </div>
          <div>
            <input
              type="radio"
              name="tipo-valor"
              id="saida"
              value="saida"
              ref={saidaInputRef}
            />
            <label htmlFor="saida">Saída</label>
          </div>
        </div>
        <button>Adicionar</button>
      </form>
    </Card>
  )
}

export default AddItem
