import React from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { Card, Col, Carousel, Descriptions } from 'antd';
import NumberFormat from 'react-number-format';

function ProductCard(props) {

  const { product } = props;

  return (
    <>
      <Col sm={24} md={12} lg={8} >
        <Card
          hoverable={true}
          style={{ width: '100%' }}
        >
          <Carousel autoplay >
            {product?.images?.map((img) => {
              return (
                <div key={uuidv4()}>
                  <img src={`http://localhost:5000/${img.image}`} alt={img.fileName} style={{ width: '100%' }} />
                </div>
              )
            })}
          </Carousel>
          <div style={{ marginTop: 20 }}>
            <Link to={`/product/${product._id}`} style={{ color: 'black' }}>
              <Card.Meta title={product.title} description={`${product.description.slice(0, 30)}...`} />
              <Descriptions style={{ marginTop: 14 }}>
                <Descriptions.Item label='가격' span={3} >
                  <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'원'} />
                </Descriptions.Item>
              </Descriptions>
            </Link>
          </div>
        </Card>
      </Col>
    </>
  )
}

export default ProductCard
