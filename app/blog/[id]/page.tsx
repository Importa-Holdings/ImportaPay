import BlogPostClient from "./BlogPostClient";
import HeroNavbar from "../../home/_components/HeroNavbar";
import Footer from "../../home/_components/Footer";
import ReadyToMove from "../../home/_components/ReadyToMove";

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
      <HeroNavbar />
      <BlogPostClient postId={id} initialData={initialData} error={error} />
      <ReadyToMove
        title="Join Importapay Today!"
        description="Join Importapay today and see how simple international payments can be."
      />
      <Footer />
    </div>
  );
}
