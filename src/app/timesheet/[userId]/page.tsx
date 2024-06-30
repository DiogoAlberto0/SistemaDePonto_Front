//componentes
import { BackButton } from '@/components/BackButton'
import { TimeSheetAccordion } from '../components/TimeSheetAccordion'

import { getMonthsAndYears } from '../data'
import { PencilSimpleLine } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { userService } from '@/services/user.service'
import { Title } from '@/components/Title'
import { authService } from '@/services/auth.service'

const TimeSheet = async ({ params }: { params: { userId: string }}) => {

    const yearsAndMonthResponse = await getMonthsAndYears(params.userId)
    if (!yearsAndMonthResponse.data) throw new Error(`${yearsAndMonthResponse.status} | ${yearsAndMonthResponse.error.message}`)

    const userResponse = await (await userService.getUserById(params.userId))
    if(!userResponse.data) throw new Error(`${userResponse.status} - ${userResponse.error.message}`)

    const privillegeLevelResponse = await authService.getPrivilegeLevel()
    const privillegeLevel = privillegeLevelResponse.data?.privillegeLevel || 0

    const monthsAndYears = yearsAndMonthResponse.data.monthsAndYears
    const user = userResponse.data.user
    const position = userResponse.data.position
    const station = userResponse.data.station

    return (
        <main className='h-screen flex flex-col gap-4 bg-gray-100 p-6 overflow-auto'>
            <BackButton href="/admin/userRegisters" className="self-start" />

            {/* <div className="bg-red-500 flex items-center w-full justify-center"> */}
                <div className="relative text-center p-8 pt-16 w-full mx-auto bg-white shadow-md rounded-lg border border-gray-200">
                    {
                        privillegeLevel >= 3 &&
                        <Link href={`/admin/createOrUpdateUser?userId=${user.id}`} className="absolute top-4 right-4 bg-green-600 py-2 px-4 rounded-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                            <PencilSimpleLine size={32} />
                        </Link>
                    }

                    <div>
                        <Title as="h1" size="2xl" weight="bold" >Nome: {user.props.name}</Title>
                        <h2 className="text-xl text-gray-700 mb-6">Telefone: {user.props.phone}</h2>

                    </div>
                    <div>
                        <h2 className="text-xl text-gray-700 mb-6">Cargo: {position.props.office.toLowerCase()}</h2>
                        <h2 className="text-xl text-gray-700 mb-6">Posto: {station.props.name}</h2>
                    </div>
                </div>
            {/* </div> */}

            <Title as='h1' size="3xl" weight="bold">Folha de Ponto</Title>
            <div className="space-y-4">
                {monthsAndYears.map(({ year, month }, index) => (
                    <TimeSheetAccordion userId={params.userId} key={index} year={year} month={month} />
                ))}
            </div>
        </main>
    )
}

export default TimeSheet