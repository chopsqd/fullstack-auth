import { FetchClient } from '@/shared/utils'

export const API = new FetchClient({
	baseUrl: process.env.SERVER_URL as string,
	options: {
		credentials: 'include'
	}
})
