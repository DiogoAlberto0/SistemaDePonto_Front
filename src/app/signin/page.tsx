"use client"
import { useFormState } from "react-dom"
import { handleSignOut, handleSignin } from './actions'
import { useEffect } from "react"

//components
import { Button } from "@/components/Button"
import { FormAlert } from "@/components/FormAlert"
import { LabelInput } from "@/components/LabelInput"
import { Form } from "@/components/Form"
import { FormMain } from "@/components/FormMain"

const initialState = {
    error: {
        phone: undefined,
        password: undefined,
        message: undefined,
        status: 200
    }
}

export default function Signin() {

    useEffect(() => {
        handleSignOut()
    }, [])

    const [state, formAction] = useFormState(handleSignin, initialState)

    return (
        <FormMain>
            <Form action={formAction}>
                <LabelInput id="phone" name="phone" type="tel">
                    Telefone:
                </LabelInput>
                {state?.error.phone && <FormAlert variant="danger">{state.error.phone}</FormAlert>}

                <LabelInput id="password" name="password" type="password">
                    Senha:
                </LabelInput>
                {state?.error.password && <FormAlert variant="danger">{state.error.password}</FormAlert>}

                {state.error.message && <FormAlert variant="danger">{state.error.message}</FormAlert>}

                <Button type="submit" className="w-full">Entrar</Button>
            </Form>
        </FormMain>
    )
}
