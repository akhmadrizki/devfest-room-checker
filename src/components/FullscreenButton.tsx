export default function FullscreenButton() {
  // Check if we're in a browser environment and get the 'fs' parameter
  const hasFullscreenParam =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("fs");

  // Return null if the parameter doesn't exist
  if (!hasFullscreenParam) {
    return null;
  }

  function handleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <div className="flex justify-center mt-4 self-start">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFullscreen}
      />
    </div>
  );
}
