import AddToCartButton from "@/components/AddToCartButton";
import { fetchSingleProduct } from "@/http";
import Image from "next/image";


const Product = async ({ params: { slug } }) => {
  const { data } = await fetchSingleProduct(slug);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-2 px-2 my-4 mx-auto">
        <Image
          width={750}
          height={750}
          alt="ecommerce"
          className="object-cover object-center rounded"
          src={
            data?.data[0].attributes.main_img.data.attributes.url
          }
        />
        <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {data.data[0].attributes.title}
          </h1>
          <p className="leading-relaxed my-6">
            {data.data[0].attributes.description}
          </p>
          <div className="flex mt-10 justify-between">
            <span className="title-font font-medium text-2xl text-gray-900">
            ₹{data.data[0].attributes.price}
            </span>
            <AddToCartButton p={data.data[0]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
