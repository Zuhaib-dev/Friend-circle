import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }
  
  // Srinagar coordinates
  const lat = 34.0837;
  const lon = 74.7973;
  
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    const data = await res.json();
    
    return NextResponse.json({
      temp: Math.round(data.main.temp),
      wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
      location: data.name.toUpperCase(),
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    });
  } catch (error) {
    return NextResponse.json({ error: "Weather fetch failed" }, { status: 500 });
  }
}
