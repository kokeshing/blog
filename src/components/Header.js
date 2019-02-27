import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const SiteTitle = styled.h1`
  margin: 20% 0 20%;
  font-size: 3rem;
  font-family: Julius Sans One, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #333;
  blue {
    color: #1890ff;
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
        <TitleLink to={`/index.html`}>
          LOST IN <blue>BLUE</blue>
        </TitleLink>
      </SiteTitle>
    )
  }
}

export default Header
