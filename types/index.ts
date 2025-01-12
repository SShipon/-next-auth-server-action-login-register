import { ProductInputSchema, UserInputSchema, UserSignInSchema } from "@/lib/validator";
import { z } from "zod";

export type IProductInput = z.infer<typeof ProductInputSchema>
export type Data = {
    users: IUserInput[]
  products: IProductInput[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}

 
// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>