"use client";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../api/module/events";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import Cards from "../components/cards";
import { EventItem } from "./types";

function Page() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllEvents();

      if (response.status === 200 || response.status === 201) {
        const data = response?.data?.data;
        setUpcomingEvents(Array.isArray(data?.upcoming_event) ? data.upcoming_event : []);
        setArchivedEvents(Array.isArray(data?.archive_event) ? data.archive_event : []);
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      console.error("Event Fetch Error:", error);
      setError("Error loading events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const transformForCards = (events: EventItem[]) => {
    return events.map(event => ({
      _id: event._id,
      title: event.title,
      subTitle: event.subTitle,
      shortDescription: event.shortDescription,
      longDescription: event.longDescription || '',
      image: event.image && event.image.length > 0 ? event.image[0].url : '',
      eventDate: event.eventDate,
      location: event.location,
      type: event.type,
      postedOn: event.eventDate || event.createdAt, // Required by BlogItem type
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      __v: event.__v
    }));
  };

  return (
    <div>
      <Banner
        bgImage={banner[9].bgImage}
        heading={banner[9].heading}
        subheading={banner[9].subheading}
      />

      {loading ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400 py-8">
          Loading events...
        </div>
      ) : error ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-red-400 py-8">
          {error}
        </div>
      ) : (
        <>
          <div className="py-8">
            <h2 className="text-center text-[#9eff00] underline text-4xl md:text-[56px] font-bold leading-none mb-4">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <Cards blogData={transformForCards(upcomingEvents)} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>

          <div className="py-8">
            <h2 className="text-center text-[#9eff00] underline text-4xl md:text-[56px] font-bold leading-none mb-4">
              Archived Events
            </h2>
            {archivedEvents.length > 0 ? (
              <Cards blogData={transformForCards(archivedEvents)} basePath="/events" />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No archived events found.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
