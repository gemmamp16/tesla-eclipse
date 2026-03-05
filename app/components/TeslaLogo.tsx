import Image from "next/image";

export default function TeslaLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <Image
      src="/tesla_logo_transparent.png"
      alt="Tesla"
      width={500}
      height={500}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
