"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/shared/FormInput";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";
import CountrySelector from "../NewsletterSection/CountrySelect";
import { DatePickerWithPresets } from "../shared/DatePicker";

const EventsBookingForm = ({ slug, price, product }) => {
  const router = useRouter();
  const [country, setCountry] = useState();
  const [date, setDate] = React.useState();
  const [showStatus, setShowStatus] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      country: "",
      date: "",
      time: "",
      no_of_guest: "1",
    },
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["create-booking-request", slug],
    mutationFn: async (data) => {
      const request = await makeRequest("/booking", {
        method: "POST",
        data: data,
      });
      // console.log(request);
      setShowStatus(true);
      if (request["statusCode"] !== 400) {
        router.push("/booking-confirmation");
      }
      return request;
    },
  });

  const handleSendEmail = async (data) => {
    // we send an email to this email list
    // email list, we put the PUG file or the html content here
    const htmlContent = `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>New Booking Notification</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          margin: 0;
                          padding: 20px;
                      }
                      .container {
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #ffffff;
                          border: 1px solid #dddddd;
                          padding: 20px;
                          border-radius: 10px;
                      }
                      h1 {
                          font-size: 24px;
                          color: #333333;
                      }
                      p {
                          font-size: 16px;
                          color: #555555;
                      }
                      .details {
                          margin-top: 20px;
                      }
                      .details td {
                          padding: 8px 0;
                      }
                      .button {
                          margin-top: 30px;
                          text-align: center;
                      }
                      .button a {
                          padding: 10px 20px;
                          background-color: #28a745;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 5px;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>New Booking Notification</h1>
                      <p>Hello Admin,</p>
                      <p>A new user has made a booking on the platform. Here are the details:</p>

                      <table class="details">
                          <tr>
                              <td><strong>User Name:</strong></td>
                              <td>${data.firstName} ${data.lastName}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${data.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Phone:</strong></td>
                              <td>${data.phone_number}</td>
                          </tr>
                          <tr>
                              <td><strong>Product Name:</strong></td>
                              <td>${product}</td>
                          </tr>
                          <tr>
                              <td><strong>Booking Date:</strong></td>
                              <td>${date}</td>
                          </tr>
                          <tr>
                              <td><strong>Price:</strong></td>
                              <td>${price}</td>
                          </tr>
                      </table>

                      <div class="button">
                          <a href="${window.location.origin}/admin">View Booking in Dashboard</a>
                      </div>
                  </div>
              </body>
              </html>
    `;
    const emailData = {
      subject: "New Booking Request",
      sender: {
        name: "KHY",
        email: "khy@thedxberience.com",
      },
      to: [
        {
          name: "Jerome",
          email: "jerome.ojuroye@thedxberience.com",
        },
        {
          name: "Sydney Idundun",
          email: "sydney.idundun@gmail.com",
        },
        {
          name: "Harith Onigemo",
          email: "onigemotosin@gmail.com",
        },
      ],
      htmlContent,
    };
    makeRequest("/send-email", { method: "POST", data: emailData });
  };

  const watchAllFields = watch();

  const handleSubmitBookingRequest = (data) => {
    const payload = {
      customerName: `${data.firstName} ${data.lastName}`,
      customerEmail: data.email,
      customerPhone: data.phone_number,
      country: country,
      date: date,
      time: data.time,
      productName: product,
      productSlug: slug,
      productPrice: price,
      noOfTickets: parseInt(data.no_of_guest),
    };

    mutateAsync(payload);
    (async () => await handleSendEmail(data))();
  };

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
    }, 5000);
  }, [showStatus]);

  return (
    <div className="contact-form p-4 w-full lg:w-4/12">
      <form
        className="bg-primary px-11 flex flex-col text-white justify-center items-center w-full h-full py-12"
        onSubmit={handleSubmit(handleSubmitBookingRequest)}
      >
        <div>
          <h1 className="text-xl lg:text-4xl font-IvyPresto mb-11">
            Booking Details
          </h1>
        </div>
        {isSuccess && showStatus && (
          <div>
            <p className="text-green-400">
              Thank you! we will reach out to you shortly.
            </p>
          </div>
        )}
        {isError && showStatus && (
          <div>
            <p className="text-red-400">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-10 justify-center items-center w-full">
          <FormInput
            placeholder={"First Name"}
            register={register}
            errors={errors}
            value={watchAllFields.firstName}
            name="firstName"
          />
          <FormInput
            placeholder={"Last Name"}
            register={register}
            errors={errors}
            value={watchAllFields.lastName}
            name="lastName"
          />
          <FormInput
            placeholder={"Email"}
            register={register}
            errors={errors}
            value={watchAllFields.email}
            name="email"
          />
          <FormInput
            placeholder={"Phone Number"}
            register={register}
            errors={errors}
            value={watchAllFields.phone_number}
            name="phone_number"
          />
          <div className="w-full">
            <CountrySelector country={country} setCountry={setCountry} />
          </div>
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="w-full">
              <DatePickerWithPresets date={date} setDate={setDate} invert />
            </div>
            <div className="w-full">
              <FormInput
                placeholder={"Time"}
                register={register}
                errors={errors}
                value={watchAllFields.time}
                name="time"
                inputType="time"
              />
            </div>
          </div>
          {/* <FormInput
            placeholder={"Options"}
            register={register}
            errors={errors}
            value={watchAllFields.options}
            name="options"
          /> */}
          <FormInput
            inputType="number"
            placeholder={"No of Guest/Tickets"}
            register={register}
            errors={errors}
            value={watchAllFields.no_of_guest}
            name="no_of_guest"
          />
        </div>
        <div>
          <p className="text-white text-center text-xs pb-11 pt-6 font-thin">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
        </div>
        <div>
          <CustomButton btnName={"book now"} isPending={isPending} />
        </div>
      </form>
    </div>
  );
};

export default EventsBookingForm;
