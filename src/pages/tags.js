import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { GoTag } from "react-icons/go"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import kebabHash from "kebab-hash"

const Wrapper = styled.div`
  display: flex;

  div {
    margin: 1.6rem;
  }
`

const TagIcon = styled(GoTag)`
  color: #1890ff;
  margin-right: 0.5rem;
  font-size: 2.2rem;
  position: relative;
  top: 0.4rem;
`

const TagsLink = styled(Link)`
  font-size: 2.2rem;
  text-decoration: none;
  box-shadow: none;
  color: inherit;
  padding: 0.6rem;
  border-radius: 0.5rem;

  &:hover {
    transition: all 0.5s ease;
    color: white;
    background: #52b5f1;
  }
`

class TagsPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const tags = data.allMarkdownRemark.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All tags" />
        <Wrapper>
          {tags.map(tag => (
            <div key={tag.fieldValue}>
              <TagsLink to={`/tags/${kebabHash(tag.fieldValue)}/`}>
                <TagIcon />
                {tag.fieldValue} ({tag.totalCount})
              </TagsLink>
            </div>
          ))}
        </Wrapper>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
