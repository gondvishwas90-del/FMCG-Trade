import React, { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagsInputProps {
    value?: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function TagsInput({ value = [], onChange, placeholder }: TagsInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            addTag();
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue("");
        }
    };

    const removeTag = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 text-sm flex items-center gap-1">
                        {tag}
                        <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => removeTag(index)}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "Type and press Enter..."}
                    className="flex-1"
                />
                <Button type="button" variant="secondary" onClick={addTag} disabled={!inputValue.trim()}>
                    Add
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
                Press Enter to add a tag.
            </p>
        </div>
    );
}
