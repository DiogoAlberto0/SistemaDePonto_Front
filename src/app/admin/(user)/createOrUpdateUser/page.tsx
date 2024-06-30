//services
import { stationService } from "@/services/stations.service"
import { positionService } from "@/services/position.service"
import { userService } from "@/services/user.service"

//components
import { CreateUserForm } from "./CreateUserForm"
import { BackButton } from "@/components/BackButton"



const CreateUser = async ({ searchParams: { userId } }: {
    searchParams: { userId?: string }
}) => {

    const userResponse = await userService.getUserById(userId)
    const user = userId ? userResponse.data?.user : undefined

    const stationsResponse = await stationService.getAllStations()
    if (!stationsResponse.data) throw new Error(`${stationsResponse.status} | ${stationsResponse.error.message || 'Ocorreu um erro inesperado'} `)

    const positionsResponse = await positionService.getAllPositions()
    if (!positionsResponse.data) throw new Error(`${positionsResponse.status} | ${positionsResponse.error.message || 'Ocorreu um erro inesperado'} `)

    return (
        <main className=" h-screen flex items-center justify-center">
            <BackButton href={userId ? `/timesheet/${userId}` : '/admin/userRegisters'} />
            
            <CreateUserForm user={user} stations={stationsResponse.data.stations} positions={positionsResponse.data.positions}></CreateUserForm>
        </main>
    )
}

export default CreateUser