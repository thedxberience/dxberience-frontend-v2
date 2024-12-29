import CategoryPage from "./page.client";

export async function generateMetadata({ params }) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${params.category}`;
  const data = await fetch(url).then((res) => res.json());

  return {
    title: data[0].headerTitle,
    description: data[0].headerCaption,
    image: data[0].headerImg.image,
    openGraph: {
      title: data[0].headerTitle,
      description: data[0].headerCaption,
      image: data[0].headerImg.image,
    },
  };
}

const page = ({ params }) => {
  return <CategoryPage params={params} />;
};

export default page;
