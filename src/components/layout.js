import { graphql, useStaticQuery } from "gatsby"
import sample from "lodash.sample"
import React, { useEffect, useState } from "react"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import AppUI from "./appui"
import Main from "./main"
import "./reset.css"
import "./fonts.css"
import "./global.scss"
import styles from "./layout.module.scss"
import useWindowSize from "../hooks/useWindowSize"
import Logo from "../images/logo.inline.svg"

const colors = ["#0A5046", "#A0143C", "#1464C3", "#FA8732", "#321E8C"]

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            email
          }
        }
      }
    `
  )

  const { scrollYProgress } = useViewportScroll()
  const { height } = useWindowSize()
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")

  useEffect(() => {
    const color = sample(colors)
    setBackgroundColor(color)
    document.documentElement.style.setProperty("--background", color)
  }, [])

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 548 * -1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <header className={styles.header}>
          <p className={styles.header__preamble}>
            {site.siteMetadata.description}
          </p>
          <a
            className={styles.header__mail}
            href={`mailto:${site.siteMetadata.email}`}
          >
            ↳ {site.siteMetadata.email}
          </a>
        </header>
        <Logo className={styles.cornerLogo} style={{ fill: "#fff" }} />
        {/* empty ghost div to take up vertical space for scroll purposes */}
        <div
          style={{
            height: height + 518,
          }}
        />
        <div className={styles.phone}>
          <div className={styles.phone__inner} style={{ backgroundColor }}>
            <AppUI {...{ backgroundColor }} />

            <motion.div className={styles.overlay} style={{ opacity }} />
            <motion.div
              initial={{ translateY: 500 }}
              animate={{ translateY: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <motion.div style={{ translateY }}>
                <Main>{children}</Main>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
