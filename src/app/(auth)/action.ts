'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { signupFormSchema , formSchema as zodFormSchema } from '@/lib/types'
import {z} from 'zod'

export async function login(formData:z.infer<typeof zodFormSchema> ) {
  const supabase = await createClient()
  
  
  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect(`/login?error_description=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: z.infer<typeof signupFormSchema>) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/register?error_description=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}