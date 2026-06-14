"use client"

import TextRotate from "@/components/fancy/text/text-rotate"

export default function MobileGate() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white" style={{ zIndex: 9999 }}>
      <div className="max-w-xl px-8 text-center" style={{ color: "#000" }}>
        <TextRotate
          texts={["Nice phone. This portfolio needs a bigger screen. See you on desktop."]}
          mainClassName="md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
          staggerFrom="random"
          animatePresenceMode="wait"
          animatePresenceInitial
          splitBy="characters"
          initial={[
            { filter: "blur(20px)", opacity: 0 },
          ]}
          animate={[
            { filter: "blur(0px)", opacity: 1 },
          ]}
          staggerDuration={0.01}
          splitLevelClassName=""
          elementLevelClassName="md:py-[4px]"
          transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1 }}
          rotationInterval={4000}
          auto={false}
          loop={false}
        />
      </div>
    </div>
  )
}
