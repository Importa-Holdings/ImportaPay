"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCategory } from "@/hooks/useCategory";
import { CategorySelect } from "@/components/category/category-select";
import { useAuthStore } from "@/lib/store/authStore";

export interface Category {
  id: string;
  name: string;
}

interface PostData {
  id?: number;
  title: string;
  content: string;
  isDraft: boolean;
  category_id?: string;
  image?: string;
  subtitle?: string;
  is_published?: boolean;
  slug?: string;
  author_id?: number | string;
}

export default function PublishPostPage() {
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [category, setCategory] = useState("");
  const {
    fetchCategories,
    createCategory,
    isLoading: isLoadingCategories,
  } = useCategory();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subtitle, setSubtitle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token || !user) {
      router.push("/blog");
      return;
    }
  }, [user, token, router]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if we're in edit mode
        const editData = searchParams.get("edit");
        if (editData) {
          try {
            const parsedData = JSON.parse(decodeURIComponent(editData));
            setPost({
              ...parsedData,
              isDraft: false,
            });
            setSubtitle(parsedData.subtitle || "");
            setSelectedCategory(parsedData.category_id || "");

            if (parsedData.image) {
              setImagePreview(
                parsedData.image.startsWith("http")
                  ? parsedData.image
                  : `https://admin-api.pay.importa.biz/storage/${parsedData.image}`
              );
            }

            setIsEditing(true);
          } catch (e) {
            console.error("Error parsing edit data:", e);
            toast.error("Error loading post data");
            router.push("/dashboard/upload/fileUpload");
            return;
          }
        } else {
          const savedPost = localStorage.getItem("draftPost");
          if (savedPost) {
            setPost(JSON.parse(savedPost));
          } else {
            toast.error("No post data found");
            router.push("/dashboard/upload/fileUpload");
            return;
          }
        }

        const categories = await fetchCategories();
        setCategories(categories as Category[]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load required data");
        router.push("/dashboard/upload/fileUpload");
      }
    };

    loadData();
  }, [router, searchParams]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCategory = async (
    name: string,
    onSuccess?: () => void
  ): Promise<boolean> => {
    try {
      setIsCreatingCategory(true);
      const newCategory = await createCategory(name);
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory as Category]);
        setSelectedCategory(newCategory.id.toString());
        setCategory(newCategory.id.toString());
        toast.success(`Category "${name}" created successfully`);

        if (onSuccess) {
          onSuccess();
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category. Please try again.");
      return false;
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handlePublish = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!post) {
      toast.error("No post data found");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    if (!imageFile && !isEditing) {
      toast.error("Please select an image");
      return;
    }

    setIsPublishing(true);

    try {
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        router.push("/login");
        return;
      }

      const apiUrl =
        isEditing && post.id
          ? `https://admin-api.pay.importa.biz/api/posts/${post.id}`
          : "https://admin-api.pay.importa.biz/api/posts";

      const formData = new FormData();

      // Only append the image if it exists
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Add other form data
      formData.append("title", post.title);
      formData.append("subtitle", subtitle || "");
      formData.append("content", post.content);
      formData.append("category_id", selectedCategory);
      formData.append("is_published", "1");

      // Add author_id
      if (user?.id) {
        formData.append("author_id", user.id.toString());
      } else if (post.author_id) {
        formData.append("author_id", post.author_id.toString());
      } else {
        throw new Error("User ID is required to create or update a post");
      }

      const response = await fetch(apiUrl, {
        method: isEditing ? "POST" : "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            `Failed to ${isEditing ? "update" : "publish"} post`
        );
      }

      // Clear the draft from localStorage
      localStorage.removeItem("draftPost");

      // Show success message
      toast.success(
        isEditing
          ? "Post updated successfully!"
          : "Post published successfully!"
      );

      // Redirect to blog page
      router.push("/blog");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "publishing"} post:`,
        error
      );
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to ${isEditing ? "update" : "publish"} post`;
      toast.error(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          {isEditing ? "Update Post" : "Publish Post"}
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Publish post</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Cover Photo */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Cover photo
            </h2>
            <div
              className={`border-2 border-dashed rounded-xl p-16 text-center transition-colors ${
                dragActive
                  ? "border-purple-400 bg-purple-50"
                  : "border-gray-200 bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove image
                    </button>
                  </div>
                ) : null}
                <p className="text-gray-600 text-base">
                  Drag and drop here or{" "}
                  <label className="text-purple-600 hover:text-purple-700 font-medium underline cursor-pointer">
                    click here to browse
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </p>
                {imageFile && (
                  <div className="mt-2 text-sm text-green-600">
                    Selected: {imageFile.name}
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>5:3 aspect ratio</span>
                  <span>•</span>
                  <span>PNG or JPG or JPEG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Category and Subtitle */}
          <div className="space-y-8">
            {/* Category */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-4">
                Category
              </label>
              <CategorySelect
                selectedCategoryId={selectedCategory}
                onCategoryChange={(categoryId) => {
                  setSelectedCategory(categoryId.toString());
                  setCategory(categoryId.toString());
                }}
                className="w-full"
                onCreateCategory={handleCreateCategory}
                isCreating={isCreatingCategory}
              />
            </div>

            {/* Preview Subtitle */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-4">
                Preview subtitle
              </label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter preview subtitle here"
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-700 resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-12 flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className={`w-[50%] flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
              isPublishing
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {isPublishing
              ? isEditing
                ? "Updating..."
                : "Publishing..."
              : isEditing
              ? "Update"
              : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
