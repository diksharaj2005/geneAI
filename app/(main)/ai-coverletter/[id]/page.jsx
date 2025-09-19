"use client";

import { use, useEffect, useState } from "react";
import { getCoverLetter } from "../../../../actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../components/ui/tabs";
import { Textarea } from "../../../../components/ui/textarea";

export default function CoverLetterPage({ params }) {
  const { id } = use(params); // ✅ unwrap params with use()

  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("edit");
  const [coverLetterMode, setCoverLetterMode] = useState("edit");
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoverLetter(id);
      if (data) {
        setCoverLetter(data);
        setMarkdownContent(data.content || "");
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (!coverLetter) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-red-500">Cover letter not found.</p>
        <Link href="/ai-coverletter">
          <Button variant="link" className="mt-4">
            Back to Cover Letters
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Back navigation */}
      <Link href="/ai-coverletter">
        <Button variant="link" className="gap-2 pl-0">
          <ArrowLeft className="h-4 w-4" />
          Back to Cover Letters
        </Button>
      </Link>

      {/* Header */}
      <div className="pb-6 space-x-2">
        <h1 className="text-3xl font-bold mb-2">
          {coverLetter.jobTitle} @ {coverLetter.companyName}
        </h1>
        <p className="text-muted-foreground">
          Generated on {new Date(coverLetter.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

     
        <TabsContent value="edit">
          <Textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            className="min-h-[300px] w-full"
            placeholder="Write or edit your cover letter in Markdown..."
          />
        </TabsContent>

     
        <TabsContent value="preview">
          {activeTab === "preview" && coverLetterMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose edited markdown if you update the form data.
              </span>
            </div>
          )}
          <CoverLetterPreview content={markdownContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
