import React, { useEffect, useState, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import CronosUpgradeWarning from 'components/CronosUpgradeWarning/CronosUpgradeWarning'
import ConditionalWrapper from 'components/ConditionalWrapper'
import styled from 'styled-components'
import { Spinner } from 'components/Spinner'
import { fetchTokenListAsync } from 'vvs-config'

const MAINTENANCE_PAGE_SUPPORTED = process.env.REACT_APP_MAINTENANCE_PAGE_SUPPORTED === 'true'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e2e0db;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

const App = lazy(() => import('./App'))

function AppWithAsyncTokenList() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const fetchAsync = async () => {
      await fetchTokenListAsync().then(() => {
        setStatus('fetched')
      })
    }

    fetchAsync()
  }, [])

  if (status === 'loading') return <PageLoader />

  return (
    <Suspense fallback={<PageLoader />}>
      <App />
    </Suspense>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ConditionalWrapper
      condition={MAINTENANCE_PAGE_SUPPORTED}
      wrapper={(children) => <CronosUpgradeWarning>{children}</CronosUpgradeWarning>}
    >
      <AppWithAsyncTokenList />
    </ConditionalWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
)
