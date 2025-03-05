"use client"
import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {deleteContactDispatch, getAllContactsDispatch} from "@/redux/adminSlice";
import {Column} from "primereact/column";
import {MdDelete} from "react-icons/md";
import {format} from "date-fns/format";
import {tr} from "date-fns/locale";

function Page() {

    const dispatch = useDispatch<AppDispatch>();
    const { contacts, page, loading } = useSelector((state:RootState)=> state.admin)
    const [pageable, setPageable] = useState({currentPage:0, size: 15});

    useEffect(() => {
        dispatch(getAllContactsDispatch(pageable.currentPage,pageable.size))
    }, [dispatch, pageable.currentPage, pageable.size]);

    const onPageChange = (event) => {
        setPageable({size: event.rows, currentPage: event.page});
    }

    return (
        <div>
            <DataTable
                loading={loading}
                value={contacts}
                paginator
                rows={pageable.size}
                first={pageable.currentPage * pageable.size}
                totalRecords={page.totalElements}
                onPage={onPageChange}
                rowsPerPageOptions={[15, 25, 100]}
            >
                <Column header={'Ad Soyad'} field={'nameSurname'} />
                <Column header={'Email'} field={'email'} />
                <Column header={'Mesaj'} field={'message'} className={'w-[600px]'} />
                <Column header={'Gönderim Tarihi'} body={(row)=> (
                    <span>{format(row.createdAt, "dd.MM.yyyy | HH:mm:ss", {locale: tr})}</span>
                )} />
                <Column header={'Actions'} body={(row)=> (
                    <span>
                        <MdDelete className={'text-red-600 cursor-pointer'} size={24} onClick={()=> {
                            dispatch(deleteContactDispatch(row.id))
                        }} />
                    </span>
                )} />
            </DataTable>
        </div>
    );
}

export default Page;