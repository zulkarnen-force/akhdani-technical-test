// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Ensure this path is correct
export { handlers as GET, handlers as POST };
