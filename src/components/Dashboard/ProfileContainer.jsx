import React from "react";
import ProfileForm from "./ProfileForm";
import ProfileUtils from "./ProfileUtils";

const ProfileContainer = () => {
  return (
    <div className="profile-container w-full flex-center-col">
      <div className="profile-header w-11/12 flex justify-end items-end">
        <ProfileUtils />
      </div>
      <ProfileForm />
    </div>
  );
};

export default ProfileContainer;
