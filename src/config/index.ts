import { AddressZero } from '@ethersproject/constants'
import { isAddress, getAddress } from '@ethersproject/address'

export type LiquityFrontendConfig = {
    frontendTag?: string
    infuraApiKey?: string
    testnetOnly?: boolean
}

const defaultConfig: LiquityFrontendConfig = {
    frontendTag: process.env.NEXT_PUBLIC_FRONTEND_TAG,
    infuraApiKey: process.env.NEXT_PUBLIC_INFURA_ID,
    testnetOnly: true,
}

function hasKey<K extends string>(o: object, k: K): o is Record<K, unknown> {
    return k in o
}

const parseConfig = (object: unknown): LiquityFrontendConfig => {
    const config = { ...defaultConfig }

    if (typeof object === 'object' && object !== null) {
        if (hasKey(object, 'frontendTag') && object.frontendTag !== '') {
            const { frontendTag } = object

            if (typeof frontendTag === 'string' && isAddress(frontendTag)) {
                config.frontendTag = getAddress(frontendTag)
            } else {
                console.error('Malformed frontendTag:')
                console.log(frontendTag)
            }
        }

        if (hasKey(object, 'infuraApiKey') && object.infuraApiKey !== '') {
            const { infuraApiKey } = object

            if (typeof infuraApiKey === 'string') {
                config.infuraApiKey = infuraApiKey
            } else {
                console.error('Malformed infuraApiKey:')
                console.log(infuraApiKey)
            }
        }

        if (hasKey(object, 'testnetOnly')) {
            const { testnetOnly } = object

            if (typeof testnetOnly === 'boolean') {
                config.testnetOnly = testnetOnly
            } else {
                console.error('Malformed testnetOnly:')
                console.log(testnetOnly)
            }
        }
    } else {
        console.error('Malformed config:')
        console.log(object)
    }

    return config
}

let configPromise: Promise<LiquityFrontendConfig> | undefined = undefined

const fetchConfig = async () => {
    return parseConfig(defaultConfig)
}

export const getConfig = (): Promise<LiquityFrontendConfig> => {
    if (!configPromise) {
        configPromise = fetchConfig()
    }

    return configPromise
}
