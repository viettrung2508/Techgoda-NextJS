import { getCollectionPost, getGetOrganizationPosts, getTaxonomies, getTaxonomyTags } from "@/services/publiz";
import Image from "next/image";

export default async function ForumPage() {
    const { data: dataTags } = await getTaxonomyTags(1);
    const { data: dataPost } = await getCollectionPost(1);
    const { data: organizationPosts } = await getGetOrganizationPosts(2);


    return (
        <main>
            <div className="lg:grid grid-cols-10 max-w-7xl lg:mx-auto ">
                <div className="col-span-2">
                    {dataTags.map((tag, index) => (
                        <div className="flex flex-row justify-between" key={index} >
                            <h1 className="font-medium text-xl">{tag.name} </h1>
                            <Image
                                src="https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D=w600-rw"
                                width={120}
                                height={100}
                                alt="Picture of the author"
                            />
                        </div>
                    ))}
                </div>
                <div className="col-span-5">
                    {organizationPosts.map((ogPost, index) => (

                        <div key={index} className="flex flex-col">
                            <div>
                                <h1>{ogPost.author?.displayName}</h1>
                                <p></p>
                            </div>
                            <div className="flex justify-center">
                                <Image
                                    src={ogPost.metadata.featuredImage.src}
                                    width={530}
                                    height={350}
                                    alt="Picture of the author"
                                />
                            </div>

                        </div>
                    ))}
                </div>
                <div className="col-span-3">
                    {dataPost.map((post, index) => (
                        <div className="flex flex-row justify-between" key={index} >
                            <h1 className="font-medium text-xl">{post.title} </h1>
                            <Image
                                src={post.metadata?.featuredImage.src}
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