// Simple sun icon for the weather card
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-14 h-14 text-yellow-200"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        strokeWidth="2"
        stroke="currentColor"
      />
    </svg>
  );
}

// Weather card component where the location and themeColor are based on what the agent
// sets via tool calls.
export function WeatherCard({
  result,
  location,
  themeColor,
}: {
  result: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    conditions: string;
    location: string;
  };
  location?: string;
  themeColor: string;
}) {
  if (!result) {
    return (
      <div
        style={{ backgroundColor: themeColor }}
        className="rounded-xl shadow-xl mt-6 mb-4 max-w-md w-full"
      >
        <div className="bg-white/20 p-4 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white capitalize">
                Loading...
              </h3>
              <p className="text-white">Please wait</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="rounded-xl shadow-xl mt-6 mb-4 max-w-md w-full"
    >
      <div className="bg-white/20 p-4 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white capitalize">
              {location}
            </h3>
            <p className="text-white">Current Weather</p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="text-3xl font-bold text-white">
            {result?.temperature}°C
          </div>
          <div className="text-sm text-white">{result?.conditions}</div>
        </div>

        <div className="mt-4 pt-4 border-t border-white">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-white text-xs">Humidity</p>
              <p className="text-white font-medium">
                {result?.humidity?.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-white text-xs">Wind</p>
              <p className="text-white font-medium">
                {result?.windSpeed?.toFixed(1)} mph
              </p>
            </div>
            <div>
              <p className="text-white text-xs">Feels Like</p>
              <p className="text-white font-medium">
                {result?.feelsLike?.toFixed(1)}°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
