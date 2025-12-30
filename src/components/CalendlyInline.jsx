"use client";
import { InlineWidget } from 'react-calendly';

export default function CalendlyInline({ url = 'https://calendly.com/mytraveladvisorlite/30min?hide_event_type_details=1&hide_gdpr_banner=1', height = 700 }) {
  return (
    <div className="w-full my-6">
      <InlineWidget url={url} styles={{ height: `${height}px`, minWidth: '320px' }} />
    </div>
  );
}
