import React, { ReactNode, memo } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Text, LogoRoundIcon } from 'vvs-uikit'
import useShowCronosUpgradeWarning from './useShowCronosUpgradeWarning'

const BackgroundStyle = createGlobalStyle`
  body {
    background:#0E0037;
    color:white;
  }
`
const MaintenanceStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  max-width: 640px;
  margin: auto;
  padding: 20px;
  font-family: 'soleil';
`

const ReadMoreButton = styled.button`
  color: white;
  background: #46a1c2;
  border: none;
  border-radius: 10px;
  padding: 7px 9px;
  cursor: pointer;
  font-family: 'soleil';
`

const TextWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
`

interface CronosUpgradeWarningProps {
  children: ReactNode
}

function CronosUpgradeWarning({ children }: CronosUpgradeWarningProps): JSX.Element {
  const { showWarning } = useShowCronosUpgradeWarning()

  if (!showWarning) {
    return <>{children}</>
  }

  return (
    <MaintenanceStyle>
      <BackgroundStyle />
      <LogoRoundIcon width="50px" mb="8px" />
      <Text mb="6px" color="white" fontSize="36px">
        Maintenance
      </Text>
      <TextWrapper>
        <Text fontSize="20px" color="white">
          Exciting Cronos Mainnet upgrade in progress. VVS, like all other applications on Cronos, will be paused during
          the upgrade.
        </Text>
        <Text fontSize="20px" color="white">
          All states will be preserved and resume after maintenance which should be completed within a few hours.
        </Text>
        <Text fontSize="20px" color="white">
          Relax and check back later, miners!
        </Text>
      </TextWrapper>
      <ReadMoreButton
        type="button"
        onClick={() => {
          window.open(
            'https://medium.com/cronos-chain/cronos-mainnet-v1-0-galileo-upgrade-announcing-upgrade-block-height-6-542-800-5b95fb74063',
            '_blank',
            'noreferrer',
          )
        }}
      >
        Read More Here
      </ReadMoreButton>
    </MaintenanceStyle>
  )
}

export default memo(CronosUpgradeWarning)
