import type { Sample } from "~/types/config";

export default function UICard({ title, subtitle, image, url }: Sample) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="card-actions justify-end">
          <a className="btn btn-primary" href={url}>
            More
          </a>
        </div>
      </div>
    </div>
  );
}
