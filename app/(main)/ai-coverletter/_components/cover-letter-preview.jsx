"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Download, Loader2 } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";

export default function CoverLetterPreview({ content }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("coverletter-pdf");
      if (!element) {
        toast.error("Cover letter element not found!");
        return;
      }

      const opt = {
        margin: [15, 15],
        filename: "cover-letter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("Cover letter downloaded!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4" data-color-mode="light">
      <div className="flex justify-end">
        <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <MDEditor.Markdown source={content} style={{ background: "white" }} />
      </div>

      <div className="hidden">
        <div id="coverletter-pdf">
          <MDEditor.Markdown
            source={content}
            style={{
              background: "white",
              color: "black",
              padding: "20px",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          />
        </div>
      </div>
    </div>
  );
}
