import { getCollectionPost, getGetOrganizationPosts, getOrganizations, getTaxonomies, getTaxonomyTags } from "@/services/publiz";
import Image from "next/image";
import { BadgeCheckIcon } from "lucide-react";
export default async function Jobs() {
    const { data: dataTags } = await getTaxonomyTags("job");
    const { data: dataPost } = await getCollectionPost(1);
    const { data: dataOrganization } = await getOrganizations();


    return (
        <main>
            <div className="lg:grid grid-cols-10 max-w-7xl lg:mx-auto ">
                <div className="col-span-2 ">
                    <h1>FILTER BY</h1>
                    {dataTags.map((tag, index) => (
                        <div className="flex flex-row justify-between my-4" key={index} >
                            <span>{tag.name}</span>
                        </div>
                    ))}
                </div>
                <div className="col-span-5">

                </div>
                <div className="col-span-3">
                    {dataOrganization.map((organization, index) => (
                        <div className="flex flex-row justify-between my-4" key={index} >

                            <div>
                                <div className="flex items-center space-x-1 mb-1">
                                    <h1 className="font-medium text-gray-800">
                                        {organization.name}
                                    </h1>
                                    <span className="text-green-600">
                                        <BadgeCheckIcon className="w-4 h-4" />
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {organization.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}