import { userService } from "@/services/user.service";

//components
import { ProfileForm } from "./ProfileForm";
import { BackButton } from "@/components/BackButton";
import { FormMain } from "@/components/FormMain";
import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";


export default async function Profile() {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 1) redirect('signin')

    const userResponse = await userService.getUserById()
    const user = userResponse.data?.user

    return (
        <FormMain>
            <BackButton href="/dashboard" />

            <ProfileForm phone={user?.props.phone}></ProfileForm>
        </FormMain>
    )
}
