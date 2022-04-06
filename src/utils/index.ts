export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const truncateAddress = (address: string | null) => {
    if (!address) return 'No Account'
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    )
    if (!match) return address
    return `${match[1]}…${match[2]}`
}

export const toHex = (num: string) => {
    const val = Number(num)
    return '0x' + val.toString(16)
}

export const hasClass = (className: string) =>
    document.body.classList.contains(className)
