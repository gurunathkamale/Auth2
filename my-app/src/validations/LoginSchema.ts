import * as yup from 'yup'


 export const LoginSchema = yup.object().shape({
    
    email: yup.string().
    email('Enter a Valid Email').
    required('Email is required'),

    password: yup.string()
    .required('password required')
      
})

export type LoginFormData = yup.InferType<typeof LoginSchema>;
