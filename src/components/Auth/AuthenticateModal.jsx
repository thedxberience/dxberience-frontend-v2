"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import GoogleAuthButton from "./GoogleAuthButton";

import Image from "next/image";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useApiStore } from "@/store/apiStore";
import UserPopover from "./UserPopover";

const AuthenticateModal = () => {
  const [login, setLogin] = useState(true);

  // const [openModal, setOpenModal] = useState(false);

  const { openModal, setOpenModal, accessToken } = useApiStore(
    (state) => state
  );

  return (
    <>
      {accessToken ? (
        <UserPopover />
      ) : (
        <AlertDialog
          open={openModal}
          onOpenChange={(open) => setOpenModal(open)}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="uppercase hover:bg-transparent hover:text-white p-0"
            >
              Login
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex items-center justify-end">
              <AlertDialogCancel className="rounded-[50%] border-dotted p-2 w-auto h-auto">
                <Image src="/add.svg" alt="close_btn" width={12} height={12} />
              </AlertDialogCancel>
            </div>

            <AlertDialogHeader>
              <AlertDialogTitle className="font-IvyPresto text-2xl lg:text-5xl mb-9">
                {login ? "Admin Login" : "Sign Up"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="form-body w-full flex-center flex-col gap-6">
                  <div className="auth-switch flex justify-center items-center w-full">
                    {/* <div
                      onClick={() => setLogin(true)}
                      className={`w-full cursor-pointer border-b ${
                        login ? "border-black" : "border-tab-inactive"
                      }  flex justify-center items-center`}
                    >
                      <p>Login</p>
                    </div> */}
                    {/* <div
                      onClick={() => setLogin(false)}
                      className={`w-full cursor-pointer border-b ${
                        !login ? "border-black" : "border-tab-inactive"
                      }  flex justify-center items-center`}
                    >
                      <p>Sign Up</p>
                    </div> */}
                  </div>

                  {/* <div className="w-full">
                    <GoogleAuthButton />
                  </div> */}

                  {/* <div className="line-break flex-center w-full">
                    <div className="h-[1px] w-3/12 bg-black/40"></div>
                    <div className="w-full flex-center">
                      <p className="text-lg w-full text-center">
                        Or continue with email and password
                      </p>
                    </div>
                    <div className="h-[1px] w-3/12 bg-black/40"></div>
                  </div> */}

                  {login ? <LoginForm /> : <RegisterForm />}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AuthenticateModal;
