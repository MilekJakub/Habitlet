import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "./input";
import { useToast } from "@/hooks/use-toast";

export const TagInput = ({ 
  tags = [], 
  onAddTag, 
  maxTags 
}: {
  tags: string[], 
  onAddTag: (tag: string) => void, 
  maxTags: number 
}) => {
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tags.length >= maxTags) {
        toast({
          title: "Tag limit reached",
          description: `You can only add up to ${maxTags} tags.`,
          variant: "destructive",
        });
        return;
      }
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        onAddTag(tagInput.trim());
        setTagInput("");
      }
    }
  };

  return (
    <div>
      <Label htmlFor="tags">
        Tags
      </Label>
      <div className="mb-2 mt-2">
        <Input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          placeholder="Add a tag and press Enter"
          disabled={tags.length >= maxTags}
          className="w-full"
        />
      </div>
      <div className="flex justify-between items-center mb-2 ml-2">
        <span className="text-xs text-gray-500">
          {tags.length} of {maxTags} tags used
        </span>
      </div>
    </div>
  );
};