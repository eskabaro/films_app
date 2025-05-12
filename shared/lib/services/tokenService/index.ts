import AsyncStorage from '@react-native-async-storage/async-storage'

export const TOKEN_KEY = 'token'

export const tokenService = {
    get: async () => {
        return AsyncStorage.getItem(TOKEN_KEY)
    },
    set: async (token: string | null) => {
        return token ? AsyncStorage.setItem(TOKEN_KEY, token) : AsyncStorage.removeItem(TOKEN_KEY)
    }
}
