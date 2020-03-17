module.exports = {
  siteMetadata: {
    title: `Oppioo`,
    description: `Oppioo är ett digitalt träningsverktyg för cancerdrabbade.`,
    email: `hej@oppioo.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: `UA-160787724-1`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: `markdown`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Oppioo`,
        short_name: `Oppioo`,
        start_url: `/`,
        background_color: `#0A5046`,
        theme_color: `#0A5046`,
        display: `minimal-ui`,
        icon: `src/images/oppioo-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
