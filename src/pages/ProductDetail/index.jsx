import './index.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { touchProductDialog } from '../../services/redux/store/reducers/popup.reducer';
import { ProductsService } from "../../services/firebase/products" 
import { addCart } from "../../services/redux/store/reducers/cart.reducer";
import { BaseSource } from "../../utils/constants";

const ProductDetail = ({ productId }) => {

  const { PREFIX_API_SOURCE } = BaseSource;
  const dispatch = useDispatch(); 
  const productDetailRef = useRef(null);
  const [ productSelected, setProductSelected ] = useState(null); 

  const [ color, setColor ] = useState({
    colorSelected: {
      id: -1, 
      value: "", 
      meta: "", 
      slug: "color"
    }, 
    colorSelectedIndex: -1
  });

  const [ size, setSize ] = useState({
    sizeSelected: {
      id: -1, 
      value: "", 
      slug: "size"
    }, 
    sizeSelectedIndex: -1
  });

  const [ amount, setAmount ] = useState(1);

  const closeProductDetailDialog = () => {
    productDetailRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
    productDetailRef.current.style.opacity = 0;
    setTimeout(() => { dispatch(touchProductDialog()); }, 500);  
  }

  const handleAddToCart = () => {
    if (!!(color.colorSelected.value) === false || !!(size.sizeSelected.value) === false) {
      alert("please choose color and size"); 
      return; 
    }
    dispatch(addCart({
      ...productSelected,
      qty: amount, 
      sizeSelected: size.sizeSelected, 
      colorSelected: color.colorSelected
    }))
  };

  const increaseAmount = () => { setAmount(amount + 1) }
  const decreaseAmount = () => {
    if (amount === 1) return;  
    setAmount(amount - 1); 
  };

  useEffect(() => {
    ProductsService.getProductDetail(productId)
    .then((productResponse) => {
      setProductSelected({
        ...productResponse, 
        id: productId
      }); 
    })
    .catch((err) => console.error(err.message)); 
    return () => {
      console.log("ProductDetail unmounted");
    }
  }, [])

  const onSelectAddon = (addonDetail, selectedIndex) => {
    const { id: addonId, value: addonValue, meta: colorCode } = addonDetail; 
    if (!!colorCode === false) {
      const { sizeSelected, sizeSelectedIndex } = size; 
      if (sizeSelected.value === addonValue || sizeSelectedIndex === selectedIndex) return; 
      setSize({
        sizeSelected: {
          ...sizeSelected, 
          id: addonId, 
          value: addonValue
        },
        sizeSelectedIndex: selectedIndex
      });
      return;  
    }
    const { colorSelected, colorSelectedIndex } = color;
    if (colorSelected.value === addonValue || colorSelectedIndex === selectedIndex) return;
    setColor({
      colorSelected: {
        ...colorSelected, 
        id: addonId, 
        value: addonValue, 
        meta: colorCode
      }, 
      colorSelectedIndex: selectedIndex
    }) 
  }

  return (
    <>
      {
        productSelected && 
        <div className="product-detail d-flex posab pos-center" ref={productDetailRef}>
          <img alt="product" src={`${PREFIX_API_SOURCE}/${productSelected?.image?.original}`}/>
          <div className="product-detail-about posrel">
            <button className="close-btn circle-bd-r posab right-2pc top-n3pc" onClick={closeProductDetailDialog}>
              <ion-icon name="close"/>
            </button>
            <h2>{productSelected?.name}</h2>
            <p>{productSelected?.description}</p>
            <h2>{`$${productSelected?.price}`}</h2>
            <p>Size</p>
            <div className="addons d-flex"> {
              productSelected.variations
                .filter((variation) => variation.attribute.slug === "size")
                .map((addon, index) => (
                  <span 
                    style={{ border: index === size.sizeSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                    key={index} 
                    className={`${addon.attribute.slug} addon d-flex jc-center at-center`}
                    onClick={() => onSelectAddon(addon, index)}>
                    {addon.value}
                  </span>
                ))}
            </div>
            <p>Color</p>
            <div className="addons d-flex">
              {
                productSelected.variations
                .filter((variation) => variation.attribute.slug === "color")
                .map((addon, index) => (
                  <span 
                    style={{ border: index === color.colorSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                    key={index} 
                    className={`${addon.attribute.slug} addon d-flex jc-center at-center`}
                    onClick={() => onSelectAddon(addon, index)}>
                    <span className="thin-bd-r" style={{ backgroundColor: addon.meta }}/>
                  </span>
                ))
              }
            </div>
            <div className="d-flex jc-sb w-100pc">
              <div className="qty-ctl d-flex thin-bd-r">
                <button className="qty-ctl-btn h-100pc fw-600" onClick={decreaseAmount}><ion-icon name="remove"/></button>
                <span className="qty d-flex jc-center at-center h-100pc fw-600">{amount}</span>
                <button className="qty-ctl-btn h-100pc fw-600" onClick={increaseAmount}><ion-icon name="add"/></button>
              </div>
              <button className="add-cart-btn thin-bd-r fw-600" onClick={handleAddToCart}>Add to cart</button>
            </div>
            <button className="dark-v d-flex jc-center w-100pc thin-bd-r">View details</button>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetail