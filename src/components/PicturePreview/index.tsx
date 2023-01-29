import { useEffect, useState } from 'react';

interface Props {
  imgName: string;
}

export const PicturePreview = ({ imgName }: Props) => {
  const [image, setImage] = useState();

  useEffect(() => {
    import(`./../../assets/img/${imgName}`).then(resp => {
      setImage(resp.default);
    });
  }, [imgName]);

  return (
    <div>
      <img src={image} alt="Floppa" />
    </div>
  );
};
