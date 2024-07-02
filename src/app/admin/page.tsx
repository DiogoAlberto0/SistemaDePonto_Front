import { authService } from "@/services/auth.service"
import { redirect } from "next/navigation"
//components
import { BackButton } from "@/components/BackButton"
import { ListItemLink } from "@/components/ListItemLink"

const Admin = async () => {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 2) return  redirect('signin')

    const privilegeLevel = data.privillegeLevel

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
