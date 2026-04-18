import axios, { AxiosInstance } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    })

    // Add token to requests
    this.axiosInstance.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Auth endpoints
  register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.axiosInstance.post('/auth/register', data)
  }

  login(data: { email: string; password: string }) {
    return this.axiosInstance.post('/auth/login', data)
  }

  // Events endpoints
  getEvents(params?: { page?: number; limit?: number; category?: string; search?: string }) {
    return this.axiosInstance.get('/events', { params })
  }

  getEvent(id: string) {
    return this.axiosInstance.get(`/events/${id}`)
  }

  createEvent(data: any) {
    return this.axiosInstance.post('/events', data)
  }

  updateEvent(id: string, data: any) {
    return this.axiosInstance.put(`/events/${id}`, data)
  }

  deleteEvent(id: string) {
    return this.axiosInstance.delete(`/events/${id}`)
  }

  // Tickets endpoints
  getTickets(eventId: string) {
    return this.axiosInstance.get(`/events/${eventId}/tickets`)
  }

  createTicket(eventId: string, data: any) {
    return this.axiosInstance.post(`/events/${eventId}/tickets`, data)
  }

  // Registrations endpoints
  getRegistrations(params?: { userId?: string; eventId?: string; page?: number; limit?: number }) {
    return this.axiosInstance.get('/registrations', { params })
  }

  createRegistration(data: any) {
    return this.axiosInstance.post('/registrations', data)
  }
}

export const apiClient = new ApiClient()
