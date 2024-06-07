import z from "zod"
export const RegisterBody = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6).max(100),
    // confirmPassword: z.string().trim().min(6).max(100),
})
    // .strict()
    // .superRefine(({ confirmPassword, password }, ctx) => {
    //     if (confirmPassword != password) {
    //         ctx.addIssue({
    //             code: 'custom',
    //             message: 'wrong',
    //             path: ['confirmPassword']
    //         })
    //     }
    // })

export type RegisterBodyType = z.infer<typeof RegisterBody>

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    })
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
})
.strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>

