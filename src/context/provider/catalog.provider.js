import { useState, useEffect, createContext } from "react";
import { ProductsService } from "../../services/firebase/products";

export const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {

    const [ catalogData, setCatalogData ] = useState(null); 

    const setCurrentProducts = (newCataLogData) => {
        const { resProducts, filterDetail } = newCataLogData;
        setCatalogData({
            currentProducts: resProducts, 
            filter: filterDetail
        });
    }

    const handleFilteredProducts = async(filterDetail) => {
        const productsResponse = await ProductsService.getFilteredProducts(filterDetail); 
        setCurrentProducts({
            resProducts: productsResponse, 
            filterDetail
        })
    }

    const handleLoadMore = () => {
        const { currentProducts, filter } = catalogData; 
        ProductsService.loadMoreFilteredProducts(currentProducts, filter)
        .then((productsResponse) => {
            setCurrentProducts({
                filterDetail: filter,
                resProducts: [ ...currentProducts, ...productsResponse ]
            }); 
        })
        .catch((err) => console.error(err.message)); 
    }; 

    useEffect(() => {
        const initFilters = {};
        handleFilteredProducts(initFilters)
        .then(() => {
            console.log("init catalog products success"); 
        })
        .catch((err) => console.error(err.message)); 
    }, []); 

    return (
        catalogData && 
        <CatalogContext.Provider value={{ catalogData, handleFilteredProducts, handleLoadMore }}>
            { children }
        </CatalogContext.Provider>
    )
}

export default CatalogProvider;