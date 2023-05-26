import AddToCartButton from "@/components/AddToCartButton";
import { fetchProducts } from "../http";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const {data} = await fetchProducts()
  return (
    <>
      <div className="container mx-auto px-2 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`/product/${item.attributes.slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      src={
                        item.attributes.main_img.data.attributes.url
                      }
                      width={700}
                      height={700}
                      alt="Image"
                    />
                  </div>
                </Link>
                <Link href={`/product/${item.attributes.slug}`}>
                  <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.attributes.title}
                    </h2>
                    <p className="mt-1">₹{item.attributes.price}</p>
                  </div>
                </Link>
                <AddToCartButton className='mr-auto' p={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
