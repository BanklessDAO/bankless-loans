export const shortenAddress = (address: string): string =>
    address.substr(0, 6) + '...' + address.substr(-4)
