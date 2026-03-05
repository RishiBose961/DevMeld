import QRCode from "react-qr-code";

interface Props {
  recipientName: string;
  courseName: string;
  date: string;
  certificateId: string;
  user: string;
}

const CertificateClassic = ({ recipientName, courseName, date, certificateId, user }: Props) => {
const qrValue = `
Certificate ID: ${certificateId}
Name: ${recipientName}
Course: ${courseName}
Date: ${date}

Verify Online:
http://localhost:5173/certificates/${user}/${certificateId}
`;
  return (
    <div className="w-[1056px] h-[748px] bg-[hsl(var(--cert-cream))] relative overflow-hidden">
      {/* Outer border */}
      <div className="absolute inset-4 border-[3px] border-[hsl(var(--cert-gold))]" />
      <div className="absolute inset-6 border border-[hsl(var(--cert-gold-light))]" />
      
      {/* Corner ornaments */}
      {[["top-8 left-8", ""], ["top-8 right-8", "rotate-90"], ["bottom-8 left-8", "-rotate-90"], ["bottom-8 right-8", "rotate-180"]].map(([pos, rot], i) => (
        <div key={i} className={`absolute ${pos} w-16 h-16 ${rot}`}>
          <div className="w-full h-[2px] bg-[hsl(var(--cert-gold))]" />
          <div className="h-full w-[2px] bg-[hsl(var(--cert-gold))]" />
          <div className="absolute top-2 left-2 w-8 h-[1px] bg-[hsl(var(--cert-gold-light))]" />
          <div className="absolute top-2 left-2 h-8 w-[1px] bg-[hsl(var(--cert-gold-light))]" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-20 text-center">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-[hsl(var(--cert-gold-dark))] mb-2">
          This is to certify that
        </p>
        
        <h1 className="font-display text-5xl font-bold text-[hsl(var(--cert-navy))] mb-1 leading-tight">
          Certificate
        </h1>
        <h2 className="font-elegant text-2xl italic text-[hsl(var(--cert-gold))] mb-8">
          of Achievement
        </h2>

        <p className="font-body text-sm text-[hsl(var(--muted-foreground))] dark:text-black mb-2">
          is proudly presented to
        </p>

        <div className="border-b-2 border-[hsl(var(--cert-gold))] pb-2 mb-6 min-w-[400px]">
          <p className="font-display text-4xl font-bold text-[hsl(var(--cert-navy))]">
            {recipientName || "Your Name"}
          </p>
        </div>

        <p className="font-body text-sm text-[hsl(var(--muted-foreground))] dark:text-black mb-1 max-w-lg">
          for successfully completing the online contribution
        </p>
        <p className="font-elegant text-xl font-semibold text-[hsl(var(--cert-gold-dark))] mb-8">
          "{courseName || "Online Contribution Program"}"
        </p>

        <div className="flex items-end justify-between w-full max-w-2xl mt-4">
          <div className="text-center">
            <div className="border-t border-[hsl(var(--cert-gold))] pt-2 px-8">
              <p className="font-body text-xs text-[hsl(var(--muted-foreground))] dark:text-black">{date}</p>
              <p className="font-body text-[10px] uppercase tracking-widest text-[hsl(var(--cert-gold-dark))]">Date</p>
            </div>
          </div>

          <div className="p-2 border border-[hsl(var(--cert-gold-light))] rounded">
            <QRCode value={qrValue} size={92} bgColor="transparent" fgColor="hsl(30, 10%, 15%)" />
          </div>

          <div className="text-center">
            <div className="border-t border-[hsl(var(--cert-gold))] pt-2 px-8">
              <p className="font-elegant text-sm italic text-[hsl(var(--cert-navy))]">DevMeld Team</p>
              <p className="font-body text-[10px] uppercase tracking-widest text-[hsl(var(--cert-gold-dark))]">Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateClassic;