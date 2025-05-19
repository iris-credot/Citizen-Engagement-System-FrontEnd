import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const model = z.object({
  names: z.string().min(8, "Names must be at least 8 characters"),
  username: z.string().min(4, "Username must have at least 4 characters"),
  gender: z.enum(["Male", "Female"]),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agency_id: z.string().min(1, "Agency is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "Profile image is required",
    }),
});

export default function CreateAdmin() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(model),
  });
 

  // Inside your component
 
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you're storing it
  
        const res = await fetch("https://citizen-engagement-system-backend.onrender.com/api/agency/getall", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setAgencies(data.agencies || []);
        } else {
          toast.error(data.message || "Failed to load agencies");
        }
      } catch (error) {
        console.error("Error fetching agencies:", error);
        toast.error("Failed to fetch agency list");
      }
    };
  
    fetchAgencies();
  }, []);
  
  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("names", data.names);
      formData.append("username", data.username);
      formData.append("gender", data.gender);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("agency_id", data.agency_id);
      formData.append("image", data.image[0]);

      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://citizen-engagement-system-backend.onrender.com/api/user/signupAdmin",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // <-- Add this
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to create admin");
        return;
      }

      
      toast.success("Admin created successfully!");
      reset();
      setTimeout(() => {
        navigate(-1); // go back to the previous page
      }, 1500); 
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-[#f3f5ff] h-screen   flex md:items-center  md:justify-center w-screen  dark:bg-black">
      <div className="w-full max-w-xl h-[650px]  overflow-y-auto bg-white rounded-xl flex  py-6 md:gap-1 gap-14 pb-2 ">
        <div className=" w-full flex justify-center ">
          <div className="p-6 w-full h-full flex flex-col max-w-md overflow-visible ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full  flex flex-col items-start  gap-2 "
            >
              <div className="flex justify-center  w-full">
                <h3 className="text-2xl font-semibold text-[#FFB640] md:mb-2 mb-5">
                  Create Agency Admin
                </h3>
              </div>

              <label htmlFor="names" className="text-sm font-medium text-gray-700">
                Names
              </label>
              <input
                {...register("names")}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] w-full max-w-md"
                placeholder="Enter your names"
              />
              {errors.names && (
                <p className="text-red-500 text-sm">{errors.names.message}</p>
              )}

              <div className="flex md:flex-row flex-col w-full gap-2 ">
                <div className="flex flex-col md:w-2/3 w-full max-w-md gap-2 ">
                  <label htmlFor="username" className="text-gray-700 font-medium text-sm">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    placeholder="Enter your username"
                    className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                  )}
                </div>

                <div className="flex flex-col md:w-1/3 max-w-md gap-2 w-full">
                  <label htmlFor="gender" className="text-gray-700 font-medium text-sm">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="h-[42px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] text-sm text-gray-700"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <label htmlFor="agency_id" className="text-sm font-medium text-gray-700">
                Agency
              </label>
              <select
                 {...register("agency_id")}
                 className="h-[42px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] text-sm text-gray-700 w-full max-w-md"
                          >
                     <option value="">Select an agency</option>
                         {agencies.map((agency) => (
                        <option key={agency._id} value={agency._id}>
                           {agency.name}
                            </option>
                                   ))}
                                   </select>

              {errors.agency_id && (
                <p className="text-red-500 text-sm">{errors.agency_id.message}</p>
              )}

              <label htmlFor="image" className="text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#FFB640"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-[#FFB640]"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Show Password
                </label>
              </div>

              <button
                type="submit"
                className="mt-10 md:mt-4 p-2 bg-[#FFB640] text-white rounded-md hover:bg-[#94661c] transition duration-200 w-full max-w-md mb-3"
              >
                Create an Agency Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
