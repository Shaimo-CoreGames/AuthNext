import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

import {getDataFromToken} from '@/helpers/getDataFromToken'

connect()

export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request)
        if(!userId){
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const user = await User.findOne({_id:userId}).select("-password -verifyToken -verifyTokenExpiry")

        return NextResponse.json({
            message: 'User data fetched successfully',
            success: true,
            data: user
        })

    }
    catch (error: any) {
        return NextResponse.json('message: ' + error.message, { status: 500 })
    }

}