import { BackButton } from "@/components/BackButton";
import { SetMedicalCertificateForm } from "./SetMedicalCertificateForm";
import { userService } from "@/services/user.service";
import { FormMain } from "@/components/FormMain";
import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";



export default async function SetMissed () {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 2) return redirect('signin')

    const privillegeLevel = data.privillegeLevel


    const response = await userService.getUsers()

    const users = response.data?.users || undefined

    return (
        <FormMain>
            <BackButton href="/admin"/>
            <SetMedicalCertificateForm users={users}/>
        </FormMain>
    )
}