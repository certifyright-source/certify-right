import Image from "next/image";

interface CRLogoProps {
  className?: string;
  variant?: "default" | "white" | "compact";
  showWordmark?: boolean;
  preload?: boolean;
}

export default function CRLogo({
  className = "",
  variant = "default",
  showWordmark = true,
  preload = true,
}: CRLogoProps) {
  const isWhite = variant === "white";

  if (!showWordmark || variant === "compact") {
    return (
      <Image
        src={isWhite ? "/images/cr-mark-white.png" : "/images/cr-mark.png"}
        alt="Certify Right"
        width={40}
        height={40}
        className={`h-10 w-10 object-contain ${className}`}
        preload={preload}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={isWhite ? "/images/cr-logo-white.png" : "/images/cr-logo-full.png"}
      alt="Certify Right — Building Certification"
      width={216}
      height={48}
      className={`h-12 w-auto object-contain ${className}`}
      preload={preload}
      unoptimized
    />
  );
}
