import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Dheeraj Mahra</h1>
      <p className="mb-4">
        Software Engineer focused on frontend systems and user experience, with a background in
        building products at startups. If I'm not coding, I'm probably reading about automobiles or
        playing piano.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
