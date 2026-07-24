import { getInitials } from "@/src/lib/initials";
import { cn } from "@/src/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
}

// Reusable avatar: renders the provider image (e.g. GitHub) when present,
// otherwise falls back to initials derived from the name.
export function UserAvatar({ name, image, className }: UserAvatarProps) {
  const label = name?.trim() || "User";

  return (
    <Avatar className={cn("size-8", className)}>
      {image && <AvatarImage src={image} alt={label} />}
      <AvatarFallback className="text-xs font-medium">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
