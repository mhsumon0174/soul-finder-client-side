import Typewriter from "typewriter-effect";

export default function DashboardHome() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh] p-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center">
        <Typewriter
          options={{
            strings: [
              "Click the menu on the left to explore dashboard !",
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
            pauseFor: 2000,
          }}
        />
      </h2>
    </div>
  );
}
