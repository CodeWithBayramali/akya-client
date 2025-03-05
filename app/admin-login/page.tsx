"use client"
import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const Page = () => {
    const {data:session} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            setLoading(true);
            signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false
            }).then(r => {
                if(r.ok) {
                    setLoading(false);
                    router.push('/admin');
                }
            }).catch(err => {
                setLoading(false);
                toast.error(err.message);
            })
        }
    })

    useEffect(() => {
        if(session && session.user.role[0] === 'ADMIN') {
            router.back()
        }
    }, [session]);

    return (
        <div className={'h-[60vh] flex items-center justify-center'}>
            <div className={'flex items-center justify-center flex-col border bg-gray-100 rounded-lg p-4 gap-y-8 w-2/4'}>
                <h4 className={'text-blue-600 text-xl font-bold'}>Admin Login</h4>
                <InputText className={'w-full'} placeholder={'Email'} name={'email'} value={formik.values.email} onChange={formik.handleChange} />
                <InputText className={'w-full'} placeholder={'Password'} type={'password'} name={'password'} value={formik.values.password} onChange={formik.handleChange} />
                <Button loading={loading} className={'w-full flex justify-center !font-extrabold'} onClick={formik.handleSubmit}>Log In</Button>
            </div>
        </div>
    );
};

export default Page;