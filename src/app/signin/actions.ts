"use server"

import { z } from 'zod'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authService } from '@/services/auth.service'




interface SinginError {
    error: {
        phone: undefined | string | string[],
        password: undefined | string | string[],
        message: string | undefined,
        status: number
    }
}

const validateFields = (phone: string | undefined, password: string | undefined) => {
    const cleanPhoneNumber = (phone: string) => phone.replace(/[()\s-]/g, '')

    const schema = z.object({
        phone: z
            .string()
            .transform(cleanPhoneNumber)
            .refine((value) => /^\d{10,15}$/.test(value), {
                message: 'Numero de telefone inválido'
            }),
        password: z
            .string()

    })

    return schema.safeParse({
        phone,
        password
    })
}
export const handleSignin = async (prevState: any, e: FormData): Promise<SinginError> => {

    const phone = e.get('phone')?.toString()
    const password = e.get('password')?.toString()

    const validatedFields = validateFields(phone, password)

    if (!validatedFields.success) return ({
        error: {
            phone: validatedFields.error.flatten().fieldErrors.phone,
            password: validatedFields.error.flatten().fieldErrors.password,
            message: undefined,
            status: 400
        }
    })

    try {

        const response = await authService.signin(`${phone}`, `${password}`)

        if(response.error || !response.data || !response.data.token) return {
            error: {
                phone: undefined,
                password: undefined,
                status: response.status || 500,
                message: response.error.message || 'Ocorreu um erro inesperado'
            }
        }

        cookies().set('Authorization', response.data.token, {
            maxAge: 60 * 60 * 24,
            httpOnly: true
        })

    } catch (error: any) {
        return {
            error: {
                message: error.message,
                phone: undefined,
                password: undefined,
                status: 500
            }
        };
    }

    redirect('/dashboard')
}

export const handleSignOut = () => {
    cookies().delete('Authorization')
}