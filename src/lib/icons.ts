import {
  Code,
  File,
  FileText,
  Image,
  Link,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

// Maps the lucide icon names stored as strings on ItemType (see mock-data.ts)
// to their actual components. Falls back to File for any unknown name.
const ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link,
};

export function getItemTypeIcon(name: string): LucideIcon {
  return ICONS[name] ?? File;
}
