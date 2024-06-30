import HelperLayout from "@/layouts/HelperPageLayout";
import CustomButton from "@/components/shared/CustomButton";

const NotFound = () => {
  return (
    <HelperLayout
      backgroundImage="/background-maintenance.jpeg"
      className="bg-cover bg-no-repeat bg-[center_center]"
    >
      <section className="flex flex-col items-center justify-center h-[80vh] text-center text-white">
        <div className="p-10 flex flex-col items-center gap-5 bg-gradient-to-br from-[#4229149f] to-[#8a5a377b] bg-opacity-5 md:bg-none">
          <h1 className="text-[52.8px] font-IvyPresto  lg:text-[192px]">404</h1>
          <p className="w-[309px] whitespace-pre-line">
            {`That page that you're looking for 
          does not exist`}
          </p>
          <CustomButton btnName="TAKE ME HOME" />
        </div>
      </section>
    </HelperLayout>
  );
};

export default NotFound;
