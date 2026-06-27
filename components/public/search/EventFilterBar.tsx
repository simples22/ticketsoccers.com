"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type ActivePanel = "date" | "city" | null;
type RangeMode = "from" | "to";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const shortMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateValue(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isValidDateValue(value: string) {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function toShortDateLabel(value: string) {
  if (!value) return "Select date";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return "Select date";

  const monthIndex = Number(month) - 1;
  const dayNumber = Number(day);

  if (
    Number.isNaN(monthIndex) ||
    Number.isNaN(dayNumber) ||
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    return "Select date";
  }

  return `${shortMonths[monthIndex]} ${dayNumber}`;
}

export default function EventFilterBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const today = normalizeDate(new Date());
  const todayValue = toDateValue(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [rangeMode, setRangeMode] = useState<RangeMode>("from");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [city, setCity] = useState("Sarasota, FL");
  const [showLocationAgreement, setShowLocationAgreement] = useState(false);

  useEffect(() => {
    const locationConsent = localStorage.getItem("tsln-location-consent");
    const savedCity = localStorage.getItem("tsln-user-city");

    if (savedCity) {
      setCity(savedCity);
    }

    if (!locationConsent) {
      setShowLocationAgreement(true);
    }

    if (locationConsent === "agree") {
      requestUserLocation();
    }
  }, []);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [month, year]);

  async function getCityFromCoords(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) return null;

      const data = await response.json();

      const detectedCity =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        "Nearby";

      const region =
        data.principalSubdivisionCode ||
        data.principalSubdivision;

      return region ? `${detectedCity}, ${region}` : detectedCity;
    } catch {
      return null;
    }
  }

  function requestUserLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const detectedCity = await getCityFromCoords(
          position.coords.latitude,
          position.coords.longitude
        );

        if (detectedCity) {
          setCity(detectedCity);
          localStorage.setItem("tsln-user-city", detectedCity);
        }
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 9000,
        maximumAge: 1000 * 60 * 60,
      }
    );
  }

  function agreeLocation() {
    localStorage.setItem("tsln-location-consent", "agree");
    setShowLocationAgreement(false);
    requestUserLocation();
  }

  function rejectLocation() {
    localStorage.setItem("tsln-location-consent", "reject");
    setShowLocationAgreement(false);
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((value) => value - 1);
      return;
    }

    setMonth((value) => value - 1);
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((value) => value + 1);
      return;
    }

    setMonth((value) => value + 1);
  }

  function syncCalendarToDate(value: string) {
    if (!isValidDateValue(value)) return;

    const date = new Date(value);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  function handleFromInput(value: string) {
    setFromDate(value);
    syncCalendarToDate(value);

    if (toDate && new Date(toDate) < new Date(value)) {
      setToDate("");
    }
  }

  function handleToInput(value: string) {
    if (fromDate && new Date(value) < new Date(fromDate)) return;

    setToDate(value);
    syncCalendarToDate(value);
  }

  function selectDate(day: number) {
    const value = toDateValue(year, month, day);
    const selected = normalizeDate(new Date(value));

    if (selected < today) return;

    if (rangeMode === "from") {
      handleFromInput(value);
      setRangeMode("to");
      return;
    }

    handleToInput(value);
  }

  function isPast(day: number) {
    return normalizeDate(new Date(year, month, day)) < today;
  }

  function isActive(day: number) {
    const value = toDateValue(year, month, day);
    return value === fromDate || value === toDate;
  }

  function isInRange(day: number) {
    if (!fromDate || !toDate) return false;

    const value = new Date(toDateValue(year, month, day));
    return value > new Date(fromDate) && value < new Date(toDate);
  }

  function isStartDate(day: number) {
  const value = toDateValue(year, month, day);
  return value === fromDate;
    }

    function isEndDate(day: number) {
    const value = toDateValue(year, month, day);
    return value === toDate;
    }

    function applyToUrl(nextCity?: string) {
    const params = new URLSearchParams(sp?.toString() ?? "");
    if (fromDate) params.set("from", fromDate); else params.delete("from");
    if (toDate) params.set("to", toDate); else params.delete("to");
    const c = nextCity ?? city;
    if (c) params.set("city", c); else params.delete("city");
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  const dateLabel =
    fromDate && toDate
      ? `${toShortDateLabel(fromDate)} - ${toShortDateLabel(toDate)}`
      : fromDate
        ? `From ${toShortDateLabel(fromDate)}`
        : "Date Filter";

  return (
    <div className="tslnEventFilterWrap">
      {showLocationAgreement ? (
        <>
          <button
            type="button"
            className="tslnLocationAgreementBackdrop"
            onClick={rejectLocation}
            aria-label="Reject location request"
          />

          <div className="tslnLocationAgreementPanel">
            <h3>Use your current location?</h3>

            <p>
              Ticketsoccers can use your city to suggest nearby sports,
              concerts, festivals, theatre and live events.
            </p>

            <div className="tslnLocationAgreementActions">
              <button type="button" onClick={rejectLocation}>
                Reject All
              </button>

              <button type="button" onClick={agreeLocation}>
                Agree All
              </button>
            </div>
          </div>
        </>
      ) : null}

      <div className="tslnEventFilterBar">
        <button
          type="button"
          className="tslnEventFilterBtn"
          onClick={() =>
            setActivePanel((value) => (value === "date" ? null : "date"))
          }
        >
          <FontAwesomeIcon icon={faCalendarDays} />

          <span>{dateLabel}</span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="tslnEventFilterArrow"
          />
        </button>

        <button
          type="button"
          className="tslnEventFilterBtn"
          onClick={() =>
            setActivePanel((value) => (value === "city" ? null : "city"))
          }
        >
          <FontAwesomeIcon icon={faLocationDot} />

          <span>{city}</span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="tslnEventFilterArrow"
          />
        </button>
      </div>

      {activePanel ? (
        <>
          <button
            type="button"
            className="tslnEventFilterBackdrop"
            onClick={() => setActivePanel(null)}
            aria-label="Close filter"
          />

          <div className="tslnEventFilterPanel">
            <button
              type="button"
              className="tslnEventFilterPanelClose"
              onClick={() => setActivePanel(null)}
              aria-label="Close filter"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {activePanel === "date" ? (
              <>
                <h3>Select Date Range</h3>

                <div className="tslnDateRangeFields">
                  <button
                    type="button"
                    className={rangeMode === "from" ? "active" : ""}
                    onClick={() => setRangeMode("from")}
                  >
                    <span>From</span>
                    <strong>{toShortDateLabel(fromDate)}</strong>
                  </button>

                  <button
                    type="button"
                    className={rangeMode === "to" ? "active" : ""}
                    onClick={() => setRangeMode("to")}
                  >
                    <span>To</span>
                    <strong>{toShortDateLabel(toDate)}</strong>
                  </button>
                </div>

                <div className="tslnCalendarHead">
                  <button type="button" onClick={prevMonth}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>

                  <span>
                    {months[month]} {year}
                  </span>

                  <button type="button" onClick={nextMonth}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>

                <div className="tslnCalendarGrid tslnCalendarWeek">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="tslnCalendarGrid">
                  {days.map((day, index) =>
                    day ? (
                      <button
                        key={`${month}-${day}`}
                        type="button"
                        disabled={isPast(day)}
                        className={[
                            isPast(day) ? "disabled" : "",
                            isInRange(day) ? "inRange" : "",
                            isStartDate(day) ? "rangeStart" : "",
                            isEndDate(day) ? "rangeEnd" : "",
                            ].join(" ")}
                        onClick={() => selectDate(day)}
                      >
                        {day}
                      </button>
                    ) : (
                      <span key={`blank-${index}`} />
                    )
                  )}
                </div>

                <div className="tslnFilterActions">
                  <button
                    type="button"
                    className="tslnFilterClear"
                    onClick={() => {
                      setFromDate("");
                      setToDate("");
                      setRangeMode("from");
                    }}
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    className="tslnFilterApply"
                    onClick={() => { applyToUrl(); setActivePanel(null); }}
                  >
                    Apply Dates
                  </button>
                </div>
              </>
            ) : null}

            {activePanel === "city" ? (
              <>
                <h3>Choose Location</h3>

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
                      applyToUrl(city);
                      setActivePanel(null);
                    }}
                  >
                    Apply Location
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
