import Footer from "@/components/Footer";
import ImageScrollMotion from "@/components/ImageScrollMotion";
import MemoriesSection from "@/components/MemoriesSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import TextMotion from "@/components/TextMotion";
import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="hero-section min-h-screen w-[100vw] md:w-full flex flex-col justify-between items-center">
        <Navbar />
        <div className="flex flex-col text-white justify-center items-center">
          <div className="flex justify-center relative w-[26.927vw] h-[60px] lg:w-[406.9px] lg:h-[100px] items-center">
            <Image
              src="/dxberience_logo.svg"
              alt="Dxberience Logo"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center w-[34.219vw] text-lg">
            Our luxury concierge service ensures that every aspect of your
            experience is meticulously curated to perfection. No need to think,
            just experience.
          </p>
        </div>

        <div className="pb-5 flex flex-col justify-center items-center gap-4 text-white">
          <p className="uppercase text-xs">Scroll to start experience</p>
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
        <div className="w-full flex justify-start pl-[80px] pt-8 lg:pt-28">
          <div className="explore-text w-full flex justify-between items-center relative h-fit">
            <TextMotion>
              <h1 className="text-text-secondary text-[36px] md:text-[75px] pb-[81px] w-[40.26vw] font-IvyPresto font-normal">
                Luxury Lifestyle Concierge Services
              </h1>
            </TextMotion>
            <div className="w-[38.906vw] font-noah">
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
            <div className="relative w-[250px] lg:w-[991px] h-[100px] lg:h-[194px]">
              <Image
                src={"/bmw.jpeg"}
                alt="Luxury car rental service in Dubai"
                className="object-cover img-1"
                fill
              />
            </div>
          </ImageScrollMotion>
          <div className="flex w-6/12 justify-end items-center">
            <h1 className="uppercase text-[30px] pt-12 font-noah">
              Your concierge to exclusive experiences
            </h1>
          </div>
        </div>
        <div className="find text-right flex flex-col w-full justify-end pr-6 lg:pr-20">
          <TextMotion animateType="right">
            <h1 className="text-text-secondary font-noah text-[36px] md:text-[40px] font-thin">
              Exclusive
            </h1>
          </TextMotion>
          <TextMotion animateType="right">
            <h1 className="text-text-primary font-IvyPresto text-[22px] md:text-[70px] font-thin">
              Bespoke Services in Dubai
            </h1>
          </TextMotion>
        </div>
      </section>
      <section className="w-full lg:pr-20">
        <div className="concierge-text pt-10 lg:pt-28 flex flex-col gap-4 lg:gap-6 justify-center items-center lg:justify-end lg:items-end">
          <div className="flex flex-col gap-2 lg:w-[600px] font-noah font-light px-6">
            <p className="text-sm lg:text-lg font-extralight">
              Step beyond the ordinary and discover a side of the world only a
              select few get to experience. Our curated luxury experiences cater
              to the discerning traveler. Book a private desert safari with
              gourmet dining under the stars, or soar above the city in a
              private helicopter. DXberience unlocks a world of bespoke
              experiences, from breathtaking hotel views to exclusive yacht
              charters. Create unforgettable memories with DXberience.
            </p>
            <p className="text-sm lg:text-lg font-extralight">
              Whether you crave the thrill of a desert safari with gourmet
              dining under the stars, or the serenity of a private spa retreat
              overlooking the turquoise waters, DXberience caters to your every
              whim. Our team of local experts has meticulously crafted a
              selection of experiences designed to tantalize your taste buds,
              indulge your senses, and create memories that will last a
              lifetime.
            </p>
            <CustomButton btnName="Inquire Now" invert={true} />
          </div>
        </div>
      </section>
      <section className="demand-luxury flex justify-between w-full h-fit lg:h-[836px] px-[72px] mt-[113px] ">
        <div className="left-side">
          <div className="top-box -mt-[40%] bg-primary text-white w-[38.177vw] px-[78px] py-[93px] flex flex-col gap-14">
            <h1 className="font-IvyPresto text-[70px]">
              Personalized Luxury Booking
            </h1>
            <p>
              Curated luxury for the discerning traveler. Book bespoke
              experiences, from private jets, personalized shopping, curated
              itineraries to breathtaking hotel views and private villas.
            </p>
          </div>
          <div className="pt-[125px] text-white">
            <p className="w-[26.875vw]">
              With Dxberience, luxury becomes a lifestyle, and we're excited to
              provide our clients with nothing but the best in exclusivity and
              exceptional experiences.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="image relative bg-accent w-[41.667vw] h-[71.77vh] hidden lg:flex">
            <Image
              src="/demand-luxury-image-1.png"
              alt="Private jet for exclusive travel experiences"
              fill
              className="object-cover booking"
            />
          </div>
        </div>
      </section>
      <section className="luxury-destination mt-11 lg:mt-[150px] p-6">
        <div className="header gap-6 flex flex-col justify-center items-center">
          <h1 className="text-[70px] text-center font-semibold font-IvyPresto">
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
            <CustomButton btnName="Indulge Today" invert={true} />
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
          <div className="header-text flex flex-col items-end justify-start w-[195px] lg:w-[40.688vw] text-white">
            <TextMotion>
              <h1 className="text-base lg:text-3xl -mb-2 lg:-mb-5 text-white font-thin uppercase">
                Luxury
              </h1>
            </TextMotion>
            <TextMotion>
              <h1 className="text-4xl lg:text-[70px] text-right font-IvyPresto text-white font-thin">
                Becomes a Lifestyle
              </h1>
            </TextMotion>
          </div>
          <div className="big-picture relative w-[342px] h-[220px] lg:h-[65.311vh] lg:w-[88.889vw]">
            <Image
              src="/oasis.jpeg"
              alt="Relaxing beach and pool day reservations in Dubai"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <ServicesSection />
      <MemoriesSection />
      <Footer />
    </main>
  );
}
