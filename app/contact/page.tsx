"use client";
import { Dancing_Script } from "next/font/google";

const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Contact() {


  // const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   dispatch(createContactDispatch(inputState));
  // };

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
          Biz Sizi Arayalım
        </h1>

        {/* <form onSubmit={_handleSubmit} className="my-24">
          <div className="flex md:flex-row sm:flex-col gap-x-4">
            <span className="flex flex-col gap-y-2 w-full">
              <label>Ad Soyad</label>
              <input
              required
                value={inputState.nameSurname}
                onChange={(e) =>
                  setInputState({ ...inputState, nameSurname: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />
            </span>

            <span className="flex flex-col gap-y-2 w-full">
              <label>Mail</label>
              <input
              required
                value={inputState.email}
                onChange={(e) =>
                  setInputState({ ...inputState, email: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />
            </span>

            <span className="flex flex-col gap-y-2 w-full">
              <label>Telefon</label>
              <input
              required
                value={inputState.mobilePhoneNumber}
                onChange={(e) =>
                  setInputState({ ...inputState, mobilePhoneNumber: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />
            </span>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-blue-500 p-2 rounded-lg text-white w-44 mt-12">
              Gönder
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
}
