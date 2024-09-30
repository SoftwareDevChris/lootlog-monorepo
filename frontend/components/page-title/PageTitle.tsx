import "./PageTitle.scss";

type Props = {
  title: string;
  subtitle: string;
};

export const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <div className="page-title-container">
        <div className="title-container">
          <h2>{title}</h2>
          <div className="title-underline"></div>
        </div>
        <p>{subtitle}</p>
      </div>
      <div className="page-title-divider"></div>
    </>
  );
};
