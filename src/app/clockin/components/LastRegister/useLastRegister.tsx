import { useEffect, useState } from "react"
import { getLastRegister } from "../../action"


export const useLastRegister = (denpendency: any) => {
    
    const [ lastRegister , setLastRegister ] = useState({time: '-- : --', type: 'não registrado'})
    
    useEffect(() => {
        const fetchLastRegister = async () => {
            
            const response = await getLastRegister()
    
            const { first_entrance, first_exit, second_entrance, second_exit} = response.data?.lastRegister?.props.clockin || {}
    
            const lastTimesTemp = second_exit || second_entrance || first_exit || first_entrance
    
            const type = second_exit ? 'saida' : second_entrance ? 'entrada' : first_exit ? 'saida' : first_entrance ? 'entrada' : 'não registrado'
    
            if(lastTimesTemp) {
                const time = new Date(Number(typeof lastTimesTemp === "bigint" ? Number(lastTimesTemp) : lastTimesTemp))
                const hours = time.getHours().toString().padStart(2, '0')
                const minutes = time.getMinutes().toString().padStart(2, '0')
                setLastRegister({ time: `${hours}:${minutes}`, type })
            }
    
    
        }
    
        fetchLastRegister()
    
    }, [denpendency])

    return lastRegister
}