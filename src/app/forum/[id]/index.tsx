
import PostContent from "./PostContent";

export default function _View({ id }: { id: number }) {
  return (
    <div>
      <PostContent id={id} />
    </div>
  );
}


