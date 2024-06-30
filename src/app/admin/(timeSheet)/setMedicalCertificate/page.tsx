import { BackButton } from "@/components/BackButton";
import { SetMedicalCertificateForm } from "./SetMedicalCertificateForm";
import { userService } from "@/services/user.service";
import { FormMain } from "@/components/FormMain";



export default async function SetMissed () {

    const response = await userService.getUsers()

    const users = response.data?.users || undefined

    return (
        <FormMain>
            <BackButton href="/admin"/>
            <SetMedicalCertificateForm users={users}/>
        </FormMain>
    )
}