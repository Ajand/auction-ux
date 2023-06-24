import { ethers } from 'ethers'
import React from 'react'
import styled from 'styled-components'

import AltarAction from './AltarAction'
import StreamData from './StreamData'
import { AltarInfoDetails } from '../../../hooks/useAltarDetails'
import { formatAmount } from '../../../utils'
import StreamProgress from '../StreamProgress'

interface Image {
  src: string
}

const HeaderImage = styled.img`
  width: 100%;
`

const Divider = styled.div`
  border-top: 2px solid black;
`

const Card = styled.div`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 14px;
`

const TitleHolder = styled.div`
  padding: 0em 1.5em;
  display: flex;
  justify-content: space-between;
`

const ProgressContainer = styled.div`
  position: relative;
  width: 800px;
`

const ProgressHolder = styled.div`
  padding: 0em 1.5em;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Title = styled.h3`
  color: black;
`

const Subtitle = styled.h4`
  color: black;
`

interface StreamCardBody {
  altarInfo: AltarInfoDetails
}

function formatDate(date) {
  // Extract date and time components
  const year = date.getFullYear().toString().slice(-2) // Last two digits of the year
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Month (zero-based)
  const day = ('0' + date.getDate()).slice(-2) // Day of the month
  const hours = ('0' + date.getHours()).slice(-2) // Hours (24-hour format)
  const minutes = ('0' + date.getMinutes()).slice(-2) // Minutes

  // Concatenate the components
  const formattedDate = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes

  return formattedDate
}

const StreamCard = (props: StreamCardBody) => {
  const { altarInfo } = props

  const progress = altarInfo.streamData
    ? 100 *
      ((Number(new Date()) - Number(altarInfo.streamData.startTime)) /
        (Number(altarInfo.streamData.stopTime) - Number(altarInfo.streamData.startTime)))
    : 0

  return (
    <Card>
      <HeaderImage src="/assets/headerImage.svg" />
      <Divider />
      <TitleHolder>
        {altarInfo.streamData ? (
          <Title>Altar Stream Info | ID: {altarInfo.streamId.toString()}</Title>
        ) : (
          <Title>Altar Stream has been finished!</Title>
        )}
        {altarInfo.streamData ? (
          <Subtitle>Deposit: {formatAmount(altarInfo.streamData.deposit)} $KITE</Subtitle>
        ) : null}
      </TitleHolder>

      {altarInfo.streamData ? (
        <ProgressHolder>
          <ProgressContainer>
            <StreamProgress
              endText={formatDate(altarInfo.streamData.stopTime)}
              progress={progress > 100 ? 100 : progress}
              rate={`${formatAmount(altarInfo.streamData.ratePerSecond)} $KITE/seconds`}
              startText={formatDate(altarInfo.streamData.startTime)}
            />
            <StreamData
              content={`${formatAmount(altarInfo.streamData.streamBalanceOfTreasury)} $KITE`}
              label="Treasury"
              rightSide={false}
            />
            <StreamData
              content={`${formatAmount(altarInfo.streamData.streamBalanceOfAltar)} $KITE`}
              label="Altar"
              rightSide={true}
            />
          </ProgressContainer>
        </ProgressHolder>
      ) : null}

      <Divider />
      <AltarAction altarInfo={altarInfo} />
    </Card>
  )
}

export default StreamCard
