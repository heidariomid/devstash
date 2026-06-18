import {
  Code,
  File,
  FileText,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  FileText,
  StickyNote,
  File,
  Image,
  Link,
};

export function getItemTypeIcon(name: string): LucideIcon {
  return ICONS[name] ?? File;
}
