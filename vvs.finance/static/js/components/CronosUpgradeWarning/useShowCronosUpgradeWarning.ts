import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'

const ABCI_INFO_ENDPOINT = process.env.REACT_APP_ABCI_INFO_ENDPOINT

const MAINTENANCE_BLOCK_HEIGHT = Number(process.env.REACT_APP_MAINTENANCE_BLOCK_HEIGHT)

const MIN_BLOCK_HEIGHT = MAINTENANCE_BLOCK_HEIGHT - 150

const MAX_BLOCK_HEIGHT = MAINTENANCE_BLOCK_HEIGHT + 600

// Check upgrade status every 15 seconds
const INTERVAL_MS = 1000 * 15

interface UseShowCronosUpgradeWarningState {
  loading: boolean
  showWarning: boolean
}

const initState: UseShowCronosUpgradeWarningState = {
  loading: true,
  showWarning: false,
}

const CHECK_FULFILLED = 'CHECK_FULFILLED'

const CHECK_REJECTED = 'CHECK_REJECTED'

interface CheckFulfilledAction {
  showWarning: boolean
  type: typeof CHECK_FULFILLED
}

interface CheckRejectedAction {
  type: typeof CHECK_REJECTED
}

type UseShowCronosUpgradeWarningAction = CheckFulfilledAction | CheckRejectedAction

function reducer(
  state: UseShowCronosUpgradeWarningState,
  action: UseShowCronosUpgradeWarningAction,
): UseShowCronosUpgradeWarningState {
  switch (action.type) {
    case CHECK_FULFILLED:
      return { ...state, loading: false, showWarning: action.showWarning }
    case CHECK_REJECTED:
      return { ...state, loading: false, showWarning: true }
    default:
      return { ...state }
  }
}

export interface AbciInfoResponseBody {
  jsonrpc: string
  id: number
  result: {
    response: {
      data: string
      version: string
      /* eslint-disable camelcase */
      last_block_height: string
      /* eslint-disable camelcase */
      last_block_app_hash: string
    }
  }
}

export type UseShowCronosUpgradeWarningResult = UseShowCronosUpgradeWarningState

function shouldShowWarning(lastBlockHeight: string): boolean {
  try {
    const parsedBlockHeight = parseInt(lastBlockHeight, 10)

    if (parsedBlockHeight > MIN_BLOCK_HEIGHT && parsedBlockHeight < MAX_BLOCK_HEIGHT) {
      return true
    }

    return false
  } catch (error) {
    // Failed to parse block height, let's be safe and show the warning
    return true
  }
}

function useShowCronosUpgradeWarning(): UseShowCronosUpgradeWarningResult {
  const [state, dispatch] = useReducer(reducer, initState)

  const checkCurrentBlockHeight = useCallback(async (): Promise<void> => {
    try {
      const { data } = await axios.get<AbciInfoResponseBody>(ABCI_INFO_ENDPOINT)

      if (data.result?.response?.last_block_height) {
        const showWarning = shouldShowWarning(data.result.response.last_block_height)
        dispatch({ type: CHECK_FULFILLED, showWarning })
        return
      }

      dispatch({ type: CHECK_FULFILLED, showWarning: false })
    } catch (error) {
      // Endpoint failed, let's be safe and show the warning
      dispatch({ type: CHECK_REJECTED })
    }
  }, [])

  useEffect(() => {
    checkCurrentBlockHeight()
  }, [checkCurrentBlockHeight])

  useEffect(() => {
    let intervalRef: number | null = null

    if (state.showWarning) {
      intervalRef = window.setInterval(() => {
        checkCurrentBlockHeight()
      }, INTERVAL_MS)
    }

    return (): void => {
      if (intervalRef) {
        window.clearInterval(intervalRef)
      }
    }
  }, [state.showWarning, checkCurrentBlockHeight])

  return state
}

export default useShowCronosUpgradeWarning
