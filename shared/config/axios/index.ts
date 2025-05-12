import axios from 'redaxios'

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTVjMTE5NWUyYmMzZTFmOTUwNzZhNTA5ZGQ0NjU5NiIsIm5iZiI6MS43NDY4NTMyNTQ5OTEwMDAyZSs5LCJzdWIiOiI2ODFlZGQ4NmEwMzFlODhjYzE1YTIwNjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IYihGyDacxU1OqikmMyCpx_XnUGBdZMX7l5tOFrqTxg'

export const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
})
