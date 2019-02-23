import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { GoTag } from "react-icons/go"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostHead from "../components/PostHead"

const TagHead = styled.h2`
  font-size: 2.2rem;
`

const TagIcon = styled(GoTag)`
  color: #1890ff;
  margin-right: 0.5rem;
  font-size: 2.2rem;
  position: relative;
  top: 0.4rem;
`

class TagPageTemplate extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { tag } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={tag} keywords={[tag]} />
        <TagHead>
          <TagIcon />
          {tag}
        </TagHead>
        <ul style={{ paddingLeft: "0px" }}>
          {edges.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <PostHead
                title={title}
                link={node.fields.slug}
                date={node.frontmatter.date}
                tags={node.frontmatter.tags}
                excerpt={node.excerpt}
                animation={true}
              />
            )
          })}
        </ul>
      </Layout>
    )
  }
}

export default TagPageTemplate

export const pageQuery = graphql`
  query TagBySlug($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`
