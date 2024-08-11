"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import HelperLayout from "@/layouts/HelperPageLayout";
import CountrySelector from "@/components/NewsletterSection/CountrySelect";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const [country, setCountry] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      message: "",
    },
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["contact-us"],
    mutationFn: async (data) => {
      const request = await makeRequest("/create-contact", {
        method: "POST",
        data: data,
      });
      setShowStatus(true);
      return request;
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const watchAllFields = watch();
  const handleContactUs = async (contactData) => {
    try {
      const payload = {
        email: contactData.email,
        emailBlacklisted: false,
        smsBlacklisted: false,
        updateEnabled: false,
        listIds: [1, 2],
        attributes: {
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          country: country,
          company: contactData.company,
          phoneNumber: contactData.phoneNumber,
          message: contactData.message,
        },
      };
      const response = await mutateAsync(payload);
      if (!isError) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setShowStatus(false);
      }, [5000]);
    }
  }, [isError]);

  return (
    <HelperLayout>
      <section className="contact-form w-full h-full flex justify-center py-10">
        {!formSubmitted ? (
          <div className="bg-gradient-to-br from-[#001618db] to-[#00161800] w-[350px] h-max  flex flex-col items-center py-[40px] px-[20px] gap-4 text-white lg:w-[450px] 2xl:w-[681px] 2xl:max-h-[768px] 2xl:px-[40px]">
            <h1 className="font-IvyPresto font-semibold text-xl xl:text-3xl 2xl:text-6xl">
              Get In Touch
            </h1>
            <p className="text-sm font-extralight text-center leading-5 2xl:pt-5 2xl:text-center">
              Have questions or want to create a tailored experience? At
              Dxberience, we specialize in crafting personalized services to
              meet your unique needs. Whether youre looking for bespoke travel
              plans, exclusive event access, or organizing private celebrations,
              fill out the form below, and let us create an experience just for
              you.
            </p>
            {isError && <span>{error}</span>}
            <form
              className="flex flex-col items-center w-full"
              onSubmit={handleSubmit(handleContactUs)}
            >
              <div className="flex flex-col gap-2 w-full min-h-[238px] 2xl:gap-10">
                <FormInput
                  name="firstName"
                  placeholder={"First Name"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.firstName}
                  options={{
                    required: "First Name is required",
                    pattern: /^[a-zA-Z\s-]{2,}$/,
                  }}
                />
                <FormInput
                  name="lastName"
                  placeholder={"Last Name"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.lastName}
                  options={{
                    required: "Last Name is required",
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
                <CountrySelector country={country} setCountry={setCountry} />
                <FormInput
                  name="company"
                  placeholder={"Company"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.company}
                />
                <FormInput
                  name="message"
                  inputType="textarea"
                  placeholder={"Message"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.message}
                />
                <div className="flex mt-5 justify-center">
                  <CustomButton btnName="Send Message" isPending={isPending} />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div
            className={`relative message-box flex flex-col items-center justify-center mt-11 mx-auto py-10 px-14 gap-5 w-[350px] bg-gradient-to-br from-[#101010] to-[#10101000] lg:w-[500px] 2xl:w-[840px]`}
          >
            <div className="flex flex-col gap-5 text-center text-white ">
              <h1 className="text-xl font-IvyPresto lg:text-3xl 2xl:text-5xl 2xl:leading-[65px]">
                Thank you.
                <br />
                We've received your request.
              </h1>

              <p className="text-sm 2xl:text-xl">
                Our team will reach out to finalize your booking and payment. We
                will customize the experience to suit your needs.
              </p>
            </div>
            <CustomButton btnName="go to homepage" isLink href="/" />
          </div>
        )}
      </section>
    </HelperLayout>
  );
};

export default ContactPage;
