import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";

function WarningText({ title, text }) {

  return (
    <div className="w-full  h-screen container mx-auto my-5 flex flex-col justify-center items-center bg-secondary shadow-xl  gap-1 ">
      <PiSmileySad size={120} className="text-mywhite" />
      <h1 className="text-3xl font-extrabold text-mywhite my-4  ">{title}</h1>
      <p className="text-lg text-mywhite mb-3 ">{text}</p>
      <Link
        className="bg-mywhite text-secondary font-semibold py-2 px-7 rounded-lg shadow-md transition duration-300 hover:scale-105 "
        href={`/`}
      >
        {'Anasayfa'}
      </Link>
    </div>
  );
}

export default WarningText;
