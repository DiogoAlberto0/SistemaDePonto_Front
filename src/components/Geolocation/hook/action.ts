"use server"

import { redirect } from "next/navigation"

export const navigate = async (message: string) => {
    redirect(`/locationError?message=${message}`)
}