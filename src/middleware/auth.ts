import { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken, JwtPayload } from '@/lib/jwt'
import { sendError } from '@/lib/api'

export interface AuthenticatedRequest extends NextApiRequest {
  user?: JwtPayload
}

export function withAuth(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized - No token provided',
        })
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized - Invalid token',
        })
      }

      req.user = decoded
      await handler(req, res)
    } catch (error) {
      sendError(res, error)
    }
  }
}

export function withRole(...roles: string[]) {
  return (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
    return withAuth(async (req, res) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden - Insufficient permissions',
        })
      }

      await handler(req, res)
    })
  }
}
