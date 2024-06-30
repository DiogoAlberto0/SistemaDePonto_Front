import { positionService } from "@/services/position.service"

import { BackButton } from "@/components/BackButton"
import { ListItemLink } from "@/components/ListItemLink"
import { Title } from "@/components/Title"


const PositionRegisters = async () => {

    const positionsResponse = await positionService.getAllPositions()
    if(!positionsResponse.data) throw new Error(`${positionsResponse.status} | ${positionsResponse.error.message || 'Ocorreu um erro inesperado'}`)

    const positions = positionsResponse.data.positions

    return (
        <main className="h-screen flex flex-col justify-start gap-2 bg-gray-100 p-12">
            <BackButton href="/admin" />
            <Title as="h1" size="2xl" weight="bold">Cargos</Title>


            <ul className="space-y-2">
                {
                    positions.map(({ id, props: { office, privillegeLevel }}) => <ListItemLink key={id} href={`/admin/createOrUpdatePosition?positionId=${id}&office=${office}&privillegeLevel=${privillegeLevel}`}>{office}</ListItemLink>)
                }
                <ListItemLink variant="secondary" href="/admin/createOrUpdatePosition">Cadastrar novo cargo</ListItemLink>
            </ul>
        </main>
    )
}


export default PositionRegisters 