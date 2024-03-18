import React, { useEffect, useState } from "react";
import { Props } from "payload/components/views/Cell";

export const ImageCell: React.FC<Props> = (props) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const { cellData } = props;

  const photoId = cellData ? null : cellData;

  useEffect(() => {
    const result = async () => {
      try {
        const req = await fetch(
          `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/photos/${cellData}`
        );
        const data = await req.json();
        console.log(data.url);
        setPhotoUrl(data.url);
      } catch (err) {
        console.log(err);
      }
    };

    result();
  }, []);

  return (
    <div className={`thumbnail`}>
      <img src={photoUrl} alt="thumbnail" />
    </div>
  );
};
