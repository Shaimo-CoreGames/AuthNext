import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextResponse) {

    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        //validation
        console.log(reqBody);
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json('User does not exist', { status: 400 })
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);

        const tokenData={
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET! as string, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        })

        response.cookies.set('token',token,{
            httpOnly: true
        })
        
        return response




    }
    catch (error: any) {
        return NextResponse.json('message: ' + error.message, { status: 500 })
    }

}