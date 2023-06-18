import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

import { Contract, Provider } from 'ethers-multicall'

import AltarABI from '../constants/abis/altar/altar.json'
import ERC20ABI from '../constants/abis/erc20/erc20.json'
import SablierABI from '../constants/abis/sablier/sablier.json'
import { getLogger } from '../utils/logger'

const logger = getLogger('useAuctionDetails')

export interface AltarStreamData {
  deposit: ethers.BigNumber
  ratePerSecond: ethers.BigNumber
  sender: string
  startTime: Date
  stopTime: Date
  streamBalanceOfAltar: ethers.BigNumber
  streamBalanceOfTreasury: ethers.BigNumber
  remainingBalance: ethers.BigNumber
  token: string
}

export interface AltarInfoDetails {
  streamId: ethers.BigNumber
  streamData: AltarStreamData
  nextPokeTime: Date
  pokeCooldown: ethers.BigNumber
  altarKiteBalance: ethers.BigNumber
  altarFlxBalance: ethers.BigNumber
}

export const useAltarData = () => {
  const [altarInfo, setAltarInfo] = useState<Maybe<AltarInfoDetails>>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const provider = new ethers.providers.AlchemyProvider(
      'goerli',
      'l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT',
    )
    const ethcallProvider = new Provider(provider)

    const altarContract = new Contract('0xFd08bc7e57f8Ba7F2FF34d84dc7187604A098231', AltarABI)
    const sablierContract = new Contract('0xFc7E3a3073F88B0f249151192812209117C2014b', SablierABI)
    const FLX = new Contract('0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF', ERC20ABI)
    const KITE = new Contract('0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF', ERC20ABI)

    const main = async () => {
      setLoading(true)
      await ethcallProvider.init()

      const streamId = altarContract.streamId()
      const altarKiteBalance = KITE.balanceOf(altarContract.address)
      const altarFlxBalance = FLX.balanceOf(altarContract.address)
      const nextPokeTime = altarContract.nextPokeTime()
      const pokeCooldown = altarContract.pokeCooldown()

      try {
        const data = await ethcallProvider.all([
          streamId,
          altarKiteBalance,
          altarFlxBalance,
          nextPokeTime,
          pokeCooldown,
        ])

        const streamInfo = sablierContract.getStream(data[0])

        const streamData = await ethcallProvider.all([streamInfo])

        const dateFormatter = (bN: ethers.BigNumber) => {
          return new Date(bN.toNumber() * 1000)
        }

        const streamBalanceOfAltar = sablierContract.balanceOf(data[0], altarContract.address)
        const streamBalanceOfTreasury = sablierContract.balanceOf(data[0], streamData[0].sender)

        const streamBalanceData = await ethcallProvider.all([
          streamBalanceOfAltar,
          streamBalanceOfTreasury,
        ])

        setAltarInfo({
          streamId: data[0],
          altarKiteBalance: data[1],
          altarFlxBalance: data[2],
          nextPokeTime: dateFormatter(data[3]),
          pokeCooldown: data[4],
          streamData: {
            deposit: streamData[0].deposit,
            ratePerSecond: streamData[0].ratePerSecond,
            sender: streamData[0].sender,
            startTime: dateFormatter(streamData[0].startTime),
            stopTime: dateFormatter(streamData[0].stopTime),
            remainingBalance: streamData[0].remainingBalance,
            token: streamData[0].token,
            streamBalanceOfAltar: streamBalanceData[0],
            streamBalanceOfTreasury: streamBalanceData[1],
          },
        })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setAltarInfo(null)
        logger.error('Error getting altar details', err)
      }
    }

    main()
  }, [])

  return { loading, altarInfo }
}
