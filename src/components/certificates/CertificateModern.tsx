import QRCode from "react-qr-code";

interface Props {
  recipientName: string;
  courseName: string;
  date: string;
  certificateId: string;
  user: string;
}

const CertificateModern = ({ recipientName, courseName, date, certificateId, user }: Props) => {
  const qrValue = `
Certificate ID: ${certificateId}
Name: ${recipientName}
Course: ${courseName}
Date: ${date}

Verify Online:
http://localhost:5173/certificates/${user}/${certificateId}
`;

  return (
    <div className="w-[1056px] h-[748px] bg-[hsl(var(--cert-navy))] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-[hsl(var(--cert-gold)/0.1)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-gradient-to-tr from-[hsl(var(--cert-teal)/0.15)] to-transparent" />
      
      {/* Gold accent bar */}
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[hsl(var(--cert-gold))] via-[hsl(var(--cert-gold-light))] to-[hsl(var(--cert-gold))]" />
      
      {/* Content */}
      <div className="absolute inset-0 flex">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center pl-16 pr-8">
          <div className="mb-6">
            <div className="w-12 h-[2px] bg-[hsl(var(--cert-gold))] mb-4" />
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[hsl(var(--cert-gold-light))]">
              Certificate of
            </p>
            <h1 className="font-display text-5xl font-black text-white leading-none mt-1">
              ACHIEVEMENT
            </h1>
          </div>

          <p className="font-body text-xs text-[hsl(var(--cert-gold-light)/0.7)] uppercase tracking-widest mb-3">
            Awarded to
          </p>
          <h2 className="font-display text-4xl font-bold text-[hsl(var(--cert-gold))] mb-6">
            {recipientName || "Your Name"}
          </h2>

          <p className="font-body text-sm text-white/70 leading-relaxed max-w-md mb-2">
            For successfully completing the online contribution program
          </p>
          <p className="font-elegant text-xl font-semibold text-[hsl(var(--cert-teal))] italic">
            "{courseName || "Online Contribution Program"}"
          </p>

          <div className="flex gap-12 mt-10">
            <div>
              <p className="font-body text-xs text-white/50 uppercase tracking-widest mb-1">Date</p>
              <p className="font-body text-sm text-white">{date}</p>
            </div>
            <div>
              <p className="font-body text-xs text-white/50 uppercase tracking-widest mb-1">Signature</p>
              <p className="font-elegant text-lg italic text-white/80">DevMeld Team</p>
            </div>
          </div>
        </div>

        {/* Right section - QR */}
        <div className="w-48 flex flex-col items-center justify-center">
          <div className="p-3 bg-white/10 backdrop-blur rounded-lg border border-white/10">
            <QRCode value={qrValue} size={102} bgColor="transparent" fgColor="white" />
          </div>
          <p className="font-body text-[9px] text-white/40 mt-2 tracking-wider">SCAN TO VERIFY</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateModern;
