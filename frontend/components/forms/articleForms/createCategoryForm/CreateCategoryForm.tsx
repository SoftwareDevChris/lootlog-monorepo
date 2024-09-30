"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { createNewCategory } from "@/lib/queries";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/Label";

export const CreateCategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    toast.dismiss();

    try {
      const newCategory = await createNewCategory(formData);

      if (newCategory.status === 201) {
        toast.success("Category created successfully!");
        router.push("/dashboard/admin/categories");
      }

      // Backend error message
      else if (newCategory.status !== 201 && newCategory.statusText) {
        toast.error(newCategory.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unknown error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form action={onSubmit}>
      <div className="input-group">
        <Label>Name</Label>
        <Input type="text" name="name" placeholder="Category name" />
      </div>

      <Button type="submit" disabled={isLoading} className="button btn-primary">
        <span>Create</span>
      </Button>
    </form>
  );
};
