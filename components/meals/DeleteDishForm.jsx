"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { deleteDish } from "@/app/actions/dishActions";
import Image from "next/image";

export function DeleteDishForm({ item, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteDish(item.id);
      if (result.success) {
        toast({
          title: "Success!",
          description: "Dish deleted successfully.",
          duration: 3000,
        });
        onSuccess(item.id);
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("ERROR DELETING THE DISH", error);
      toast({
        title: "ERROR DELETING THE DISH!",
        description: error.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-center">
        Are you sure you want to delete "{item.name}"?
      </p>
      <Image
        src={item.imgUrl}
        width={100}
        height={100}
        className="my-4"
        alt={item.name}
      />
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
