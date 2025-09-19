import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="mb-2">
     <div className="container mx-auto py-6">
      <Link href="/ai-coverletter">
        <Button variant="link" className="gap-2 pl-0">
          <ArrowLeft className="h-4 w-4" />
          Back to Cover Letters
        </Button>
      </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Create a New Cover Letter</h1>


      <CoverLetterGenerator />
    </div>
  );
}