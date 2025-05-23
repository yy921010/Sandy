import type { Partner } from "~/types/config";

const TiltedScroll = ({ partners }: { partners: Partner[] }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5rem),linear-gradient(to_left,transparent,black_5rem),linear-gradient(to_bottom,transparent,black_5rem),linear-gradient(to_top,transparent,black_5rem)]">
        <div className="grid h-[250px] w-[300px] gap-5 animate-skew-scroll grid-cols-1 sm:w-[300px] sm:grid-cols-1">
          {partners.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 cursor-pointer rounded-md border border-default-300 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-xl"
            >
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
                  <img src={item.avatar} alt="avatar png" />
                </div>
              </div>
              <p className="text-default-500">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiltedScroll;
