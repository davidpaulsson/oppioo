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

  // random bg color
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  useEffect(() => {
    const color = sample(colors)
    setBackgroundColor(color)
    document.documentElement.style.setProperty("--background", color)
  }, [])

  // manage scroll
  const { scrollYProgress } = useViewportScroll()
  const contentRef = useRef()
  const phoneRef = useRef()
  const uiRef = useRef()
  const { width, height: windowHeight } = useWindowSize()
  const [sizes, setSizes] = useState({
    content: 0,
    phone: 0,
    ui: 0,
    window: windowHeight,
  })
  useEffect(() => {
    setSizes({
      content: contentRef.current?.clientHeight || 0,
      phone: phoneRef.current?.clientHeight || 0,
      ui: uiRef.current?.clientHeight || 0,
      window: windowHeight,
    })
  }, [contentRef.current, phoneRef.current, uiRef.current, windowHeight])

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 548 * -1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])

  const [isLarge, setIsLarge] = useState(false)
  useEffect(() => {
    setIsLarge(width >= 450)
  }, [width])

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
        {isLarge && (
          <>
            <Logo className={styles.cornerLogo} style={{ fill: "#fff" }} />
            {/* empty ghost div to take up vertical space for scroll purposes */}
            <div
              style={{
                height: sizes.content + (sizes.phone - sizes.ui),
              }}
            />
          </>
        )}
        <div className={styles.phone} ref={phoneRef}>
          <div className={styles.phone__inner} style={{ backgroundColor }}>
            <AppUI {...{ backgroundColor }} ref={uiRef} />
            <motion.div className={styles.overlay} style={{ opacity }} />
            {isLarge ? (
              <motion.div
                initial={{ opacity: 0, translateY: 500 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <motion.div style={{ translateY }} ref={contentRef}>
                  <Main>{children}</Main>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, translateY: 500 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <Main>{children}</Main>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
