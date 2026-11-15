import { queryOptions } from '@tanstack/react-query'
import { fetchContactMessages, fetchUserContactMessages } from './contact.api'

export const contactQueries = {
  all: ['contact-messages'] as const,
  list: () =>
    queryOptions({
      queryKey: [...contactQueries.all, 'list'],
      queryFn: async () => {
        const { data, error } = await fetchContactMessages()
        if (error) throw error
        return data
      },
      staleTime: 1000 * 60, // 1 minute
    }),
  user: (email?: string | null) =>
    queryOptions({
      queryKey: [...contactQueries.all, 'user', email],
      queryFn: async () => {
        if (!email) return []
        const { data, error } = await fetchUserContactMessages(email)
        if (error) throw error
        return data
      },
      staleTime: 1000 * 60, // 1 minute
      enabled: Boolean(email),
    }),
}
