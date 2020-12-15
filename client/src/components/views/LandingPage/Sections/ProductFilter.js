import React, { useEffect, useState } from 'react'
import { Divider, Checkbox, Row, Col, Slider, Collapse, Input } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import { ProductClothesSort, ProductAccessorySort } from '../../../utils/ProductSort/ProductSort'

const marks = {
  0: '0원',
  100: '500,000원',
};

function ProductFilter(props) {

  const [priceRange, setPriceRange] = useState([0, 500000])
  const [word, setWord] = useState('')

  const [checkedClothesList, setCheckedClothesList] = useState(ProductClothesSort);
  const [indeterminateClothes, setIndeterminateClothes] = useState(false);
  const [checkAllClothes, setCheckAllClothes] = useState(true);

  const [checkedAccessoryList, setCheckedAccessoryList] = useState(ProductAccessorySort);
  const [indeterminateAccessory, setIndeterminateAccessory] = useState(false);
  const [checkAllAccessory, setCheckAllAccessory] = useState(true);


  useEffect(() => {
    const payload = {
      sort: [...checkedClothesList, ...checkedAccessoryList],
      price: [priceRange[0] * 5000, priceRange[1] * 5000],
      word
    }
    props.onFilterChange(payload)
  }, [checkedClothesList, checkedAccessoryList, priceRange, word])

  const onChangeClothes = list => {
    setCheckedClothesList(list);
    setIndeterminateClothes(!!list.length && list.length < ProductClothesSort.length);
    setCheckAllClothes(list.length === ProductClothesSort.length);
  };

  const onCheckAllClothesChange = e => {
    setCheckedClothesList(e.target.checked ? ProductClothesSort : []);
    setIndeterminateClothes(false);
    setCheckAllClothes(e.target.checked);
  };

  const onChangeAccessory = list => {
    setCheckedAccessoryList(list);
    setIndeterminateAccessory(!!list.length && list.length < ProductAccessorySort.length);
    setCheckAllAccessory(list.length === ProductAccessorySort.length);
  };

  const onCheckAllAccessoryChange = e => {
    setCheckedAccessoryList(e.target.checked ? ProductAccessorySort : []);
    setIndeterminateAccessory(false);
    setCheckAllAccessory(e.target.checked);
  };

  const onAfterChange = (value) => {
    setPriceRange(value)
  }

  const handleTipFormatter = (e) => {
    return e * 5000 + '원'
  }

  const handleChangeWord = (e) => {
    setWord(e.target.value);
  }

  return (
    <div>
      <Collapse style={{ marginBottom: '2rem' }}>
        <Collapse.Panel header="검색 필터">
          <Row gutter={[24, 24]}>
            <Col span={10} style={{ margin: 'auto' }}>
              <Divider orientation="left" plain>
                의류
          </Divider>
              <Checkbox indeterminate={indeterminateClothes} onChange={onCheckAllClothesChange} checked={checkAllClothes}>
                모두 선택
          </Checkbox>
              <Checkbox.Group options={ProductClothesSort} value={checkedClothesList} onChange={onChangeClothes} />
            </Col>
            <Col span={10} style={{ margin: 'auto' }}>
              <Divider orientation="left" plain>
                잡화
          </Divider>
              <Checkbox indeterminate={indeterminateAccessory} onChange={onCheckAllAccessoryChange} checked={checkAllAccessory}>
                모두 선택
          </Checkbox>
              <Checkbox.Group options={ProductAccessorySort} value={checkedAccessoryList} onChange={onChangeAccessory} />
            </Col>
            <Col span={22} style={{ margin: 'auto' }}>
              <Divider orientation="left" plain>
                가격
              </Divider>
              <Slider
                range
                step={1}
                marks={marks}
                defaultValue={[0, 100]}
                tooltipVisible
                tipFormatter={handleTipFormatter}
                onAfterChange={onAfterChange}
              />
            </Col>
            <Col span={22} style={{ margin: 'auto' }}>
              <Input.Search value={word} onChange={handleChangeWord} placeholder="상품의 이름이나 설명을 통해 검색하세요. ex(구두, 겨울 잠바)" prefix={<ShoppingOutlined />} enterButton />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>


    </div>
  )
}

export default ProductFilter
