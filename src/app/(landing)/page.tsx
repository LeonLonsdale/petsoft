import Logo from "@/components/ui/logo";
import Image from "next/image";

const Home = () => {
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
        <div className="mt-10">button</div>
      </div>
    </main>
  );
};

export default Home;
