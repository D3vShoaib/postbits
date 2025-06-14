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

  return (
    <DefaultLayout>
      <section className="flex flex-col  gap-4">
        {/* image section */}
        <div className="w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
          <Aurora
            colorStops={colorStops}
            blend={blend}
            amplitude={amplitude}
            speed={speed}
          />
        </div>
        {/* image control */}
        <div className="w-full max-w-xl bg-black/80 rounded-2xl p-6 mt-2 flex flex-col gap-4 text-white">
          <div className="flex items-center gap-6 mb-2">
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
