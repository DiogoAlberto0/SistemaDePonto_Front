"use server"
import { authService } from "@/services/auth.service";
import { z } from "zod"


export interface ISinginErrorState {
    status: number;
    success: string | undefined;
    error: {
        phone: undefined | string | string[],
        password: undefined | string | string[],
        confirmPassword: undefined | string | string[],
        message: string | undefined,
    }
}

const validateFields = (phone: string | undefined, password: string | undefined, confirmPassword: string | undefined) => {
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
            .min(10, { message: "A senha deve ter pelo menos 10 caracteres" })
            .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
            .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
            .regex(/\./, { message: "A senha deve conter pelo menos um ponto" }),
        confirmPassword: z
            .string()
    }).refine((value) => value.password === value.confirmPassword, {
        message: 'As senhas devem ser iguais',
        path: ['confirmPassword']
    })

    return schema.safeParse({
        phone,
        password,
        confirmPassword
    })
}
export const handleChangePhoneAndPass = async (prevState: any, e: FormData): Promise<ISinginErrorState> => {

    const phone = e.get('phone')?.toString()
    const password = e.get('password')?.toString()
    
    const confirmPassword = e.get('confirmPassword')?.toString()
    const validatedFields = validateFields(phone, password, confirmPassword)

    if (!validatedFields.success) return ({
        status: 400,
        success: undefined,
        error: {
            phone: validatedFields.error.flatten().fieldErrors.phone,
            password: validatedFields.error.flatten().fieldErrors.password,
            confirmPassword: validatedFields.error.flatten().fieldErrors.confirmPassword,
            message: undefined,
        }
    })

    try {

        const response = await authService.updatePhoneAndPassword(validatedFields.data.phone, validatedFields.data.password)

        if(response.data?.message) {
            return {
                status: 200,
                success: response.data.message,
                error: {
                    message: undefined,
                    phone: undefined,
                    password: undefined,
                    confirmPassword: undefined
                }
            }
        } else {
            return {
                status: response.status,
                success: undefined,
                error: {
                    message: response.error.message || 'Ocorreu um erro inesperado',
                    phone: undefined,
                    password: undefined,
                    confirmPassword: undefined
                }
            }
        }
    } catch (error: any) {
        return {
            success: undefined,
            status: 500,
            error: {
                message: error.message || 'Ocorreu um erro inesperado',
                phone: undefined,
                password: undefined,
                confirmPassword: undefined,
            }
        };
    }
}

