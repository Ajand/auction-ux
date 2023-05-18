import React from 'react'
import styled from 'styled-components'

import { InfoIconDark } from '../../icons/InfoIconDark'
import { InnerContainer } from '../../pureStyledComponents/InnerContainer'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.primary1};
  flex-shrink: 0;
  min-height: 30px;
  padding: 5px 0;
  width: 100%;
`

const Inner = styled(InnerContainer)`
  flex-direction: row;
  justify-content: flex-start;
`

const InfoIcon = styled(InfoIconDark)`
  flex-shrink: 0;
  position: relative;
  top: -2px;
`

const Text = styled.div`
  color: ${({ theme }) => theme.text3};
  font-size: 15px;
  font-weight: 700;
  hyphens: auto;
  line-height: 1.3;
  margin-left: 5px;
  max-width: 100%;
  overflow-wrap: break-word;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
`

export const TopDisclaimer: React.FC = () => {
  return (
    <Wrapper>
      <Inner>
        <InfoIcon />
        <Text>
          Our database service will undergo maintenance on 22 May 2023 from 05:00 - 06:00 UTC. While
          we do not expect issues, there might be slight delays with auction interactions. Use the
          platform at your own risk, and make sure you have conducted research before interacting
          with any ERC20 token.
        </Text>
      </Inner>
    </Wrapper>
  )
}
