import Spline from "@splinetool/react-spline";

export function SplineBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <Spline scene="https://prod.spline.design/19Ov3JFEYuezLIJo/scene.splinecode" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2/12 bg-gradient-to-t from-background/80 via-background/40 to-transparent backdrop-blur-sm" />
    </div>
  );
}
