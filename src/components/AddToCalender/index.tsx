import { Button } from "@/components/ui/button";
import { SlCalender } from "react-icons/sl";


interface addtoCalenderInfo{
    startTime:Date | undefined ,
    duration:number | undefined ,
    title:string | undefined,
    location:string | undefined
}

export const AddToCalender = ({startTime,duration,
    title,
    location}:addtoCalenderInfo) =>{

    function toGoogleCalendarDate(date:Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

    const handleAddToCalender = () =>{
        const start = new Date(startTime || '');
        const end = new Date(start.getTime() + (duration || 0) * 60000);
        const eventUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(title || "")}` +
      `&dates=${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}` +
      `&location=${encodeURIComponent(location || "")}`;
        window.open(eventUrl, "_blank");
    }

    return(
        <div className="flex items-center gap-4">
            <Button size={'xs'}  disabled={!startTime || !duration || new Date(startTime).getTime() < Date.now()} onClick={handleAddToCalender}>
                <SlCalender />
            </Button>
        </div>
    )
}