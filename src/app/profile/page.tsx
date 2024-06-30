import { userService } from "@/services/user.service";

//components
import { ProfileForm } from "./ProfileForm";
import { BackButton } from "@/components/BackButton";
import { FormMain } from "@/components/FormMain";


export default async function Profile() {

    const userResponse = await userService.getUserById()
    const user = userResponse.data?.user

    return (
        <FormMain>
            <BackButton href="/dashboard" />

            <ProfileForm phone={user?.props.phone}></ProfileForm>
        </FormMain>
    )
}
