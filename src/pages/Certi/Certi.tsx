import CertificateClassic from "@/components/certificates/CertificateClassic";
import CertificateElegant from "@/components/certificates/CertificateElegant";
import CertificateModern from "@/components/certificates/CertificateModern";
import UseCertificate from "@/components/hook/profileHook/UseCertificate";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { Download, Share2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router";


const templates = [
  { id: "classic", name: "Classic Gold", component: CertificateClassic },
  { id: "modern", name: "Modern Navy", component: CertificateModern },
  { id: "elegant", name: "Elegant Burgundy", component: CertificateElegant },
];

const Index = () => {
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const certificateIds = pathParts[3];




  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const certRef = useRef<HTMLDivElement>(null);

  const { isPending, getUserCertificate } = UseCertificate(userId, certificateIds) as {
    isPending: boolean;
    getUserCertificate: Array<{
      userId: { fullName: string; username: string };
      topicId: { title: string };
      status: string;
      createdAt: string;
    }>;
  };






  const ActiveTemplate = templates.find((t) => t.id === selectedTemplate)!.component;

  const handleDownload = useCallback(async () => {
    if (!certRef.current) return;
    try {
      const dataUrl = await toPng(certRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `certificate-${getUserCertificate?.[0]?.userId?.fullName || "unnamed"}.png`;
      link.href = dataUrl;
      link.click();
      alert("Certificate saved as PNG.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert({ title: "Error", description: "Failed to generate image.", variant: "destructive" });
    }
  }, [getUserCertificate]);

  const handleShare = useCallback(async () => {
    if (!certRef.current) return;
    try {
      const dataUrl = await toPng(certRef.current, { quality: 1, pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "certificate.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "My Certificate" });
      } else {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        alert({ title: "Copied!", description: "Certificate image copied to clipboard." });
      }
    } catch {
      alert({ title: "Tip", description: "Use Download to save & share manually." });
    }
  }, []);


  if (isPending) {
    return (
      <div className="flex items-center justify-center text-gray-500 py-6">
        Loading certificate...
      </div>
    );
  }


  return (
    <div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">


          {/* Template selector */}
          <div className="flex gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`font-body text-sm px-4 py-2 rounded-md border transition-all ${selectedTemplate === t.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
                  }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <Button onClick={handleDownload} className="flex-1 gap-2">
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>

          </div>
        </div>

        {/* Certificate preview */}
        <div className="overflow-x-auto pb-4 flex justify-center">
          <div className="inline-block rounded-lg overflow-hidden shadow-2xl" ref={certRef}>
            <ActiveTemplate
              recipientName={getUserCertificate?.[0]?.userId?.fullName || "Recipient Name"}
              courseName={` ${getUserCertificate?.[0]?.topicId?.title || "Name of the course"} - (${getUserCertificate?.[0]?.status || "Status"})`}
              date={getUserCertificate?.[0]?.createdAt ? new Date(getUserCertificate?.[0]?.createdAt).toLocaleDateString() : "Date"}
              certificateId={certificateIds}
              user={userId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
