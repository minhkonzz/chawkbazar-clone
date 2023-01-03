import "./index.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { touchProductDialog } from "services/redux/store/reducers/popup.reducer";
import { ProductsService } from "services/firebase/products"; 
import { addCart } from "services/redux/store/reducers/cart.reducer";
import { touchMessageBox } from "services/redux/store/reducers/popup.reducer"; 
import { BaseSource } from "utils/constants";
import { fixDecimal, isInt } from "functions";

const ProductDetail = ({ productId }) => {

  console.log("Render Product Detail component");

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
  const [ amountError, setAmountError ] = useState("");

  const closeProductDetailDialog = () => {
    productDetailRef.current.style.transform = "translate(-50%, -50%) scale(1.1, 1.1)";
    productDetailRef.current.style.opacity = 0;
    setTimeout(() => { dispatch(touchProductDialog()); }, 500);  
  }

  const handleAddToCart = () => {
    if (!!(color.colorSelected.value) === false || !!(size.sizeSelected.value) === false) {
      dispatch(touchMessageBox({
        type: "warn", 
        content: "Please choose color and size first"
      })); 
      return; 
    }
    dispatch(addCart({
      ...productSelected,
      qty: amount, 
      sizeSelected: size.sizeSelected, 
      colorSelected: color.colorSelected
    })); 
    dispatch(touchMessageBox({
      type: "success", 
      content: "Added product to cart"
    }));
  };

  const increaseAmount = () => {
    const currentAmount = Number(amount);
    if (currentAmount === NaN || !isInt(currentAmount)) {
      setAmountError("Số lượng không hợp lệ");
      return;
    }
    setAmount(currentAmount + 1); 
  }

  const decreaseAmount = () => {
    const currentAmount = Number(amount);
    if (currentAmount === NaN || !isInt(currentAmount)) {
      setAmountError("Số lượng không hợp lệ");
      return;
    }
    if (currentAmount === 1) return;  
    setAmount(currentAmount - 1); 
  };

  const onChangeAmountManual = (amount) => {
    if (amount.length > 4) return; 
    setAmountError("");
    setAmount(amount);  
  }

  const isPressEnter = (e) => {
    if (e.code === "Enter") {
      const currentAmount = Number(amount);
      if (currentAmount === NaN || !isInt(currentAmount)) {
        setAmountError("Số lượng không hợp lệ");
        return;
      }
      if (currentAmount < 1) {
        setAmountError("Số lượng không thể ít hơn 1");
        return;
      }
    }
  }

  useEffect(() => {
    ProductsService.getProductDetail(productId)
    .then((productResponse) => {
      setProductSelected({
        ...productResponse, 
        id: productId
      }); 
    })
    .catch((err) => console.error(err.message)); 
  }, []);

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
    <> {
      productSelected && 
      <div className="product-detail d-flex posab pos-center" ref={productDetailRef}>
        <img className="product-detail__image" alt="product" src={`${PREFIX_API_SOURCE}/${productSelected?.image?.original}`}/>
        <div className="product-detail__about posrel">
          <button className="product-detail__close circle-bd-r posab right-1d5pc top-n2pc" onClick={closeProductDetailDialog}>
            <ion-icon name="close"/>
          </button>
          <h2 className="product-detail__name">{productSelected?.name}</h2>
          <p className="product-detail__description">{productSelected?.description}</p>
          <div className="product-detail__prices d-flex">
            { productSelected.sale_price && <h2>{`$${fixDecimal(productSelected?.sale_price, 2)}`}</h2> }
            <h2>{`$${fixDecimal(productSelected?.price, 2)}`}</h2>
          </div>
          <p>Size</p>
          <div className="product-detail__addons d-flex"> {
            productSelected.variations
              .filter((variation) => variation.attribute.slug === "size")
              .map((addon, index) => (
                <span 
                  style={{ border: index === size.sizeSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                  key={index} 
                  className={`${addon.attribute.slug} product-detail__addon d-flex jc-center at-center`}
                  onClick={() => onSelectAddon(addon, index)}>
                  {addon.value}
                </span>
              ))}
          </div>
          <p>Color</p>
          <div className="product-detail__addons d-flex">
            {
              productSelected.variations
              .filter((variation) => variation.attribute.slug === "color")
              .map((addon, index) => (
                <span 
                  style={{ border: index === color.colorSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                  key={index} 
                  className={`${addon.attribute.slug} product-detail__addon d-flex jc-center at-center`}
                  onClick={() => onSelectAddon(addon, index)}>
                  <span className="thin-bd-r" style={{ backgroundColor: addon.meta }}/>
                </span>
              ))
            }
          </div>
          <div className="product-detail__quantity__add-cart d-flex jc-sb w-100pc">
            <div className="product-detail__quantity d-flex thin-bd-r">
              <button className="product-detail__quantity-btn increase h-100pc fw-600" onClick={decreaseAmount}><ion-icon name="remove"/></button>
              <input className="product-detail__quantity-value fw-600" onKeyDown={(e) => isPressEnter(e)} value={amount} onChange={(e) => onChangeAmountManual(e.target.value) } />
              <button className="product-detail__quantity-btn decrease h-100pc fw-600" onClick={increaseAmount}><ion-icon name="add"/></button>
            </div>
            <button className="product-detail__add-cart thin-bd-r fw-600" onClick={handleAddToCart}>Add to cart</button>
          </div>
          { !!amountError && <p className="product-detail__error-message">{amountError}</p> }
          <button className="product-detail__view-btn dark-v d-flex jc-center w-100pc thin-bd-r">View details</button>
        </div>
      </div>
    }
    </>
  )
}

export default ProductDetail;