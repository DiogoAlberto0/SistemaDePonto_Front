"use server"
import { timeSheetService } from "@/services/timeSheets.service"



export const getTimeSheetByYearAndMonth = async (year: number, month: number, userId?: string) => {

    const response = await timeSheetService.getTimeSheetByYearAndMonth(year, month, userId)

    return response
}

export const getMonthsAndYears = async (userId?: string) => {

    const response = await timeSheetService.getMonthsAndYears(userId)

    return response
}