import sample from "lodash.sample"
import React, { useEffect, useState } from "react"
import AppUI from "./appui"
import "./reset.css"
import "./fonts.css"
import "./global.scss"
import styles from "./layout.module.scss"

const colors = ["#0A5046", "#A0143C", "#1464C3", "#FA8732", "#321E8C"]

const Layout = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")

  useEffect(() => {
    setBackgroundColor(sample(colors))
  }, [])

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <header className={styles.header}>
          <p className={styles.header__preamble}>
            Oppioo är ett initiativ som vill ta fram ett digitalt
            träningsverktyg för cancerdrabbade.
          </p>
          <a className={styles.header__mail} href="mailto:hej@oppioo.com">
            ↳ hej@oppioo.com
          </a>
        </header>
        <main className={styles.phone}>
          <div className={styles.phone__inner} style={{ backgroundColor }}>
            <AppUI {...{ backgroundColor }} />
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout
