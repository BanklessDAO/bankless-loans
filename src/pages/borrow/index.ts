export { BorrowContext, default } from './create';

/* Global typing for Borrow*/

export type BorrowProps = {
    loan: string;
    addLoan: (name: string) => void;
    children?: JSX.Element;
};
