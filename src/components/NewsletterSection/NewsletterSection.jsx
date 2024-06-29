import React from "react";
import FormInput from "../shared/FormInput";

const NewsletterSection = () => {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-[88.348vw]">
        <div>
          <h2 className="text-[40px]">OUR</h2>
          <h1 className="font-IvyPresto text-[70px]">Newsletter</h1>
        </div>

        <div>
          <form>
            <div>
              <FormInput />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
