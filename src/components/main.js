import React from "react"
import styles from "./main.module.scss"

const Main = ({ children, hidden }) => (
  <main className={styles.container}>{children}</main>
)

export default Main
