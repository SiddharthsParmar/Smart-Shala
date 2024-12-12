import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

    const teacherFormData = {
      name,
      email,
      contact,
      address,
      password,
    };
    if (!/^\d{10}$/.test(teacherFormData.contact)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (teacherFormData.password.length < 6) {
      toast.error("Password must be atleast 6 charcater long");
      return;
    }

    try {
      const responce = await axios.post(
        "http://localhost:3000/signup/teacher",
        teacherFormData
      );

      console.log(responce.data);

      window.location.href = window.location.origin + "/login";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        {/* method='post' action='/signupteacher' */}
        <form className="w-full max-w-lg" onSubmit={HandleTeacherSubmit}>
          <h2 className=" -ml-5">Teacher Details</h2>
          <hr className="mb-4 -ml-5"></hr>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            {/* Phone  */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Phone/Mo.
              </label>
              <input
                value={contact}
                required
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-phone"
                type="text"
                placeholder="+91   "
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            {/* Email  */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-email"
                type="text"
                placeholder="abc@gmail.com   "
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            {/* Password */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Password
              </label>
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="password"
                placeholder=""
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            {/* Password */}
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full p-5  h-auto flex items-center ">
              <div className="w-full">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-address"
                >
                  Address
                </label>

                <input
                  value={address}
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Apartment , Area , City ,District"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="before:ease relative h-12 w-40 overflow-hidden border rounded-md border-green-500 bg-sky-800 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

const AddTeacher = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-200">
        <div id="main" className="w-full bg-red h-screen p-5">
          <div
            className="bg-gray-100 h-full flex rounded-sm flex-col justify-center align-middle shadow-lg"
            id="form-container"
          >
            <h1 className="text-4xl font-bold flex align-middle m-3">
              Teacher Registration
            </h1>
            <div className=" h-full p-5 w-full  grid grid-cols-2 pt-20 -mt-5   ">
              <div className="w-full  flex justify-center -mt-5 ">
                <TeacherForm />
              </div>
              <div className="w-full p-5  ">
                <img
                  className="rounded h-9/12"
                  src={StudentRegistrationImage}
                  width={"100%"}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
