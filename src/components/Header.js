import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const SiteTitle = styled.h1`
  margin-top: 60px;
  margin-bottom: 60px;
  font-size: 3rem;
  font-family: Julius Sans One, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #333;
  blue {
    color: #1890ff;
  }

  @media screen and (max-width: 760px) {
    font-size: 3rem;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`

const TitleLink = styled(Link)`
  color: inherit;
  box-shadow: none;
  text-decoration: none;
`

class Header extends React.Component {
  render() {
    return (
      <SiteTitle>
        <TitleLink to={`/`}>
          LOST IN <blue>BLUE</blue>
        </TitleLink>
      </SiteTitle>
    )
  }
}

export default Header
