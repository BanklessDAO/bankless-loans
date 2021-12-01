import { createContext, useState } from 'react';
import { BorrowProps } from './index';

const borrowDefaultValues: BorrowProps = {
    loan: 'my loan',
};

export const BorrowContext = createContext<BorrowProps>(borrowDefaultValues);

const BorrowWrapper = ({ children }: BorrowProps): JSX.Element => {
    const [loan, addLoan] = useState<string>(borrowDefaultValues.loan);
    return (
        <BorrowContext.Provider
            value={{
                loan,
            }}
        >
            {children}
        </BorrowContext.Provider>
    );
};

export default BorrowWrapper;
