import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    img: "/assets/sponsors/jinom-logo-png.png",
  },
  {
    img: "/assets/sponsors/saranatech.png",
  },
  {
    img: "/assets/sponsors/omnih.png",
  },
  {
    img: "/assets/sponsors/TiDB.png",
  },
  {
    img: "/assets/sponsors/logo-harmonya.png",
  },
  {
    img: "/assets/sponsors/Incentro.png",
  },
  {
    img: "/assets/sponsors/logo-djoin.png",
  },
  {
    img: "/assets/sponsors/lokerbal.png",
  },
  {
    img: "/assets/sponsors/guestpro.png",
  },
];

const firstRow = reviews.slice(0, reviews.length);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "flex justify-center items-center w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img width="300" alt="" src={img} />
      </div>
    </figure>
  );
};

export default function Sponsor() {
  return (
    <div>
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
    </div>
  );
}
