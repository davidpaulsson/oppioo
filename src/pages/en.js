import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./index.module.scss"
import Logo from "../images/logo.inline.svg"

const IndexPage = () => {
  const { allMarkdownRemark: md } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/home-en.md/" } }
        ) {
          edges {
            node {
              html
            }
          }
        }
      }
    `
  )

  const { html } = md.edges[0].node

  return (
    <Layout lang="en">
      <SEO title="Oppioo" lang="en" />
      <div className={styles.handle} />
      <span
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className={styles.footer}>
        <Logo style={{ width: 100, height: 100 }} />© {new Date().getFullYear()}{" "}
        Oppioo
      </div>
    </Layout>
  )
}

export default IndexPage
