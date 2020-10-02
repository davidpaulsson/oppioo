import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Helmet from "react-helmet"
import ShareImage from "../images/oppioo_logotype.png"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            descriptionEn
          }
        }
      }
    `
  )

  const getDescription = () => {
    if (description) {
      return description
    }
    if (lang === "sv") {
      return site.siteMetadata.description
    }
    return site.siteMetadata.descriptionEn
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: getDescription(),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: getDescription(),
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://oppioo.com${ShareImage}`,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:width`,
          content: `630`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: getDescription(),
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `sv`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
