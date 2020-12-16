import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { useSelector } from 'react-redux';

function ProductImage() {

  const { currentProduct } = useSelector(state => state.product);
  const [images, setImages] = useState([])

  useEffect(() => {
    if (currentProduct) {
      const imagesMapper = currentProduct.images.map((value) => {
        return ({
          original: `http://localhost:5000/${value.image}`,
          thumbnail: `http://localhost:5000/${value.image}`
        })
      })
      setImages(imagesMapper);
    }
  }, [currentProduct])

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  )
}

export default ProductImage
