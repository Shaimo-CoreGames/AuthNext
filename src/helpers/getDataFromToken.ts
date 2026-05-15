import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ''
        if (!token) {
            throw new Error('No token found')
        }
        const decoded:any =jwt.verify(token,process.env.TOKEN_SECRET! as string) as jwt.JwtPayload

        return decoded.id

    }
    catch (error: any) {

        throw new Error('message: ' + error.message)
    }
}