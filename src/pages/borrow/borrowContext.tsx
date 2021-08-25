import { createContext, useState } from 'react'
import { BorrowProps } from './index'

const borrowDefaultValues: BorrowProps = {
  loan: 'my loan',
  addLoan: () => {}
}

export const BorrowContext = createContext<BorrowProps>(
  borrowDefaultValues
)

const BorrowWrapper = ({ children }: BorrowProps) => {
  const [loan, addLoan] = useState<string >(borrowDefaultValues.loan)
  return (
    <BorrowContext.Provider
      value={{
        loan,
        addLoan
      }}
    >
      {children}
    </BorrowContext.Provider>
  )
}

export default BorrowWrapper
