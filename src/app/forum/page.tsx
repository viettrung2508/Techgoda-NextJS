import { getCollectionPost, getGetOrganizationPosts, getTaxonomies, getTaxonomyTags } from "@/services/publiz";
import Image from "next/image";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


export default async function ForumPage() {
    const [dataTags, dataPost, organizationPosts] = await Promise.all([
        getTaxonomyTags(1),
        getCollectionPost(1),
        getGetOrganizationPosts(2),
    ]);

    dayjs.extend(relativeTime);

    return (
        <main>
            <div className="lg:grid grid-cols-10 max-w-7xl lg:mx-auto ">
                <div className="col-span-2">
                    {dataTags.data.map((tag, index) => (
                        <div className="flex flex-row justify-between" key={index}>
                            <h1 className="font-medium text-xl">{tag.name}</h1>
                        </div>
                    ))}
                </div>
                <div className="col-span-5">
                    {organizationPosts.data.map((ogPost, index) => (
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
                    {dataPost.data.map((post, index) => (
                        <div className="flex flex-row justify-between pb-4" key={index}>
                            <div className="flex flex-col">
                                <h1 className="font-medium text-sm">{post.title}</h1>
                                <p className="text-sm text-gray-600">
                                    {dayjs(post.createdAt).fromNow()}
                                </p>
                            </div>
                            <Image
                                src={post.metadata?.featuredImage.src}
                                width={100}
                                height={80}
                                alt="Picture of the author"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}