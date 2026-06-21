"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronDown,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type ActivePanel = "date" | "city" | null;

const dateOptions = [
  "Today",
  "Tomorrow",
  "This Weekend",
  "Next 7 Days",
  "Next 30 Days",
];

export default function EventFilterBar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [selectedDate, setSelectedDate] = useState("Calendar Date");
  const [city, setCity] = useState("Sarasota, FL");
  const [showLocationApproval, setShowLocationApproval] = useState(false);

  useEffect(() => {
    const approved = localStorage.getItem("tsln-location-approved");
    const savedCity = localStorage.getItem("tsln-user-city");

    if (approved === "yes" && savedCity) {
      setCity(savedCity);
      return;
    }

    if (approved !== "yes") {
      setShowLocationApproval(true);
    }
  }, []);

  function requestLocation() {
    if (!navigator.geolocation) {
      setShowLocationApproval(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const label = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;

        setCity(label);
        localStorage.setItem("tsln-location-approved", "yes");
        localStorage.setItem("tsln-user-city", label);
        setShowLocationApproval(false);
      },
      () => {
        localStorage.setItem("tsln-location-approved", "no");
        setShowLocationApproval(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 1000 * 60 * 30,
      }
    );
  }

  function declineLocation() {
    localStorage.setItem("tsln-location-approved", "no");
    setShowLocationApproval(false);
  }

  return (
    <div className="tslnEventFilterWrap">
      {showLocationApproval ? (
        <div className="tslnLocationApproval">
          <div>
            <strong>Use your location?</strong>
            <p>We can suggest events near your city.</p>
          </div>

          <div className="tslnLocationApprovalActions">
            <button type="button" onClick={requestLocation}>
              Yes
            </button>

            <button type="button" onClick={declineLocation}>
              No
            </button>
          </div>
        </div>
      ) : null}

      <div className="tslnEventFilterBar">
        <button
          type="button"
          className="tslnEventFilterBtn"
          onClick={() =>
            setActivePanel((value) => (value === "date" ? null : "date"))
          }
        >
          <span className="tslnEventFilterIcon">
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>

          <span className="tslnEventFilterText">{selectedDate}</span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`tslnEventFilterArrow ${
              activePanel === "date" ? "open" : ""
            }`}
          />
        </button>

        <button
          type="button"
          className="tslnEventFilterBtn"
          onClick={() =>
            setActivePanel((value) => (value === "city" ? null : "city"))
          }
        >
          <span className="tslnEventFilterIcon">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>

          <span className="tslnEventFilterText">{city}</span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`tslnEventFilterArrow ${
              activePanel === "city" ? "open" : ""
            }`}
          />
        </button>
      </div>

      {activePanel ? (
        <div className="tslnEventFilterPanel">
          <button
            type="button"
            className="tslnEventFilterPanelClose"
            onClick={() => setActivePanel(null)}
            aria-label="Close filter panel"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          {activePanel === "date" ? (
            <>
              <h3>Choose a date</h3>

              <div className="tslnDatePickerGrid">
                {dateOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={selectedDate === option ? "active" : ""}
                    onClick={() => {
                      setSelectedDate(option);
                      setActivePanel(null);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {activePanel === "city" ? (
            <>
              <h3>Choose a city</h3>

              <div className="tslnCityPicker">
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Enter city, state"
                />

                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("tsln-user-city", city);
                    setActivePanel(null);
                  }}
                >
                  Apply City
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}