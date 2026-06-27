"use client";
import { useEffect, useState } from "react";
export function ETicket({ orderId, section, row, qrPayload }: {
  orderId: number; section: string; row: string; qrPayload: string;
}) {
  const [dataUrl, setDataUrl] = useState<string>("");
  useEffect(() => { import("qrcode").then((QR) => QR.toDataURL(qrPayload).then(setDataUrl)); }, [qrPayload]);
  return (
    <div className="tsln-eticket">
      {dataUrl ? <img src={dataUrl} alt="QR" className="tsln-eticket__qr" /> : <div className="tsln-eticket__qr tsln-skeleton" />}
      <div>
        <div className="tsln-eticket__order">Order #{orderId}</div>
        <div className="tsln-ticket__title">Section {section} &middot; Row {row}</div>
      </div>
    </div>
  );
}