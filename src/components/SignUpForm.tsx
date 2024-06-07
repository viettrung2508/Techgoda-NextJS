// 'use client'

// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

// import { useState } from "react"
// import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
// import envConfig from "../../config";



// export default function SignUpForm() {
//     const form = useForm<RegisterBodyType>({
//         resolver: zodResolver(RegisterBody),
//         defaultValues: {
//             email: "",
//             password: "",
//             // confirmPassword: "",
//         },
//     })
//     async function onSubmit(values: RegisterBodyType) {
//         const result = await fetch(
//             `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/register`,
//             {
//                 body: JSON.stringify(values),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'POST'
//             }
//         ).then((res) => res.json())
//         console.log(result)
//     }
//     return (
//         <div>
//             <div className={`px-2 gap-4 flex justify-between items-center  max-w-7xl mx-auto h-auto`}>
//                 <div className="flex flex-row items-center gap-2">
//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button variant="outline">Sign Up</Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[425px]">
//                             <Form {...form}>
//                                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

//                                     <FormField
//                                         control={form.control}
//                                         name="email"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Email</FormLabel>
//                                                 <FormControl>
//                                                     <Input placeholder="email" type="email" {...field} />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     <FormField
//                                         control={form.control}
//                                         name="password"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Password</FormLabel>
//                                                 <FormControl>
//                                                     <Input placeholder="Password" type="password"  {...field} />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     {/* <FormField
//                                         control={form.control}
//                                         name="confirmPassword"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Confirm Password</FormLabel>
//                                                 <FormControl>
//                                                     <Input placeholder="Confirm Password" type="password" {...field} />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     /> */}
//                                     <Button type="submit">Submit</Button>
//                                 </form>
//                             </Form>
//                         </DialogContent>
//                     </Dialog>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import { auth } from "@/lib/clientApp";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent, DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const SignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z
        .object({
            email: z.string().email(),
            password: z.string().min(6),
            passwordConfirmation: z.string(),
        })
        .refine(
            (values) => {
                return values.password === values.passwordConfirmation;
            },
            {
                message: "Passwords do not match",
                path: ["passwordConfirmation"],
            }
        )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    })
    const handleSignUp = () => {
        let email = document.getElementsByName('email')[0] as HTMLInputElement;
        let password = document.getElementsByName('password')[0] as HTMLInputElement;

        setLoading(true);

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
            })
    }
    return (
        <div>
            <div className={`px-2 gap-4 flex justify-between items-center  max-w-7xl mx-auto h-auto`}>
                <div className="flex flex-row items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Sign Up</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <Form {...form}>
                                <form onSubmit={handleSignUp} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="email" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" type="password"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="passwordConfirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Confirm Password" type="password"  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm