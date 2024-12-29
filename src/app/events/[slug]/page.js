import { makeRequest } from "@/utils/axios";
import EventsDetailsPage from "./page.client";

export async function generateMetadata({ params }) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.slug}`
  ).then((res) => res.json());

  return {
    title: data[0].title,
    description: data[0].shortDescription,
    image: data[0].thumbnail.image,
    openGraph: {
      title: data[0].title,
      description: data[0].shortDescription,
      image: data[0].thumbnail.image,
    },
  };
}

const page = ({ params }) => {
  return <EventsDetailsPage params={params} />;
};

export default page;
