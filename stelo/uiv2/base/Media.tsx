import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { getLink, normalizeImageUrl } from "utils/images";
import BadImage from "./BadImage";
import { media } from "./Media.css";
import ContentLoader from "react-content-loader";
import clsx from "clsx";

type MediaProps = {
  src?: string | undefined | null;
  ratio?: number;
  className?: string;
  type?: "img" | "video/mp4" | "video/webm";
  style?: React.CSSProperties;
};

const useValidImage = (url: string | undefined | null) => {
  const [valid, setValid] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (url === "" || !url) {
      setValid(false);
      setLoading(false);
    } else {
      // Define these here so we can cleanup
      const onLoad = () => {
        setValid(true);
        setLoading(false);
      };
      const onError = () => {
        setValid(false);
        setLoading(false);
      };

      const img = new Image();
      img.src = url;
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);

      return function cleanup() {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      };
    }
  }, [url, setValid, setLoading]);

  return { loading, valid };
};

export const Media = ({
  ratio = 1,
  type = "img",
  src,
  className,
  style,
}: MediaProps) => {
  let normalizedUrl = normalizeImageUrl(src);
  const { valid, loading } = useValidImage(normalizedUrl);
  let mediaContent;

  if (loading) {
    mediaContent = (
      <div>
        <ContentLoader height="100" width="100">
          <rect height="100" width="100"></rect>
        </ContentLoader>
      </div>
    );
  } else if (!valid) {
    mediaContent = <BadImage className={clsx(media)} />;
  } else if (type == "img") {
    mediaContent = <img className={clsx(media)} src={normalizedUrl} />;
  } else if (type == "video/mp4" || type == "video/webm") {
    mediaContent = (
      <video
        className={clsx(media, className)}
        loop={true}
        muted={true}
        autoPlay={true}
      >
        <source src={normalizedUrl} type={type}></source>
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  } else {
    mediaContent = <div>...</div>;
  }
  return (
    <div style={{ overflow: "hidden", ...style }} className={className}>
      <AspectRatio.Root ratio={ratio}>{mediaContent}</AspectRatio.Root>
    </div>
  );
};
