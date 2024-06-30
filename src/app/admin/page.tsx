import { BackButton } from "@/components/BackButton"
import { ListItemLink } from "@/components/ListItemLink"
import { authService } from "@/services/auth.service"


const Admin = async () => {
    const response = await authService.getPrivilegeLevel()

    const privilegeLevel = response.data?.privillegeLevel || 0

    return (
        <main className="h-screen flex flex-col justify-between bg-gray-100 p-4">
            <BackButton href="/dashboard"/>
            {
                privilegeLevel >= 2 &&
                <>
                    <nav>
                        <ul className="space-y-2">
                            <ListItemLink href="/admin/setMissed">Registrar falta</ListItemLink>
                            <ListItemLink href="/admin/setMedicalCertificate">Registrar atestado</ListItemLink>
                            <ListItemLink href="/admin/userRegisters">Funcionários</ListItemLink>
                            {
                                privilegeLevel >= 3 &&
                                <>
                                    <ListItemLink href="/admin/stationRegisters">Postos</ListItemLink>
                                    <ListItemLink href="/admin/positionRegisters">Cargos</ListItemLink>
                                </>
                            }
                        </ul>
                    </nav>
                </>
            }
        </main>
    )
}

export default Admin;
