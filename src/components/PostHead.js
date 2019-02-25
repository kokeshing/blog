import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { GoCalendar } from "react-icons/go"

import TagsSpace from "./TagsSpace"

const Block = styled.div`
  margin-top: 40px;
`

const Title = styled.h3`
  display: block;
  font-size: 2.2rem;
  margin: 0rem;
  padding-left: 1rem;
  font-weight: 700;
  color: #333;
  border-radius: 0.5rem;
  border-left: solid 0.8rem #52b5f1;
  font-family: "Noto Sans JP", sans-serif;
  font-feature-settings: "palt";
  overflow: hidden;
  transition: border-left 0.15s ease-in-out;

  &:hover {
    color: #676767;
    border-left: solid 0.8rem #ffa500;
    transition: border-left 0.15s ease-in-out;
  }
`

const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
`

const PostDate = styled.span`
  font-size: 1.4rem;
  color: #333;
`

const PostExcerpt = styled.p`
  font-size: 1.4rem;
  margin-top: 0.8rem;
  margin-bottom: 0rem;
`

const Calendar = styled(GoCalendar)`
  position: relative;
  top: 0.25rem;
  font-size: 1.6rem;
  color: #1890ff;
`

class PostHead extends React.Component {
  render() {
    const { title, link, date, tags, excerpt } = this.props

    return (
      <Block key={link}>
        <Title>
          <TitleLink to={link} data-text={title}>
            {title}
          </TitleLink>
        </Title>
        <PostDate>
          <Calendar /> {date}
        </PostDate>
        <TagsSpace tags={tags} />
        {excerpt && (
          <PostExcerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
      </Block>
    )
  }
}

export default PostHead
