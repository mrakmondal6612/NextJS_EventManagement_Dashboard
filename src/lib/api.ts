import { NextApiRequest, NextApiResponse } from 'next'

export class ApiError extends Error {
  statusCode: number
  success: boolean

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.success = false
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export function sendResponse<T>(
  res: NextApiResponse,
  statusCode: number,
  message: string,
  data?: T
): void {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  })
}

export function sendError(res: NextApiResponse, error: unknown): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  } else if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
    })
  }
}

export async function asyncHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      sendError(res, error)
    }
  }
}
