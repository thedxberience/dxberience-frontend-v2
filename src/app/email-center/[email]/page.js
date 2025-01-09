"use client";
import Navbar from "@/components/Navbar";
import CustomButton from "@/components/shared/CustomButton";
import Footer from "@/components/shared/Footer";
import FormInput from "@/components/shared/FormInput";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const page = ({ params }) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const [openOtherField, setOpenOtherField] = useState(false);

  const radioItems = [
    "I’m not interested in these emails",
    "I’m receiving too many emails",
    "I never signed up for this mailing list",
    "These emails are hard to read or don’t display properly",
    "These emails are spammy",
    "I don’t like the email content",
    "Other",
  ];

  const formValues = watch();

  const handleEmailFormat = (email) => {
    return email.split("%40").join("@");
  };

  const handleFilterOptionChange = (value) => {
    if (value.toLowerCase() == "other") {
      setOpenOtherField(true);
    } else {
      setOpenOtherField(false);
    }

    setValue("reason", value);
  };

  // TODO: Implement submit unsubscribe email feedback functionality.

  return (
    <main>
      <Navbar />
      <section className="flex-center">
        <div className="flex-start flex-col gap-6 w-11/12 my-10">
          <div className="flex-start  flex-col gap-4">
            <h1 className="text-3xl lg:text-6xl font-bold font-IvyPresto">
              You’ve been unsubscribed
            </h1>
            <p className="text-sm lg:text-lg">
              {handleEmailFormat(params.email)} has successfully unsubscribed
              from our marketing emails.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-5xl font-bold font-IvyPresto">
              If you have a moment, tell us why you unsubscribed.
            </h2>
          </div>

          <form className="flex-start flex-col gap-10 w-full lg:w-5/12 my-6">
            <RadioGroup
              onValueChange={handleFilterOptionChange}
              className="gap-4 w-full"
            >
              {radioItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full space-x-2"
                  >
                    <Label htmlFor={item}>{item}</Label>

                    <RadioGroupItem value={item} id={item} />
                  </div>
                );
              })}
            </RadioGroup>

            {openOtherField && (
              <FormInput
                errors={errors}
                placeholder="Add note..."
                register={register}
                name="reason"
                value={formValues.reason}
                options={{ required: "Please leave a note!" }}
                invertText
              />
            )}
            <CustomButton btnName="Submit" invert />
          </form>
          <div className="bottom-links flex-start flex-col">
            <Link href={"/"} className="underline uppercase text-sm lg:text-lg">
              Return to Site
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default page;
