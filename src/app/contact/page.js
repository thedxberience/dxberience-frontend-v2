"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import HelperLayout from "@/layouts/HelperPageLayout";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      company: "",
      message: "",
    },
  });

  const watchAllFields = watch();

  return (
    <HelperLayout>
      <section className="contact-form w-full h-full flex justify-center py-10">
        <div className="bg-gradient-to-br from-[#001618db] to-[#00161800] w-[350px] h-max min-h-[618px] flex flex-col items-center py-[40px] px-[20px] gap-4 text-white lg:w-[450px] 2xl:w-[681px] 2xl:max-h-[768px] 2xl:px-[40px]">
          <h1 className="font-IvyPresto font-semibold text-xl 2xl:text-6xl">
            Get In Touch
          </h1>
          <p className="text-sm font-extralight text-center leading-5 2xl:pt-5 2xl:text-center">
            Have questions or want to create a tailored experience? At
            Dxberience, we specialize in crafting personalized services to meet
            your unique needs. Whether youre looking for bespoke travel plans,
            exclusive event access, or organizing private celebrations, fill out
            the form below, and let us create an experience just for you.
          </p>
          <form className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-2 w-full min-h-[238px] 2xl:gap-10">
              <FormInput
                name="fullName"
                placeholder={"Full Name"}
                register={register}
                errors={errors}
                value={watchAllFields.fullName}
                options={{
                  required: "Fullname is required",
                  pattern: /^[a-zA-Z\s-]{2,}$/,
                }}
              />
              <FormInput
                name="email"
                placeholder={"Email"}
                register={register}
                errors={errors}
                value={watchAllFields.email}
                options={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
              />
              <FormInput
                name="phoneNumber"
                placeholder={"Phone Number"}
                register={register}
                errors={errors}
                value={watchAllFields.phoneNumber}
                options={{
                  required: "Phone number is required",
                  pattern: {
                    value:
                      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/,
                    message: "Invalid phone number",
                  },
                }}
              />
              <FormInput
                name="company"
                placeholder={"Company"}
                register={register}
                errors={errors}
                value={watchAllFields.company}
              />
              <FormInput
                name="message"
                placeholder={"Message"}
                register={register}
                errors={errors}
                value={watchAllFields.message}
              />
            </div>
            <div className="my-5">
              <CustomButton btnName="Send Message" />
            </div>
          </form>
        </div>
      </section>
    </HelperLayout>
  );
};

export default page;
