import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import "./Layout.css"

const Base = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  margin-bottom: 5%;

  @media screen and (max-width: 900px) {
    margin-right: 5%;
    margin-left: 5%;
  }

  @media screen and (max-width: 760px) {
    max-width: 90%;
  }
`

const SiteTitle = styled.h1`
  margin-top: 12%;
  margin-bottom: 12%;
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

const AuthorLink = styled.a`
  box-shadow: none;
  text-decoration: none;
  color: #1890ff;
`

const HorizonalLine = styled.hr`
  margin-top: 3%;
  margin-bottom: 3%;
`

const Footer = styled.footer`
  font-size: 1.6rem;
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <Base>
        <header>
          <SiteTitle>
            <TitleLink to={`/`}>
              LOST IN <blue>BLUE</blue>
            </TitleLink>
          </SiteTitle>
        </header>
        <main>{children}</main>
        <HorizonalLine />
        <Footer>
          © {new Date().getFullYear()}
          {` `}
          <AuthorLink href="https://www.linkedin.com/in/kokeshi">
            kokeshi
          </AuthorLink>
        </Footer>
      </Base>
    )
  }
}

export default Layout
