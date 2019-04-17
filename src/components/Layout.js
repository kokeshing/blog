import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { TwitterShareButton } from "react-share"
import { FaRssSquare } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"

import Header from "./Header"

import "./Layout.css"

const Base = styled.div`
  margin: 0 auto 5%;
  max-width: 800px;

  @media screen and (max-width: 900px) {
    margin: 0 5% 5%;
  }

  @media screen and (max-width: 760px) {
    max-width: 90%;
  }
`

const HorizonalLine = styled.hr`
  margin: 3% 0 3%;
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

const AuthorLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: #1890ff;
  font-weight: 700;
`

const ShareBox = styled.div`
  display: flex;
  align-content: center;
`

const TwitterIcon = styled(FaTwitter)`
  color: #1890ff;
  cursor: pointer;
  box-shadow: none;
  text-decoration: none;
  font-size: 2.5rem;
`

const ShareLink = styled(Link)`
  display: block;
  margin-right: 2.5rem;
  margin-left: 1rem;
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
    let header

    header = <Header />
    return (
      <Base>
        {header}
        <main>{children}</main>
        <HorizonalLine />
        <Footer>
          <Copyright>
            © {new Date().getFullYear()}
            {` `}
            <AuthorLink to="/profile/">
              kokeshi
            </AuthorLink>
          </Copyright>

          <ShareBox>
            <TwitterShareButton url="https://kokeshing.com">
              <TwitterIcon />
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
