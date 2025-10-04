import BlogPostClient from "./BlogPostClient";

// Function to get the post data
async function getPost(postId: string) {
  try {
    const response = await fetch(
      `https://admin-api.pay.importa.biz/api/posts/${postId}`,
      { cache: "no-store" } // Ensure fresh data
    );
    const data = await response.json();
    if (response.ok && data.data) {
      // Format the image URL with the correct base path
      if (data.data.image) {
        data.data.image = `https://admin-api.pay.importa.biz/storage/${data.data.image}`;
      }
      return { data: data.data, error: null };
    }
    return { data: null, error: "Post not found" };
  } catch (err) {
    console.error("Error fetching post:", err);
    return { data: null, error: "Error fetching post." };
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  // Await the params in Next.js 15
  const { id } = await params;

  // Get the post data before any client component rendering
  const { data: initialData, error } = await getPost(id);

  // Return the component with pre-fetched data
  return (
    <div className="min-h-screen">
      <BlogPostClient postId={id} initialData={initialData} error={error} />
    </div>
  );
}
