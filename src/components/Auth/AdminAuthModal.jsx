"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useComponentStore } from "@/store/componentStore";

const AdminAuthModal = () => {
  const router = useRouter();

  // const [openModal, setOpenModal] = useState(false);

  const { openModal, setOpenModal } = useComponentStore((state) => ({
    openModal: state.openModal,
    setOpenModal: state.setOpenModal,
  }));

  const { user } = useUserStore((state) => ({ user: state.user }));

  return (
    <>
      {user && user.admin ? (
        <UserPopover />
      ) : (
        <AlertDialog
          open={openModal}
          onOpenChange={(open) => setOpenModal(open)}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="uppercase hidden hover:bg-transparent hover:text-white p-0"
            >
              Admin Login
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
                Admin Login
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="form-body w-full flex-center flex-col gap-6">
                  <div className="auth-switch flex justify-center items-center w-full"></div>

                  <LoginForm />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AdminAuthModal;
