import Image from "next/image";

import logoMark from "../../public/assets/logo1.jpg.jpeg";
import logoLockup from "../../public/assets/logo2.jpg.jpeg";

type LogoProps = {
  variant?: "mark" | "lockup";
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  variant = "mark",
  size = 56,
  className,
  priority,
  alt = "Ono Belle Global Limited logo",
}: LogoProps) {
  const src = variant === "lockup" ? logoLockup : logoMark;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      placeholder="blur"
      className={className}
    />
  );
}
