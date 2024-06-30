import { BackButton } from "@/components/BackButton";
import { SetMissedForm } from "./setMissedForm";
import { userService } from "@/services/user.service";
import { FormMain } from "@/components/FormMain";



export default async function SetMissed () {


    const response = await userService.getUsers()

    const users = response.data?.users || undefined

    return (
        <FormMain>
            <BackButton href="/admin"/>
            <SetMissedForm users={users}/>
        </FormMain>
    )
}