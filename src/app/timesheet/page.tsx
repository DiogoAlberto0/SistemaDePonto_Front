//componentes
import { BackButton } from '@/components/BackButton'
import { TimeSheetAccordion } from './components/TimeSheetAccordion'

import { getMonthsAndYears } from './data'
import { Title } from '@/components/Title'

const TimeSheet = async () => {

    const response = await getMonthsAndYears()


    if (!response.data) throw new Error(`
        status: ${response.status}  |  ${response.statusText || 500}
        message: ${response.error.message}    
        `)


    const monthsAndYears = response.data.monthsAndYears

    return (
        <main className='h-screen flex flex-col justify-start bg-gray-100 p-4 space-y-2'>
            <BackButton href="/dashboard" />
            <Title as="h1" size="3xl" weight="bold"> Folha de ponto</Title>
            {monthsAndYears.map(({ year, month }, index) => <TimeSheetAccordion key={index} year={year} month={month} />)}
        </main>
    )
}

export default TimeSheet