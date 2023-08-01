import { ReactElement } from 'react'

interface ConditionalWrapperProps {
  condition: boolean
  wrapper: (arg0: ReactElement) => ReactElement
  children: ReactElement
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

export default ConditionalWrapper
