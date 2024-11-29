type Props = {
  title: string;
  subtitle: string;
};

export const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <div className="py-2 text-center md:py-4">
        <div className="mb-3 w-fit place-self-center">
          <h2 className="text-4xl font-black">{title}</h2>
          <div className="bg-orangeCustom700 h-1"></div>
        </div>
        <p className="text-lg">{subtitle}</p>
      </div>
      <div className="h-1 bg-neutral-600"></div>
    </>
  );
};
