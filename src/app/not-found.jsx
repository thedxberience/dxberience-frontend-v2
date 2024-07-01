import HelperLayout from "@/layouts/HelperPageLayout";
import CustomButton from "@/components/shared/CustomButton";
import { GradientBox } from "@/components/shared/GradientBox";

const NotFound = () => {
  return (
    <HelperLayout backgroundImage="/background-maintenance.jpeg">
      <div className="flex flex-col w-full justify-center items-center text-white pt-32">
        <GradientBox from={"#4229149f"} to={"#8a5a377b"} className="p-5 ">
          <h1 className="text-[52.8px] font-IvyPresto  md:text-9xl">404</h1>
          <p>That page that you're looking for does not exist</p>
          <CustomButton btnName="TAKE ME HOME" />
        </GradientBox>
      </div>
    </HelperLayout>
  );
};

export default NotFound;
