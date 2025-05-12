export const getImageUrl = (url: string) => {
    return `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${url}`
}
