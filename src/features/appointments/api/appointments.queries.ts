import { queryOptions } from '@tanstack/react-query'
import { fetchAppointments, fetchUserAppointments } from './appointments.api'

export const appointmentQueries = {
  all: ['appointments'] as const,
  list: () =>
    queryOptions({
      queryKey: [...appointmentQueries.all, 'list'],
      queryFn: async () => {
        const { data, error } = await fetchAppointments()
        if (error) throw error
        return data
      },
      staleTime: 1000 * 30, // 30 seconds
    }),
  user: (userId?: string | null, email?: string | null) =>
    queryOptions({
      queryKey: [...appointmentQueries.all, 'user', userId, email],
      queryFn: async () => {
        const { data, error } = await fetchUserAppointments(userId, email)
        if (error) throw error
        return data
      },
      staleTime: 1000 * 30, // 30 seconds
    }),
}
