"use client";
import { useComponentStore } from "@/store/componentStore";
import ReactPlayer from "react-player/lazy";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const VideoPlayer = ({ videoURL }) => {
  const showVideoModal = useComponentStore((state) => state.showVideoModal);
  const setShowVideoModal = useComponentStore(
    (state) => state.setShowVideoModal
  );

  return (
    <AlertDialog
      open={showVideoModal}
      onOpenChange={(open) => setShowVideoModal(open)}
      className="max-w-screen border-none rounded-none"
    >
      <AlertDialogContent className="w-screen border-none max-w-screen h-screen bg-black/30 rounded-none flex flex-col items-center justify-center gap-4 ">
        <AlertDialogDescription className="w-full h-fit lg:h-full rounded-none">
          <div className="flex items-center justify-end max-h-12 my-4">
            <AlertDialogCancel className="rounded-[50%] border-dotted p-2 w-auto h-auto">
              <Image src="/add.svg" alt="close_btn" width={12} height={12} />
            </AlertDialogCancel>
          </div>
          <ReactPlayer
            playsinline={true}
            url={videoURL}
            controls={true}
            width="100%"
            height="90%"
            muted={true}
            playing={true}
          />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VideoPlayer;
