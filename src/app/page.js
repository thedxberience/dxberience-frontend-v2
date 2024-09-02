import Footer from "@/components/shared/Footer";
import ImageScrollMotion from "@/components/ImageScrollMotion";
import MemoriesSection from "@/components/MemoriesSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import TextMotion from "@/components/TextMotion";
import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";
import RatingsSection from "@/components/RatingsSection";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="hero-section min-h-screen w-[100vw] md:w-full flex flex-col justify-between items-center">
        <Navbar />
        <div className="flex flex-col text-white justify-center items-center">
          <div className="flex justify-center relative w-[226px] h-[55px] lg:w-[406.9px] lg:h-[100px] items-center">
            <Image
              src="/dxberience_logo.svg"
              alt="Dxberience Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center w-[80.256vw] lg:w-[34.219vw] text-lg">
            Our luxury concierge service ensures that every aspect of your
            experience is meticulously curated to perfection. No need to think,
            just experience.
          </p>
        </div>

        <div className="pb-5 flex flex-col justify-center items-center gap-4 text-white">
          <p className="uppercase text-xs">Scroll to start your experience</p>
          <Image
            className="animate-bounce"
            src="/scroll_icon.svg"
            alt="scroll icon"
            width={41}
            height={41}
          />
        </div>
      </section>
      <section className="explore w-full flex flex-col justify-start">
        <div className="w-full flex justify-start lg:pl-[80px] pt-8 lg:pt-28">
          <div className="explore-text w-full flex flex-col lg:flex-row justify-between items-center relative h-fit px-4">
            {/* <TextMotion> */}
            <h1 className="text-text-secondary text-[36px] md:text-[45px] xl:text-[75px] pb-7 lg:pb-[81px] lg:w-[40.26vw] font-IvyPresto font-normal">
              Personalized Luxury Bookings
            </h1>
            {/* </TextMotion> */}
            <div className="lg:w-[38.906vw] font-noah">
              <p>
                Indulge in an unforgettable journey with us as we meticulously
                curate every detail to create an extraordinary experience just
                for you. From exquisite accommodations to personalized
                itineraries, let us take you on a seamless and enchanting
                adventure that surpasses all expectations.
              </p>
            </div>
          </div>
        </div>
        <div className="image-animated">
          <ImageScrollMotion querySelector={".img-1"}>
            <div className="relative hidden lg:block w-[250px] lg:w-[991px] h-[100px] lg:h-[194px]">
              <Image
                src={"/bmw.jpeg"}
                alt="Luxury car rental service in Dubai"
                className="object-cover img-1"
                fill
              />
            </div>
          </ImageScrollMotion>
          <div className="relative mobile-only w-[250px] lg:w-[991px] h-[100px] lg:h-[194px]">
            <Image
              src={"/bmw.jpeg"}
              alt="Luxury car rental service in Dubai"
              className="object-cover img-1"
              fill
            />
          </div>
        </div>
        <div className="find text-right flex flex-col w-full justify-end pr-6 lg:pr-20">
          {/* <TextMotion animateType="right"> */}
          <h1 className="text-text-secondary uppercase font-noah text-[20px] md:text-[40px] font-thin">
            Exclusive
          </h1>
          {/* </TextMotion> */}
          {/* <TextMotion animateType="right"> */}
          <h1 className="text-text-primary font-IvyPresto text-[36px] md:text-[70px] font-thin">
            Bespoke Services in Dubai
          </h1>
          {/* </TextMotion> */}
          <div className="flex w-full lg:w-9/12 xl:w-6/12 justify-end lg:justify-end items-center">
            <h1 className="uppercase text-base lg:text-3xl font-noah">
              YOUR GATEWAY TO EXCLUSIVE EXPERIENCES
            </h1>
          </div>
        </div>
      </section>
      <section className="w-full lg:pr-20">
        <div className="concierge-text pt-4 flex flex-col gap-4 lg:gap-6 justify-center items-center lg:justify-end lg:items-end">
          <div className="flex flex-col gap-2 lg:w-[45svw] xl:w-[600px] font-noah font-light px-6">
            <p className="text-sm lg:text-lg font-extralight">
              Step beyond the ordinary and discover a side of the world only a
              select few get to experience. Our curated luxury experiences cater
              to the discerning traveler. Book a private desert safari with
              gourmet dining under the stars, or soar above the city in a
              private helicopter. Dxberience unlocks a world of bespoke
              experiences, from breathtaking hotel views to exclusive yacht
              charters. Create unforgettable memories with Dxberience.
            </p>
            <div className="w-full flex justify-center lg:justify-start items-center pt-2">
              <CustomButton
                btnName="Inquire Now"
                invert={true}
                isLink
                href="/explore-experiences/all"
              />
            </div>
            <p className="text-sm lg:text-lg font-extralight pt-10">
              Whether you crave the thrill of a desert safari with gourmet
              dining under the stars, or the serenity of a private spa retreat
              overlooking the turquoise waters, Dxberience caters to your every
              whim. Our team of local experts has meticulously crafted a
              selection of experiences designed to tantalize your taste buds,
              indulge your senses, and create memories that will last a
              lifetime.
            </p>
          </div>
        </div>
      </section>
      <div className="left-side mobile-only flex justify-center items-center w-full px-4 mt-16">
        <div className="top-box bg-primary text-white lg:w-[38.177vw] px-4 py-10 h-fit lg:px-[78px] lg:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
          <h1 className="font-IvyPresto text-xl lg:text-[70px]">
            Curated Luxury Experiences
          </h1>
          <p className="font-extralight">
            For the discerning traveler, we offer tailored luxury bookings that
            include private jet charters, personalized shopping, bespoke
            itineraries, breathtaking hotel stays, and exclusive private villas.
          </p>
        </div>
        {/* <div className="pt-[125px] text-white">
          <p className="w-[26.875vw]">
            With Dxberience, luxury becomes a lifestyle, and we`&apos;`re
            excited to provide our clients with nothing but the best in
            exclusivity and exceptional experiences.
          </p>
        </div> */}
      </div>
      <section className="demand-luxury flex flex-col lg:flex-row justify-between w-full h-fit lg:h-[836px] px-4 py-20 lg:px-[72px] lg:mt-[30px] ">
        <div className="left-side hidden lg:block h-[477px]">
          <div className="top-box -mt-[220px] lg:-mt-[70%] xl:-mt-[70%] 2xl:-mt-[40%] bg-primary text-white lg:w-[38.177vw] px-4 py-10 lg:px-[20px] xl:px-[78px] lg:py-[43px] xl:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
            <h1 className="font-IvyPresto text-xl lg:text-5xl xl:text-7xl">
              Curated Luxury Experiences
            </h1>
            <p className="font-extralight">
              For the discerning traveler, we offer tailored luxury bookings
              that include private jet charters, personalized shopping, bespoke
              itineraries, breathtaking hotel stays, and exclusive private
              villas.
            </p>
          </div>
          {/* <div className="pt-[125px] text-white">
            <p className="w-[26.875vw]">
              With Dxberience, luxury becomes a lifestyle, and we&apos;re
              excited to provide our clients with nothing but the best in
              exclusivity and exceptional experiences. From bespoke travel
              itineraries to private events curated to perfection, every moment
              is designed to exceed expectations. Indulge in unparalleled
              service, where every detail is meticulously crafted to reflect
              your unique taste and preferences.
            </p>
          </div> */}
        </div>

        {/* <div className="mobile-only text-white">
          <p className="mb-10">
            With Dxberience, luxury becomes a lifestyle, and we&apos;re excited
            to provide our clients with nothing but the best in exclusivity and
            exceptional experiences. From bespoke travel itineraries to private
            events curated to perfection, every moment is designed to exceed
            expectations. Indulge in unparalleled service, where every detail is
            meticulously crafted to reflect your unique taste and preferences.
          </p>
        </div> */}
        <div className="flex w-full justify-center items-center h-full">
          <div className="image relative bg-accent w-[79.487vw] h-[310px] lg:w-[41.667vw] lg:h-[71.77vh] xl:h-[713px] flex">
            <Image
              src="/demand-luxury-image-1.png"
              alt="Private jet for exclusive travel experiences"
              fill
              className="object-cover booking"
            />
          </div>
        </div>
      </section>
      <ServicesSection />
      <section className="luxury-destination mt-11 lg:mt-[150px] p-6">
        <div className="header gap-6 flex flex-col justify-center items-center">
          <h1 className="text-4xl lg:text-7xl text-center font-semibold font-IvyPresto">
            Tailored Travel & Itineraries
          </h1>
          <div className="w-full flex justify-center items-center">
            <p className="lg:w-[58.125vw] text-sm lg:text-base text-center font-light font-cormorant">
              At Dxberience, we specialize in crafting personalized itineraries,
              providing VIP experiences, and curating unforgettable excursions
              to ensure an unparalleled journey for our clients. With our
              expertise in global travel and exclusive partnerships with luxury
              providers, we deliver unrivalled luxury across a spectrum of
              experiences, ranging from exploring local delights to indulging in
              exotic destinations worldwide. Whether you seek adventure,
              relaxation, or cultural immersion, we are dedicated to creating
              bespoke experiences tailored to your desires.
            </p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <CustomButton
              btnName="Indulge Today"
              invert={true}
              isLink
              href="/explore-experiences/all"
            />
          </div>
          {/* <ImageScrollMotion querySelector={".luxury"} maxScroll={40}> */}
          <div className="flex justify-center items-center relative bg-accent w-full h-52 lg:w-[49.514vw] lg:h-[44.258vh] mt-[56px]">
            <Image
              src="/yacht.jpeg"
              alt="Yacht rental for luxurious sea voyages in Dubai"
              fill
              className="object-cover object-bottom luxury"
            />
          </div>
          {/* </ImageScrollMotion> */}
        </div>
      </section>

      <section className="global-ticketing flex flex-col justify-center items-center gap-5 lg:gap-28 py-28 px-6">
        <div className="content flex flex-col justify-center items-center gap-10 lg:gap-12">
          <h1 className="font-IvyPresto text-4xl lg:text-7xl text-center">
            Global & Private Event Ticketing
          </h1>
          <p className="text-sm lg:text-base lg:w-[47.5vw] text-center">
            Experience the best of Dubai's vibrant nightlife and cultural scene
            with Dxberience. Secure front-row seats at sold-out shows, reserve
            VIP tables at the trendiest clubs, and elevate your lifestyle with
            exclusive, once-in-a-lifetime experiences tailored just for you.
            Book now with Dxberience and live like royalty, indulging in the
            epitome of luxury and sophistication in Dubai's dynamic cityscape.
          </p>
        </div>
        <div className="section-btn">
          <CustomButton
            btnName="indulge today"
            invert={true}
            isLink
            href="/explore-experiences/all"
          />
        </div>
      </section>
      <MemoriesSection />
      <section className="tours flex flex-col justify-center items-center text-white bg-primary p-4 pt-20 lg:p-20 w-full">
        <div className="content flex flex-col justify-center items-center gap-8">
          <div className="header flex flex-col gap-6 justify-center items-center">
            <h1 className="text-lg lg:text-4xl">OUR</h1>
            <h1 className="font-IvyPresto text-4xl lg:text-7xl">
              Excursions & Tours
            </h1>
          </div>
          <p className="px-4 lg:w-[46.719vw] text-center pb-16">
            Dxberience offers an unparalleled array of excursions and tour
            experiences that capture the essence of Dubai's multifaceted allure.
            Their meticulously curated packages include thrilling desert safaris
            where visitors can indulge in dune bashing, camel rides, and
            traditional Bedouin camp experiences complete with cultural
            performances and gourmet dining.
          </p>
        </div>
        <div className="relative w-[79.487vw] lg:w-[56.667vw] h-[30.914vh] lg:h-[456px]">
          <Image
            src="/man_desert.jpeg"
            alt="Exciting adventure and desert activities in Dubai"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <RatingsSection />
      <section className="private-retreats w-full mt-[119px]">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="w-full flex justify-end">
            <div className="relative w-[225px] h-[80px] lg:w-[485px] lg:h-[250px] -mb-[50px]">
              <Image
                src="/palm-trees.jpeg"
                alt="Beach club reservations in Dubai"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
        <div className="lg:px-20 py-[91px] bg-primary flex flex-col justify-center items-start">
          <div className="header-text flex flex-col items-end justify-start mb-20 w-[195px] lg:w-[37.688vw] text-white">
            {/* <TextMotion> */}
            <h1 className="text-base w-full flex justify-end items-end lg:text-3xl text-white font-thin uppercase">
              Luxury
            </h1>
            {/* </TextMotion> */}
            {/* <TextMotion> */}
            <h1 className="text-4xl w-full lg:text-[70px] text-right font-IvyPresto text-white font-thin">
              Becomes a Lifestyle
            </h1>
            {/* </TextMotion> */}
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="big-picture relative w-[342px] h-[220px] lg:h-[65.311vh] lg:w-[88.889vw]">
              <Image
                src="/oasis.jpeg"
                alt="Relaxing beach and pool day reservations in Dubai"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
      <Footer />
    </main>
  );
}
