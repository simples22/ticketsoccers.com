type ETicketProps = {
  title: string;
  qrCode?: string;
};

export default function ETicket({ title, qrCode }: ETicketProps) {
  return (
    <article className="tslnETicket">
      <h3>{title}</h3>
      {qrCode ? <img src={qrCode} alt="Ticket QR Code" /> : null}
    </article>
  );
}
