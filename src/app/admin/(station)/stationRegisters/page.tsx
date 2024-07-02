import { stationService } from "@/services/stations.service"
import { redirect } from "next/navigation"
import { authService } from "@/services/auth.service"

//components
import { BackButton } from "@/components/BackButton"
import { ListItemLink } from "@/components/ListItemLink"
import { Title } from "@/components/Title"



const StationRegisters = async () => {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 2) return redirect('signin')

    const privillegeLevel = data.privillegeLevel

    const stationsResponse = await stationService.getAllStations()
    if (!stationsResponse.data) throw new Error(`${stationsResponse.status} | ${stationsResponse.error.message || 'Ocorreu um erro inesperado'}`)

    const stations = stationsResponse.data.stations

    return (
        <main className="h-screen flex flex-col justify-start gap-2 bg-gray-100 p-12">
            <BackButton href="/admin" />

            <Title as="h1" size="3xl" weight="bold">Postos</Title>


            <ul className="space-y-2">

                {
                    stations.map(({ id, props: { name, coord: { latitude, longitude }, cnpj } }) => <ListItemLink href={`/admin/createOrUpdateStation?id=${id}&name=${name}&latitude=${latitude}&longitude=${longitude}&cnpj=${cnpj}`} key={id}>{name}</ListItemLink>)
                }
                <ListItemLink href="/admin/createOrUpdateStation" variant="secondary">Cadastrar novo posto</ListItemLink>
            </ul>

        </main>
    )
}

export default StationRegisters