import { useState, useEffect } from "react"; 
import { useDispatch } from "react-redux";
import { addCart } from "services/redux/store/reducers/cart.reducer";
import { touchMessageBox } from "services/redux/store/reducers/popup.reducer";
import { SUCCESS_MESSAGE, WARNING_MESSAGE } from "utils/constants/messageTypes";
import { AMOUNT_PATTERN } from "utils/constants/regex";
import { INCREASE_ONCE, DECREASE_ONCE } from "utils/constants/meaning-vars";
import { ProductsService } from "services/firebase/products";

export function useProductOptions(productId) {

  const [ productSelected, setProductSelected ] = useState(null);
  const [ amount, setAmount ] = useState("1"); 
  const [ color, setColor ] = useState(null);
  const [ size, setSize ] = useState(null); 
  const [ errors, setErrors ] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    ProductsService.getProductDetail(productId)
    .then((productResponse) => {
      setProductSelected({
        ...productResponse, 
        id: productId
      }); 
    })
    .catch((err) => console.error(err.message));
  }, [])

  useEffect(() => {
    const addonsError = !!errors && errors.addonsError; 
    if (addonsError) {
      dispatch(touchMessageBox({
        type: WARNING_MESSAGE, 
        content: addonsError
      })); 
    }
  }, [errors]); 

  const getAmountError = () => {
    return (!amount.match(AMOUNT_PATTERN) && "Số lượng không hợp lệ") || "";
  }

  const getUserOptionsError = () => {
    const amountError = getAmountError();
    const addonsError = (!size && color && "Vui lòng chọn màu sản phẩm") || (!color && size && "Vui lòng chọn size") || (!size && !color && "Vui lòng chọn size và màu sản phẩm") || "";
    if (amountError || addonsError) {
      return {
        amountError, 
        addonsError
      }
    }
    return null; 
  }

  const inDecreaseAmount = (amountAction) => {
    const amountError = getAmountError(); 
    if (amountError) {
      setErrors({...errors, amountError});
      return; 
    }
    setAmount((Number(amount) + (amountAction === "INCREASE" ? INCREASE_ONCE : DECREASE_ONCE)).toString());
  }

  const onModifyingAmount = () => {
    if (amount.length > 5) return; 
    setErrors(null);
    setAmount(amount);
  }

  const isEnteredAmount = (e) => {
    const amountError = getAmountError(); 
    if (e.code === "Enter" && amountError) setErrors({...errors, amountError});
  }

  const handleAddToCart = () => {
    const userOptionsError = getUserOptionsError();
    if (userOptionsError) {
      setErrors(userOptionsError);
      return;
    }
    dispatch(addCart({
      ...productSelected,
      qty: Number(amount) || 1,                 // amount default is 1
      sizeSelected: size.sizeSelected, 
      colorSelected: color.colorSelected
    })); 
    dispatch(touchMessageBox({
      type: SUCCESS_MESSAGE, 
      content: "Đã thêm giỏ hàng"
    }));
  };

  const onSelectAddon = (addonDetail, selectedIndex) => {
    const { id: addonId, value: addonValue, meta: colorCode } = addonDetail; 
    if (!!colorCode === false) {
      const { sizeSelected, sizeSelectedIndex } = size || { sizeSelected: null, sizeSelectedIndex: -1 }; 
      if ((!!sizeSelected && sizeSelected.value === addonValue) || sizeSelectedIndex === selectedIndex) return; 
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
    const { colorSelected, colorSelectedIndex } = color || { colorSelected: null, colorSelectedIndex: -1 };
    if ((!!colorSelected && colorSelected.value === addonValue) || colorSelectedIndex === selectedIndex) return;
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

  return {
    productSelected,
    amount, 
    color, 
    size,
    errors,
    inDecreaseAmount, 
    onModifyingAmount, 
    isEnteredAmount,
    onSelectAddon,
    handleAddToCart
  }
}