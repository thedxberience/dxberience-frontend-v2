import HelperLayout from "@/layouts/HelperPageLayout";
import CustomButton from "@/components/shared/CustomButton";

export const metadata = {
  title: "Error Page",
  description:
    "Oops! It seems there's been an error. Navigate back to safety or explore more with Dxberience for luxury travel and concierge services.",
};

const NotFound = () => {
  return (
    <HelperLayout
      backgroundImage="/background-maintenance.jpeg"
      className="h-[100vh]"
      overlay={"41%"}
    >
      <div
        className={`relative message-box h-[78svh] flex flex-col items-center justify-center mx-auto  px-14 gap-5 w-[350px] bg-gradient-to-br from-[#422914] to-[#8A5A3700] md:bg-none lg:w-[840px]`}
      >
        <div className="flex flex-col gap-5 text-center text-white ">
          <h1 className="text-5xl font-IvyPresto lg:text-9xl">404</h1>

          <p className="text-sm lg:text-xl">
            That page that you're looking for does not exist
          </p>
        </div>
        <CustomButton btnName="take me home" isLink href="/" />
      </div>
    </HelperLayout>
  );
};

export default NotFound;
