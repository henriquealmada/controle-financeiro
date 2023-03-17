import CardItem from './CardItem'

import styles from './Cards.module.css'

const Cards = () => {
  return (
    <div className={styles.cards}>
      <CardItem type={'entrada'} />
      <CardItem type={'saida'} />
      <CardItem type={'total'} />
    </div>
  )
}

export default Cards
