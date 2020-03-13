import { graphql, useStaticQuery } from "gatsby"
import sample from "lodash.sample"
import React, { useEffect, useState, useRef } from "react"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import AppUI from "./appui"
import Main from "./main"
import "./reset.css"
import "./fonts.css"
import "./global.scss"
import styles from "./layout.module.scss"
import useWindowSize from "../hooks/useWindowSize"

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
  const ref = useRef()

  useEffect(() => {
    setBackgroundColor(sample(colors))
  }, [])

  const currentHeight = () => ref.current?.clientHeight || height

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, currentHeight() * -1]
  )
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
        <Main hidden>{children}</Main>
        <div className={styles.phone}>
          <div className={styles.phone__inner} style={{ backgroundColor }}>
            <AppUI {...{ backgroundColor }} />
            <motion.div className={styles.overlay} style={{ opacity }} />
            <motion.div
              initial={{ opacity: 0, translateY: 500 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <motion.div style={{ translateY }}>
                <div ref={ref}>
                  <Main>{children}</Main>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
