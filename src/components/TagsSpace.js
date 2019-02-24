import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import kebabHash from "kebab-hash"
import { GoTag } from "react-icons/go"

const TagList = styled.ul`
  display: inline-flex;
  liststyle: none;
  fontsize: 0px;
  margin-top: 0.8rem;
  margin-bottom: 0;
  margin-left: 0.1rem;
  margin-right: auto;
  padding-left: 0;
`

const TagItem = styled.li`
  display: flex;
  overflow: hidden;
  font-size: 1.4rem;
  margin-left: 0.8rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  border-radius: 0.5rem;
  line-height: 2.6rem;
  blue {
    color: #1890ff;
  }

  &:hover {
    transition: all 0.15s ease-in-out;
    color: white;
    background: #52b5f1;

    blue {
      transition: all 0.15s ease-in-out;
      color: white;
    }
  }
`

const TagLink = styled(Link)`
  color: inherit;
  box-shadow: none;
  text-decoration: none;
`

const TagIcon = styled(GoTag)`
  margin-right: 0.2rem;
  position: relative;
  top: 0.3rem;
`

class TagsSpace extends React.Component {
  render() {
    const { tags } = this.props

    return (
      <TagList>
        {tags.map(tag => {
          return (
            <TagItem>
              <TagLink to={`/tags/${kebabHash(tag)}/`}>
                <blue>
                  <TagIcon />
                </blue>
                {tag}
              </TagLink>
            </TagItem>
          )
        })}
      </TagList>
    )
  }
}

export default TagsSpace
