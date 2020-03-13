import React from "react"
import styles from "./main.module.scss"

const Main = ({ children, hidden }) => (
  <main className={styles.container} style={{ opacity: hidden ? 0 : 1 }}>
    {children}
  </main>
)

export default Main
