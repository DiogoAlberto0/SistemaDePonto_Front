import { ApiConnection } from "./apiConnection";

const backend = new ApiConnection(`${process.env.BACK_URL}`, { 
    'Content-Type': 'application/json'
})

export { backend }