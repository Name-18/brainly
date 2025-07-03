import z, { string } from 'zod'
 export const userformat =  z.object({
    username : string().min(1, {message:"cannot be empty"}).max(12,{message:"cannot exced 12 chars"}),

  password: z.string().min(8).refine((val)=>{
    return /[A-Z]/.test(val) && /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(val);
  },{
    message:"password must contain atleast one uppercase letter and one special character"
  })
})


