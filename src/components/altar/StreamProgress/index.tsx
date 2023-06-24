import styled from 'styled-components'

import ProgressPoint from './ProgressPoint'

const Container = styled.div`
  width: 600px;
  position: relative;
  color: black;
  font-size: 16px;
  left: 100px;
  z-index: 80;
`

const PointsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProgressBar = styled.div`
  width: calc(100% - 160px);
  height: 12px;
  border: 2px solid black;
  background-color: #ffdfd8;
  margin-left: 80px;
  position: absolute;
  top: 71px;
`

interface ProgressIndicatorProps {
  progress: number
}

const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  width: ${({ progress }) => `calc(${(progress / 100) * 68 + 30}% - 160px)`};
  height: 12px;
  border: 2px solid black;
  background-color: #ff6543;
  margin-left: 80px;
  position: absolute;
  top: 71px;
  border-radius: 15px;
  transition: 200ms;
`

const ProgressText = styled.p`
  text-align: center;
  margin-top: 4px;
`

interface ProgressInfo {
  startText: string
  endText: string
  rate: string
  progress: number
}

const StreamProgress = (props: ProgressInfo) => {
  const { endText, progress, rate, startText } = props

  return (
    <Container>
      <PointsContainer>
        <ProgressPoint content={startText} />
        <ProgressPoint content={endText} />
      </PointsContainer>
      <ProgressBar />
      <ProgressIndicator progress={progress} />
      <ProgressText>4.5 $KITE/second -&gt;</ProgressText>
    </Container>
  )
}

export default StreamProgress
