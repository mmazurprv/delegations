export async function handleGetLocation(
  onSuccess: (location: string) => void,
  onError?: (error: GeolocationPositionError) => void,
) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pl`,
          );
          const data = await response.json();
          let cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            data.address.state ||
            data.address.country ||
            "Unknown";
          if (cityName == "Wola Grzymalina-Kolonia")
            cityName = "Wola Grzymalina Kolonia";
          onSuccess(cityName);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      },
      (error) => {
        console.error("Error fetching location: ", error);
        if (onError) onError(error);
      },
    );
  } else {
    const error = new Error("Geolocation is not supported by this browser.");
    console.error(error.message);
    if (onError) onError(error as unknown as GeolocationPositionError);
  }
}
