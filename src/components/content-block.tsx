type ContentBlockProps = {
  children: React.ReactNode;
};

const ContentBlock = ({ children }: ContentBlockProps) => {
  return (
    <div className="bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden w-full h-full">
      {children}
    </div>
  );
};

export default ContentBlock;
