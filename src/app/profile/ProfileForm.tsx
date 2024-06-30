"use client"
//form
import { ISinginErrorState, handleChangePhoneAndPass } from "./actions"
import { useFormState } from "react-dom"
//components
import { Form } from "@/components/Form"
import { Button } from "@/components/Button"
import { FormAlert } from "@/components/FormAlert"
import { LabelInput } from "@/components/LabelInput"
import { Title } from "@/components/Title"

interface IUserData {
    phone?: string
}
const initialState: ISinginErrorState = {
    success: undefined,
    status: 200,
    error: {
        phone: undefined,
        password: undefined,
        confirmPassword: undefined,
        message: undefined,
    }
}
export const ProfileForm = ({ phone}: IUserData) => {

    const [formState, formAction] = useFormState(handleChangePhoneAndPass, initialState)

    return (
        <Form action={formAction}>
            <Title as="h1" size="3xl" weight="bold">Alterar dados</Title>
            <LabelInput id="phone" name="phone" type="tel" defaultValue={phone}>Telefone:</LabelInput>
            {formState.error.phone && <FormAlert variant="danger">{formState.error.phone}</FormAlert>}

            <LabelInput id="password" name="password" type="password">Senha:</LabelInput>
            {Array.isArray(formState.error.password) && formState.error.password.map((message, index) => <FormAlert key={index} variant="danger">{message}</FormAlert>)}

            <LabelInput id="confirmPassword" name="confirmPassword" type="password">Confirmar senha:</LabelInput>
            {formState.error.confirmPassword && <FormAlert variant="danger">{formState.error.confirmPassword}</FormAlert>}

            {formState.success && <FormAlert variant="success">{formState.success}</FormAlert>}
            {formState.error.message && <FormAlert variant="danger">{formState.error.message}</FormAlert>}
            <Button variant="primary" className="w-full">Alterar</Button>
        </Form>
    )
}