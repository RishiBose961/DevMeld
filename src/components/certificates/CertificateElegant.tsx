import QRCode from "react-qr-code";

interface Props {
  recipientName: string;
  courseName: string;
  date: string;
  certificateId: string;
  user: string;
}

const CertificateElegant = ({ recipientName, courseName, date, certificateId, user }: Props) => {
  const qrValue = `
Certificate ID: ${certificateId}
Name: ${recipientName}
Course: ${courseName}
Date: ${date}

Verify Online:
http://localhost:5173/certificates/${user}/${certificateId}
`;

  return (
    <div className="w-[1056px] h-[748px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(345, 60%, 30%), hsl(345, 50%, 20%), hsl(220, 50%, 15%))" }}>
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-white/5" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full border border-white/5" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-20">
        {/* Top ornament */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[hsl(var(--cert-gold))]" />
          <div className="w-3 h-3 rotate-45 border border-[hsl(var(--cert-gold))]" />
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[hsl(var(--cert-gold))]" />
        </div>

        <p className="font-body text-[10px] tracking-[0.6em] uppercase text-[hsl(var(--cert-gold-light))]">
          Certificate of
        </p>
        <h1 className="font-display text-6xl font-black text-white mt-2 mb-8">
          Excellence
        </h1>

        <p className="font-body text-xs text-white/50 uppercase tracking-widest mb-4">
          This certificate is awarded to
        </p>

        <h2 className="font-display text-5xl font-bold text-[hsl(var(--cert-gold))] mb-2">
          {recipientName || "Your Name"}
        </h2>
        <div className="w-64 h-[1px] bg-[hsl(var(--cert-gold)/0.5)] mb-8" />

        <p className="font-body text-sm text-white/60 max-w-lg mb-2">
          In recognition of outstanding online contribution and successful completion of
        </p>
        <p className="font-elegant text-2xl font-semibold text-white italic">
          "{courseName || "Online Contribution Program"}"
        </p>

        <div className="flex items-end justify-between w-full max-w-xl mt-12">
          <div className="text-left">
            <p className="font-body text-[10px] text-white/40 uppercase tracking-widest mb-1">Date</p>
            <p className="font-body text-sm text-white/80">{date}</p>
          </div>

          <div className="p-2 rounded border border-[hsl(var(--cert-gold)/0.3)]">
            <QRCode value={qrValue} size={92} bgColor="transparent" fgColor="hsl(40, 65%, 65%)" />
          </div>

          <div className="text-right">
            <p className="font-elegant text-lg italic text-white/80">DevMeld Team</p>
            <p className="font-body text-[10px] text-white/40 uppercase tracking-widest">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateElegant;
