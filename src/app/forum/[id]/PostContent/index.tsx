import HtmlView from "@/components/HtmlView";
import { getGetOrganizationPosts } from "@/services/publiz";

type ViewProps = {
  id: number;
};

export default async function _View({ id }: ViewProps) {
  const { data: organizationPosts } = (await getGetOrganizationPosts(id)) || {};
  return (
    <div>
      {organizationPosts.map((ogPost, index) => (
        <div key={index} className="flex flex-col">
          <HtmlView content={ogPost.content} />
        </div>
      ))}
    </div>
  );
}
