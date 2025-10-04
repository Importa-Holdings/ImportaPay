import { useCategory } from "@/hooks/useCategory";
import { CategoryModal } from "@/app/components/category/category-modal";
import { Plus } from "lucide-react";

interface CategorySelectProps {
  selectedCategoryId?: string | number;
  onCategoryChange: (categoryId: string | number) => void;
  className?: string;
  onCreateCategory?: (name: string, onSuccess?: () => void) => Promise<boolean>;
  isCreating?: boolean;
}

export function CategorySelect({
  selectedCategoryId,
  onCategoryChange,
  className = "",
  onCreateCategory,
  isCreating = false,
}: CategorySelectProps) {
  const { categories, isLoading, error } = useCategory();

  // Log the current state for debugging
  // useEffect(() => {
  //   console.log("CategorySelect - Categories:", categories);
  //   console.log("CategorySelect - Loading:", isLoading);
  //   console.log("CategorySelect - Error:", error);
  // }, [categories, isLoading, error]);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <select
          value={selectedCategoryId?.toString() || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          disabled={isLoading || isCreating}
        >
          <option value="">
            {isLoading ? "Loading categories..." : "Select a category"}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>

        {onCreateCategory && (
          <CategoryModal
            onCreateCategory={onCreateCategory}
            isCreating={isCreating}
          >
            <button
              type="button"
              disabled={isLoading || isCreating}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
            >
              {isCreating ? (
                <span className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          </CategoryModal>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          Error loading categories: {error}
        </p>
      )}

      {!isLoading && categories.length === 0 && !error && (
        <p className="text-sm text-yellow-600">No categories available</p>
      )}

      {isLoading && (
        <p className="text-sm text-gray-500">Loading categories...</p>
      )}
    </div>
  );
}
