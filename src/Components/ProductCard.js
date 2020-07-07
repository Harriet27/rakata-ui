import React from 'react';
import {
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle,
} from 'reactstrap';

const ProductCard = (props) => {
  return (
    <div key={props.key}>
      <Card className='box-glow' style={{textAlign: 'center', height: '400px', marginBottom: '20px', marginTop: '20px'}}>
        <CardImg top width="100%" height="70%" src={props.image} alt="Image here" />
        <CardBody>
          <CardTitle style={{fontWeight: '900', fontSize: '14px'}}>
            {props.name}
          </CardTitle>
          <CardSubtitle style={{fontWeight: '500', fontSize: '12px'}}>
            {props.brand}
          </CardSubtitle>
          <CardText style={{fontSize: '15px', marginTop: '10px', marginBottom: '10px'}}>
            {`Rp. ${props.price.toLocaleString()}`}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;
