import { useState } from "react";
import DefaultLayout from "@/layouts/default";

import Aurora from "@/components/ui/Aurora";
import { Slider } from "@heroui/react";

export default function DashboardPage() {
  const [colorStops, setColorStops] = useState([
    "#2c2c2c", // Dark gray
    "#ffffff", // White
    "#d3d3d3", // Pastel gray
  ]);
  const [amplitude, setAmplitude] = useState(0.3);
  const [blend, setBlend] = useState(1);
  const [speed, setSpeed] = useState(1);

  return (
    <DefaultLayout>
      <section className="border">
        <div className="flex flex-row">
          {/* ImageControl Center */}
          <div className="w-1/3 p-4 border-r">
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
              </div>
            </div>
          </div>{" "}
          {/* Image Section */}
          <div className="flex-1 h-[720px] border relative">
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
              </div>
              {/* Title text */}
              <div className="mt-4">
                <div className="w-[740px]">
                  <h3 className="text-2xl font-mono text-white">
                    Lorem Ipsum Emmet Doller Sign liso into car flower play Sign
                    liso into car flower play Sign liso into
                  </h3>
                </div>
                {/* Username/handles row */}
                <div className="flex flex-row gap-8 mt-4">
                  {[
                    "@twitter_username",
                    "@twitter_username",
                    "@twitter_username",
                  ].map((handle, index) => (
                    <div
                      key={index}
                      className="bg-black/30 px-2 py-1 rounded-xl border-4 border-white/20"
                    >
                      <span className="text-gray-300 text-sm font-medium">
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
