import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { paths } from "@/lib/paths";

const Logo = () => {
  const { home } = paths;

  return (
    <Link href={home.path()}>
      <Image src={logo} alt="logo" />
    </Link>
  );
};
export default Logo;
