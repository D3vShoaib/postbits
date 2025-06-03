import DefaultLayout from "@/layouts/default";
import Aurora from "@/ui/Aurora";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mt-20">
          Welcome to PostBits
        </h1>
      </div>

      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
    </DefaultLayout>
  );
}
