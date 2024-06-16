
import tagsApiRequest from "@/apiRequest/tags";
import { useGetPost } from "@/lib/publiz";
import { getCollectionPost, getTags, getTaxonomies } from "@/services/publiz";
import Image from "next/image";
import { useState } from "react";

export default async function Home() {
  const { data: dataPost } = await getCollectionPost(1);
  const { data: dataTax } = await getTaxonomies();

  return (
    <main>
      <div className="lg:grid grid-cols-12 max-w-7xl lg:mx-auto ">
        <div className="col-span-8">
          {dataPost.map((post, index) => (
            <div className="  lg:grid grid-cols-6 " key={index}>
              <div className="col-span-4">
                <Image
                  src={post.metadata?.featuredImage.src}
                  width={530}
                  height={350}
                  alt="Picture of the author"
                />
                <h1>
                  title
                </h1>
              </div >
              <div className="col-span-2 ">
                <Image
                  src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
                <h1>
                  title
                </h1>
                <h1>Content</h1>
              </div>
              <div className="col-span-2  px-2 lg:px-0 ">
                <Image
                  src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
                <h1>
                  title
                </h1>
              </div>
              <div className="col-span-2 px-2 lg:px-0 " >
                <Image
                  src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
                <h1>
                  title
                </h1>
              </div>
              <div className="col-span-2 ">
                <Image
                  src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
                <h1>
                  title
                </h1>
              </div>
            </div>

          ))}
        </div>
        <div className="col-span-4">
          {dataTax.map((tax, index) => (
            <div className="flex flex-row justify-between" key={index} >
              <h1 className="font-medium text-xl">{tax.name} </h1>
              <Image
                src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                width={120}
                height={100}
                alt="Picture of the author"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
