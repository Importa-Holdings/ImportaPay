"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export interface CategoryModalProps {
  /**
   * Callback function that will be called when a new category is created.
   * @param name The name of the category to create
   * @param onSuccess Optional callback to be called after successful creation
   * @returns A promise that resolves to true if creation was successful
   */
  onCreateCategory: (name: string, onSuccess?: () => void) => Promise<boolean>;
  /**
   * Whether the category is currently being created
   */
  isCreating: boolean;
  /**
   * The trigger element that will open the modal
   */
  children: React.ReactNode;
}

export function CategoryModal({
  onCreateCategory,
  isCreating,
  children,
}: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [wasCreating, setWasCreating] = useState(false);

  // Handle modal close after successful creation
  useEffect(() => {
    if (wasCreating && !isCreating) {
      // Only close if we were just creating and now we're done
      setCategoryName("");
      setError(null);
      setIsOpen(false);
    }
    setWasCreating(isCreating);
  }, [isCreating, wasCreating]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim() || isCreating) return;

    setError(null);
    await onCreateCategory(categoryName.trim());

    // Note: The modal will be closed by the useEffect when isCreating becomes false
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setCategoryName("");
          setError(null);
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Category Name
            </label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              disabled={isCreating}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !categoryName.trim()}
              className="min-w-[120px]"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
