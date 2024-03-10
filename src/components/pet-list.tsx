import Image from "next/image";

const PetList = () => {
  return (
    <section className="bg-white border-b border-black/[0.08]">
      <ul>
        <li>
          <button className="flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
            <Image
              src="https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
              alt="Pet Image"
              width={45}
              height={45}
              className="rounded-full object-cover"
            />
            <p className="font-semibold">Benjamin</p>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default PetList;
