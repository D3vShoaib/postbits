import DefaultLayout from "@/layouts/default";
import Aurora from "@/components/ui/Aurora";
import { Input } from "@heroui/input";
import { LinkIcon } from "@/components/icons";
import LinksTable from "@/components/home/LinksTable";
import FadeContent from "@/components/ui/reactbits/FadeContent";
import { useState } from "react";
import { addLink } from "@/services/backend/post-manager";
import { useNotifier, NotifierProvider } from "@/components/ui/Notifier";
import { Button } from "@heroui/react";
import { Forward } from "lucide-react";

function IndexPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotifier();

  const handleAddLink = async () => {
    if (!input.trim()) {
      notify("Please enter a link.", "warning");
      return;
    }
    setLoading(true);
    try {
      await addLink(input);
      notify("Link added successfully!", "success");
      setInput("");
    } catch (e) {
      notify("Failed to add link.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="relative z-10 flex flex-col items-center justify-center  text-center overflow-hidden">
          <div className="w-full max-w-2xl flex flex-col gap-5 items-center justify-center">
            <div>
              <h1 className="text-4xl md:text-6xl leading-tight text-white">
                Any Link to a click
                <br />
                <div className="mt-0 md:mt-4 ">
                  <span className="font-serif font-bold italic text-[#7fa8ae]">
                    worthy{" "}
                  </span>
                  Post Instantly.
                </div>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300 font-light">
                Paste a link, get a crisp post with an image tailored for you.
              </p>
            </div>

            <div className="w-full max-w-2xl flex items-center gap-2">
            <Input
              isClearable
              value={input}
              onValueChange={setInput}
              onClear={() => setInput("")}
              placeholder="Enter your link"
              startContent={<LinkIcon className="text-default-400" />}
              variant="bordered"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddLink();
              }}
            />
              <Button
                isIconOnly
                aria-label="Add Link"
                color="default"
                onClick={handleAddLink}
                isLoading={loading}
                disabled={loading}
              >
                <Forward />
              </Button>
            </div>
            <div className="w-full">
              <LinksTable />
            </div>
          </div>
        </div>
      </FadeContent>
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 backdrop-blur-[40px]"></div>
        <Aurora
          colorStops={["#A7EFFF"]}
          blend={0.6}
          amplitude={0.8}
          speed={0.5}
        />
      </div>
    </DefaultLayout>
  );
}

// Wrap the page with NotifierProvider
export function PageWithNotifier() {
  return (
    <NotifierProvider>
      <IndexPage />
    </NotifierProvider>
  );
}

export default PageWithNotifier;
