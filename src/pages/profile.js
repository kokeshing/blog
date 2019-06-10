import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { FaTwitter } from "react-icons/fa"

import Layout from "../components/Layout"
import SEO from "../components/seo"

const ItemName = styled.h2`
  font-weight: 100;
  color: #1890ff;
`

const Name = styled.h3`
  font-weight: 100;
  padding-left: 40px;
`

const PaperTitle = styled.h3`
  font-weight: 100;
  margin-bottom: 0;
`

const History = styled.div`
  display: block;
  a {
    text-decoration: none;
    color: #1890ff;
  }
  ul {
    list-style-type: none;
  }
`

const TwitterIcon = styled(FaTwitter)`
  padding-left: 40px;
  color: #1890ff;
  cursor: pointer;
  box-shadow: none;
  text-decoration: none;
  font-size: 2.5rem;
`

class Profile extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Profile" keywords={[`kokeshi`, `kokeshing`]} />
        <ItemName>Name</ItemName>
        <Name>Kotaro Onishi</Name>
        <ItemName>Organization</ItemName>
        <History>
          <ul>
            <li>
              <p style={{ marginBottom: "0" }}>2017/04 ~ now</p>
              <p style={{ marginTop: "0.25rem", marginBottom: "0" }}><a href="https://www.uec.ac.jp/">The University of Electro-Communications</a></p>
              <p style={{ marginTop: "0" }}>Security informatics cource, Third year student</p>
            </li>
          </ul>
        </History>
        <ItemName>Paper</ItemName>
        <ul>
          <li>
            <PaperTitle>パラレル制約付きVAEを用いた未知話者声質変換の検討</PaperTitle>
            <p style={{ marginTop: "0em", marginBottom: "0" }}>大西弘太郎, 中鹿亘</p>
            <p style={{ marginTop: "0em" }}>日本音響学会2019年春季研究発表会</p>
          </li>
        </ul>
        <ItemName>History</ItemName>
        <History>
          <ul>
            <li>
              <p style={{ marginBottom: "0" }}>2019/02 ~ now</p>
              <p style={{ marginTop: "0.25rem", marginBottom: "0" }}><a href="https://www.drecom.co.jp/">Drecom Co., Ltd.</a></p>
              <p style={{ marginTop: "0" }}>Front-end web developer</p>
            </li>
            <li>
              <p style={{ marginBottom: "0" }}>2018/09 ~ 2019/02</p>
              <p style={{ marginTop: "0.25rem", marginBottom: "0" }}><a href="https://www.tuat.ac.jp/">Tokyo University of Agriculture and Technology</a></p>
              <p style={{ marginTop: "0" }}>Resarch assistant at <a href="http://katfuji.lab.tuat.ac.jp/">Katsuhide Fujita Laboratory</a></p>
            </li>
            <li>
              <p style={{ marginBottom: "0" }}>2017/12 ~ 2019/10</p>
              <p style={{ marginTop: "0.25rem", marginBottom: "0" }}><a href="https://www.diverta.co.jp/">Diverta Inc.</a></p>
              <p style={{ marginTop: "0" }}>Front-end & Back-end web developer</p>
            </li>
          </ul>
        </History>
        <ItemName>Contact</ItemName>
            <a href="https://twitter.com/HokeKings"><TwitterIcon /></a>
      </Layout>
    )
  }
}

export default Profile

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
