import Polyglot from 'node-polyglot'
import { AsyncStorage } from 'react-native'
import React from 'react'
import { translationKeys, Locale } from './i18n/TranslationKeys'
import en from './i18n/en.json'

interface InterpolationKeys {
    [key: string]: string | number
}

// polyglot doc: https://github.com/airbnb/polyglot.js
const polyglot = new Polyglot()
const defaultLocale: Locale = 'en'

type TranslationKeys = typeof translationKeys
type TGetFunction = (t: TranslationKeys) => string

const languages = {
    en,
}

/**
 * Translates a key to a translation string.
 *
 * ---
 *
 * Pluralization: To get a pluralized phrase use the specially-formatted delimiter string: `" |||| "`
 *
 * Example:
 * ```js
 * t('Translation.key', {amount: 3});
 * "There is one kitten. |||| There are %{amount} kittens."
 * // >> There are 3 kittens.
 * ```
 *
 * @param key The translation key.
 * @param interpolation Variable object to use for interpolation.
 *
 */
export function loc(getKey: TGetFunction, interpolation?: InterpolationKeys | number): string {
    const key = getKey(translationKeys)

    if (interpolation) {
        return polyglot.t(key, interpolation as InterpolationKeys)
    }

    return polyglot.t(key)
}

/**
 * Get namespaced loc function
 *
 * @param namespace Translation keys
 */
export function namespaceLocalize<TNamespace>(getNamespace: (t: TranslationKeys) => TNamespace) {
    return (getKey: (keys: TNamespace) => string, options?: InterpolationKeys) => loc(t => getKey(getNamespace(t)), options)
}

/**
 * Dynamically change the current app's language to the given language.
 * Setting the language will cache the language for the browser.
 *
 * @param language The language to switch to.
 */
export const changeLanguage = async (language: Locale) => {
    await AsyncStorage.setItem('@BOILERPLATE:language', language)
    polyglot.locale(language)
    const languageResource = languages[language]
    polyglot.replace(languageResource)
}

/**
 * Returns the current language locale.
 */
export const getCurrentLanguage = () => {
    return polyglot.locale() as Locale
}

/**
 * Get the current language locale from the cache if found or return the default.
 */
const getCurrentLocale = async () => {
    const cachedLocale = await AsyncStorage.getItem('@BOILERPLATE:language') as Locale

    return cachedLocale || defaultLocale
}

/**
 * Set the language from cache, or set to the default.
 *
 */
export const initializeLocalization = async () => {
    await changeLanguage(await getCurrentLocale())
}

interface LocalizationProviderProps {
    initialize: () => Promise<void>
}

interface LocalizationProviderState {
    initialized: boolean
}
export class LocalizationProvider extends React.Component<LocalizationProviderProps, LocalizationProviderState> {

    public state: LocalizationProviderState = {
        initialized: false,
    }

    public async componentDidMount() {
        const { initialize } = this.props

        await initialize()

        this.setState({
            initialized: true,
        })
    }

    public render() {
        const { initialized } = this.state
        const { children } = this.props
        if (!initialized) {
            return null
        }

        return children
    }
}
