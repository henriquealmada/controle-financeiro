import Expense from '../models/Expense'
import Card from '../ui/Card'
import styles from './List.module.css'
import ListItem from './ListItem'

type Props = {
  expenses?: Expense[]
  onRemove: (id: number) => void
}

const List: React.FC<Props> = ({ expenses, onRemove }) => {
  return (
    <Card className={styles.list}>
      <header>
        <span>Descrição</span>
        <span>Valor</span>
        <span>Tipo</span>
      </header>
      {expenses?.map(expense => (
        <ListItem
          key={expense.id}
          id={expense.id}
          desc={expense.descricao}
          valor={expense.valor}
          tipo={expense.tipo}
          onRemove={onRemove}
        />
      ))}
    </Card>
  )
}

export default List
