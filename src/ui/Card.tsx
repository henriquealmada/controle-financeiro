import React from 'react'

import styles from './Card.module.css'

type Props = {
  className?: React.ReactNode
  children?: React.ReactNode
}

const Card: React.FC<Props> = ({ children, className }) => {
  const classes = `${styles.card} ${className}`
  return <div className={classes}>{children}</div>
}

export default Card
