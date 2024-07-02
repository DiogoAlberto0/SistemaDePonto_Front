import { ListItemLink } from "@/components/ListItemLink"
import { Title } from "@/components/Title"
import { authService } from "@/services/auth.service"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"


const Dashboard = async () => {
    const response = await authService.getPrivilegeLevel()
    if(!response.data?.privillegeLevel || response.data.privillegeLevel < 1) redirect('signin')

    const userResponse = await userService.getUserById()
    if(!userResponse.data) throw new Error(`${response.status} | ${response.error?.message || 'Ocorreu um erro inesperado'}`)

    const user = userResponse.data.user

    const privilegeLevel = response.data?.privillegeLevel || 0

    return (
        <main className="h-screen flex flex-col justify-between bg-gray-100 p-4">
            {
                privilegeLevel >= 1 &&
                <>
                    <nav>
                        <ul className="space-y-2">
                            <Title as="h1" weight="bold" size="3xl">Bem vindo, {user.props.name}!</Title>
                            <ListItemLink href="clockin">Bater ponto</ListItemLink>
                            <ListItemLink href="timesheet">Folha de ponto</ListItemLink>

                            {privilegeLevel >= 2 && <ListItemLink href="/admin">Admin</ListItemLink>}
                        </ul>
                    </nav>

                    <nav>
                        <ul className="space-y-2">
                            <ListItemLink href="profile">Mudar senha</ListItemLink>
                            <ListItemLink href="/signin">Sair</ListItemLink>
                        </ul>
                    </nav>
                </>
            }
        </main>
    )
}

export default Dashboard;
