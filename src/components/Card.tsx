import type { Sample } from "~/types/config";

export default function UICard({ title, subtitle, image, url }: Sample) {
  return (
    <a className="card bg-base-200 shadow-sm relative" href={url}>
      <figure className="!m-0">
        <img src={image} alt={title} className="m-0" />
      </figure>
      <div className="backdrop-blur-sm flex p-3 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large absolute z-10 bottom-0 flex-col !items-start">
        <p className="text-sm text-base-content/60 uppercase font-bold !m-0">
          {subtitle}
        </p>
        <h4 className="text-base-content font-medium !m-0">{title}</h4>
      </div>
    </a>
  );
}
