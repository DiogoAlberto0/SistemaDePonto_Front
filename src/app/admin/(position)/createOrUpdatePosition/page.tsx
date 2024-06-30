"use client"
//useForm
import { useFormState } from "react-dom"
import { State, handleCreateOrUpdatePosition } from "./action"
//components
import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormMain } from "@/components/FormMain"
import { LabelInput } from "@/components/LabelInput"
import { FormAlert } from "@/components/FormAlert"
import { Title } from "@/components/Title"


const inicialState: State = {
    message: undefined,
    status: undefined
}

const CreateOrUpdatePosition = ({ searchParams: { office, positionId, privillegeLevel } }: { searchParams: { positionId?: string, office?: string, privillegeLevel?: number } }) => {

    const [ state, actionForm ] = useFormState(handleCreateOrUpdatePosition, inicialState)

    return (
        <FormMain>
            <BackButton href="/admin/positionRegisters" />
            <Form action={actionForm}>

                <Title as="h1" size="2xl" weight="bold">{positionId ? 'Alterar' : 'Cadastrar'} cargo</Title>
                <input id="id" name="id" type="hidden" value={positionId}/>

                <LabelInput id="oficce" name="office" type="text" defaultValue={office}>Cargo: </LabelInput>

                <LabelInput id="privillegeLevel" name="privillegeLevel" type="number" defaultValue={privillegeLevel}>Nivel de privilégio:</LabelInput>

                {state.message && <FormAlert variant={state.status === 200 || state.status === 201 ? 'success' : 'danger'}>{state.message}</FormAlert>}
                <Button variant="primary" type="submit">{positionId ? 'Alterar' : 'Cadastrar'}</Button>
            </Form>
        </FormMain>
    )
}

export default CreateOrUpdatePosition