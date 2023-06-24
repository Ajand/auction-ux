import React from 'react'
import styled from 'styled-components'

interface RightSider {
  rightSide: boolean
}

const TreasuryHolder = styled.div<RightSider>`
  border: 2px dashed black;
  color: black;
  display: inline-block;
  position: absolute;
  top: 55px;
  height: 100px;
  ${(props) => (props.rightSide ? `right: 0px;` : `left: 0px;`)}
  width: 210px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.h4<RightSider>`
  position: absolute;
  top: -15px;
  ${(props) => (props.rightSide ? `right: 10px;` : `left: 10px;`)}
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0.2em 0.7em;
  border: 2px solid black;
  background-color: white;
  border-radius: 100px;
`

const Content = styled.p`
  text-align: center;
  width: 100%;
  font-size: 20px;
`

interface StreamCardBody {
  label: string
  content: string
  rightSide: boolean
}

const StreamData = (props: StreamCardBody) => {
  return (
    <TreasuryHolder rightSide={props.rightSide}>
      <Label rightSide={props.rightSide}>{props.label}</Label>
      <Content>{props.content}</Content>
    </TreasuryHolder>
  )
}

export default StreamData
