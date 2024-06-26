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
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

// import { LoginBodyType, RegisterBody } from "@/schemaValidations/auth.schema";
// import envConfig from "../../config";



// export default function SignUpForm() {
//     const form = useForm<LoginBodyType>({
//         resolver: zodResolver(RegisterBody),
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     })
//     async function onSubmit(values: LoginBodyType) {
//         const result = await fetch(
//             `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/login`,
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
//                             <Button variant="outline">Log in</Button>
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

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z
        .object({
            email: z.string().email(),
            password: z.string().min(6),
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = form.getValues();

        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };


    return (
        <div>
            <div className={`px-2 gap-4 flex justify-between items-center  max-w-7xl mx-auto h-auto`}>
                <div className="flex flex-row items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Log in</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <Form {...form}>
                                <form onSubmit={handleSignIn} className="space-y-8">
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

export default LoginForm