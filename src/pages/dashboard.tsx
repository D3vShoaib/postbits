import DefaultLayout from "@/layouts/default";
import Aurora from "@/components/ui/Aurora";
import { useState } from "react";
import { Slider } from "@heroui/slider";

export default function DashboardPage() {
  const [colorStops, setColorStops] = useState([
    "#3A29FF",
    "#FF94B4",
    "#FF3232",
  ]);
  const [blend, setBlend] = useState(0.5); // max 1.5
  const [amplitude, setAmplitude] = useState(1.0);
  const [speed, setSpeed] = useState(0.5); // max 2
  const [socialHandles, setSocialHandles] = useState([
    "@D3vShoaib",
    "@D3vShoaib",
    "@D3vShoaib",
  ]);

  return (
    <DefaultLayout>
      <section className="flex flex-col  gap-4">
        {/* image section */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] overflow-hidden rounded-2xl">
          {/* Aurora background */}
          <div className="absolute inset-0 w-full h-full">
            <Aurora
              colorStops={colorStops}
              blend={blend}
              amplitude={amplitude}
              speed={speed}
            />
          </div>{" "}
          {/* Content overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
            {/* Profile Image - taking full dimensions with margin */}
            <div className="flex-1 w-full flex items-center justify-center mb-2">
              <div className="w-[calc(100%-30px)] h-[calc(100%-30px)] relative">
                <img
                  src="https://placehold.co/500x280"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-3xl border-4 border-white/20 shadow-2xl"
                />
              </div>
            </div>
            {/* Social Media Handles - horizontal layout */}
            <div className="flex flex-row items-center justify-center gap-20 flex-wrap">
              {socialHandles.map((handle, index) => (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20"
                >
                  <span className="text-white font-medium text-lg">
                    {handle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
        {/* image control */}
        <div className="w-full max-w-xl bg-black/80 rounded-2xl p-6 mt-2 flex flex-col gap-4 text-white">
          {/* Color Controls */}
          <div className="flex items-center gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <input
                  type="color"
                  value={colorStops[i]}
                  onChange={(e) => {
                    const newStops = [...colorStops];
                    newStops[i] = e.target.value;
                    setColorStops(newStops);
                  }}
                  style={{ borderRadius: 6 }}
                />
              </div>
            ))}
          </div>

          {/* Social Media Handle Controls */}
          <div className="flex flex-col gap-3 mb-4">
            <h3 className="text-lg font-semibold text-white/90">
              Social Media Handles
            </h3>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-sm text-white/70">Handle {i + 1}</label>
                <input
                  type="text"
                  value={socialHandles[i]}
                  onChange={(e) => {
                    const newHandles = [...socialHandles];
                    newHandles[i] = e.target.value;
                    setSocialHandles(newHandles);
                  }}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder={`@handle${i + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex flex-col gap-4">
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
      </section>
    </DefaultLayout>
  );
}
