import axios from 'axios';
import { useEffect, useState } from 'react'
import { BASE_URL } from '../Url';

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    // get category
    const getCategories = async () => {
        try {

            const {data} = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
            setCategories(data?.allCategory);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);


    return categories;
}

export default useCategory
