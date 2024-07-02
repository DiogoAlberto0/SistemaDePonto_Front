import { BackButton } from "@/components/BackButton"
import { ListItemLink } from "@/components/ListItemLink"
import { Title } from "@/components/Title"
import { authService } from "@/services/auth.service"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"


const userRegisters = async () => {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 2) return redirect('signin')

    const privillegeLevel = data.privillegeLevel

    const response = await userService.getUsers()
    if (!response.data) throw new Error(`${response.status} - ${response.error.message}`)

    const users = response.data.users

    return (
        <main className="h-screen flex flex-col justify-start gap-2 overflow-auto bg-gray-100 p-4">
            <BackButton href="/admin"></BackButton>

            <Title as="h1" size="3xl" weight="bold">Funcionários</Title>
            <ul className="space-y-2">
                {
                    users.map(user => <ListItemLink key={user.id} href={`/timesheet/${user.id}`}>{user.props.name}</ListItemLink>)
                }
                
                { privillegeLevel && privillegeLevel >= 3 && 
                    <ListItemLink href="/admin/createOrUpdateUser" variant="secondary">
                        Cadastrar usuário
                    </ListItemLink>
                }
                
        </ul>
        </main >
    )
}
export default userRegisters