"use client";
import { Dancing_Script } from "next/font/google";
import {useFormik} from "formik";
import {postGuardRequest} from "@/service/requestService";
import {toast} from "react-toastify";
import * as yup from "yup";

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const contactFormSchema = yup.object().shape({
  nameSurname: yup.string().required("Ad Soyad Zorunlu"),
  email: yup.string().email("Lütfen mail formatında giriş yapınız").required("Ad Soyad Zorunlu"),
  message: yup.string().min(50,"En az 50 karakter giriniz").required("Ad Soyad Zorunlu"),
})

export default function Contact() {

  const formik = useFormik({
    initialValues: {
      nameSurname: '',
      email: '',
      message: ''
    },
    onSubmit: (values, { resetForm }) => {
      postGuardRequest({controller:'contact'},values).then((response) => {
        toast.success(response.data.message);
        resetForm()
      }).catch((error) => {
        toast.error('Beklenmedik bir hata oluştu lütfen daha sonra tekrar deneyiniz');
      })
    },
    validationSchema: contactFormSchema
  });

  return (
    <div>
      <div className="w-full container mt-24">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.117439165436!2d30.670249999999996!3d36.9353608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38f2bbc76a7cd%3A0x4404d36882040ff5!2sAkya%20Butik!5e0!3m2!1str!2str!4v1727614010571!5m2!1str!2str"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <h1
          className={`${dancing_script.className} text-center mt-12 text-5xl`}
        >
          En Kısa Sürede Dönüş Yapacağız
        </h1>

         <form onSubmit={formik.handleSubmit} className="my-24">
          <div className="flex flex-col gap-y-8">
            <div className={'flex flex-row gap-x-4'}>
              <span className="flex flex-col gap-y-2 w-full">
              <label>Ad Soyad *</label>
              <input
                  required
                  name={'nameSurname'}
                  value={formik.values.nameSurname}
                  onChange={formik.handleChange}
                  className="border p-2 rounded-lg w-full"
              />
            </span>

              <span className="flex flex-col gap-y-2 w-full relative">
              <label>E-mail *</label>
              <input
                  required
                  name={'email'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="border p-2 rounded-lg w-full"
              />
                {formik.errors.email && formik.touched.email &&
                    <small className={'text-xs text-red-600'}>{formik.errors.email}</small>}

            </span>
            </div>

            <span className="flex flex-col gap-y-2 w-full relative">
              <label>Mesaj *</label>
              <textarea
                  required
                  name={'message'}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  className="border p-2 rounded-lg w-full"
              />
              {formik.errors.message && formik.touched.message &&
                  <small className={'text-xs text-red-600'}>{formik.errors.message}</small>}
            </span>
          </div>
           <div className="flex items-center justify-center">
             <button type={'submit'} className="bg-blue-500 p-2 rounded-lg text-white w-44 mt-12">
               Gönder
             </button>
           </div>
         </form>
      </div>
    </div>
  );
}
