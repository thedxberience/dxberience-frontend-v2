"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiUserGear } from "react-icons/pi";
import ChangePasswordModal from "../Auth/ChangePasswordModal";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const ProfileUtils = () => {
  const logoutUser = useUserStore((state) => state.logOutUser);
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2">
          <PiUserGear />
          <span>Settings</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col items-center space-y-2">
          <ChangePasswordModal />
          <button
            onClick={() => logoutUser(router)}
            className="w-full text-left hover:bg-gray-50 p-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileUtils;
