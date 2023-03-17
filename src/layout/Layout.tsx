import Header from '../components/Header'

import styles from './Layout.module.css'

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default Layout
