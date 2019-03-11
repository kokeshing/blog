import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { FaArrowCircleLeft } from "react-icons/fa"
import { FaArrowCircleRight } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostHead from "../components/PostHead"

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "katex/dist/katex.min.css"
import "../../plugins/gatsby-remark-embed-by-ogp/gatsby-remark-embed-by-ogp.css"

const PostRef = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  display: grid;
  justify-content: space-between;
  align-items: stretch;
  grid-template-columns: 1fr 1fr;
`

const PostLink = styled(Link)`
  display: block;
  text-decoration: none;
  box-shadow: none;
  color: inherit;
  padding: 0.6rem;
  border-radius: 0.5rem;

  &:hover {
    transition: all 0.15s ease-in-out;
    color: white;
    background: #52b5f1;
  }
`

const RefBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostContent = styled.div`
  font-family: "Noto Sans JP", sans-serif;
  font-feature-settings: "palt";
  ul {
    padding-left: 3rem;
  }
  p {
    margin-top: 0.8rem;
  }
  blockquote {
    padding-top: 0;
    padding-left: 1.6rem;
    margin-left: 0;
    margin-right: 2rem;
    margin-top: 0;
    margin-bottom: 2rem;
    color: #00000099;
    font-style: italic;
    border-left: 0.4rem solid #00000033;
  }

  .katex {
    font-size: 2.0rem !important;
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { slug, previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          keywords={post.frontmatter.tags}
          description={post.excerpt}
        />
        <PostHead
          title={post.frontmatter.title}
          link={slug}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />
        <hr style={{ marginBottom: "3%" }} />
        <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{ marginBottom: "3%" }} />

        <PostRef>
          {previous ? (
            <PostLink to={previous.fields.slug} rel="prev">
              <RefBox>
                <div style={{ fontSize: "3rem", display: "flex" }}>
                  <FaArrowCircleLeft />
                </div>
                <div style={{ paddingRight: "1rem", paddingLeft: "1rem", marginRight: "auto", "marginLeft": "auto" }}>
                    {previous.frontmatter.title}
                </div>
              </RefBox>
            </PostLink>
          ) : (
            <div />
          )}
          {next && (
            <PostLink to={next.fields.slug} rel="next">
              <RefBox>
                <div style={{ paddingRight: "1rem", paddingLeft: "1rem", marginRight: "auto", "marginLeft": "auto" }}>
                    {next.frontmatter.title}
                </div>
                <div style={{ fontSize: "3rem", display: "flex" }}>
                  <FaArrowCircleRight />
                </div>
              </RefBox>
            </PostLink>
          )}
        </PostRef>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        tags
      }
    }
  }
`
