import Loader from "@/components/loader/Loader";

const PageLoader = () => {
  return (
    <section className="fixed inset-0 flex justify-center items-center  min-h-screen h-screen ">
      <div className="  px-4 py-3 border border-[#535353] rounded-md  bg-[#252525]">
        <Loader />
      </div>
    </section>
  );
};

export default PageLoader;
