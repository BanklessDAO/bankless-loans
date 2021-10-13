declare module 'TroveType' {
    interface Trove {
        loan: string
        addLoan: (name: string) => void
        children?: JSX.Element
    }

    interface StaticAmountsProps {
        inputID: string;
        labelledBy?: string;
        amount: string;
        unit?: string;
        color?: string;
        pendingAmount?: string;
        pendingColor?: string;
        onClick?: () => void;
    }

    type DisabledEditableRowProps = Omit<StaticAmountsProps, "labelledBy" | "onClick"> & {
        label: string
    }

    type EditableRowProps = DisabledEditableRowProps & {
        label: string
        editingState: [string | undefined, (editing: string | undefined) => void]
        editedAmount: string
        setEditedAmount: (editedAmount: string) => void
        maxAmount?: string
        maxedOut?: boolean
    };
}
