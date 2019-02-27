module.exports = {
  siteMetadata: {
    title: `LOST IN BLUE`,
    author: `Kotaro Onishi`,
    description: `A blog of @kokeshing_`,
    siteUrl: `https://blog.kokeshing.com`,
    social: {
      twitter: `kokeshing_`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
                // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
                strict: `ignore`
            },
          },
          `gatsby-remark-embed-by-ogp`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-121316851-1",
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LOST IN BLUE`,
        short_name: `LOST IN BLUE`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#1890ff`,
        display: `minimal-ui`,
        icon: `content/assets/favcon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-webpack-bundle-analyzer`,
  ],
}
