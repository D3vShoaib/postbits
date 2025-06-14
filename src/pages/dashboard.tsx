import { useState, useRef } from "react";
import DefaultLayout from "@/layouts/default";

import Aurora from "@/components/ui/Aurora";
import { Slider, Input, Button } from "@heroui/react";
import { Camera, Download } from "lucide-react";
import { captureImageSection, downloadImage } from "@/utils/captureUtils";

export default function DashboardPage() {
  const [colorStops, setColorStops] = useState([
    "#2c2c2c", // Dark gray
    "#ffffff", // White
    "#d3d3d3", // Pastel gray
  ]);
  const [amplitude, setAmplitude] = useState(0.3);
  const [blend, setBlend] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isCapturing, setIsCapturing] = useState(false);

  // Data Controls state
  const [title, setTitle] = useState(
    "Lorem Ipsum Emmet Doller Sign flower play liso into car flower"
  );
  const [socials, setSocials] = useState([
    "@github_username",
    "@twitter_username",
    "@linkedin_username",
  ]);

  // Ref for the image section
  const imageSectionRef = useRef<HTMLDivElement>(null);

  // Capture function
  const handleCapture = async () => {
    if (!imageSectionRef.current) return;
    
    setIsCapturing(true);
    try {
      const dataURL = await captureImageSection(imageSectionRef.current, {
        width: 1920,
        height: 1080,
        format: 'png',
        quality: 1.0
      });
      
      downloadImage(dataURL, `postbits-${Date.now()}`);
    } catch (error) {
      console.error('Failed to capture image:', error);
      // You might want to show a toast notification here
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-row">
          {/* ImageControl Center */}
          <div className="w-1/3 p-4 border-r-3 border-opacity-50 border-gray-600 border-dashed">
            <h2 className="text-xl font-bold mb-4">Image Controls</h2>
            <div className="space-y-6">
              {/* Color Pickers */}
              <div className="space-y-2">
                <h3 className="text-md font-semibold">Aurora Effects</h3>
                <div className="flex items-center gap-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col gap-1 items-center">
                      <label className="text-xs text-gray-500">
                        Color {i + 1}
                      </label>
                      <div
                        style={{
                          borderRadius: "0.375rem",
                          backgroundColor: colorStops[i],
                          width: "40px",
                          height: "20px",
                          overflow: "hidden",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        onClick={() => {
                          const colorPicker = document.getElementById(
                            `colorPicker-${i}`
                          );
                          if (colorPicker) colorPicker.click();
                        }}
                      >
                        <input
                          id={`colorPicker-${i}`}
                          type="color"
                          value={colorStops[i]}
                          onChange={(e) => {
                            const newStops = [...colorStops];
                            newStops[i] = e.target.value;
                            setColorStops(newStops);
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            opacity: 0, // Hide the default input but keep it functional
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aurora Control Sliders */}
              <div className="space-y-4">
                <Slider
                  className="max-w-md"
                  color="foreground"
                  label="Blend"
                  minValue={0}
                  maxValue={1.5}
                  step={0.1}
                  value={blend}
                  onChange={(value) =>
                    setBlend(Array.isArray(value) ? value[0] : value)
                  }
                  showSteps={true}
                  size="md"
                />

                <Slider
                  className="max-w-md"
                  color="foreground"
                  label="Amplitude"
                  minValue={0.1}
                  maxValue={2}
                  step={0.1}
                  value={amplitude}
                  onChange={(value) =>
                    setAmplitude(Array.isArray(value) ? value[0] : value)
                  }
                  showSteps={true}
                  size="md"
                />

                <Slider
                  className="max-w-md"
                  color="foreground"
                  label="Speed"
                  minValue={0}
                  maxValue={2}
                  step={0.1}
                  value={speed}
                  onChange={(value) =>
                    setSpeed(Array.isArray(value) ? value[0] : value)
                  }
                  showSteps={true}
                  size="md"
                />
              </div>              {/* Data Controls Section */}
              <div className="mt-8">
                <h3 className="text-md font-semibold mb-1">Data Controls</h3>{" "}
                {/* Title Input */}
                <div className="space-y-2">
                  <Input
                    isClearable
                    variant="bordered"
                    label="Title"
                    placeholder="Enter your title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* Socials Input */}
                <div className="mt-6">
                  <div className="space-y-2">
                    {socials.map((social, index) => (
                      <Input
                        isClearable
                        variant="bordered"
                        key={index}
                        label={`Social Handle ${index + 1}`}
                        placeholder={`@username${index + 1}`}
                        type="text"
                        value={social}
                        onChange={(e) => {
                          const newSocials = [...socials];
                          newSocials[index] = e.target.value;
                          setSocials(newSocials);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Capture Controls */}
              <div className="mt-8">
                <h3 className="text-md font-semibold mb-4">Export</h3>
                <Button
                  color="primary"
                  variant="solid"
                  startContent={isCapturing ? <Camera className="animate-pulse" /> : <Download />}
                  onClick={handleCapture}
                  isLoading={isCapturing}
                  disabled={isCapturing}
                  className="w-full"
                >
                  {isCapturing ? 'Capturing...' : 'Capture Image'}
                </Button>
              </div>
            </div>
          </div>{" "}          {/* Image Section */}
          <div ref={imageSectionRef} className="flex-1 h-[720px] relative">
            {/* Aurora background */}
            <div className="absolute inset-0 w-full h-full">
              <Aurora
                colorStops={colorStops}
                amplitude={amplitude} // 0 to 2
                blend={blend} // 0 to 1
                speed={speed} // 2 max
              />
            </div>{" "}
            {/* Content overlay */}{" "}
            <div className="relative z-10 flex flex-col  h-full  p-10 text-white">
              {/* Main image/content area */}
              <div className="w-full  flex items-center justify-center">
                <div className="w-[740px] h-[490px] rounded-3xl overflow-hidden">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Post content"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>{" "}
              {/* Title text */}
              <div className="mt-6">
                <div className="w-[740px]">
                  <h3 className="text-3xl font-mono text-white leading-tight">
                    {title}
                  </h3>
                </div>
                {/* Username/handles row */}
                <div className="flex flex-row gap-6 mt-6">
                  {socials.map((handle, index) => (
                    <div
                      key={index}
                      className="bg-black/30 px-4 py-2 rounded-xl border-4 border-white/20"
                    >
                      <span className="text-gray-300 text-base font-medium">
                        {handle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
