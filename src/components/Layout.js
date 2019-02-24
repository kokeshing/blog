import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { TwitterShareButton } from 'react-share';
import { FaRssSquare, FaTwitter } from "react-icons/fa"

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

const HorizonalLine = styled.hr`
  margin-top: 3%;
  margin-bottom: 3%;
`

const Footer = styled.footer`
  display: flex;
  width: 100%;
  font-size: 1.6rem;
  align-content: center;
  justify-content: space-between;
`

const Copyright = styled.p`
  display: block;
  margin-top: 0;
  margin-bottom: 0;
`

const AuthorLink = styled.a`
  box-shadow: none;
  text-decoration: none;
  color: #1890ff;
`

const ShareBox = styled.div`
  display: flex;
  align-content: center;
`

const TwitterIcon = styled(FaTwitter)`
  color: #1890ff;
  cursor : pointer;
  box-shadow: none;
  text-decoration: none;
  font-size: 2.5rem;
`

const ShareLink = styled(Link)`
  display: block;
  margin-right: 2.5rem;
  margin-left: 1.0rem;
  position: relative;
  font-size: 2.5rem;
  color: #1890ff;
  box-shadow: none;
  text-decoration: none;
`

const RssIcon = styled(FaRssSquare)`
  position: absolute;
  bottom: 0.5rem;
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
          <Copyright>
            © {new Date().getFullYear()}
            {` `}
            <AuthorLink href="https://www.linkedin.com/in/kokeshi">
              kokeshi
            </AuthorLink>
          </Copyright>

          <ShareBox>
            <TwitterShareButton url="https://kokeshing.com">
              <TwitterIcon/>
            </TwitterShareButton>
            <ShareLink to={`/rss.xml`}>
              <RssIcon />
            </ShareLink>
          </ShareBox>
        </Footer>
      </Base>
    )
  }
}

export default Layout
