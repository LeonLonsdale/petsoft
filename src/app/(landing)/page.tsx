import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { paths } from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const { signup, login } = paths;
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex items-center justify-center gap-10 flex-col xl:flex-row">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="screenshot of application"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for £299.
        </p>
        <div className="mt-10">
          <Button variant="default" asChild>
            <Link href={signup.path()}>Get Started</Link>
          </Button>
          <Button variant="secondary" className="ml-4" asChild>
            <Link href={login.path()}>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
