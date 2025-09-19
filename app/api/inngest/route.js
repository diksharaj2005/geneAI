import { generateIndustryInsights } from "../../../lib/inngest/functions/function";
import { inngest } from "../../../lib/inngest/client";

import { serve } from "inngest/next";
// import { inngest } from "../../../inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   generateIndustryInsights,
  ],
});