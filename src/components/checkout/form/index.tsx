"use client";

import { constants } from "@/configs";
import { useInputsValidation } from "@/shared/hooks";
import styles from "./styles.module.css";
import TextInput from "../../../shared/components/text-input";

const { regex } = constants;

interface Props {
   orderMetadata: any;
   setOrderMetadata: any;
   makeOrder: (paymentInstance: any) => Promise<void>;
};

export default function CheckoutForm({
   orderMetadata,
   setOrderMetadata,
   makeOrder
}: Props) {

   const {
      cod,
      firstName,
      lastName,
      address,
      phone,
      email,
      city,
      postCode
   } = orderMetadata;

   const { errors, handleAfterValidate: placeOrder } = useInputsValidation([
      {
         fieldTitle: "First name",
         inputValue: firstName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "firstNameError",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         fieldTitle: "Last name",
         inputValue: lastName,
         pattern: regex.NAME_REGEX,
         errorIdentifier: "lastNameError",
         errorMessage: "Chỉ được phép ký tự là chữ"
      },
      {
         fieldTitle: "Address",
         inputValue: address,
         pattern: regex.ALPHANUMERIC_REGEX,
         errorIdentifier: "addressError",
         errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
      },
      {
         fieldTitle: "Phone",
         inputValue: phone,
         pattern: regex.NUMERIC_REGEX,
         errorIdentifier: "phoneError",
         errorMessage: "Chỉ được phép ký tự là số"
      },
      {
         fieldTitle: "Email",
         inputValue: email,
         pattern: regex.EMAIL_REGEX,
         errorIdentifier: "emailError",
         errorMessage: "Email không hợp lệ1"
      }
   ], makeOrder);

   return (
      <div className={styles.container}>
         <h2 className={styles.heading}>Shipping Address</h2>
         <div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="First Name *"
                     placeholder="Enter your first name"
                     onChange={e => setOrderMetadata({...orderMetadata, firstName: e.target.value})}
                     inputValue={firstName}
                     errorMessage={!!errors && errors["firstNameError"] || ""}
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Last Name *"
                     placeholder="Enter your last name"
                     inputValue={lastName}
                     onChange={e => setOrderMetadata({...orderMetadata, lastName: e.target.value})}
                     errorMessage={!!errors && errors["lastNameError"] || ""}
                  />
               </div>
            </div>
            <div className={styles.dinp}>
               <TextInput
                  label="Address *"
                  placeholder="Enter your address"
                  inputValue={address}
                  onChange={e => setOrderMetadata({...orderMetadata, address: e.target.value})}
                  errorMessage={!!errors && errors["addressError"] || ""}
               />
            </div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Phone / mobile *"
                     placeholder="Enter your phone"
                     inputValue={phone}
                     onChange={e => setOrderMetadata({...orderMetadata, phone: e.target.value})}
                     errorMessage={!!errors && errors["phoneError"] || ""}
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Email *"
                     placeholder="Enter your email"
                     inputValue={email}
                     onChange={e => setOrderMetadata({...orderMetadata, email: e.target.value})}
                     errorMessage={!!errors && errors["emailError"] || ""}
                  />
               </div>
            </div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="City / Town"
                     placeholder="Enter city / town"
                     inputValue={city}
                     onChange={e => setOrderMetadata({...orderMetadata, city: e.target.value})}
                     errorMessage=""
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Postcode"
                     placeholder="Enter postcode"
                     inputValue={postCode}
                     onChange={e => setOrderMetadata({...orderMetadata, postCode: e.target.value})}
                     errorMessage=""
                  />
               </div>
            </div>
            { !cod && <button type="submit" className={styles.btn} onClick={placeOrder}>Place order</button> }
         </div>
      </div>
   );
};