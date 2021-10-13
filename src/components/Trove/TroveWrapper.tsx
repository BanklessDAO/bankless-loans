import { useState } from 'react'
import { Trove } from 'TroveType'

const troveDefaultValues: Trove = {
  loan: 'my loan',
  addLoan: () => {},
}

const TroveWrapper = ({ children }: Trove): JSX.Element => {
  const [loan, addLoan] = useState<string >(troveDefaultValues.loan)
  return (
    <TroveWrapper
      value={{
        loan,
        addLoan
      }}
    >
      {children}
    </TroveWrapper>
  )
}

export default TroveWrapper
