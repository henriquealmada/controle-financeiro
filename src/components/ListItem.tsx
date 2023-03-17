import styles from './ListItem.module.css'

type Props = {
  id: number
  desc: string
  valor: number
  tipo: string
  onRemove: (id: number) => void
}

const ListItem: React.FC<Props> = ({ id, desc, valor, tipo, onRemove }) => {
  const removeExpenseHandler = () => {
    onRemove(id)

    const deleteFromDB = async () => {
      await fetch(
        `https://react-http-77849-default-rtdb.firebaseio.com/finanças/${id}.json`,
        {
          method: 'DELETE'
        }
      )
    }

    deleteFromDB()
  }

  return (
    <div className={styles['list-item']}>
      <span>{desc}</span>
      <span>{valor}</span>
      <div className={styles.icons}>
        {tipo === 'entrada' ? (
          <i className="fa-regular fa-circle-up" style={{ color: 'green' }}></i>
        ) : (
          <i className="fa-regular fa-circle-down" style={{ color: 'red' }}></i>
        )}
        <i
          className="fa-solid fa-trash"
          onClick={removeExpenseHandler}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
    </div>
  )
}

export default ListItem
