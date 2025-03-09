import { Card, CardHeader, Image, Link } from "@heroui/react";
import type { Sample } from "~/types/config";

export default function UICard({ title, subtitle, image, url }: Sample) {
  return (
    <Card className="col-span-12 sm:col-span-4 h-[300px]" as={Link} href={url}>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold m-0">
          {subtitle}
        </p>
        <h4 className="text-white font-medium text-large m-0">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt={title}
        className="z-0 w-full h-full object-cover m-0"
        src={image}
      />
    </Card>
  );
}
